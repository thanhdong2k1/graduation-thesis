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

const Lecturer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lecturers = useSelector((state) => state?.admin?.lecturers);
    const totalRecords = useSelector((state) => state?.admin?.totalRecords);
    const currentUser = useSelector((state) => state?.auth?.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);

    console.log("lecturers", lecturers);
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
        navigate(`../${pathRoutes?.R1?.addLecturer}`, { replace: true });
    };
    const handleImport = () => {
        console.log("handleImport");
    };
    const handleExport = () => {
        console.log("handleExport");
    };
    const handleEdit = (data) => {
        navigate(`../${pathRoutes?.R1?.updateLecturer}/${data?.id}`, {
            replace: true,
        });
    };
    const handleDetail = (data) => {
        navigate(`../${pathRoutes?.R1?.lecturerDetail}/${data?.id}`, {
            replace: true,
        });
    };

    const handleDelete = (data) => {
        console.log("handleDelete", data);
        setShowModal(true);
        setResult(data);
    };

    const onDelete = async () => {
        const id = toast.loading("Vui lòng đợi...");
        await apiAdmin
            .apiDeleteLecturer({
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
                    apiAdmin.getAllLecturers({
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
                console.log(err);
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
        //         console.log("key,obj", key, obj);
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
            .importLecturers({
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
                    apiAdmin.getAllLecturers({
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
                console.log(err);
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
            header: "#",
            hide: true,
            // width: "w-[10px]",
            // maxWidth: "max-w-[10px]",
            column: "id",
        },
        {
            header: "Mã giảng viên",
            width: "w-[250px]",
            maxWidth: "max-w-[250px]",
            column: "code",
        },
        {
            header: "Tên giảng viên",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "fullName",
        },
        {
            header: "Email",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "email",
        },
        {
            header: "Điện thoại",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "numberPhone",
        },
        {
            header: "Ngày sinh",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "birthday",
            hide: true,
        },
        {
            header: "Địa chỉ",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "address",
            hide: true,
        },
        {
            header: "Phân quyền",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            column: "permissions",
            hide: true,
        },
        {
            header: "Chức vụ",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            columnData: "roleData.valueVi",
            column: "roleId",
            // hide: true,
        },
        {
            header: "Giới tính",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            columnData: "genderData.valueVi",
            column: "genderId",
            // hide: true,
        },
        {
            header: "Khoa",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            columnData: "departmentData.name",
            column: "departmentId",
            // hide: true,
        },
        {
            header: "Trạng thái",
            width: "w-[300px]",
            maxWidth: "max-w-[300px]",
            columnData: "statusData.valueVi",
            column: "statusId",
            // hide: true,
            isStatus: true,
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
        apiAdmin.getAllLecturers({
            user: currentUser,
            inputSearch: defineTable.inputSearch,
            filterSearch: defineTable.filterSearch,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
    }, []); // Effect

    useEffect(() => {
        // console.log("inputSearch", defineTable.inputSearch);
        apiAdmin.getAllLecturers({
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
        // apiAdmin.getAllLecturers(
        //     defineTable.inputSearch,
        //     (defineTable.currentPage - 1) * defineTable.limit,
        //     defineTable.limit,
        //     dispatch
        // );
    }, [defineTable.limit]);

    // useEffect(() => {
    //     console.log("currentpage effect");
    //     apiAdmin.getAllLecturers(
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
    //         console.log(obj.value);
    //         permissions?.push(obj.value);
    //     });

    //     // console.log(permissions.toString(), permissions.toString()?.split(","));

    //     const convert = [];
    //     const array = permissions.toString()?.split(",");
    //     gender.map((obj) => {
    //         console.log(obj);
    //         if (array?.includes(obj.value)) {
    //             convert?.push(obj);
    //         }
    //     });
    //     console.log(convert, convert);
    // };
    return (
        <>
            {/* <div>
                <div>Hello Lecturer</div>
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
                    datas={lecturers}
                    totalRecords={totalRecords}
                    functionsModule={true}
                />
            </div>
        </>
    );
};

export default Lecturer;
