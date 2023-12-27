import { useCallback, useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Select from "react-select";
import DetailTable from "./DetailTable";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { customSelectStyles } from "../../utils/customStyleReactSelect";
import { TbTableExport, TbTableImport, TbTablePlus } from "react-icons/tb";

import { readFile, utils, writeFileXLSX } from "xlsx";
import ModalPopup from "../ModelPopup/ModalPopup";
import { actionsRemove } from "../../utils/actionsTable";
import { useLocation } from "react-router-dom";
import pathRoutes from "../../utils/pathRoutes";
import { routes } from "../../routes";
import { useSelector } from "react-redux";
import { TiWarningOutline } from "react-icons/ti";

const Table = ({
    isImport,
    defineTable,
    setDefineTable,
    tableData,
    datas,
    totalRecords,
    functionsModule,
    handleAdd,
    handleImport,
    handleExport,
    saveDataImport,
}) => {
    // redux
    const currentUser = useSelector((state) => state.auth.currentUser);
    const path = useLocation();

    const orderedPermissions = [
        "PERE", // Thứ tự ưu tiên PERE
        "PERI", // Thứ tự ưu tiên PERI
        "PERC", // Thứ tự ưu tiên PERC
    ];
    // state
    // excelState
    const [importValid, setImportValid] = useState(true);
    const [dataImport, setDataImport] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [defineTableImport, setDefineTableImport] = useState({
        inputSearch: "",
        isSearched: false,
        offset: 0,
        limit: 5,
        pages: 0,
        currentPage: 1,
    });
    const [isRtl, setIsRtl] = useState(false);

    // dataState
    const [dataShow, setDataShow] = useState([]);

    // Handle
    const handleDeleteImport = (dataDelete) => {
        setDataImport(dataImport.filter((data) => data != dataDelete));
    };

    const importFile = async (e) => {
        /* get data as an ArrayBuffer */
        let file = e?.target?.files[0];
        if (file) {
            const data = await file.arrayBuffer();

            /* parse and load first worksheet */
            const wb = readFile(data);
            const ws = wb.Sheets[wb.SheetNames[0]];
            const dataImport = utils.sheet_to_json(ws);
            // console.log("dataImport", dataImport);
            const convertedItem = [];
            dataImport.map((item) => {
                const obj = {};
                const headerImport = Object.keys(item).splice(1);
                // console.log(headerImport, item, dataImport);
                tableData.forEach((headerItem) => {
                    // console.log("headerItem", headerItem);
                    if (headerImport.includes(headerItem.header)) {
                        // console.log("header trùng", headerItem);
                        if (!headerItem.actions) {
                            const { header, column } = headerItem;
                            // console.log("check:", column, header, item[header]);
                            if (column === "id") {
                                obj[column] = null;
                            } else {
                                obj[column] = item[header];
                            }

                            // const columnName = headerItem.column;
                            // const columnValue = item[headerItem.header];
                            // obj[columnName] = columnValue;

                            // if (column === "id") {
                            //     obj[column] = null;
                            // } else {
                            //     if(column.includes("Data")){
                            //         obj[column.replace("Data","Id")] = item[header];
                            //     }
                            //     else{
                            //         obj[column] = item[header];
                            //     }
                            // }
                        }
                    }
                });
                if (Object.keys(obj).length != 0) {
                    convertedItem.push(obj);
                }
            });

            // console.log(
            //     "check var:",
            //     convertedItem,
            //     Object.keys(convertedItem)
            // );
            if (Object.keys(convertedItem)?.length != 0) {
                console.log("Có sự trùng", convertedItem);
                setDataImport(convertedItem);
                setDefineTableImport((prevState) => ({
                    ...prevState,
                    inputSearch: "",
                    isSearched: false,
                    offset: 0,
                    limit: 5,
                    pages: 0,
                    currentPage: 1,
                }));
                setImportValid(true);
            } else {
                // console.log("Không Có sự trùng", convertedItem);
                setImportValid(false);
            }
        }
    };
    const exportSample = useCallback(() => {
        const convertedItem = [];
        const obj = {};
        tableData.map((data) => {
            if (!data.actions) {
                const { header } = data;
                obj[header] = `${header} mẫu`;
            }
        });
        // console.log(convertedItem);
        convertedItem.push(obj);
        const ws = utils.json_to_sheet(convertedItem);
        // console.log("wordsheet", ws);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(
            wb,
            `Export Sample ${nameTable} ${new Date().toLocaleDateString(
                "vi-VN"
            )} ${new Date().toLocaleTimeString("vi-VN")}.xlsx`
        );
    }, [tableData]);
    const exportFile = useCallback(() => {
        console.log("export datasa",datas);
        const convertedItem = [];
        datas.map((item) => {
            const obj = {};
            tableData.forEach((headerData) => {
                if (!headerData.actions) {
                    const { header, column } = headerData;
                    console.log("header, item[column]", header, item[column]);
                    if (typeof item[column] === "object") {
                        item[column]?.id
                            ? (obj[header] = item[column]?.id)
                            : (obj[header] = item[column]?.code);
                    } else {
                        obj[header] = item[column];
                    }
                }
            });
            convertedItem.push(obj);
            console.log(convertedItem);
        });
        const ws = utils.json_to_sheet(convertedItem);
        // console.log("wordsheet", ws);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(
            wb,
            `Export ${nameTable} ${new Date().toLocaleDateString(
                "vi-VN"
            )} ${new Date().toLocaleTimeString("vi-VN")}.xlsx`
        );
    }, [dataImport]);
    // const saveDataImport = (data) => {
    //     console.log("saveDataImport", data);
    // };

    const handleChangePage = (page) => {
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: page,
            offset: (page - 1) * defineTable.limit,
        }));
    };
    const handleChangeLimit = (e) => {
        // console.log("handle limit", e);
        if (e) {
            setDefineTable((prevState) => ({
                ...prevState,
                limit: e.value,
                offset: 0,
                currentPage: 1,
            }));
        }
    };
    const handleChangeFilter = (e) => {
        // console.log("handle limit", e);
        if (e) {
            setDefineTable((prevState) => ({
                ...prevState,
                filterSearch: e.value,
                offset: 0,
                currentPage: 1,
            }));
        }
    };
    const handleSearch = () => {
        console.log("Nhấn enter")
        setDefineTable((prevState) => ({
            ...prevState,
            isSearched: true,
        }));
    };
    const handleChangeInput = (e) => {
        console.log(e.target.value);
        setDefineTable((prevState) => ({
            ...prevState,
            inputSearch: e.target.value,
        }));
    };

    // fetch onLoad
    const arrPath = path.pathname
        .split("/")
        .splice(1, 2)
        .filter(
            (value) =>
                value != pathRoutes.R1.changePassword &&
                value != pathRoutes.R1.changeInformation
        );
    const nameTable = routes
        .filter((route) => route?.role == currentUser?.roleId)[0]
        ?.pages.filter((page) => page.path == arrPath[1])[0]?.name;
    const tableDataImport = tableData.filter((data) => !data.actions);
    tableDataImport.push({
        header: "Hành động",
        actions: [actionsRemove(handleDeleteImport)],
    });

    const limitRecord = [
        { label: "5 rows", value: 5 },
        { label: "10 rows", value: 10 },
        { label: "20 rows", value: 20 },
    ];
    const filterSearch = [];
    tableData.map((data) => {
        const obj = {};
        if (!data.actions) {
            const { header, column, columnData } = data;
            if (columnData) {
                obj["label"] = header;
                obj["value"] = columnData;
                filterSearch.push(obj);
            } else {
                obj["label"] = header;
                obj["value"] = column;
                filterSearch.push(obj);
            }
        }
    });

    const pagination = [];
    if (defineTable?.pages > 3 && defineTable?.currentPage == 1) {
        // console.log("page > 3");
        for (
            let page = defineTable?.currentPage - 2;
            page < defineTable?.currentPage + 2;
            page++
        ) {
            // console.log("page", page);
            if (page >= 0) {
                pagination?.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-[35px] border border-gray-300 ${
                                page + 1 === defineTable?.currentPage
                                    ? "text-PrimaryColor bg-paleBlue hover:bg-paleBlue hover:text-PrimaryColor"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    } else if (
        defineTable?.pages > 3 &&
        defineTable?.pages == defineTable?.currentPage
    ) {
        for (
            let page = defineTable?.currentPage - 2;
            page < defineTable?.currentPage;
            page++
        ) {
            // console.log("page", page);
            if (page >= 0) {
                pagination?.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-[35px] border border-gray-300 ${
                                page + 1 === defineTable?.currentPage
                                    ? "text-PrimaryColor bg-paleBlue hover:bg-paleBlue hover:text-PrimaryColor"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    } else if (defineTable?.pages > 3) {
        for (
            let page = defineTable?.currentPage - 2;
            page < defineTable?.currentPage + 1;
            page++
        ) {
            // console.log("page", page);
            if (page >= 0) {
                pagination?.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-[35px] border border-gray-300 ${
                                page + 1 === defineTable?.currentPage
                                    ? "text-PrimaryColor bg-paleBlue hover:bg-paleBlue hover:text-PrimaryColor"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    } else if (defineTable?.pages <= 3) {
        for (let page = 0; page < defineTable?.pages; page++) {
            // console.log("page", page);
            if (page >= 0) {
                pagination?.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-[35px] border border-gray-300 ${
                                page + 1 === defineTable?.currentPage
                                    ? "text-PrimaryColor bg-paleBlue hover:bg-paleBlue hover:text-PrimaryColor"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    }

    // Effect
    useEffect(() => {
        setDefineTable((prevState) => ({
            ...prevState,
            filterSearch: filterSearch[1].value,
            offset: 0,
            currentPage: 1,
        }));
    }, []);
    useEffect(() => {
        // console.log("totalRecords", totalRecords);
        setDefineTable((prevState) => ({
            ...prevState,
            pages:
                Math.round(totalRecords / defineTable?.limit) <
                totalRecords / defineTable?.limit
                    ? Math.round(totalRecords / defineTable?.limit) + 1
                    : Math.round(totalRecords / defineTable?.limit),
        }));
        // offset:bỏ qua 5 10          0 0
        // limit: số lượng lấy 5 10      5 10
        // pages: số trang
        // currentPage: trang hiện tại 2   1
        // console.log(
        //     "defineTable.offset",
        //     defineTable?.offset,
        //     defineTable?.limit * defineTable?.currentPage
        // );
        const dataFilter = [];
        datas?.map((data, index) => {
            if (
                index >= defineTable?.offset &&
                index < defineTable?.limit * defineTable?.currentPage
            ) {
                dataFilter.push(data);
            }
        });
        setDataShow(dataFilter);
    }, [
        datas,
        defineTable?.currentPage,
        defineTable?.isSearched,
        defineTable?.limit,
    ]);
    useEffect(() => {
        setDefineTableImport((prevState) => ({
            ...prevState,
            currentPage: 1,
            inputSearch: "",
            isSearched: false,
        }));
    }, []);
    useEffect(() => {
        setDefineTableImport((prevState) => ({
            ...prevState,
            isSearched: false,
            currentPage: 1,
        }));
    }, [defineTable.isSearched == true]);
    useEffect(() => {
        setDefineTableImport((prevState) => ({
            ...prevState,
            currentPage: 1,
        }));
        // apiUser.getAllCouncils(
        //     defineTable.inputSearch,
        //     (defineTable.currentPage - 1) * defineTable.limit,
        //     defineTable.limit,
        //     dispatch
        // );
    }, [defineTable.limit]);

    return (
        <>
            <div className="tableDiv flex flex-col gap-2 bg-whiteColor rounded-lg shadow-md p-2">
                <div
                    className={`headerTableDiv media-min-md:flex media-min-md:justify-between media-max-md:flex media-max-md:flex-col-reverse gap-2`}
                >
                    {functionsModule && (
                        <>
                            <div className="leftHeaderTableDiv w-[50%] flex justify-start items-center gap-2 media-max-md:w-full">
                                <div className="searchDiv w-[65%] flex h-[35px] border rounded-lg items-center px-2 py-1">
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Nhập từ khóa tìm kiếm"
                                        value={defineTable?.inputSearch}
                                        onChange={handleChangeInput}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                        className="bg-transparent outline-none border-none w-full"
                                    />
                                    <BiSearchAlt
                                        className="icon hover:text-PrimaryColor"
                                        onClick={handleSearch}
                                    />
                                </div>
                                <div className="w-[35%]">
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        className="basic-single media-max-md:text-smallFontSize h-[35px]"
                                        classNamePrefix="select"
                                        defaultValue={
                                            filterSearch && filterSearch[1]
                                        }
                                        isRtl={isRtl}
                                        name="color"
                                        options={filterSearch}
                                        onChange={(e) => {
                                            handleChangeFilter(e);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="rightHeaderTableDiv functionsModuleDiv flex justify-end gap-2">
                                {currentUser?.roleId == "R1" ||
                                currentUser?.roleId == "R2" ? (
                                    <>
                                        <button
                                            className="importDiv button"
                                            onClick={exportFile}
                                        >
                                            <span>Xuất</span>
                                            <TbTableExport className="icon" />
                                        </button>
                                        <button
                                            className="importDiv button"
                                            onClick={() => {
                                                setShowModal(true);
                                            }}
                                        >
                                            <span>Nhập</span>
                                            <TbTableImport className="icon" />
                                        </button>
                                        <button
                                            className="addDiv button"
                                            onClick={handleAdd}
                                        >
                                            <span>Thêm</span>
                                            <TbTablePlus className="icon" />
                                        </button>
                                    </>
                                ) : currentUser?.permissions ? (
                                    currentUser?.permissions
                                        .split(",")
                                        .includes("PERF") ? (
                                        <>
                                            <button
                                                className="importDiv button"
                                                onClick={exportFile}
                                            >
                                                <span>Xuất</span>
                                                <TbTableExport className="icon" />
                                            </button>
                                            <button
                                                className="importDiv button"
                                                onClick={() => {
                                                    setShowModal(true);
                                                }}
                                            >
                                                <span>Nhập</span>
                                                <TbTableImport className="icon" />
                                            </button>
                                            <button
                                                className="addDiv button"
                                                onClick={handleAdd}
                                            >
                                                <span>Thêm</span>
                                                <TbTablePlus className="icon" />
                                            </button>
                                        </>
                                    ) : (
                                        orderedPermissions.map((permission) => {
                                            if (
                                                currentUser?.permissions
                                                    .split(",")
                                                    .includes(permission)
                                            ) {
                                                if (permission === "PERE") {
                                                    return (
                                                        <button
                                                            className="importDiv button"
                                                            onClick={exportFile}
                                                        >
                                                            <span>Xuất</span>
                                                            <TbTableExport className="icon" />
                                                        </button>
                                                    );
                                                }
                                                if (permission === "PERI") {
                                                    return (
                                                        <button
                                                            className="importDiv button"
                                                            onClick={() => {
                                                                setShowModal(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <span>Nhập</span>
                                                            <TbTableImport className="icon" />
                                                        </button>
                                                    );
                                                }
                                                if (permission === "PERC") {
                                                    return (
                                                        <button
                                                            className="addDiv button"
                                                            onClick={handleAdd}
                                                        >
                                                            <span>Thêm</span>
                                                            <TbTablePlus className="icon" />
                                                        </button>
                                                    );
                                                }
                                            }
                                            return null;
                                        })
                                    )
                                ) : null}
                                {/* {functionsModule && handleExport && (
                                    <button
                                        className="importDiv button"
                                        onClick={exportFile}
                                    >
                                        <span>Xuất</span>
                                        <TbTableExport className="icon" />
                                    </button>
                                )}
                                {functionsModule && handleImport && (
                                    <button
                                        className="importDiv button"
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                    >
                                        <span>Nhập</span>
                                        <TbTableImport className="icon" />
                                    </button>
                                )}
                                {functionsModule && handleAdd && (
                                    <button
                                        className="addDiv button"
                                        onClick={handleAdd}
                                    >
                                        <span>Thêm</span>
                                        <TbTablePlus className="icon" />
                                    </button>
                                )} */}
                            </div>
                        </>
                    )}
                </div>
                <div className="tableDetailDiv border rounded-lg overflow-x-auto relative">
                    <div className="inline-block min-w-full relative">
                        {/* <table>
                        <tfoot>
                            <td colSpan={2}>
                                <input type="file" onChange={importFile} />
                                <button onClick={exportFile}>
                                    Export XLSX
                                </button>
                            </td>
                        </tfoot>
                    </table> */}
                        <DetailTable tableData={tableData} datas={dataShow} />
                    </div>
                </div>
                <div className="paginationTableDiv">
                    <div class="flex justify-end text-sm gap-2">
                        <div className="divLimitRows">
                            <Select placeholder="Chọn..."
                                styles={customSelectStyles}
                                className="basic-single media-max-md:text-smallFontSize h-[35px]"
                                classNamePrefix="select"
                                defaultValue={limitRecord[0]}
                                isRtl={isRtl}
                                name="color"
                                options={limitRecord}
                                onChange={(e) => {
                                    handleChangeLimit(e);
                                }}
                            />
                        </div>
                        <div className="divPagination flex">
                            <div>
                                <button
                                    onClick={() => handleChangePage(1)}
                                    class="flex items-center justify-center w-6 h-[35px] ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <FaAngleDoubleLeft />
                                    {/* <FaAngleLeft /> */}
                                </button>
                            </div>
                            {defineTable?.currentPage > 2 &&
                                defineTable?.pages > 3 && (
                                    <div>
                                        <button
                                            className={`flex items-center justify-center w-6 h-[35px] border border-gray-300 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                        }`}
                                        >
                                            <HiOutlineDotsHorizontal />
                                        </button>
                                    </div>
                                )}
                            {pagination && pagination}
                            {defineTable?.currentPage <
                                defineTable?.pages - 1 &&
                                defineTable?.pages > 3 && (
                                    <div>
                                        <button
                                            className={`flex items-center justify-center w-6 h-[35px] border border-gray-300 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                                }`}
                                        >
                                            <HiOutlineDotsHorizontal />
                                        </button>
                                    </div>
                                )}
                            <div>
                                <button
                                    onClick={() =>
                                        handleChangePage(defineTable?.pages)
                                    }
                                    class="flex items-center justify-center w-6 h-[35px] leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                                >
                                    {/* <FaAngleRight /> */}
                                    <FaAngleDoubleRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPopup
                showModal={showModal}
                setShowModal={setShowModal}
                title={"Import Excel"}
                result={dataImport}
                setResult={saveDataImport}
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                    >
                        Upload file
                    </label>
                    <input
                        className="block w-full text-sm rounded-lg bg-white shadow-md border
                file:cursor-pointer
                file:items-center file:text-h3FontSize file:font-semibold file:bg-inputColor file:rounded-lg file:px-2 file:py-1 file:border-none file:shadow-sm
                file:hover:text-PrimaryColor file:hover:bg-paleBlue
                "
                        id="file_input"
                        type="file"
                        accept=".xls,.xlsx"
                        onChange={importFile}
                    />
                    {importValid ? (
                        <Table
                            isImport={true}
                            defineTable={defineTableImport}
                            setDefineTable={setDefineTableImport}
                            tableData={tableDataImport}
                            datas={dataImport}
                            totalRecords={dataImport.length}
                        />
                    ) : (
                        <div className="warningData flex flex-col justify-center items-center rounded-lg shadow-md px-4 py-3 text-h3FontSize font-semibold media-max-md:text-smallFontSize">
                            <div className="warningContent">
                                <div className="text-center flex justify-center">
                                    <div className="p-2 rounded-full bg-bgColor">
                                        <TiWarningOutline className="text-yellow-500 text-biggestFontSize font-bold" />
                                    </div>
                                </div>

                                <div className="text-center">
                                    Dữ liệu trống hoặc chưa đúng mẫu?
                                </div>
                                <div className="text-center">
                                    Vui lòng tải dữ liệu mẫu và thêm dữ liệu!
                                </div>
                            </div>
                            <button className="button" onClick={exportSample}>
                                <span>Export Sample</span>
                                <TbTableExport className="icon" />
                            </button>
                        </div>
                    )}
                </div>
            </ModalPopup>
        </>
    );
};

export default Table;
