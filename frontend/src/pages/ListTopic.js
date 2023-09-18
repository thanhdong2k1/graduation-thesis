import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments, getAllTopics } from "../redux/apiRequest";
import Table from "../components/table/Table";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../utils/customStyleReactSelect";
import { actionsEdit, actionsRemove } from "../utils/actionsTable";

const ListTopic = () => {
    const topics = useSelector((state) => state.user.topics);
    const totalRecords = useSelector((state) => state.user.totalRecords);
    const departments = useSelector((state) => state.user.departments);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const [departmentSelect, setDepartmentSelect] = useState(0);
    const [abc, setAbc] = useState("");

    const [defineTable, setDefineTable] = useState({
        inputSearch: "",
        isSearched: false,
        offset: 0,
        limit: 5,
        pages: 0,
        currentPage: 1,
    });
    console.log(topics, departments);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     setDefineTable((prevState) => ({
    //         ...prevState,
    //         currentPage: 1,
    //         inputSearch: "",
    //         isSearched: false,
    //     }));
    //     getAllDepartments(dispatch);
    // }, [departmentSelect]);
    // useEffect(() => {
    //     console.log("inputSearch",defineTable.inputSearch)
    //     getAllTopics(
    //         departmentSelect,
    //         defineTable.inputSearch,
    //         (defineTable.currentPage - 1) * defineTable.limit,
    //         5,
    //         dispatch
    //     );
    //     setDefineTable((prevState) => ({
    //         ...prevState,
    //         isSearched: false,
    //     }));
    // }, [
    //     departmentSelect,
    //     defineTable.currentPage,
    //     (defineTable.isSearched == true),
    // ]);

    // Sửa
    useEffect(() => {
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: 1,
            inputSearch: "",
            isSearched: false,
        }));
        getAllDepartments(dispatch);
        getAllTopics(
            departmentSelect,
            "",
            (defineTable.currentPage - 1) * defineTable.limit,
            defineTable.limit,
            dispatch
        );
    }, [departmentSelect]);
    useEffect(() => {
        console.log("inputSearch", defineTable.inputSearch);
        setDefineTable((prevState) => ({
            ...prevState,
            isSearched: false,
            currentPage: 1,
        }));
    }, [defineTable.isSearched == true]);
    useEffect(() => {
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: 1,
        }));
        getAllTopics(
            departmentSelect,
            defineTable.inputSearch,
            (defineTable.currentPage - 1) * defineTable.limit,
            defineTable.limit,
            dispatch
        );
    }, [defineTable.limit]);
    useEffect(() => {
        getAllTopics(
            departmentSelect,
            defineTable.inputSearch,
            (defineTable.currentPage - 1) * defineTable.limit,
            defineTable.limit,
            dispatch
        );
    }, [defineTable.currentPage]);
    const handleEdit = (data) => {
        setAbc("handleEdit" + data.id);
    };
    const handleDelete = (data) => {
        setAbc("handleDelete" + data.id);
    };

    useEffect(() => {
        console.log(abc);
    }, [abc]);
    const tableData = [
        {
            header: "#",
            // width: "w-[10px]",
            // maxWidth: "max-w-[10px]",
            column: "id",
        },
        {
            header: "Tên đề tài",
            width: "w-[250px]",
            maxWidth: "max-w-[250px]",
            column: "name",
        },
        {
            header: "Mô tả đề tài",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "description",
        },
        {
            header: "Trạng thái đề tài",

            column: "statusId",
        },
        {
            header: "Hành động",
            actions: [
                actionsEdit(handleEdit),
                actionsRemove(handleDelete),
            ],
        },
    ];
    console.log(tableData);
    return (
        <>
            <div className="notifyDiv relative flex px-8 py-8 bg-whiteColor rounded-lg shadow-lg w-[60%] media-max-lg:w-[90%]">
                <div className="titleDiv absolute -translate-x-[50%] left-[50%] bg-gradient-to-r   from-HoverColor via-PrimaryColor to-HoverColor py-2 rounded-lg -top-4 w-[70%] media-max-lg:w-[90%] text-center shadow-lg text-whiteColor font-semibold text-h2FontSize">
                    Danh sách đề tài
                </div>
                <div className="listitemsDiv relative top-4 flex flex-col gap-2 w-full font-medium text-justify">
                    {/* <div class="flex rounded-lg justify-end w-auto m-0 p-0">
                        <label htmlFor="example">Khoa</label>
                        <select
                            id="example"
                            onChange={(e) => {
                                setDepartmentSelect(e.target.value);
                            }}
                        >
                            <option
                                value=""
                                placeholder="Vui lòng chọn khoa"
                                hidden
                                selected
                            ></option>
                            {departments.map((department) => (
                                <option value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div class="rounded-lg w-[50%] media-max-md:w-auto">
                        <label htmlFor="example">Khoa</label>
                        <Select
                            styles={customStyles}
                            className="basic-single media-max-md:text-smallFontSize"
                            classNamePrefix="select"
                            // defaultValue={departments[0]}
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            name="color"
                            options={departments}
                            onChange={(e) => {
                                // console.log(e);
                                if (e) {
                                    setDepartmentSelect(e.value);
                                }
                            }}
                        />
                    </div>
                    <Table
                        defineTable={defineTable}
                        setDefineTable={setDefineTable}
                        tableData={tableData}
                        datas={topics}
                        totalRecords={totalRecords}
                    />
                    {/* <ul class="inline-flex -space-x-px text-sm">
                        <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                        <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul> */}
                    {/* {topics?.map((topic) => (
                        <div className="itemDiv flex items-start media-min-lg:items-center media-max-lg:flex-col media-min-lg:gap-4 rounded-lg">
                            <div className="timeItem flex items-center px-4 py-2 bg-HoverColor rounded-lg text-whiteColor media-min-lg:flex-col media-max-lg:gap-2">
                                <div>
                                    {new Date(
                                        new Date(topic.updatedAt).getTime()
                                    ).toLocaleDateString("vi-VN")}
                                </div>
                                <div>
                                    {new Date(
                                        new Date(topic.updatedAt).getTime()
                                    ).toLocaleTimeString("vi-VN")}
                                </div>
                            </div>
                            <div className="titleItem px-4 py-2">
                                <span>{topic.name}</span>
                            </div>
                        </div>
                    ))} */}
                    {/* <div className="itemDiv flex items-start media-min-lg:items-center media-max-lg:flex-col media-min-lg:gap-4 rounded-lg">
                        <div className="timeItem flex items-center px-4 py-2 bg-HoverColor rounded-lg text-whiteColor media-min-lg:flex-col media-max-lg:gap-2">
                            <div>
                                {new Date(1692412715 * 1000).toLocaleDateString(
                                    "vi-VN"
                                )}
                            </div>
                            <div>
                                {new Date(1692412715 * 1000).toLocaleTimeString(
                                    "vi-VN"
                                )}
                            </div>
                        </div>
                        <div className="titleItem px-4 py-2">
                            <span>
                                Thông báo mở hội đồng {"Hội đồng 001"} bảo vệ
                                luận văn {"Niên khóa 2023-2024"}.
                            </span>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default ListTopic;
