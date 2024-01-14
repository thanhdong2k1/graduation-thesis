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

const AddThesisSession = ({ type }, params) => {
    let { id } = useParams();
    // console.log("type", type, id);

    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const evaluationMethods = useSelector(
        (state) => state?.admin?.evaluationMethods
    );
    let codeEvaluationMethod = evaluationMethods?.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.name}` };
    });
    const [isRtl, setIsRtl] = useState(false);

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
        // console.log(
        //     new Date(getValues("startDate")).toLocaleDateString("vi-VN")
        // );

        const startDate =
            data?.startDate &&
            moment(data?.startDate, "DD/MM/YYYY").format("YYYY-MM-DD");

        const endDate =
            data?.endDate &&
            moment(data?.endDate, "DD/MM/YYYY").format("YYYY-MM-DD");

        // console.log("startDate,endDate", startDate, endDate);
        const datasend = {
            ...data,
            startDate: startDate,
            endDate: endDate,
        };
        // console.log(data);
        type == "add"
            ? await apiAdmin
                  .apiAddThesisSession({
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
                          setValue("evaluationMethod", "");
                          setValue("status", "");
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
                  .apiUpdateThesisSession({
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
                          //   setValue("evaluationMethod", "");
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
        apiAdmin.getAllEvaluationMethods({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        if (id) {
            apiAdmin
                .getThesisSessionById({
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
                        setValue("id", res?.result?.id);
                        setValue("name", res?.result?.name);
                        setValue("description", res?.result?.description);

                        const formattedStartDate = res?.result?.startDate
                            ? moment(res.result.startDate).format("DD/MM/YYYY")
                            : "";
                        setValue("startDate", formattedStartDate);
                        
                        const formattedEndDate = res?.result?.endDate
                            ? moment(res.result.endDate).format("DD/MM/YYYY")
                            : "";
                        setValue("endDate", formattedEndDate);

                        setValue("validMark", res?.result?.validMark);
                        setValue(
                            "evaluationMethod",
                            codeEvaluationMethod?.filter(
                                (value) =>
                                    value?.value ==
                                    res?.result?.evaluationMethodId
                            )
                        );
                        // console.log(getValues());
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
    }, [currentUser]);

    return (
        <div className="changeInformationDiv flex flex-col justify-center items-center gap-2">
            <div className=" font-semibold text-h1FontSize">
                {type == "add" ? "Thêm" : type == "update" ? "Sửa" : "Chi tiết"}{" "}
                khóa luận
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="formDiv flex flex-col gap-2  media-min-md:w-[80%]"
            >
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
                    <div className="col w-full">
                        <label className="labelInput">Tên</label>
                        <input
                            className={`input ${
                                type == "detail" ? "disabled" : ""
                            }`}
                            disabled={type == "detail" ? true : false}
                            {...register("name", {
                                required: "Không được để trống",
                            })}
                        />
                        {errors?.name?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.name?.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Mô tả</label>
                        <textarea
                            className={`resize-none input ${
                                type == "detail" ? "disabled" : ""
                            }`}
                            disabled={type == "detail" ? true : false}
                            {...register("description", {
                                // required: "Full name is required",
                            })}
                        ></textarea>
                        {/* <input
                            type=""
                            className="input"
                            disabled={type == "detail" ? true : false}
                            {...register("description", {
                                // required: "Full name is required",
                            })}
                        /> */}
                        {errors?.description?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.description?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">PP đánh giá</label>
                        <Controller
                            name="evaluationMethod"
                            control={control}
                            {...register("evaluationMethod", {
                                required: "Không được để trống",
                            })}
                            render={({ field }) => (
                                <Select
                                    placeholder="Chọn..."
                                    styles={customSelectStyles}
                                    {...field}
                                    options={codeEvaluationMethod}
                                    isClearable={true}
                                    isDisabled={type == "detail" ? true : false}
                                />
                            )}
                        />
                        {errors?.evaluationMethod?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.evaluationMethod?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Điểm chênh lệch</label>
                        <input
                            className={`input ${
                                type == "detail" ? "disabled" : ""
                            }`}
                            type="number"
                            step="0.1"
                            disabled={type == "detail" ? true : false}
                            {...register("validMark", {
                                required: "Không được để trống",
                            })}
                        />
                        {errors?.validMark?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.validMark?.message}
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
                                required: "Không được để trống",
                            })}
                            render={({ field: { onChange, value } }) => (
                                // <DatePicker
                                //     className={`input ${
                                //         type == "detail" ? "disabled" : ""
                                //     }`}
                                //     disabled={type == "detail" ? true : false}
                                //     dateFormat="H:mm dd/MM/yyyy"
                                //     timeInputLabel="Time:"
                                //     showTimeInput
                                //     selected={
                                //         value
                                //             ? new Date(
                                //                   moment(
                                //                       value,
                                //                       "H:mm DD/MM/YYYY"
                                //                   ).toString()
                                //               )
                                //             : null
                                //     }
                                //     // closeOnScroll={true}
                                //     onChange={onChange}
                                // />
                                <DatePicker
                                    className={`input ${
                                        type === "detail" ? "disabled" : ""
                                    }`}
                                    dateFormat="dd/MM/yyyy"
                                    disabled={type === "detail"}
                                    selected={
                                        value
                                            ? moment(
                                                  value,
                                                  "DD/MM/YYYY"
                                              ).toDate()
                                            : null
                                    }
                                    onChange={(date) => {
                                        const formattedDate = date
                                            ? moment(date).format("DD/MM/YYYY")
                                            : "";
                                        onChange(formattedDate);
                                    }}
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
                        <label className="labelInput">Kết thúc</label>
                        <Controller
                            name="endDate"
                            control={control}
                            {...register("endDate", {
                                required: "Không được để trống",
                                // required: "Full name is required",
                            })}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    className={`input ${
                                        type === "detail" ? "disabled" : ""
                                    }`}
                                    dateFormat="dd/MM/yyyy"
                                    disabled={type === "detail"}
                                    selected={
                                        value
                                            ? moment(
                                                  value,
                                                  "DD/MM/YYYY"
                                              ).toDate()
                                            : null
                                    }
                                    onChange={(date) => {
                                        const formattedDate = date
                                            ? moment(date).format("DD/MM/YYYY")
                                            : "";
                                        onChange(formattedDate);
                                    }}
                                />
                            )}
                        />
                        {errors?.endDate?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.endDate?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* code, roleId, evaluationMethodId, permissions */}

                <ButtonConfirm type={type} />
            </form>
        </div>
    );
};

export default AddThesisSession;
