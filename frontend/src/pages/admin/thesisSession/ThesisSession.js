import { Link, useNavigate } from "react-router-dom";
import { apiAdmin } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

const ThesisSession = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const thesisSessions = useSelector((state) => state?.admin?.thesisSessions);
    const totalRecords = useSelector((state) => state?.admin?.totalRecords);
    const currentUser = useSelector((state) => state?.auth?.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);

    const [defineTable, setDefineTable] = useState({
        inputSearch: "",
        filterSearch: "",
        isSearched: false,
        offset: 0,
        limit: 5,
        pages: 0,
        currentPage: 1,
    });
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);

    // Handle
    const handleAdd = () => {
        navigate(`../${pathRoutes?.R1?.addThesisSession}`, { replace: true });
    };
    const handleImport = () => {
      // console.log("handleImport");
    };
    const handleExport = () => {
      // console.log("handleExport");
    };
    const handleEdit = (data) => {
        navigate(`../${pathRoutes?.R1?.updateThesisSession}/${data?.id}`, {
            replace: true,
        });
    };
    const handleDetail = (data) => {
      // console.log(pathRoutes?.R1?.thesisSessionDetail);
        navigate(`../${pathRoutes?.R1?.thesisSessionDetail}/${data?.id}`, {
            replace: true,
        });
    };

    const handleDelete = (data) => {
      // console.log("handleDelete", data);
        setShowModal(true);
        setResult(data);
    };

    const onDelete = async () => {
        const id = toast.loading("Vui lòng đợi...");
        await apiAdmin
            .apiDeleteThesisSession({
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
                    apiAdmin.getAllThesisSessions({
                        user: currentUser,
                        inputSearch: defineTable.inputSearch,
                        filterSearch: defineTable.filterSearch,
                        dispatch: dispatch,
                        axiosJWT: axiosJWT,
                    });
                } else if (res?.errCode > 0 || res?.errCode < 0 ) {
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
        //         if (key?.includes("Data")) {
        //             const newKey = key?.replace("Data", "Id");
        //             convertedObj[newKey] = obj[key];
        //         } else {
        //             convertedObj[key] = obj[key];
        //         }
        //     }
        //     convertImport?.push(convertedObj);
        // });
        // console.log("convertImport", convertImport);
        // console.log("convertImport", data);
        await apiAdmin
            .importThesisSessions({
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
                    apiAdmin.getAllThesisSessions({
                        user: currentUser,
                        inputSearch: defineTable.inputSearch,
                        filterSearch: defineTable.filterSearch,
                        dispatch: dispatch,
                        axiosJWT: axiosJWT,
                    });
                } else if (res?.errCode > 0 || res?.errCode < 0 ) {
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

    const tableData = [
        {
            header: "#",
            hide: true,
            // width: "w-[10px]",
            // maxWidth: "max-w-[10px]",
            column: "id",
        },
        {
            header: "Tên khóa luận",
            width: "w-[250px]",
            maxWidth: "max-w-[250px]",
            column: "name",
        },
        {
            header: "Mô tả khóa luận",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "description",
        },
        {
            header: "Bắt đầu",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "startDate",
        },
        {
            header: "Kết thúc",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "endDate",
        },
        {
            header: "Phương pháp đánh giá",
            // width: "w-[300px]",
            // maxWidth: "max-w-[300px]",
            column: "evaluationMethodId",
            columnData: "evaluationMethodData.name",
            // hide: true,
        },
        {
            header: "Sai số hợp lệ",
            // width: "w-[300px]",
            // maxWidth: "max-w-[300px]",
            column: "validPoint",
            // hide: true,
        },
        {
            header: "Hành động",
            // isRowPer: "thesisSessionId",
            isPerR: true,
            actions:
                currentUser?.roleId == "R1"
                    ? [
                          actionsDetail(handleDetail),
                          actionsEdit(handleEdit),
                          actionsRemove(handleDelete),
                      ]
                    : [
                          actionsDetail(handleDetail),
                          actionsEdit(handleEdit),
                          (currentUser?.permissions
                              ?.split(",")
                              ?.includes("PERF") ||
                              currentUser?.permissions
                                  ?.split(",")
                                  ?.includes("PERD")) &&
                              actionsRemove(handleDelete),
                      ],
        },
    ];
    // Effect
    useEffect(() => {
        setDefineTable((prevState) => ({
            ...prevState,
            currentPage: 1,
            inputSearch: "",
            isSearched: false,
        }));
        apiAdmin.getAllThesisSessions({
            user: currentUser,
            inputSearch: defineTable.inputSearch,
            filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
    }, []); // Effect

    useEffect(() => {
        // console.log("inputSearch", defineTable.inputSearch);
        apiAdmin.getAllThesisSessions({
            user: currentUser,
            inputSearch: defineTable.inputSearch,
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
        // apiAdmin.getAllThesisSessions(
        //     defineTable.inputSearch,
        //     (defineTable.currentPage - 1) * defineTable.limit,
        //     defineTable.limit,
        //     dispatch
        // );
    }, [defineTable.limit]);

    // useEffect(() => {
    //   // console.log("currentpage effect");
    //     apiAdmin.getAllThesisSessions(
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

    // const gender = useSelector((state) => state?.admin?.gender);
    // const handleChangeLimit = (e) => {
    //     // console.log(e);
    //     const permissions = [];
    //     e.map((obj) => {
    //       // console.log(obj.value);
    //         permissions?.push(obj.value);
    //     });

    //     // console.log(permissions.toString(), permissions.toString()?.split(","));

    //     const convert = [];
    //     const array = permissions.toString()?.split(",");
    //     gender.map((obj) => {
    //       // console.log(obj);
    //         if (array?.includes(obj.value)) {
    //             convert?.push(obj);
    //         }
    //     });
    //   // console.log(convert, convert);
    // };
    return (
        <>
            {/* <div>
                <div>Hello ThesisSession</div>
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
                    setResult={onDelete}
                />
            </div>
            <div>
                <Table
                    handleAdd={handleAdd}
                    handleImport={handleImport}
                    saveDataImport={saveDataImport}
                    handleExport={handleExport}
                    defineTable={defineTable}
                    setDefineTable={setDefineTable}
                    tableData={tableData}
                    datas={thesisSessions}
                    totalRecords={totalRecords}
                    functionsModule={true}
                />
            </div>
        </>
    );
};

export default ThesisSession;
