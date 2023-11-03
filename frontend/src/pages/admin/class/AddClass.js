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

const AddClass = ({ type }, params) => {
    let { id } = useParams();
    console.log("type", type, id);

    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const majors = useSelector((state) => state.admin.majors);
    const blocks = useSelector((state) => state.admin.blocks);
    let codeMajor = majors.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.name}` };
    });
    let codeBlock = blocks.map((v) => {
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
        const id = toast.loading("Please wait...");
        console.log(data);
        type == "add"
            ? await apiAdmin
                  .apiAddClass({
                      user: currentUser,
                      data: data,
                      axiosJWT: axiosJWT,
                  })
                  .then((res) => {
                      if (res?.errCode > 0) {
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
                          setValue("major", "");
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
                  .apiUpdateClass({
                      user: currentUser,
                      data: data,
                      axiosJWT: axiosJWT,
                  })
                  .then((res) => {
                      if (res?.errCode > 0) {
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
                          //   setValue("major", "");
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
        apiAdmin.getAllMajors({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        apiAdmin.getAllBlocks({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        if (id) {
            apiAdmin
                .getClassById({
                    user: currentUser,
                    id: id,
                    axiosJWT: axiosJWT,
                })
                .then((res) => {
                    if (res?.errCode > 0) {
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
                        setValue("id", res?.result?.id);
                        setValue("name", res?.result?.name);
                        setValue("description", res?.result?.description);
                        setValue(
                            "major",
                            codeMajor.filter(
                                (value) => value?.value == res?.result?.majorId
                            )
                        );
                        setValue(
                            "block",
                            codeBlock.filter(
                                (value) => value?.value == res?.result?.blockId
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
            <div className="capitalize font-semibold text-h1FontSize">
                {type} Class
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="formDiv flex flex-col gap-2  media-min-md:w-[80%]"
            >
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-1/5">
                        <label className="labelInput">ID</label>
                        <input
                            className="input disabled"
                            disabled
                            {...register("id", {
                                // required: "Full name is required",
                            })}
                        />
                        {errors.id?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.id?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Name</label>
                        <input
                            className={`input ${
                                type == "detail" ? "disabled" : ""
                            }`}
                            disabled={type == "detail" ? true : false}
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.name?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.name?.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Description</label>
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
                        {errors.description?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.description?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Block</label>
                        <Controller
                            name="block"
                            control={control}
                            {...register("block", {
                                // required: "Full name is required",
                            })}
                            render={({ field }) => (
                                <Select
                                    styles={customSelectStyles}
                                    {...field}
                                    options={codeBlock}
                                    isClearable={true}
                                    isDisabled={type == "detail" ? true : false}
                                />
                            )}
                        />
                        {errors.block?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.block?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Major</label>
                        <Controller
                            name="major"
                            control={control}
                            {...register("major", {
                                // required: "Full name is required",
                            })}
                            render={({ field }) => (
                                <Select
                                    styles={customSelectStyles}
                                    {...field}
                                    options={codeMajor}
                                    isClearable={true}
                                    isDisabled={type == "detail" ? true : false}
                                />
                            )}
                        />
                        {errors.major?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.major?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* code, roleId, majorId, permissions */}

                <ButtonConfirm type={type} />
            </form>
        </div>
    );
};

export default AddClass;
