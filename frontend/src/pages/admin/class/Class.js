import { Link } from "react-router-dom";
import { apiAdmin } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    actionsDetail,
    actionsEdit,
    actionsRemove,
} from "../../../utils/actionsTable";
import Table from "../../../components/table/Table";

const Class = () => {
    const [defineTable, setDefineTable] = useState({
        inputSearch: "",
        filterSearch: "",
        isSearched: false,
        offset: 0,
        limit: 5,
        pages: 0,
        currentPage: 1,
    });
    const councils = useSelector((state) => state.user.councils);
    const totalRecords = useSelector((state) => state.user.totalRecords);
    const dispatch = useDispatch();
    const handleAdd = () => {
        console.log("handleAdd");
    };
    const handleImport = () => {
        console.log("handleImport");
    };
    const handleExport = () => {
        console.log("handleExport");
    };
    const handleEdit = (data) => {
        console.log("handleEdit", data);
    };
    const handleDetail = (data) => {
        console.log("handleDetail", data);
    };
    const handleDelete = (data) => {
        console.log("handleDelete", data);
    };
    const tableData = [
        {
            header: "#",
            // width: "w-[10px]",
            // maxWidth: "max-w-[10px]",
            column: "id",
        },
        {
            header: "Tên hội đồng",
            width: "w-[250px]",
            maxWidth: "max-w-[250px]",
            column: "name",
        },
        {
            header: "Mô tả hội đồng",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "description",
        },
        {
            header: "Khóa luận",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "thesisSessionData",
            // hide: true,
        },
        {
            header: "Trạng thái hội đồng",

            column: "statusData",
        },
        {
            header: "Hành động",
            actions: [
                actionsEdit(handleEdit),
                actionsDetail(handleDetail),
                actionsRemove(handleDelete),
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
        apiAdmin.getAllCouncils({
            inputSearch: defineTable.inputSearch,
            filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
        });
    }, []);
    useEffect(() => {
        // console.log("inputSearch", defineTable.inputSearch);
        apiAdmin.getAllCouncils({
            inputSearch: defineTable.inputSearch,
            filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
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
        // apiAdmin.getAllCouncils(
        //     defineTable.inputSearch,
        //     (defineTable.currentPage - 1) * defineTable.limit,
        //     defineTable.limit,
        //     dispatch
        // );
    }, [defineTable.limit]);
    // useEffect(() => {
    //     console.log("currentpage effect");
    //     apiAdmin.getAllCouncils(
    //         defineTable.inputSearch,
    //         (defineTable.currentPage - 1) * defineTable.limit,
    //         defineTable.limit,
    //         dispatch
    //     );
    // }, [defineTable.currentPage]);
    return (
        <>
            <div>
                <div>Hello Class</div>
                <Link to={"1"}>Detail 1</Link>
            </div>
            <div>
                <Table
                    handleAdd={handleAdd}
                    handleImport={handleImport}
                    handleExport={handleExport}
                    defineTable={defineTable}
                    setDefineTable={setDefineTable}
                    tableData={tableData}
                    datas={councils}
                    totalRecords={totalRecords}
                    functionsModule={true}
                />
            </div>
        </>
    );
};

export default Class;
