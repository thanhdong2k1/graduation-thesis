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
import { createAxios } from "../../utils/createInstance";
import { logginSuccess } from "../../redux/authSlice";
import {  apiStudent } from "../../redux/apiRequest";
import ModalPopup from "../../components/ModelPopup/ModalPopup";
import { customSelectStyles, customSelectStylesMulti } from "../../utils/customStyleReactSelect";
import ButtonConfirm from "../../components/button/ButtonConfirm";

const StudentChangeInformation = () => {
    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const permissions = useSelector((state) => state?.admin?.permissions);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const gender = useSelector((state) => state?.admin?.gender);
    const informationUser = useSelector((state) => state?.admin?.information);
    const [showModal, setShowModal] = useState(false);
    const [srcImg, setSrcImg] = useState(
        "https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1870181.jpg"
    );
    const [isRtl, setIsRtl] = useState(false);

    const [previewImg, setPreviewImg] = useState(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
    } = useForm();
    const handleSaveImage = async () => {
        const id = toast.loading("Please wait...");
        const datasend = {
            image: previewImg,
        };
        // console.log(datasend);
        await apiStudent
            .apiStudentChangeInformation(currentUser, datasend, axiosJWT)
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
                    // reset();
                    apiStudent.apiStudentGetInformation(currentUser, dispatch, axiosJWT);
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
    const onSubmit = async (data) => {
        const id = toast.loading("Please wait...");
        const datasend = {
            ...data,
            birthday: new Date(
                moment(data?.birthday, "DD/MM/YYYY")
            ).toLocaleDateString("vi-VN"),
        };
        const { role, permissions, clases, code, ...dataFilter } = datasend;
        console.log(datasend, dataFilter);
        await apiStudent
            .apiStudentChangeInformation(currentUser, dataFilter, axiosJWT)
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
    };
    const onClose = () => {
        setPreviewImg(null);
    };
    const onCrop = (view) => {
        setPreviewImg(view);
    };
    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 5242880) {
            toast.warning("File is too big, plz upload file below 5MB!");
            elem.target.value = "";
        }
    };
    let convert = [];
    if (informationUser?.roleId === "R1") {
        permissions?.forEach((obj) => {
            if (obj?.value === "PERF") {
                convert?.push({ ...obj, isFixed: true });
            }
        });
    } else if (informationUser.roleId === "R2") {
        permissions?.forEach((obj) => {
            if (obj?.value !== "PERD" && obj?.value !== "PERF") {
                convert?.push({ ...obj, isFixed: true });
            }
        });
    } else {
        permissions?.forEach((obj) => {
            if (obj?.value === "PERU" || obj?.value === "PERR") {
                convert?.push({ ...obj, isFixed: true });
            }
        });
    }
    const array = informationUser?.permissions?.toString()?.split(",");
    permissions?.forEach((obj) => {
        if (array?.includes(obj?.value)) {
            convert?.push(obj);
        }
    });
    useEffect(() => {
        // console.log("useEffect changeInfor");
        apiStudent.apiStudentGetInformation(currentUser, dispatch, axiosJWT);
        apiStudent.apiGetGender(currentUser, dispatch, axiosJWT);
        apiStudent.apiGetPermissions(currentUser, dispatch, axiosJWT);
    }, [currentUser]);
    useEffect(() => {
        if (informationUser?.image) {
            const imageBuffer = new Buffer(
                informationUser?.image,
                "base64"
            ).toString("binary");
            setSrcImg(imageBuffer);
        }
        setValue("fullName", informationUser?.fullName);
        setValue("numberPhone", informationUser?.numberPhone);
        setValue("address", informationUser?.address);
        setValue("birthday", informationUser?.birthday);
        setValue("code", informationUser?.code);
        setValue("role", informationUser?.roleData.valueVi);
        setValue("class", informationUser?.classData.name);
        setValue("permissions", convert);
        // console.log(informationUser?.birthday,moment(informationUser?.birthday, "DD/MM/YYYY").toString());
        setValue(
            "gender",
            gender?.filter(
                (gender) => gender?.value === informationUser?.genderId
            )
        );
    }, [informationUser]);

    return (
        <div className="changeInformationDiv flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="formDiv flex flex-col gap-2  media-min-md:w-[80%]"
            >
                {/* <div>
                    <label
                        htmlFor="username"
                        className="text-blackColor font-normal text-h3FontSize px-2 py-0 block"
                    >
                        Username
                    </label>
                    <div className="input flex gap-2 p-4 bg-inputColor rounded-lg items-center">
                        <FaUserShield className="icon" />
                        <input
                            className="input"
                            {...register("oldPassword", { required: true })}
                        />
                       
                    </div>
                    {errors?.oldPassword?.type && (
                            <p className=" text-normal text-red-500">
                                Old password is required
                            </p>
                        )}
                </div> */}
                <div className="row flex justify-center items-center w-full">
                    <div className="w-28 h-28 p-1 bg-whiteColor rounded-full relative">
                        <img
                            src={srcImg}
                            className="w-[6.5rem] h-[6.5rem] rounded-full"
                        />
                        <div
                            className="absolute bottom-0 right-1 rounded-full p-2 bg-whiteColor"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            <FaPenAlt className="icon" />
                        </div>
                    </div>
                    <ModalPopup
                        showModal={showModal}
                        setShowModal={setShowModal}
                        title={"Thay đổi ảnh"}
                        result={previewImg}
                        setResult={handleSaveImage}
                    >
                        <div className="">
                            <Avatar
                                // src={srcImg}
                                width={250}
                                height={250}
                                imageHeight={250}
                                onBeforeFileLoad={onBeforeFileLoad}
                                onCrop={onCrop}
                                onClose={onClose}
                            />
                        </div>
                    </ModalPopup>
                </div>
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Họ tên</label>
                        <input
                            className="input"
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
                            className="input"
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
                            className="input resize-none"
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
                                    className="input"
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
                        {errors?.birthday?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.birthday?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Giới tính</label>
                        <Controller
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
                                />
                            )}
                        />
                        {errors?.gender?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.gender?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* code, roleId, classId, permissions */}

                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Mã</label>
                        <input
                            className="input disabled:bg-whiteColor"
                            disabled
                            {...register("code", {})}
                        />
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Vai trò</label>
                        <input
                            className="input disabled:bg-whiteColor"
                            disabled
                            {...register("role", {})}
                        />
                    </div>
                </div>

                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Lớp</label>
                        <input
                            className="input disabled:bg-whiteColor"
                            disabled
                            {...register("class", {})}
                        />
                    </div>
                </div>
                <div className="row flex justify-center items-center gap-2">
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
                                    isDisabled={true}
                                    options={permissions}
                                    className="basic-multi-select "
                                    classNamePrefix="select"
                                />
                            )}
                        />
                        {/* <input className="input disabled:bg-whiteColor" disabled defaultValue={} /> */}
                        {/* <Select placeholder="Chọn..."
                            styles={customSelectStylesMulti}
                            isRtl={isRtl}
                            defaultValue={defaultSelect}
                            isMulti
                            name="colors"
                            isClearable={false}
                            isDisabled={true}
                            options={permissions}
                            className="basic-multi-select "
                            classNamePrefix="select"
                        /> */}
                    </div>
                </div>
                <ButtonConfirm />
            </form>
        </div>
    );
};

export default StudentChangeInformation;
