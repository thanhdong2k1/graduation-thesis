import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { FaPenAlt } from "react-icons/fa";
import { Buffer } from "buffer";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { createAxios } from "../../../utils/createInstance";
import { logginSuccess } from "../../../redux/authSlice";
import { apiAdmin, apiLecturer } from "../../../redux/apiRequest";
import ModalPopup from "../../../components/ModelPopup/ModalPopup";
import {
    customSelectStyles,
    customSelectStylesMulti,
} from "../../../utils/customStyleReactSelect";
import ButtonConfirm from "../../../components/button/ButtonConfirm";
import { useParams } from "react-router-dom";
import { MdLockReset } from "react-icons/md";
import pdf from "../../../assets/540cb75550adf33f281f29132dddd14fded85bfc.pdf";

const AddThesisLecturer = ({ type }) => {
    let { id } = useParams();
    // console.log("type", type, id);

    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const results = useSelector((state) => state?.admin?.result);
    const topics = useSelector((state) => state?.admin?.topics);
    const students = useSelector((state) => state?.admin?.students);
    const thesisAdvisor = useSelector((state) => state?.admin?.lecturers);
    const thesisAdvisorStatus = useSelector((state) => state?.admin?.handle);
    const thesisSessions = useSelector((state) => state?.admin?.thesisSessions);
    const councils = useSelector((state) => state?.admin?.councils);
    const councilStatus = useSelector((state) => state?.admin?.handle);
    let codeCouncil = councils?.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.name}` };
    });
    let codeThesisSession = thesisSessions?.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.name}` };
    });
    let codeThesisAdvisor = thesisAdvisor?.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.fullName}` };
    });
    let codeStudent = students?.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.fullName}` };
    });
    let codeTopic = topics?.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.name}` };
    });

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [reportFile, setReportFile] = useState(null);
    const importFile = async (e) => {
        /* get data as an ArrayBuffer */
        console.log(e.target.files);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    const [isRtl, setIsRtl] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);

    const onResetPassword = () => {
        // console.log(getValues("id"));
        // console.log("handleDelete", getValues("id"));
        setShowModal(true);
        setResult(getValues("id"));
    };

    const handleResetPassword = async (data) => {
        // console.log("hello", data, getValues());
        const id = toast.loading("Vui lòng đợi...");
        await apiAdmin
            .apiResetPasswordThesis({
                user: currentUser,
                data: getValues(),
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

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
    } = useForm();
    const onSubmit = async (data) => {
        const id = toast.loading("Vui lòng đợi...");
        await apiLecturer
            .apiUpdateThesisLecturer({
                user: currentUser,
                data: data,
                axiosJWT: axiosJWT,
            })
            .then((res) => {
                if (res?.errCode > 0 || res?.errCode < 0) {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                } else {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "success",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                    //   setValue("thesisSession", "");
                    //   setValue("status", "");
                    //   reset();
                }
            })
            .catch((error) => {
                // console.log(error);
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
    useEffect(() => {
        const toastId = toast.loading("Vui lòng đợi...");
        apiAdmin.apiGetResult(currentUser, dispatch, axiosJWT);
        apiAdmin.apiGetHandle(currentUser, dispatch, axiosJWT);
        apiAdmin.getAllTopics({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
            filterSearch: "statusId",
            inputSearch: "H1",
        });
        apiAdmin.getAllStudents({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        apiAdmin.getAllLecturers({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        apiAdmin.getAllThesisSessions({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        apiAdmin.getAllCouncils({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        if (id) {
            apiAdmin
                .getThesisById({
                    user: currentUser,
                    id: id,
                    axiosJWT: axiosJWT,
                })
                .then((res) => {
                    if (res?.errCode > 0 || res?.errCode < 0) {
                        toast.update(id, {
                            render: res?.errMessage,
                            type: "error",
                            isLoading: false,
                            closeButton: true,
                            autoClose: 1500,
                            pauseOnFocusLoss: true,
                        });
                    } else {
                        // console.log(res);
                        let convert = [];

                        setValue("id", res?.result?.id);
                        setValue("result", res?.result?.resultData.valueVi);
                        setValue("student", res?.result?.studentData.fullName);
                        setValue("studentId", res?.result?.studentId);
                        setValue("topic", res?.result?.topicData.name);
                        setValue(
                            "thesisAdvisor",
                            res?.result?.thesisAdvisorData.fullName
                        );
                        setValue(
                            "thesisAdvisorId",
                            res?.result?.thesisAdvisorId
                        );
                        setValue(
                            "thesisAdvisorStatus",
                            res?.result?.thesisAdvisorStatusData.valueVi
                        );
                        setValue(
                            "thesisSession",
                            res?.result?.thesisSessionData.name
                        );
                        setValue("council", res?.result?.councilData.name);
                        setValue(
                            "councilStatus",
                            res?.result?.councilStatusData.valueVi
                        );

                        setValue("startDate", res?.result?.startDate);
                        setValue("complateDate", res?.result?.complateDate);
                        setValue(
                            "thesisStartDate",
                            res?.result?.thesisStartDate
                        );
                        setValue("thesisEndDate", res?.result?.thesisEndDate);
                        setValue("totalScore", res?.result?.totalScore);
                        setValue("advisorMark", res?.result?.advisorMark);
                        setValue("reportFile", res?.result?.reportFile);

                        setReportFile(res?.result?.reportFile);

                        console.log(getValues("reportFile"));
                        toast.update(toastId, {
                            render: res?.errMessage,
                            type: "success",
                            isLoading: false,
                            closeButton: true,
                            autoClose: 1500,
                            pauseOnFocusLoss: true,
                        });
                        // reset();
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    toast.update(id, {
                        render: "Đã xảy ra lỗi, vui lòng thử lại sau",
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                });
        }
    }, []);

    return (
        <>
            <div className="changeInformationDiv flex flex-col justify-center items-center gap-2">
                <div className=" font-semibold text-h1FontSize">
                    {type == "add"
                        ? "Thêm"
                        : type == "update"
                        ? "Chấm điểm hướng dẫn"
                        : "Chi tiết"}{" "}
                    đồ án
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="formDiv flex flex-col gap-2  media-min-md:w-[80%]"
                >
                    {/* 
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Họ tên</label>
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("fullName", {
                                    //required: "Full name is required",
                                })}
                            />
                            {errors?.fullName?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.fullName?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Điện thoại</label>
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("numberPhone", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.numberPhone?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.numberPhone?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Địa chỉ</label>
                            <textarea
                                className={`resize-none input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled
                                {...register("address", {
                                    // //required: "Full name is required",
                                })}
                            />
                            {errors?.address?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.address?.message}
                                </p>
                            )}
                        </div>
                    </div> */}
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            {/* <label className="labelInput" for="file_input">
                                Upload file Report
                            </label>
                            <input
                                className="inputFile"
                                id="file_input"
                                type="file"
                                accept=".xls,.xlsx"
                                // onChange={importFile}
                            /> */}
                            <label className="labelInput" for="file_input">
                                Báo cáo:{" "}
                                {reportFile ? (
                                    <span className="text-emerald-500">
                                        Đã nộp
                                    </span>
                                ) : (
                                    <span className="text-red-500">
                                        Chưa nộp
                                    </span>
                                )}
                            </label>
                            {reportFile ? (
                                <div className="flex w-full gap-2">
                                    <a
                                        className="button w-full"
                                        href={`http://localhost:8000/upload/${getValues(
                                            "reportFile"
                                        )}`}
                                        target="_blank"
                                        underline="none"
                                    >
                                        Tải xuống báo cáo
                                    </a>
                                </div>
                            ) : null}
                        </div>
                        <div className="col w-3/5">
                            <label className="labelInput">Điểm hướng dẫn</label>
                            <input
                                // className={`input ${
                                //     type == "detail" ? "disabled" : ""
                                // }`}
                                className={`input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled={type == "detail" ? true : false}
                                type="number"
                                step="0.1"
                                max={10}
                                min={0}
                                // disabled
                                {...register("advisorMark", {
                                    // //required: "Full name is required",
                                })}
                            />
                            {errors?.advisorMark?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.advisorMark?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        {/* <div className="col w-1/5">
                            <label className="labelInput">ID</label>
                            <input
                                className="input disabled"
                                disabled
                                {...register("id", {
                                    // //required: "Full name is required",
                                })}
                            />
                            {errors?.id?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.id?.message}
                                </p>
                            )}
                        </div> */}
                        <div className="col w-full">
                            <label className="labelInput">Kết quả</label>
                            {/* <Controller
                                name="result"
                                control={control}
                                {...register("result", {
                                    // //required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        // options={results}
                                        isClearable={true}
                                        isDisabled={true}
                                    />
                                )}
                            /> */}
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("result", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.result?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.result?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-3/5">
                            <label className="labelInput">Tổng điểm</label>
                            <input
                                // className={`input ${
                                //     type == "detail" ? "disabled" : ""
                                // }`}
                                className={`input disabled`}
                                type="number"
                                step="0.1"
                                // disabled
                                disabled={true}
                                {...register("totalScore", {
                                    // //required: "Full name is required",
                                })}
                            />
                            {errors?.totalScore?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.totalScore?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        {/* <div className="col w-full">
                            <label className="labelInput">Sinh viên</label>
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("student", {
                                    // //required: "Number phone is required",
                                })}
                            />
                        </div> */}
                        <div className="col w-full">
                            <label className="labelInput">Đề tài</label>
                            {/* <Controller
                                name="topic"
                                control={control}
                                {...register("topic", {
                                    // //required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        // options={codeTopic}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("topic", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.topic?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.topic?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Khóa luận</label>
                            {/* <Controller
                                name="thesisSession"
                                control={control}
                                {...register("thesisSession", {
                                    // //required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        // options={codeThesisSession}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("thesisSession", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.thesisSession?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.thesisSession?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">
                                Người hướng dẫn
                            </label>
                            {/* <Controller
                                name="thesisAdvisor"
                                control={control}
                                {...register("thesisAdvisor", {
                                    // //required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        // options={codeThesisAdvisor}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("thesisAdvisor", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.thesisAdvisor?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.thesisAdvisor?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full ">
                            <label className="labelInput">Xác nhận HD</label>
                            {/* <Controller
                                name="thesisAdvisorStatus"
                                control={control}
                                {...register("thesisAdvisorStatus", {
                                    // //required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        // options={thesisAdvisorStatus}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("thesisAdvisorStatus", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.thesisAdvisorStatus?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.thesisAdvisorStatus?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Hội đồng</label>
                            {/* <Controller
                                name="council"
                                control={control}
                                {...register("council", {
                                    // //required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        // options={codeCouncil}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("council", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.council?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.council?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">
                                Trạng thái chấm
                            </label>
                            {/* <Controller
                                name="councilStatus"
                                control={control}
                                {...register("councilStatus", {
                                    // //required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        // options={councilStatus}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input disabled`}
                                disabled
                                {...register("councilStatus", {
                                    //required: "Number phone is required",
                                })}
                            />
                            {errors?.councilStatus?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.councilStatus?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <ButtonConfirm type={type} />
                    {/* <div>
                        <iframe
                            className="w-full rounded-lg"
                            src="https://tlus.edu.vn/wp-content/uploads/2023/09/TB-80-HKP-K2-23-24_Web.pdf"
                        ></iframe>
                    </div> */}
                </form>
            </div>

            <div>
                <ModalPopup
                    title={"Confim Reset Password User"}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    result={result}
                    setResult={handleResetPassword}
                />
            </div>
        </>
    );
};

export default AddThesisLecturer;
