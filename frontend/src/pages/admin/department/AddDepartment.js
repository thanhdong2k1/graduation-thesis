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

const AddDepartment = ({ type }, params) => {
    let { id } = useParams();
  // console.log("type", type, id);

    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const deans = useSelector((state) => state?.admin?.lecturers);
    let codeDean = deans?.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.fullName}` };
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

        let founding = data?.founding && new Date(data?.founding).toLocaleDateString("vi-VN");

      // console.log(founding);

        const datasend = {
            ...data,
            founding: founding,
        };
      // console.log(datasend);

        type == "add"
            ? await apiAdmin
                  .apiAddDepartment({
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
                  .apiUpdateDepartment({
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
        apiAdmin.getAllLecturers({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        if (id) {
            apiAdmin
                .getDepartmentById({
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
                      // console.log(res);
                        setValue("id", res?.result?.id);
                        setValue("name", res?.result?.name);
                        setValue("description", res?.result?.description);
                        setValue("founding", res?.result?.founding);
                      // console.log(
                        //     "res?.result?.founding",
                        //     res?.result?.founding
                        // );
                        setValue(
                            "dean",
                            codeDean?.filter(
                                (value) => value?.value == res?.result?.deanId
                            )
                        );
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
                {type=="add"?"Thêm":"Sửa"} khoa
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
                                required: "Name is required",
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
                    <div className="col w-full flex flex-col">
                        <label className="labelInput">Thành lập</label>
                        <Controller
                            name="founding"
                            control={control}
                            {...register("founding", {
                                // required: "Full name is required",
                            })}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    className={`input ${
                                        type == "detail" ? "disabled" : ""
                                    }`}
                                    dateFormat="dd/MM/yyyy"
                                    disabled={type == "detail" ? true : false}
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
                        {errors?.founding?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.founding?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Trưởng khoa</label>
                        <Controller
                            name="dean"
                            control={control}
                            {...register("dean", {
                                // required: "Full name is required",
                            })}
                            render={({ field }) => (
                                <Select placeholder="Chọn..."
                                    styles={customSelectStyles}
                                    {...field}
                                    options={codeDean}
                                    isDisabled={type == "detail" ? true : false}
                                    isClearable={true}
                                />
                            )}
                        />
                        {errors?.dean?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.dean?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* code, roleId, departmentId, permissions */}

                <ButtonConfirm type={type} />
            </form>
        </div>
    );
};

export default AddDepartment;
