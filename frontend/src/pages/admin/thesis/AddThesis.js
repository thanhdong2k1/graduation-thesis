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
import { apiAdmin } from "../../../redux/apiRequest";
import ModalPopup from "../../../components/ModelPopup/ModalPopup";
import {
    customSelectStyles,
    customSelectStylesMulti,
} from "../../../utils/customStyleReactSelect";
import ButtonConfirm from "../../../components/button/ButtonConfirm";
import { useParams } from "react-router-dom";
import { MdLockReset } from "react-icons/md";
import pdf from "../../../assets/540cb75550adf33f281f29132dddd14fded85bfc.pdf";

const AddThesis = ({ type }) => {
    let { id } = useParams();
    console.log("type", type, id);

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

    const [isRtl, setIsRtl] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);

    const onResetPassword = () => {
        console.log(getValues("id"));
        console.log("handleDelete", getValues("id"));
        setShowModal(true);
        setResult(getValues("id"));
    };

    const handleResetPassword = async (data) => {
        console.log("hello", data, getValues());
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
        const permissions = [];
        data?.permissions
            ?.filter((value) => !value.isFixed)
            ?.map((obj) => {
                console.log(obj.value);
                permissions?.push(obj.value);
            });
        const datasend = {
            ...data,
            startDate: new Date(
                moment(data?.startDate, "DD/MM/YYYY")
            ).toLocaleDateString("vi-VN"),
            complateDate: new Date(
                moment(data?.complateDate, "DD/MM/YYYY")
            ).toLocaleDateString("vi-VN"),
            thesisStartDate: new Date(
                moment(data?.thesisStartDate, "DD/MM/YYYY")
            ).toLocaleDateString("vi-VN"),
            thesisEndDate: new Date(
                moment(data?.thesisEndDate, "DD/MM/YYYY")
            ).toLocaleDateString("vi-VN"),
            //         console.log(obj.value);
            //         permissions?.push(obj.value);
            //     });,
        };
        console.log(datasend);
        type == "add"
            ? await apiAdmin
                  .apiAddThesis({
                      user: currentUser,
                      data: datasend,
                      axiosJWT: axiosJWT,
                  })
                  .then((res) => {
                      if (res?.errCode > 0 || res?.errCode < 0 ) {
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
                          setValue("dean", "");
                          reset();
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
                  })
            : await apiAdmin
                  .apiUpdateThesis({
                      user: currentUser,
                      data: datasend,
                      axiosJWT: axiosJWT,
                  })
                  .then((res) => {
                      if (res?.errCode > 0 || res?.errCode < 0 ) {
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
                    if (res?.errCode > 0 || res?.errCode < 0 ) {
                        toast.update(id, {
                            render: res?.errMessage,
                            type: "error",
                            isLoading: false,
                            closeButton: true,
                            autoClose: 1500,
                            pauseOnFocusLoss: true,
                        });
                    } else {
                        console.log(res);
                        let convert = [];

                        setValue("id", res?.result?.id);
                        setValue(
                            "result",
                            results?.filter(
                                (value) => value?.value == res?.result?.resultId
                            )
                        );
                        setValue(
                            "student",
                            codeStudent?.filter(
                                (value) =>
                                    value?.value == res?.result?.studentId
                            )
                        );
                        setValue(
                            "topic",
                            codeTopic?.filter(
                                (value) => value?.value == res?.result?.topicId
                            )
                        );
                        setValue(
                            "thesisAdvisor",
                            codeThesisAdvisor?.filter(
                                (value) =>
                                    value?.value == res?.result?.thesisAdvisorId
                            )
                        );
                        setValue(
                            "thesisAdvisorStatus",
                            thesisAdvisorStatus?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.thesisAdvisorStatusId
                            )
                        );
                        setValue(
                            "thesisSession",
                            codeThesisSession?.filter(
                                (value) =>
                                    value?.value == res?.result?.thesisSessionId
                            )
                        );
                        setValue(
                            "council",
                            codeCouncil?.filter(
                                (value) =>
                                    value?.value == res?.result?.councilId
                            )
                        );
                        setValue(
                            "councilStatus",
                            councilStatus?.filter(
                                (value) =>
                                    value?.value == res?.result?.councilStatusId
                            )
                        );

                        setValue("startDate", res?.result?.startDate);
                        setValue("complateDate", res?.result?.complateDate);
                        setValue(
                            "thesisStartDate",
                            res?.result?.thesisStartDate
                        );
                        setValue("thesisEndDate", res?.result?.thesisEndDate);
                        setValue("totalScore", res?.result?.totalScore);

                        toast.update(id, {
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
                    {type=="add"?"Thêm":"Sửa"} đồ án
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
                                className={`input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled={type == "detail" ? true : false}
                                {...register("fullName", {
                                    required: "Full name is required",
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
                                className={`input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled={type == "detail" ? true : false}
                                {...register("numberPhone", {
                                    required: "Number phone is required",
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
                                disabled={type == "detail" ? true : false}
                                {...register("address", {
                                    // required: "Full name is required",
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
                        {/* <div className="col w-1/5">
                            <label className="labelInput">ID</label>
                            <input
                                className="input disabled"
                                disabled
                                {...register("id", {
                                    // required: "Full name is required",
                                })}
                            />
                            {errors?.id?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.id?.message}
                                </p>
                            )}
                        </div> */}
                        <div className="col w-3/5">
                            <label className="labelInput">Tổng điểm</label>
                            <input
                                // className={`input ${
                                //     type == "detail" ? "disabled" : ""
                                // }`}
                                className={`input disabled`}
                                type="number"
                                step="0.1"
                                // disabled={type == "detail" ? true : false}
                                disabled={true}
                                {...register("totalScore", {
                                    // required: "Full name is required",
                                })}
                            />
                            {errors?.totalScore?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.totalScore?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Kết quả</label>
                            <Controller
                                name="result"
                                control={control}
                                {...register("result", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={results}
                                        isClearable={true}
                                        isDisabled={true}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Sinh viên</label>
                            <Controller
                                name="student"
                                control={control}
                                {...register("student", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={codeStudent}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            />
                            {errors?.student?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.student?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Đề tài</label>
                            <Controller
                                name="topic"
                                control={control}
                                {...register("topic", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={codeTopic}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            />
                            {errors?.topic?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.topic?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Người hướng dẫn</label>
                            <Controller
                                name="thesisAdvisor"
                                control={control}
                                {...register("thesisAdvisor", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={codeThesisAdvisor}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            />
                            {errors?.thesisAdvisor?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.thesisAdvisor?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Xác nhận hướng dẫn</label>
                            <Controller
                                name="thesisAdvisorStatus"
                                control={control}
                                {...register("thesisAdvisorStatus", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={thesisAdvisorStatus}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
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
                                Báo cáo
                            </label>
                            <a
                                className="button"
                                href="https://tlus.edu.vn/wp-content/uploads/2023/09/TB-80-HKP-K2-23-24_Web.pdf"
                                target="_blank"
                                underline="none"
                                // download
                            >
                                Tải xuống báo cáo
                            </a>
                            {/* <iframe src="https://tlus.edu.vn/wp-content/uploads/2023/09/TB-80-HKP-K2-23-24_Web.pdf#toolbar=0" width="100%" height="500px"></iframe> */}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Khóa luận</label>
                            <Controller
                                name="thesisSession"
                                control={control}
                                {...register("thesisSession", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={codeThesisSession}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
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
                            <label className="labelInput">Hội đồng</label>
                            <Controller
                                name="council"
                                control={control}
                                {...register("council", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={codeCouncil}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            />
                            {errors?.council?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.council?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Trạng thái chấm</label>
                            <Controller
                                name="councilStatus"
                                control={control}
                                {...register("councilStatus", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={councilStatus}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            />
                            {errors?.councilStatus?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.councilStatus?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full flex flex-col">
                            <label className="labelInput">Bắt đầu</label>
                            <Controller
                                name="startDate"
                                control={control}
                                {...register("startDate", {
                                    // required: "Full name is required",
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        className={`input ${
                                            type == "detail" ? "disabled" : ""
                                        }`}
                                        disabled={
                                            type == "detail" ? true : false
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        selected={
                                            value
                                                ? new Date(
                                                      moment(
                                                          value,
                                                          "DD/MM/YYYY"
                                                      ).toString()
                                                  )
                                                : null
                                        }
                                        // closeOnScroll={true}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors?.startDate?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.startDate?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full flex flex-col">
                            <label className="labelInput">Hoàn thành</label>
                            <Controller
                                name="complateDate"
                                control={control}
                                {...register("complateDate", {
                                    // required: "Full name is required",
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        className={`input ${
                                            type == "detail" ? "disabled" : ""
                                        }`}
                                        disabled={
                                            type == "detail" ? true : false
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        selected={
                                            value
                                                ? new Date(
                                                      moment(
                                                          value,
                                                          "DD/MM/YYYY"
                                                      ).toString()
                                                  )
                                                : null
                                        }
                                        // closeOnScroll={true}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors?.complateDate?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.complateDate?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full flex flex-col">
                            <label className="labelInput">
                                Bắt đầu đồ án
                            </label>
                            <Controller
                                name="thesisStartDate"
                                control={control}
                                {...register("thesisStartDate", {
                                    // required: "Full name is required",
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        className={`input ${
                                            type == "detail" ? "disabled" : ""
                                        }`}
                                        disabled={
                                            type == "detail" ? true : false
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        selected={
                                            value
                                                ? new Date(
                                                      moment(
                                                          value,
                                                          "DD/MM/YYYY"
                                                      ).toString()
                                                  )
                                                : null
                                        }
                                        // closeOnScroll={true}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors?.thesisStartDate?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.thesisStartDate?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full flex flex-col">
                            <label className="labelInput">
                                Kết thúc đồ án
                            </label>
                            <Controller
                                name="thesisEndDate"
                                control={control}
                                {...register("thesisEndDate", {
                                    // required: "Full name is required",
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        className={`input ${
                                            type == "detail" ? "disabled" : ""
                                        }`}
                                        disabled={
                                            type == "detail" ? true : false
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        selected={
                                            value
                                                ? new Date(
                                                      moment(
                                                          value,
                                                          "DD/MM/YYYY"
                                                      ).toString()
                                                  )
                                                : null
                                        }
                                        // closeOnScroll={true}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors?.thesisEndDate?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.thesisEndDate?.message}
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

export default AddThesis;
