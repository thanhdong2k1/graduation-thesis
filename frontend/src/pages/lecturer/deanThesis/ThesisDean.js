import { Link, useNavigate } from "react-router-dom";
import { apiAdmin, apiLecturer } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    actionsCustom,
    actionsDetail,
    actionsEdit,
    actionsRemove,
} from "../../../utils/actionsTable";
import Table from "../../../components/table/Table";
import pathRoutes from "../../../utils/pathRoutes";
import { toast } from "react-toastify";
import Select from "react-select";
import {
    customSelectStyles,
    customSelectStylesMulti,
} from "../../../utils/customStyleReactSelect";
import { createAxios } from "../../../utils/createInstance";
import { logginSuccess } from "../../../redux/authSlice";
import ModalPopup from "../../../components/ModelPopup/ModalPopup";
import { utils, writeFileXLSX } from "xlsx";

const ThesisDean = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theses = useSelector((state) => state.admin.theses);
    const totalRecords = useSelector((state) => state.admin.totalRecords);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const information = useSelector((state) => state?.admin.information);
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);

    // console.log("theses", theses);
    const [defineTable, setDefineTable] = useState({
        inputSearch: "",
        filterSearch: "",
        isSearched: false,
        offset: 0,
        limit: 10,
        pages: 0,
        currentPage: 1,
    });
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);

    // Handle
    const handleAdd = () => {
        navigate(`../${pathRoutes?.R1?.addThesis}`, { replace: true });
    };
    const handleImport = () => {
        // console.log("handleImport");
    };
    const handleExport = async () => {
        // const id = toast.loading("Vui lòng đợi...");
        await apiAdmin
            .exportTheses({
                user: currentUser,
                inputSearch: defineTable.inputSearch,
                filterSearch: defineTable.filterSearch,
                departmentId: information?.departmentId,
                dispatch: dispatch,
                axiosJWT: axiosJWT,
            })
            .then((res) => {
                console.log(res);
                const workbook = utils?.book_new();

                // Convert the data to a worksheet
                const worksheet = utils.json_to_sheet([]);

                // Add the worksheet to the workbook
                utils.book_append_sheet(workbook, worksheet, "Data");

                // Define the header row data
                const headerRow1 = [
                    "TT",
                    "Mã sv",
                    "Họ tên sv",
                    "Lớp",
                    "Tên đề tài",
                    "Giảng viên hướng dẫn",
                    "Giảng viên phản biện 1",
                    "Giảng viên phản biện 2",
                    "KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP",
                ];
                const headerRow2 = [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "HD",
                    "PB1",
                    "PB2",
                    "THÀNH VIÊN HỘI ĐỒNG ĐÁNH GIÁ",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "ĐIỂM HPTN",
                ];
                const headerRow3 = [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "(1)",
                    "(2)",
                    "(3)",
                    "(4)",
                    "(5)",
                    "(6)",
                    "(7)",
                    "(8)",
                    "(9)",
                    "(10)",
                    "ĐTBHĐ (11)",
                    "(12)",
                ];

                // Merge cells for the first row
                worksheet["!merges"] = [
                    { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 2 }, e: { r: 2, c: 2 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 3 }, e: { r: 2, c: 3 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 4 }, e: { r: 2, c: 4 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 5 }, e: { r: 2, c: 5 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 6 }, e: { r: 2, c: 6 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 7 }, e: { r: 2, c: 7 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 0, c: 8 }, e: { r: 0, c: 19 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                    { s: { r: 1, c: 11 }, e: { r: 1, c: 18 } }, // Merge KẾT QUẢ ĐÁNH GIÁ HỌC PHẦN TỐT NGHIỆP cells
                ];

                // Add the first and second rows to the worksheet
                const headerArray = [headerRow1, headerRow2, headerRow3].map(
                    (row) => row.map((cell) => ({ t: "s", v: cell }))
                );
                const range = { s: { r: 0, c: 0 }, e: { r: 2, c: 17 } };

                utils.sheet_add_aoa(worksheet, headerArray, range);

                const data = [
                    "id",
                    "code",
                    "fullName",
                    "class",
                    "topic",
                    "thesisAdvisor",
                    "fullNameP31",
                    "fullNameP32",
                    "(1)",
                    "(2)",
                    "(3)",
                    "(4)",
                    "(5)",
                    "(6)",
                    "(7)",
                    "(8)",
                    "(9)",
                    "(10)",
                    "(11)",
                    "(12)",
                ];
                // Thêm dữ liệu từ object `res` vào đây

                const convertedItem = [];
                res.marksExport?.map((item) => {
                    const obj = {};
                    data?.forEach((value) => {
                        obj[value] = item[value];
                    });
                    convertedItem?.push(obj);
                    // console.log(convertedItem);
                });
                console.log(convertedItem);

                // Thêm dữ liệu vào bảng tính
                utils.sheet_add_json(worksheet, convertedItem, {
                    skipHeader: true,
                    origin: "A4",
                });

                // Lưu hoặc xuất bảng tính từ workbook
                console.log(worksheet);

                // Save the workbook to a file
                writeFileXLSX(
                    workbook,
                    `Export Result Thesis ${new Date().toLocaleDateString(
                        "vi-VN"
                    )} ${new Date().toLocaleTimeString("vi-VN")}.xlsx`
                );
                // const tableData = [
                //     {
                //         header: "TT",
                //         column: "id",
                //     },
                //     {
                //         header: "Mã sv",
                //         column: "studentId",
                //         columnData: "studentData.code",
                //     },
                //     {
                //         header: "Họ tên sv",
                //         column: "studentId",
                //         columnData: "studentData.fullName",
                //     },

                //     {
                //         header: "Tên đề tài",
                //         column: "topicId",
                //         columnData: "topicData.name",
                //     },
                //     {
                //         header: "Giảng viên hướng dẫn",
                //         column: "thesisAdvisorId",
                //         columnData: "thesisAdvisorData.fullName",
                //     },
                //     {
                //         header: "Giảng viên phản biện 1",
                //         column: "councilId",
                //         columnData: "councilData.name",
                //     },
                //     {
                //         header: "Giảng viên phản biện 2",
                //         column: "councilStatusId",
                //         columnData: "councilStatusData.valueVi",
                //     },
                //     {
                //         header: "Điểm ĐATN",
                //         width: "w-[300px]",
                //         maxWidth: "max-w-[300px]",
                //         column: "totalScore",
                //     },
                //     {
                //         header: "Kết quả",
                //         width: "w-[300px]",
                //         maxWidth: "max-w-[300px]",
                //         column: "resultId",
                //         columnData: "resultData.valueVi",
                //         isStatus: true,
                //         // actions: actionsDetail(handleDetail),
                //     },
                // ];
                // if (res?.errCode == 0) {
                //     console.log(res);
                //     toast.update(id, {
                //         render: res?.errMessage,
                //         type: "success",
                //         isLoading: false,
                //         closeButton: true,
                //         autoClose: 1500,
                //         pauseOnFocusLoss: true,
                //     });
                //     // reset();
                //     const convertedItem = [];
                //     res?.theses?.map((item) => {
                //         const obj = {};
                //         tableData?.forEach((headerData) => {
                //             if (!headerData?.actions) {
                //                 const { header, column,columnData } = headerData;
                //                 // console.log("header, item[column]", header, item[column]);
                //                 if (typeof item[column] === "object") {
                //                     // console.log(typeof item[column] === "object",item[column])
                //                     item[column]?.id
                //                         ? (obj[header] = item[column]?.id)
                //                         : (obj[header] = item[column]?.code);
                //                 } else {
                //                     // console.log(typeof item[column] === "object",item[column])
                //                     obj[header] = item[column];
                //                 }
                //             }
                //         });
                //         convertedItem?.push(obj);
                //     });
                //     console.log(convertedItem);

                //     const ws = utils?.json_to_sheet(convertedItem);
                //     // console.log("wordsheet", ws);
                //     const wb = utils?.book_new();
                //     utils?.book_append_sheet(wb, ws, "Data");
                //     writeFileXLSX(
                //         wb,
                //         `Export Result Thesis ${new Date().toLocaleDateString(
                //             "vi-VN"
                //         )} ${new Date().toLocaleTimeString("vi-VN")}.xlsx`
                //     );
                // } else if (res?.errCode > 0 || res?.errCode < 0) {
                //     // console.log(res);
                //     toast.update(id, {
                //         render: res?.errMessage,
                //         type: "error",
                //         isLoading: false,
                //         closeButton: true,
                //         autoClose: 1500,
                //         pauseOnFocusLoss: true,
                //     });
                // } else if (res?.errCode < 0) {
                //     toast.update(id, {
                //         render: "Dữ liệu lỗi, vui lòng kiểm tra lại dữ liệu",
                //         type: "error",
                //         isLoading: false,
                //         closeButton: true,
                //         autoClose: 1500,
                //         pauseOnFocusLoss: true,
                //     });
                // }
            })
            .catch((err) => {
                // console.log(err);
                // toast.update(id, {
                //     render: "Đã xảy ra lỗi, vui lòng thử lại sau",
                //     type: "error",
                //     isLoading: false,
                //     closeButton: true,
                //     autoClose: 1500,
                //     pauseOnFocusLoss: true,
                // });
            });
    };
    const handleEdit = (data) => {
        navigate(`../${pathRoutes?.R1?.updateThesis}/${data.id}`, {
            replace: true,
        });
    };
    const handleDetail = (data) => {
        navigate(`../${pathRoutes?.R1?.thesisDetail}/${data.id}`, {
            replace: true,
        });
    };

    const onDelete = (data) => {
        // console.log("onDelete", data);
        setShowModal(true);
        setResult(data);
    };

    const handleDelete = async () => {
        const id = toast.loading("Vui lòng đợi...");
        await apiLecturer
            .apiDeleteThesis({
                user: currentUser,
                data: result,
                axiosJWT: axiosJWT,
            })
            .then((res) => {
                if (res?.errCode == 0) {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "success",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                    // reset();
                    apiLecturer.getAllDeanTheses({
                        user: currentUser,
                        inputSearch: defineTable.inputSearch,
                        departmentId: information?.departmentId,
                        filterSearch: defineTable.filterSearch,
                        dispatch: dispatch,
                        axiosJWT: axiosJWT,
                    });
                } else if (res?.errCode > 0 || res?.errCode < 0) {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                } else if (res?.errCode < 0) {
                    toast.update(id, {
                        render: "Dữ liệu lỗi, vui lòng kiểm tra lại dữ liệu",
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                }
            })
            .catch((err) => {
                // console.log(err);
                toast.update(id, {
                    render: "Đã xảy ra lỗi, vui lòng thử lại sau",
                    type: "error",
                    isLoading: false,
                    closeButton: true,
                    autoClose: 1500,
                    pauseOnFocusLoss: true,
                });
            });
    };
    const saveDataImport = async (data) => {
        const id = toast.loading("Vui lòng đợi...");
        const convertImport = [];
        // data?.map((obj) => {
        //     const convertedObj = {};
        //     for (const key in obj) {
        //       // console.log("key,obj", key, obj);
        //         if (key.includes("Data")) {
        //             const newKey = key.replace("Data", "Id");
        //             convertedObj[newKey] = obj[key];
        //         } else {
        //             convertedObj[key] = obj[key];
        //         }
        //     }
        //     convertImport.push(convertedObj);
        // });
        // console.log("convertImport", convertImport);
        // console.log("convertImport", data);
        await apiLecturer
            .importTheses({
                user: currentUser,
                data: data,
                axiosJWT: axiosJWT,
            })
            .then((res) => {
                if (res?.errCode == 0) {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "success",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                    // reset();
                    apiLecturer.getAllDeanTheses({
                        user: currentUser,
                        inputSearch: defineTable.inputSearch,
                        departmentId: information?.departmentId,
                        filterSearch: defineTable.filterSearch,
                        dispatch: dispatch,
                        axiosJWT: axiosJWT,
                    });
                } else if (res?.errCode > 0 || res?.errCode < 0) {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                } else if (res?.errCode < 0) {
                    toast.update(id, {
                        render: "Dữ liệu lỗi, vui lòng kiểm tra lại dữ liệu",
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                }
            })
            .catch((err) => {
                // console.log(err);
                toast.update(id, {
                    render: "Đã xảy ra lỗi, vui lòng thử lại sau",
                    type: "error",
                    isLoading: false,
                    closeButton: true,
                    autoClose: 1500,
                    pauseOnFocusLoss: true,
                });
            });
    };

    // email: { type: DataTypes.STRING, unique: true },
    //   password: DataTypes.STRING,
    //   code: { type: DataTypes.STRING, unique: true },
    //   fullName: DataTypes.STRING,
    //   numberPhone: { type: DataTypes.STRING, unique: true },
    //   birthday: DataTypes.STRING,
    //   address: DataTypes.STRING,
    //   genderId: DataTypes.STRING,
    //   roleId: DataTypes.STRING,
    //   statusId: DataTypes.STRING,
    //   departmentId: DataTypes.INTEGER,
    //   image: DataTypes.BLOB,
    //   permissions: DataTypes.STRING,
    //   refreshToken: DataTypes.STRING,

    const tableData = [
        {
            header: "Hành động",
            isRowPer: "thesisAdvisorId",
            isPerR: true,
            actions:
                currentUser?.roleId == "R1"
                    ? [
                          actionsDetail(handleDetail),
                          actionsEdit(handleEdit),
                          //   actionsRemove(onDelete),
                      ]
                    : [
                          actionsDetail(handleDetail),
                          actionsEdit(handleEdit),
                          //   (currentUser?.permissions
                          //       ?.split(",")
                          //       ?.includes("PERF") ||
                          //       currentUser?.permissions
                          //           ?.split(",")
                          //           ?.includes("PERD")) &&
                          //       actionsRemove(onDelete),
                      ],
        },
        {
            header: "#",
            hide: true,
            // width: "w-[10px]",
            // maxWidth: "max-w-[10px]",
            column: "id",
        },
        {
            header: "Tên sinh viên",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "studentId",
            columnData: "studentData.fullName",
        },
        {
            header: "Giảng viên hướng dẫn",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "thesisAdvisorId",
            columnData: "thesisAdvisorData.fullName",
        },
        {
            header: "XN hướng dẫn",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "thesisAdvisorStatusId",
            columnData: "thesisAdvisorStatusData.valueVi",
            isStatus: true,
            // actions: actionsDetail(handleDetail),
        },
        {
            header: "Tên đề tài",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "topicId",
            columnData: "topicData.name",
        },
        {
            header: "XN đề tài",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "topicData.statusId",
            isStatus: true,
            columnData: "topicData.statusData.valueVi",
        },
        {
            header: "Khóa luận",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "thesisSessionId",
            columnData: "thesisSessionData.name",
        },
        {
            header: "Hội đồng",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "councilId",
            columnData: "councilData.name",
        },
        {
            header: "Trạng thái điểm",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "councilStatusId",
            columnData: "councilStatusData.valueVi",
            isStatus: true,
            // actions: actionsDetail(handleDetail),
        },
        {
            header: "Tổng điểm hội đồng",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "totalScore",
        },
        {
            header: "Kết quả",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "resultId",
            columnData: "resultData.valueVi",
            isStatus: true,
            // actions: actionsDetail(handleDetail),
        },
        {
            header: "Ngày thực hiện",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "startDate",
            hide: true,
        },
        {
            header: "Hạn thực hiện",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "complateDate",
            hide: true,
        },
        {
            header: "Ngày chấm và bảo vệ",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "thesisStartDate",
            hide: true,
        },
        {
            header: "Hạn chấm và bảo vệ",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "thesisEndDate",
            hide: true,
        },

        // startDate,
        // complateDate,
        // thesisStartDate,
        // thesisEndDate,
        // reportFile,
    ];
    // Effect
    useEffect(() => {
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: 1,
            inputSearch: "",
            isSearched: false,
        }));
        apiLecturer.getAllDeanTheses({
            user: currentUser,
            inputSearch: defineTable.inputSearch,
            departmentId: information?.departmentId,
            filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
    }, []); // Effect

    useEffect(() => {
        // console.log("inputSearch", defineTable.inputSearch);
        apiLecturer.getAllDeanTheses({
            user: currentUser,
            inputSearch: defineTable.inputSearch,
            departmentId: information?.departmentId,
            filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        setDefineTable((prevState) => ({
            ...prevState,
            isSearched: false,
            currentPage: 1,
        }));
    }, [defineTable.isSearched == true, defineTable.filterSearch]);

    useEffect(() => {
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: 1,
        }));
        // apiLecturer.getAllDeanTheses(
        //     defineTable.inputSearch,
        //     (defineTable.currentPage - 1) * defineTable.limit,
        //     defineTable.limit,
        //     dispatch
        // );
    }, [defineTable.limit]);

    // useEffect(() => {
    //   // console.log("currentpage effect");
    //     apiLecturer.getAllDeanTheses(
    //         defineTable.inputSearch,
    //         (defineTable.currentPage - 1) * defineTable.limit,
    //         defineTable.limit,
    //         dispatch
    //     );
    // }, [defineTable.currentPage]);

    // const [isRtl, setIsRtl] = useState(false);
    // const colourOptions = [
    //     {
    //         value: "F",
    //         label: "Nữ",
    //     },
    //     {
    //         value: "M",
    //         label: "Nam",
    //     },
    //     {
    //         value: "O",
    //         label: "Khác",
    //     },
    // ];

    // const gender = useSelector((state) => state.admin.gender);
    // const handleChangeLimit = (e) => {
    //     // console.log(e);
    //     const permissions = [];
    //     e.map((obj) => {
    //       // console.log(obj.value);
    //         permissions.push(obj.value);
    //     });

    //     // console.log(permissions.toString(), permissions.toString().split(","));

    //     const convert = [];
    //     const array = permissions.toString().split(",");
    //     gender.map((obj) => {
    //       // console.log(obj);
    //         if (array.includes(obj.value)) {
    //             convert.push(obj);
    //         }
    //     });
    //   // console.log(convert, convert);
    // };
    return (
        <>
            {/* <div>
                <div>Hello Thesis</div>
                <Link to={"1"}>Detail 1</Link>
                <Select placeholder="Chọn..."
                    styles={customSelectStylesMulti}
                    isRtl={isRtl}
                    defaultValue={[colourOptions[1], colourOptions[2]]}
                    isMulti
                    name="colors"
                    options={colourOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(e) => {
                        handleChangeLimit(e);
                    }}
                />
            </div> */}
            <div>
                <ModalPopup
                    title={"Xác nhận xóa"}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    result={result}
                    setResult={handleDelete}
                />
            </div>
            <div>
                <Table
                    handleAdd={handleAdd}
                    // handleImport={handleImport}
                    // saveDataImport={saveDataImport}
                    handleExport={handleExport}
                    defineTable={defineTable}
                    setDefineTable={setDefineTable}
                    tableData={tableData}
                    datas={theses}
                    totalRecords={totalRecords}
                    functionsModule={true}
                />
            </div>
        </>
    );
};

export default ThesisDean;
