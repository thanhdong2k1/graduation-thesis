import { useEffect, useState } from "react";
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
} from "react-icons/fa";
import Select from "react-select";
import DetailTable from "./DetailTable";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { getAllTopics } from "../../redux/apiRequest";
import { customStyles } from "../../utils/customStyleReactSelect";

const Table = ({
    defineTable,
    setDefineTable,
    tableData,
    datas,
    totalRecords,
}) => {
    // CT Tính page
    // console.log(
    //     "page",
    //     totalRecords,
    //     datas,
    //     Math.round(totalRecords / 5) < totalRecords / 5
    //         ? Math.round(totalRecords / 5) + 1
    //         : Math.round(totalRecords / 5)
    // );
    // const [inputSearch,setInputSearch]=useState("")

    // let pagination = [];

    // let defineTable = {
    //     offset: 0,
    //     limit: 5,
    //     pages:
    //         Math.round(totalRecords / 5) < totalRecords / 5
    //             ? Math.round(totalRecords / 5) + 1
    //             : Math.round(totalRecords / 5),
    //     currentPage: 1,
    // };

    // for (let page = 0; page < defineTable.pages; page++) {
    //     console.log("hiện tại", page, defineTable.currentPage = page);
    //     pagination.push(
    //         page + 1 == defineTable.currentPage ? (
    //             <li
    //                 onClick={() => {
    //                     defineTable.currentPage = page + 1;
    //                 }}
    //             >
    //                 <button
    //                     aria-current="page"
    //                     class="flex items-center justify-center w-6 h-7 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
    //                 >
    //                     {page + 1}
    //                 </button>
    //             </div>
    //         ) : (
    //             <li
    //                 onClick={() => {
    //                     defineTable.currentPage = page + 1;
    //                 }}
    //             >
    //                 <button

    //                     class="flex items-center justify-center w-6 h-7 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    //                 >
    //                     {page + 1}
    //                 </button>
    //             </div>
    //         )
    //     );
    // }
    // console.log(defineTable, data.length, pagination);
    // useEffect(() => {
    //     console.log("defineTable", defineTable);
    // }, [defineTable.currentPage]);
    const [isRtl, setIsRtl] = useState(false);

    const limitRecord = [
        { label: "5 rows", value: 5 },
        { label: "10 rows", value: 10 },
        { label: "20 rows", value: 20 },
    ];
    const handleChangePage = (page) => {
        // Update the currentPage value
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: page,
        }));
    };
    const handleSearch = () => {
        setDefineTable((prevState) => ({
            ...prevState,
            isSearched: true,
        }));
    };
    const handleChangeInput = (e) => {
        setDefineTable((prevState) => ({
            ...prevState,
            inputSearch: e.target.value,
        }));
    };
    const pagination = [];
    if (defineTable.pages > 3 && defineTable.currentPage == 1) {
        console.log("page > 3");
        for (
            let page = defineTable.currentPage - 2;
            page < defineTable.currentPage + 2;
            page++
        ) {
            console.log("page", page);
            if (page >= 0) {
                pagination.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-7 border border-gray-300 ${
                                page + 1 === defineTable.currentPage
                                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    } else if (
        defineTable.pages > 3 &&
        defineTable.pages == defineTable.currentPage
    ) {
        for (
            let page = defineTable.currentPage - 2;
            page < defineTable.currentPage;
            page++
        ) {
            console.log("page", page);
            if (page >= 0) {
                pagination.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-7 border border-gray-300 ${
                                page + 1 === defineTable.currentPage
                                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    } else if (defineTable.pages > 3) {
        for (
            let page = defineTable.currentPage - 2;
            page < defineTable.currentPage + 1;
            page++
        ) {
            console.log("page", page);
            if (page >= 0) {
                pagination.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-7 border border-gray-300 ${
                                page + 1 === defineTable.currentPage
                                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    } else if (defineTable.pages <= 3) {
        for (let page = 0; page < defineTable.pages; page++) {
            console.log("page", page);
            if (page >= 0) {
                pagination.push(
                    <div key={page + 1}>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            className={`flex items-center justify-center w-6 h-7 border border-gray-300 ${
                                page + 1 === defineTable.currentPage
                                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                        >
                            {page + 1}
                        </button>
                    </div>
                );
            }
        }
    }
    useEffect(() => {
        console.log("defineTable", defineTable);
        setDefineTable((prevState) => ({
            ...prevState,
            pages:
                Math.round(totalRecords / defineTable.limit) <
                totalRecords / defineTable.limit
                    ? Math.round(totalRecords / defineTable.limit) + 1
                    : Math.round(totalRecords / defineTable.limit),
        }));
    }, [
        datas,
        defineTable.currentPage,
        defineTable.isSearched,
        defineTable.limit,
    ]);
    return (
        <div className="flex flex-col gap-2">
            <div className="searchTable flex justify-end h-7">
                <div className="flex w-[30%] media-max-md:w-full border rounded-lg items-center px-2 py-1">
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter search keywords here"
                        value={defineTable.inputSearch}
                        onChange={handleChangeInput}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        className="bg-transparent outline-none border-none w-full"
                    />
                    <BiSearchAlt className="icon hover:text-PrimaryColor" onClick={handleSearch} />
                </div>
            </div>
            <div className="tableDetail border rounded-lg overflow-x-auto relative">
                <div className="inline-block min-w-full relative">
                    <DetailTable tableData={tableData} datas={datas} />
                </div>
            </div>
            <div className="paginationTable">
                <div class="flex justify-end text-sm gap-2">
                    <div className="divLimitRows">
                        <Select
                            styles={customStyles}
                            className="basic-single media-max-md:text-smallFontSize h-7"
                            classNamePrefix="select"
                            defaultValue={limitRecord[0]}
                            isRtl={isRtl}
                            name="color"
                            options={limitRecord}
                            onChange={(e) => {
                                console.log(e);
                                if (e) {
                                    setDefineTable((prevState) => ({
                                        ...prevState,
                                        limit: e.value,
                                    }));
                                }
                            }}
                        />
                    </div>
                    <div className="divPagination flex">
                        <div>
                            <button
                                onClick={() => handleChangePage(1)}
                                class="flex items-center justify-center w-6 h-7 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <FaAngleDoubleLeft />
                                {/* <FaAngleLeft /> */}
                            </button>
                        </div>
                        {defineTable.currentPage > 2 &&
                            defineTable.pages > 3 && (
                                <div>
                                    <button
                                        className={`flex items-center justify-center w-6 h-7 border border-gray-300 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                                    >
                                        <HiOutlineDotsHorizontal />
                                    </button>
                                </div>
                            )}
                        {pagination && pagination}
                        {defineTable.currentPage < defineTable.pages - 1 &&
                            defineTable.pages > 3 && (
                                <div>
                                    <button
                                        className={`flex items-center justify-center w-6 h-7 border border-gray-300 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                                    >
                                        <HiOutlineDotsHorizontal />
                                    </button>
                                </div>
                            )}
                        <div>
                            <button
                                onClick={() =>
                                    handleChangePage(defineTable.pages)
                                }
                                class="flex items-center justify-center w-6 h-7 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {/* <FaAngleRight /> */}
                                <FaAngleDoubleRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
