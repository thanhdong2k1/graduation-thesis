import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { FaPenAlt, FaRegTrashAlt } from "react-icons/fa";
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
import { MdAdd } from "react-icons/md";

const AddCouncil = ({ type }, params) => {
    let { id } = useParams();
    console.log("type", type, id);

    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const status = useSelector((state) => state.admin.status);
    const thesisSessions = useSelector((state) => state.admin.thesisSessions);
    const position = useSelector((state) => state.admin.position);
    const lecturers = useSelector((state) => state.admin.lecturers);
    const theses = useSelector((state) => state.admin.theses);
    let codeLecturers = lecturers.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.fullName}` };
    });
    let codeThesisSessions = thesisSessions.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.name}` };
    });
    let codeTheses = theses.map((v) => {
        return { value: v.id, label: `${v.id} | ${v.topicData.name}` };
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
        let councilDetailsFilter = [];
        councilDetails?.map((item) => {
            councilDetailsFilter.push({
                id: item?.id,
                positionId: item?.positionId?.value,
                lecturerId: item?.lecturerId?.value,
                // positionId: item.filter(
                //     (value) =>
                //         value?.value == res?.result?.positionId
                // )
            });
        });
        console.log("councilDetailsFilter", councilDetailsFilter);
        type == "add"
            ? await apiAdmin
                  .apiAddCouncil({
                      user: currentUser,
                      data: data,
                      axiosJWT: axiosJWT,
                      councilDetails: councilDetailsFilter,
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
                          setValue("thesisSession", "");
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
                  .apiUpdateCouncil({
                      user: currentUser,
                      data: data,
                      axiosJWT: axiosJWT,
                      councilDetails: councilDetailsFilter,
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
        apiAdmin.apiGetStatus(currentUser, dispatch, axiosJWT);
        apiAdmin.apiGetPosition(currentUser, dispatch, axiosJWT);
        apiAdmin.getAllThesisSessions({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        apiAdmin.getAllLecturers({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        apiAdmin.getAllTheses({
            user: currentUser,
            dispatch: dispatch,
            axiosJWT: axiosJWT,
        });
        if (id) {
            apiAdmin
                .getCouncilById({
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
                            "thesisSession",
                            codeThesisSessions.filter(
                                (value) =>
                                    value?.value == res?.result?.thesisSessionId
                            )
                        );
                        setValue(
                            "status",
                            status.filter(
                                (value) => value?.value == res?.result?.statusId
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
            async function fetchData() {
                try {
                    const response = await apiAdmin.getAllCouncilDetails({
                        user: currentUser,
                        id: id,
                        axiosJWT: axiosJWT,
                    });
                    let filter = [];
                    response?.result?.map((item) => {
                        filter.push({
                            id: item?.id,
                            positionId: position?.filter(
                                (value) => value?.value == item?.positionId
                            )[0],
                            lecturerId: codeLecturers?.filter(
                                (value) => value?.value == item?.lecturerId
                            )[0],
                            // positionId: item.filter(
                            //     (value) =>
                            //         value?.value == res?.result?.positionId
                            // )
                        });
                    });
                    console.log(filter);
                    setCouncilDetails(filter);
                } catch (e) {
                    console.error(e);
                }
            }
            fetchData();
        }
    }, [currentUser]);

    const [councilDetails, setCouncilDetails] = useState([]);
    const [thesesDetails, setThesesDetails] = useState([]);
    // const [councilDetailsFilter, setCouncilDetailsFilter] = useState([]);

    const addItemPosition = (level) => {
        setCouncilDetails([
            ...councilDetails,
            {
                positionId: "",
                lecturerId: "",
            },
        ]);
        console.log(councilDetails);
    };

    const removeItemPosition = (index) => {
        const updatedItems = [...councilDetails];
        updatedItems.splice(index, 1);
        setCouncilDetails(updatedItems);
    };

    const updateItemPosition = (index, field, value) => {
        const updatedItems = [...councilDetails];
        updatedItems[index][field] = value;
        updatedItems[index][field] = value;
        setCouncilDetails(updatedItems);
    };

    const addItemThesis = (level) => {
        setThesesDetails([
            ...thesesDetails,
            {
                positionId: "",
                lecturerId: "",
            },
        ]);
        console.log(thesesDetails);
    };

    const removeItemThesis = (index) => {
        const updatedItems = [...thesesDetails];
        updatedItems.splice(index, 1);
        setThesesDetails(updatedItems);
    };

    const updateItemThesis = (index, field, value) => {
        const updatedItems = [...thesesDetails];
        updatedItems[index][field] = value;
        updatedItems[index][field] = value;
        setThesesDetails(updatedItems);
    };
    // useEffect(() => {
    //     console.log(councilDetails);
    //     councilDetails?.map((item) => {
    //         console.log(item);
    //         setCouncilDetailsFilter((prev) => [
    //             ...prev,
    //             {
    //                 id: item?.id,
    //                 positionId: position.filter(
    //                     (value) => value?.value == item?.positionId
    //                 )[0],
    //                 lecturerId: codeLecturers.filter(
    //                     (value) => value?.value == item?.lecturerId
    //                 )[0],
    //                 // positionId: item.filter(
    //                 //     (value) =>
    //                 //         value?.value == res?.result?.positionId
    //                 // )
    //             },
    //         ]);
    //     });
    // }, [councilDetails]);
    useEffect(() => {
        console.log(councilDetails);
    }, [councilDetails]);
    return (
        <div className="changeInformationDiv flex flex-col justify-center items-center gap-2">
            <div className=" font-semibold text-h1FontSize">
                {type=="add"?"Thêm":"Sửa"} hội đồng
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
                        {errors.name?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.name?.message}
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
                        {errors.description?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.description?.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="row flex justify-center items-center gap-2">
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
                                    options={codeThesisSessions}
                                    isClearable={true}
                                    isDisabled={type == "detail" ? true : false}
                                />
                            )}
                        />
                        {errors.thesisSession?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.thesisSession?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Trạng thái</label>
                        <Controller
                            name="status"
                            control={control}
                            {...register("status", {
                                // required: "Full name is required",
                            })}
                            render={({ field }) => (
                                <Select placeholder="Chọn..."
                                    styles={customSelectStyles}
                                    {...field}
                                    options={status}
                                    isClearable={true}
                                    isDisabled={type == "detail" ? true : false}
                                />
                            )}
                        />
                        {errors.status?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.status?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* code, roleId, departmentId, permissions */}
                {councilDetails &&
                    councilDetails?.map((item, index) => (
                        <div
                            className="row flex justify-center items-center gap-2"
                            key={index}
                        >
                            {/* <div className="col w-1/4">
                                <div className="row flex justify-center items-center gap-2">
                                    <div className="col w-full">
                                        {index == 0 && (
                                            <label className="labelInput">
                                                ID
                                            </label>
                                        )}
                                        <input
                                            className="input disabled"
                                            disabled
                                            value={item?.id}
                                            // {...register("idCriteria", {
                                            //     // required: "Full name is required",
                                            // })}
                                        />
                                    </div>
                                    {errors.idCriteria?.type && (
                                    <p className=" text-normal text-red-500">
                                        {errors.idCriteria?.message}
                                    </p>
                                )}
                                </div>
                            </div> */}
                            <div className="col w-full">
                                {index == 0 && (
                                    <label className="labelInput">
                                        Chức vụ
                                    </label>
                                )}

                                <Select placeholder="Chọn..."
                                    defaultValue={item?.positionId}
                                    styles={customSelectStyles}
                                    options={position}
                                    isDisabled={type == "detail" ? true : false}
                                    // value={item.name}
                                    onChange={(e) =>
                                        // console.log(e)
                                        updateItemPosition(
                                            index,
                                            "positionId",
                                            e
                                        )
                                    }
                                />
                                {/* {errors.nameCriteria?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.nameCriteria?.message}
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
                                <div className="flex flex-row gap-2">
                                    <Select placeholder="Chọn..."
                                        defaultValue={item?.lecturerId}
                                        styles={customSelectStyles}
                                        options={codeLecturers}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                        className="w-full"
                                        // value={item.name}
                                        onChange={(e) =>
                                            // console.log(e)
                                            updateItemPosition(
                                                index,
                                                "lecturerId",
                                                e
                                            )
                                        }
                                    />
                                    {/* <div
                                        className="button"
                                        onClick={() => moveUpItem(index)}
                                    >
                                        <HiArrowUp className="hover:text-PrimaryColor" />
                                    </div>
                                    <div
                                        className="button"
                                        onClick={() => moveDownItem(index)}
                                    >
                                        <HiArrowDown className="hover:text-PrimaryColor" />
                                    </div>
                                    <div
                                        className="button"
                                        onClick={() => removeItemPosition(index)}
                                    >
                                        <FaRegTrashAlt className="hover:text-PrimaryColor" />
                                    </div> */}
                                    {type != "detail" && (
                                        <div
                                            className="button"
                                            onClick={() =>
                                                removeItemPosition(index)
                                            }
                                        >
                                            <FaRegTrashAlt className="hover:text-PrimaryColor" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* {errors.weightCriteria?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.weightCriteria?.message}
                                </p>
                            )} */}
                        </div>
                    ))}

                {type != "detail" && (
                    <div className="flex justify-end items-center gap-2">
                        <div
                            className="button gap-1"
                            onClick={() => addItemPosition(1)}
                        >
                            <MdAdd className="" />
                            <span>Thêm chức vụ</span>
                        </div>
                    </div>
                )}

                {thesesDetails &&
                    thesesDetails?.map((item, index) => (
                        <div
                            className="row flex justify-center items-center gap-2"
                            key={index}
                        >
                            <div className="col w-full">
                                {index == 0 && (
                                    <>
                                        <label className="labelInput flex justify-between">
                                            <span>Thesis</span>
                                            {/* <span>Total: {totalScore}</span> */}
                                        </label>
                                    </>
                                )}
                                <div className="flex flex-row gap-2">
                                    <Select placeholder="Chọn..."
                                        defaultValue={item?.lecturerId}
                                        styles={customSelectStyles}
                                        options={codeTheses}
                                        isDisabled={
                                            type == "detail" ? true : false
                                        }
                                        className="w-full"
                                        // value={item.name}
                                        onChange={(e) =>
                                            // console.log(e)
                                            updateItemThesis(
                                                index,
                                                "lecturerId",
                                                e
                                            )
                                        }
                                    />
                                    {/* <div
                                        className="button"
                                        onClick={() => moveUpItem(index)}
                                    >
                                        <HiArrowUp className="hover:text-PrimaryColor" />
                                    </div>
                                    <div
                                        className="button"
                                        onClick={() => moveDownItem(index)}
                                    >
                                        <HiArrowDown className="hover:text-PrimaryColor" />
                                    </div>
                                    <div
                                        className="button"
                                        onClick={() => removeItemThesis(index)}
                                    >
                                        <FaRegTrashAlt className="hover:text-PrimaryColor" />
                                    </div> */}
                                    {type != "detail" && (
                                        <div
                                            className="button"
                                            onClick={() =>
                                                removeItemThesis(index)
                                            }
                                        >
                                            <FaRegTrashAlt className="hover:text-PrimaryColor" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* {errors.weightCriteria?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.weightCriteria?.message}
                                </p>
                            )} */}
                        </div>
                    ))}

                {type != "detail" && (
                    <div className="flex justify-end items-center gap-2">
                        <div
                            className="button gap-1"
                            onClick={() => addItemThesis(1)}
                        >
                            <MdAdd className="" />
                            <span>Thêm đồ án</span>
                        </div>
                    </div>
                )}
                <ButtonConfirm type={type} />
            </form>
        </div>
    );
};

export default AddCouncil;
