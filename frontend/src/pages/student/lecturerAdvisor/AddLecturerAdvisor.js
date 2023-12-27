import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdLockReset } from "react-icons/md";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { createAxios } from "../../../utils/createInstance";
import { logginSuccess } from "../../../redux/authSlice";
import { apiAdmin } from "../../../redux/apiRequest";
import {
    customSelectStyles,
    customSelectStylesMulti,
} from "../../../utils/customStyleReactSelect";
import ButtonConfirm from "../../../components/button/ButtonConfirm";
import { useParams } from "react-router-dom";
import ModalPopup from "../../../components/ModelPopup/ModalPopup";

const AddLecturerAdvisor = ({ type }, params) => {
    let { id } = useParams();
    console.log("type", type, id);

    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    // const status = useSelector((state) => state.admin.status);
    // const gender = useSelector((state) => state.admin.gender);
    // const role = useSelector((state) => state.admin.role);
    // const permissions = useSelector((state) => state.admin.permissions);
    // const departments = useSelector((state) => state.admin.departments);
    // let codeDepartment = departments.map((v) => {
    //     return { value: v.id, label: `${v.id} | ${v.name}` };
    // });
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
        const id = toast.loading("Please wait...");
        await apiAdmin
            .apiResetPasswordLecturer({
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
                } else if (res?.errCode > 0) {
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
        const id = toast.loading("Please wait...");
        const permissions = [];
        data?.permissions
            ?.filter((value) => !value.isFixed)
            ?.map((obj) => {
                console.log(obj?.value);
                permissions.push(obj?.value);
            });
        const datasend = {
            ...data,
            birthday: new Date(
                moment(data?.birthday, "DD/MM/YYYY")
            ).toLocaleDateString("vi-VN"),
            permissions: permissions.toString(),
            //     e.map((obj) => {
            //         console.log(obj.value);
            //         permissions.push(obj.value);
            //     });,
        };
        console.log(datasend);
        type == "add"
            ? await apiAdmin
                  .apiAddLecturer({
                      user: currentUser,
                      data: datasend,
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
                  .apiUpdateLecturer({
                      user: currentUser,
                      data: datasend,
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
        async function fetchData() {
            if (id) {
                await apiAdmin
                    .getLecturerById({
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
                            setValue("fullName", res?.result?.fullName);
                            setValue("email", res?.result?.email);
                            setValue("numberPhone", res?.result?.numberPhone);
                            setValue("address", res?.result?.address);
                            setValue("birthday", res?.result?.birthday);

                            {
                                /* code, roleId, departmentId, permissions */
                            }

                            setValue("code", res?.result?.code);
                            setValue("role", res?.result?.roleData?.valueVi);
                            setValue("department", res?.result?.departmentData?.name);
                            // console.log(res?.result?.birthday,moment(res?.result?.birthday, "DD/MM/YYYY").toString());
                            setValue("gender", res?.result?.genderData?.valueVi);
                            setValue("status", res?.result?.statusData?.valueVi);
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
        }
        fetchData();
    }, [currentUser]);

    return (
        <>
            <div className="changeInformationDiv flex flex-col justify-center items-center gap-2">
                <div className=" font-semibold text-h1FontSize">
                    {type=="add"?"Thêm":"Sửa"} giảng viên
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
                            {errors.id?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.id?.message}
                                </p>
                            )}
                        </div> */}
                        <div className="col w-full">
                            <label className="labelInput">Email</label>
                            <input
                                className={`input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled={type == "detail" ? true : false}
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                    </div>
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
                            {errors.fullName?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.fullName?.message}
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
                            {errors.numberPhone?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.numberPhone?.message}
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
                            {errors.address?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.address?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full flex flex-col">
                            <label className="labelInput">Ngày sinh</label>
                            <Controller
                                name="birthday"
                                control={control}
                                {...register("birthday", {
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
                            {errors.birthday?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.birthday?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Giới tính</label>
                            {/* <Controller
                                name="gender"
                                control={control}
                                {...register("gender", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={gender}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled={type == "detail" ? true : false}
                                {...register("gender", {
                                    required: "Number phone is required",
                                })}
                            />
                            {errors.gender?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.gender?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* code, roleId, departmentId, permissions */}

                    <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Khoa</label>
                            {/* <Controller
                                name="department"
                                control={control}
                                {...register("department", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={codeDepartment}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            .
                            <input
                                className={`input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled={type == "detail" ? true : false}
                                {...register("department", {
                                    required: "Number phone is required",
                                })}
                            />
                            {errors.department?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.department?.message}
                                </p>
                            )}
                        </div>
                        <div className="col w-full">
                            <label className="labelInput">Vai trò</label>
                            {/* <Controller
                                name="role"
                                control={control}
                                {...register("role", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStyles}
                                        {...field}
                                        options={role}
                                        isClearable={true}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                    />
                                )}
                            /> */}
                            <input
                                className={`input ${
                                    type == "detail" ? "disabled" : ""
                                }`}
                                disabled={type == "detail" ? true : false}
                                {...register("role", {
                                    required: "Number phone is required",
                                })}
                            />
                            {errors.role?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.role?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* <div className="row flex justify-center items-center gap-2">
                        <div className="col w-full">
                            <label className="labelInput">Quyền</label>
                            <Controller
                                name="permissions"
                                control={control}
                                {...register("permissions", {
                                    // required: "Full name is required",
                                })}
                                render={({ field }) => (
                                    <Select placeholder="Chọn..."
                                        styles={customSelectStylesMulti}
                                        {...field}
                                        isRtl={isRtl}
                                        isMulti
                                        isClearable={false}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                        options={permissions}
                                        className="basic-multi-select "
                                        classNamePrefix="select"
                                    />
                                )}
                            />
                        </div>
                    </div> */}
                    {/* code, roleId, departmentId, permissions */}

                    <ButtonConfirm type={type} />
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

export default AddLecturerAdvisor;
