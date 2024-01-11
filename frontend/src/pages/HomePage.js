import { useEffect, useState } from "react";
import Table from "../components/table/Table";
import {
    actionsDetail,
    actionsEdit,
    actionsRemove,
} from "../utils/actionsTable";
import { apiUser, getAllCouncils } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
    const [defineTable, setDefineTable] = useState({
        inputSearch: "",
        isSearched: false,
        offset: 0,
        limit: 5,
        pages: 0,
        currentPage: 1,
    });
    const councils = useSelector((state) => state?.user?.councils);
    const totalRecords = useSelector((state) => state?.user?.totalRecords);
    const dispatch = useDispatch();
    const handleAdd = () => {
        // console.log("handleAdd");
    };
    const handleImport = () => {
        // console.log("handleImport");
    };
    const handleExport = () => {
        // console.log("handleExport");
    };
    const handleEdit = (data) => {
        // console.log("handleEdit", data);
    };
    const handleDetail = (data) => {
        // console.log("handleDetail", data);
    };
    const handleDelete = (data) => {
        // console.log("handleDelete", data);
    };
    const tableData = [
        {
            header: "#",
            hide: true,
            // width: "w-[10px]",
            // maxWidth: "max-w-[10px]",
            column: "id",
        },
        {
            header: "Tên hội đồng",
            width: "w-[250px]",
            maxWidth: "max-w-[250px]",
            column: "name",
            tooltip: true,
        },
        {
            header: "Mô tả hội đồng",
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
            tooltip: true,
            actions: [
                // actionsEdit(handleEdit),
                actionsDetail(handleDetail),
                // actionsRemove(handleDelete),
            ],
        },
    ];
    useEffect(() => {
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: 1,
            inputSearch: "",
            isSearched: false,
        }));
        apiUser.getAllCouncils({
            inputSearch: defineTable.inputSearch,
            // filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
        });
    }, []);
    useEffect(() => {
        // console.log("inputSearch", defineTable.inputSearch);
        apiUser.getAllCouncils({
            inputSearch: defineTable.inputSearch,
            // filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
        });
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
        apiUser.getAllCouncils({
            inputSearch: defineTable.inputSearch,
            // filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
        });
    }, [defineTable.limit]);
    useEffect(() => {
        // console.log("currentpage effect");
        apiUser.getAllCouncils({
            inputSearch: defineTable.inputSearch,
            // filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
        });
    }, [defineTable.currentPage]);
    return (
        <>
            {/* <div className="notifyDiv relative flex px-8 py-8 bg-whiteColor rounded-lg shadow-lg w-[60%] media-max-lg:w-[90%]">
                <div className="titleDiv absolute -translate-x-[50%] left-[50%] bg-gradient-to-r   from-HoverColor via-PrimaryColor to-HoverColor py-2 rounded-lg -top-4 w-[70%] media-max-lg:w-[90%] text-center shadow-lg text-whiteColor font-semibold text-h2FontSize">
                    Thông báo
                </div>
                <div className="listitemsDiv relative top-4 flex flex-col gap-2 w-full font-medium text-justify">
                    <Table
                        handleAdd={handleAdd}
                        handleImport={handleImport}
                        handleExport={handleExport}
                        defineTable={defineTable}
                        setDefineTable={setDefineTable}
                        tableData={tableData}
                        datas={councils}
                        totalRecords={totalRecords}
                        // functionsModule={true}
                    />
                </div>
            </div> */}
            <div className="notifyDiv relative flex px-8 py-8 bg-whiteColor rounded-lg shadow-lg w-[60%] media-max-lg:w-[90%]">
                <div className="titleDiv absolute bg-gradient-to-r left-[50%] -translate-x-[50%] from-HoverColor via-PrimaryColor to-HoverColor py-2 rounded-lg -top-4 w-[70%] media-max-lg:w-[90%] text-center shadow-lg text-whiteColor font-semibold text-h2FontSize">
                    Thông báo
                </div>
                <div className="listitemsDiv relative top-4 flex flex-col gap-2 w-full font-medium text-justify">
                    {councils &&
                        councils?.map((council) => (
                            <div className="itemDiv flex items-start media-min-lg:items-center media-max-lg:flex-col media-min-lg:gap-4 rounded-lg">
                                <div className="timeItem flex items-center px-4 py-2 bg-HoverColor rounded-lg text-whiteColor media-min-lg:flex-col media-max-lg:gap-2">
                                    <div>
                                        {new Date(
                                            council?.updatedAt
                                        ).toLocaleDateString("vi-VN")}
                                    </div>
                                    <div>
                                        {new Date(
                                            council?.updatedAt
                                        ).toLocaleTimeString("vi-VN")}
                                    </div>
                                </div>
                                <div className="titleItem px-4 py-2">
                                    <span>
                                        {`Thông báo hội đồng bảo vệ ${council?.name} (${council?.thesisSessionData?.name}) đã được kích hoạt.`}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;
