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
    // console.log("type", type, id);

    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const topics = useSelector((state) => state?.admin?.topics);
    const students = useSelector((state) => state?.admin?.students);
    const thesisAdvisor = useSelector((state) => state?.admin?.lecturers);
    const thesisAdvisorStatus = useSelector((state) => state?.admin?.handle);
    const thesisSessions = useSelector((state) => state?.admin?.thesisSessions);
    const councils = useSelector((state) => state?.admin?.councils);
    const councilStatus = useSelector((state) => state?.admin?.handle);
    let codeCouncil = councils?.map((v) => {
        return { value: v.id, label: `${v.name}` };
    });
    let codeThesisSession = thesisSessions?.map((v) => {
        return { value: v.id, label: `${v.name}` };
    });
    let codeThesisAdvisor = thesisAdvisor?.map((v) => {
        return { value: v.id, label: `${v.fullName}` };
    });
    let codeStudent = students?.map((v) => {
        return { value: v.id, label: `${v.fullName}` };
    });
    let codeTopic = topics?.map((v) => {
        return { value: v.id, label: `${v.name}` };
    });

    const [isRtl, setIsRtl] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState(null);
    const [reportFile, setReportFile] = useState(null);

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
        const permissions = [];
        data?.permissions
            ?.filter((value) => !value.isFixed)
            ?.map((obj) => {
                // console.log(obj.value);
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
            //       // console.log(obj.value);
            //         permissions?.push(obj.value);
            //     });,
        };
        // console.log(datasend);
        type == "add"
            ? await apiAdmin
                  .apiAddThesis({
                      user: currentUser,
                      data: datasend,
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
                          setValue("student", {});
                          setValue("thesisSession", {});
                          setValue("thesisAdvisor", {});
                          setValue("thesisAdvisorStatus", {});
                          setValue("topic", {});
                          setValue("council", {});
                          setValue("councilStatus", {});
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
        apiAdmin.apiGetResult(currentUser, dispatch, axiosJWT);
        apiAdmin.apiGetHandle(currentUser, dispatch, axiosJWT);
        apiAdmin.getAllTopics({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
            thesisId: id,
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
        apiAdmin.apiGetPosition(currentUser, dispatch, axiosJWT);
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

                        setValue("id", res?.result?.thesis?.id);
                        setValue("reportFile", res?.result?.thesis?.reportFile);

                        setReportFile(res?.result?.thesis?.reportFile);

                        console.log(getValues("reportFile"));
                        setValue(
                            "result",
                            res?.result?.thesis?.resultData.valueVi
                        );
                        setValue(
                            "student",
                            codeStudent?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.thesis?.studentId
                            )
                        );
                        setValue(
                            "topic",
                            codeTopic?.filter(
                                (value) =>
                                    value?.value == res?.result?.thesis?.topicId
                            )
                        );
                        setValue(
                            "thesisAdvisor",
                            codeThesisAdvisor?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.thesis?.thesisAdvisorId
                            )
                        );
                        setValue(
                            "thesisAdvisorStatus",
                            thesisAdvisorStatus?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.thesis?.thesisAdvisorStatusId
                            )
                        );
                        setValue(
                            "thesisSession",
                            codeThesisSession?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.thesis?.thesisSessionId
                            )
                        );
                        setValue(
                            "council",
                            codeCouncil?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.thesis?.councilId
                            )
                        );
                        setValue(
                            "councilStatus",
                            councilStatus?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.thesis?.councilStatusId
                            )
                        );

                        setValue("startDate", res?.result?.thesis?.startDate);
                        setValue("endDate", res?.result?.thesis?.endDate);
                        setValue("totalScore", res?.result?.thesis?.totalScore);

                        let filter = [];
                        res?.result.mark?.map((item) => {
                            filter?.push({
                                id: item?.id,
                                position: item?.councilDetailData?.positionData?.valueVi,
                                lecturer: item?.councilDetailData?.lecturerData?.fullName,
                                totalMark: item?.totalMark,
                                // positionId: item?.filter(
                                //     (value) =>
                                //         value?.value == res?.result?.positionId
                                // )
                            });

                        });
                        console.log(filter);

                        setCouncilDetails(filter);

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

    const [councilDetails, setCouncilDetails] = useState([]);
    return (
        <>
            <div className="changeInformationDiv flex flex-col justify-center items-center gap-2">
                <div className=" font-semibold text-h1FontSize">
                    {type == "add"
                        ? "Thêm"
                        : type == "update"
                        ? "Sửa"
                        : "Chi tiết"}{" "}
                    đồ án
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="formDiv flex flex-col gap-2  media-min-md:w-[80%]"
                >
                    {type != "add" && (
                        <>
                        <div className="row flex justify-center items-center gap-2">
                            <div className="col w-full">
                                <label className="labelInput">Kết quả</label>
                                <input
                                    // className={`input ${
                                    //     type == "detail" ? "disabled" : ""
                                    // }`}
                                    className={`input disabled`}
                                    type="text"
                                    // disabled={type == "detail" ? true : false}
                                    disabled={true}
                                    {...register("result", {
                                        // required: "Không được bỏ trống",
                                    })}
                                />
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
                                    // disabled={type == "detail" ? true : false}
                                    disabled={true}
                                    {...register("totalScore", {
                                        // required: "Không được bỏ trống",
                                    })}
                                />
                                {errors?.totalScore?.type && (
                                    <p className=" text-normal text-red-500">
                                        {errors?.totalScore?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        </>
                    )}
                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Sinh viên</label>
                            <Controller
                                name="student"
                                control={control}
                                {...register("student", {
                                    required: "Không được để trống",
                                })}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Chọn..."
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
                        {type != "add" && (
                            <div className="col w-full">
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
                        )}
                    </div>

                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Đề tài</label>
                            <Controller
                                name="topic"
                                control={control}
                                {...register("topic", {
                                    required: "Không được để trống",
                                })}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Chọn..."
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
                        <div className="col w-full">
                            <label className="labelInput">Khóa luận</label>
                            <Controller
                                name="thesisSession"
                                control={control}
                                {...register("thesisSession", {
                                    required: "Không được để trống",
                                })}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Chọn..."
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
                            <label className="labelInput">
                                Người hướng dẫn
                            </label>
                            <Controller
                                name="thesisAdvisor"
                                control={control}
                                {...register("thesisAdvisor", {
                                    required: "Không được để trống",
                                })}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Chọn..."
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
                            <label className="labelInput">
                                Xác nhận hướng dẫn
                            </label>
                            <Controller
                                name="thesisAdvisorStatus"
                                control={control}
                                {...register("thesisAdvisorStatus", {
                                    // required: "Không được để trống",
                                })}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Chọn..."
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
                            <label className="labelInput">Hội đồng</label>
                            <Controller
                                name="council"
                                control={control}
                                {...register("council", {
                                    // required: "Không được để trống",
                                })}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Chọn..."
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
                            <label className="labelInput">
                                Trạng thái chấm
                            </label>
                            <Controller
                                name="councilStatus"
                                control={control}
                                {...register("councilStatus", {
                                    // required: "Không được để trống",
                                })}
                                render={({ field }) => (
                                    <Select
                                        placeholder="Chọn..."
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
                    {councilDetails &&
                            councilDetails?.map((item, index) => (
                                <div
                                    className="row flex justify-center items-center gap-2"
                                    key={index}
                                >
                                    <div className="col w-1/4 media-max-md:w-1/2">
                                        {index == 0 && (
                                            <label className="labelInput">
                                                Chức vụ
                                            </label>
                                        )}
                                        <input
                                            // className={`input ${
                                            //     type == "detail" ? "disabled" : ""
                                            // }`}
                                            className={`input disabled !bg-transparent`}
                                            type="text"
                                            // disabled={type == "detail" ? true : false}
                                            disabled={true}
                                            value={item?.position}
                                        />
                                        {/* {errors?.nameCriteria?.type && (
                                    <p className=" text-normal text-red-500">
                                        {errors?.nameCriteria?.message}
                                    </p>
                                )} */}
                                    </div>
                                    <div className="col w-full">
                                        {index == 0 && (
                                            <>
                                                <label className="labelInput flex justify-between">
                                                    <span>Giảng viên</span>
                                                    {/* <span>Total: {totalScore}</span> */}
                                                </label>
                                            </>
                                        )}
                                        <input
                                            // className={`input ${
                                            //     type == "detail" ? "disabled" : ""
                                            // }`}
                                            className={`input disabled !bg-transparent`}
                                            type="text"
                                            // disabled={type == "detail" ? true : false}
                                            disabled={true}
                                            value={item?.lecturer}
                                        />
                                    </div>
                                    <div className="col w-3/5">
                                        {index == 0 && (
                                            <label className="labelInput">
                                                Điểm
                                            </label>
                                        )}
                                        <input
                                            // className={`input ${
                                            //     type == "detail" ? "disabled" : ""
                                            // }`}
                                            className={`input disabled !bg-transparent`}
                                            type="number"
                                            step="0.1"
                                            // disabled={type == "detail" ? true : false}
                                            disabled={true}
                                            value={item?.totalMark}
                                        />
                                    </div>
                                    {/* {errors?.weightCriteria?.type && (
                                    <p className=" text-normal text-red-500">
                                        {errors?.weightCriteria?.message}
                                    </p>
                                )} */}
                                </div>
                            ))}
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
