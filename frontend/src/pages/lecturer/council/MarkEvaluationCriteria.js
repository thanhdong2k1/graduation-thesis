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
import { apiAdmin, apiLecturer } from "../../../redux/apiRequest";
import ModalPopup from "../../../components/ModelPopup/ModalPopup";
import {
    customSelectStyles,
    customSelectStylesMulti,
} from "../../../utils/customStyleReactSelect";
import ButtonConfirm from "../../../components/button/ButtonConfirm";
import { useParams } from "react-router-dom";
import { TbTablePlus } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

const MarkEvaluationCriteria = ({ type }) => {
    // let { id } = useParams();
    let { thesisSessionId, councilDetailId, councilId, thesisId } = useParams();
    console.log(
        "type",
        type,
        thesisSessionId,
        councilDetailId,
        councilId,
        thesisId
    );

    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const status = useSelector((state) => state?.admin?.status);
    const thesisSessions = useSelector((state) => state?.admin?.thesisSessions);
    let codeThesisSessions = thesisSessions?.map((v) => {
        return { value: v.id, label: `${v.name}` };
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
        // console.log(data);
        let markCriterias = [];
        criterias.map((item) => {
            markCriterias.push({
                evaluationCriteriaId: item.id,
                mark: item.mark || "0",
            });
        });

        let mark = {
            markCriterias,
            totalMark: data.totalMark,
            councilDetailId: councilDetailId,
            thesisId: thesisId,
            councilId: councilId,
            thesisSessionId: thesisSessionId,
        };
        await apiLecturer
            .apiMarkEvaluationCriteria({
                user: currentUser,
                mark: mark,
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
    useEffect(() => {
        // console.log("thesisSessionId", thesisSessionId);
        // if (thesisSessionId) {
        //     async function fetchData() {
        //         try {
        //             const response =
        //                 await apiLecturer.getEvaluationCriteriaByThesisSessionId(
        //                     {
        //                         user: currentUser,
        //                         id: thesisSessionId,
        //                         axiosJWT: axiosJWT,
        //                     }
        //                 );
        //             // console.log(response);
        //         } catch (e) {
        //             console.log(e);
        //         }
        //     }
        //     fetchData();
        // }
        if (thesisId) {
            apiLecturer
                .getThesisById({
                    user: currentUser,
                    id: thesisId,
                    axiosJWT: axiosJWT,
                })
                .then((res) => {
                    if (res?.errCode > 0 || res?.errCode < 0) {
                    } else {
                        // console.log(res);
                        let convert = [];
                        setValue("id", res?.result?.id);
                        setValue("student", res?.result?.studentData?.fullName);
                        setValue(
                            "thesisAdvisor",
                            res?.result?.thesisAdvisorData?.fullName
                        );
                        setValue("topic", res?.result?.topicData?.name);
                        // reset();
                    }
                })
                .catch((error) => {
                    // console.log(error);
                });
        }
        console.log("councilDetailId && thesisId", councilDetailId, thesisId);
        if (councilDetailId && thesisId && thesisSessionId) {
            async function fetchData() {
                try {
                    const responseCriteria =
                        await apiLecturer.getEvaluationCriteriaByThesisSessionId(
                            {
                                user: currentUser,
                                id: thesisSessionId,
                                axiosJWT: axiosJWT,
                            }
                        );

                    const responseMarkCriteria =
                        await apiLecturer.getMarkCriteria({
                            user: currentUser,
                            data: { thesisId, councilDetailId },
                            axiosJWT: axiosJWT,
                        });
                    console.log(
                        "responseMarkCriteria",
                        responseMarkCriteria?.result
                    );

                    let criteriasMark = [];

                    if (responseMarkCriteria?.result?.result?.length > 0) {
                        console.log("a", responseCriteria?.result);
                        responseCriteria?.result?.map((criteria) => {
                            responseMarkCriteria?.result?.result.map((res) => {
                                if (criteria.id == res.evaluationCriteriaId) {
                                    criteriasMark.push({
                                        ...criteria,
                                        mark: res?.mark,
                                    });
                                }
                            });
                        });
                        console.log("criteriasMark", criteriasMark);
                        if (criteriasMark.length > 0) {
                            setCriterias(criteriasMark);
                            setValue(
                                "totalMark",
                                responseMarkCriteria?.result?.totalMark
                            );
                        } else {
                            setCriterias(responseCriteria?.result);
                        }
                    } else {
                        setCriterias(responseCriteria?.result);
                    }
                    if(responseMarkCriteria?.result?.totalMark){
                        setValue(
                            "totalMark",
                            responseMarkCriteria?.result?.totalMark
                        );
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
        }
    }, [currentUser]);

    const [criterias, setCriterias] = useState([]);
    const [changedMark, setChangedMark] = useState(false);

    const [totalMarkScore, setTotalScore] = useState(0);

    const updateItem = (index, field, value) => {
        const updatedItems = [...criterias];
        updatedItems[index][field] = value;
        updatedItems[index][field] = value;
        // console.log(criterias);
        setCriterias(updatedItems);
        setChangedMark(true);
    };

    useEffect(() => {
        let totalMark = 0;
        if (changedMark) {
            criterias?.map((item) => {
                item.weight >= 1
                    ? (totalMark += +item.mark
                          ? +item.mark * (item.weight / 10)
                          : 0)
                    : (totalMark += +item.mark ? +item.mark * item.weight : 0);
            });
            setValue("totalMark", totalMark.toFixed(2));
        }
    }, [criterias, changedMark]);

    return (
        <div className="changeInformationDiv flex flex-col justify-center items-center gap-2">
            <div className=" font-semibold text-h1FontSize">Chấm điểm</div>
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
                    <div className="col w-full">
                        <label className="labelInput">Sinh viên</label>
                        <input
                            className={`input ${
                                type == "detail" ? "disabled" : ""
                            } !bg-transparent`}
                            disabled
                            {...register("student", {
                                // required: "Number phone is required",
                            })}
                        />
                        {errors?.student?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.student?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Người hướng dẫn</label>
                        <input
                            className={`input ${
                                type == "detail" ? "disabled" : ""
                            } !bg-transparent`}
                            disabled
                            {...register("thesisAdvisor", {
                                // required: "Number phone is required",
                            })}
                        />
                        {errors?.thesisAdvisor?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.thesisAdvisor?.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Đề tài</label>
                        <input
                            className={`input ${
                                type == "detail" ? "disabled" : ""
                            } !bg-transparent`}
                            disabled
                            {...register("topic", {
                                // required: "Number phone is required",
                            })}
                        />
                        {errors?.topic?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.topic?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* <div>
                        <iframe
                            className="w-full rounded-lg"
                            src="https://tlus.edu.vn/wp-content/uploads/2023/09/TB-80-HKP-K2-23-24_Web.pdf"
                        ></iframe>
                    </div> */}
                {/* <div className="row flex justify-center items-center gap-2">
                    <div className="col w-1/5">
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
                    </div>
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
                </div> */}
                {criterias &&
                    criterias?.map((item, index) => (
                        <div
                            className="row flex justify-center items-center gap-2"
                            key={index}
                        >
                            <div className="col w-full">
                                <div className="row flex justify-center items-center gap-2">
                                    {index != 0 && item.level == "2" && (
                                        <div className="col w-1/4 media-max-md:w-1/4"></div>
                                    )}
                                    <div className="col w-full">
                                        {index == 0 && (
                                            <label className="labelInput">
                                                Tiêu chí đánh giá
                                            </label>
                                        )}
                                        <input
                                            className={`input ${
                                                type == "detail"
                                                    ? "disabled"
                                                    : ""
                                            }`}
                                            disabled
                                            // {...register("nameCriteria", {
                                            //     required: "Không được để trống",
                                            // })}
                                            value={item.name}
                                        />
                                    </div>
                                    {errors?.idCriteria?.type && (
                                        <p className=" text-normal text-red-500">
                                            {errors?.idCriteria?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col w-1/5 media-min-md:w-1/2">
                                {index == 0 && (
                                    <>
                                        <label className="labelInput flex justify-between">
                                            <span>Trọng số</span>
                                            {/* <span>Total: {totalMarkScore}</span> */}
                                        </label>
                                    </>
                                )}

                                <div className="flex flex-row gap-2">
                                    {item.weight && item.weight != 0 ? (
                                        <input
                                            className={`input ${
                                                type == "detail"
                                                    ? "disabled"
                                                    : ""
                                            }`}
                                            type="number"
                                            step={0.1}
                                            disabled
                                            // {...register("weightCriteria", {
                                            //     required: "Không được để trống",
                                            // })}
                                            value={item.weight}
                                        />
                                    ) : null}
                                </div>
                                {/* {errors?.weightCriteria?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.weightCriteria?.message}
                                </p>
                            )} */}
                            </div>
                            <div className="col w-1/5 media-min-md:w-1/2">
                                {index == 0 && (
                                    <>
                                        <label className="labelInput flex justify-between">
                                            <span>Điểm</span>
                                            {/* <span>Total: {totalMarkScore}</span> */}
                                        </label>
                                    </>
                                )}

                                <div className="flex flex-row gap-2">
                                    {item.weight && item.weight != 0 ? (
                                        <input
                                            className={`input ${
                                                type == "detail"
                                                    ? "disabled"
                                                    : ""
                                            }`}
                                            type="number"
                                            step={0.1}
                                            max={10}
                                            min={0}
                                            disabled={
                                                !item.weight || item.weight == 0
                                                    ? true
                                                    : false
                                            }
                                            // {...register("weightCriteria", {
                                            //     required: "Không được để trống",
                                            // })}
                                            value={item.mark}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "mark",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : null}
                                </div>
                                {/* {errors?.weightCriteria?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors?.weightCriteria?.message}
                                </p>
                            )} */}
                            </div>
                        </div>
                    ))}
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full"></div>
                    <div className="col w-full">
                        <label className="labelInput flex justify-end">
                            Tổng điểm
                        </label>
                    </div>
                    <div className="col w-full">
                        <input
                            className={`input disabled`}
                            type="number"
                            step={0.1}
                            max={10}
                            min={0}
                            {...register("totalMark", {
                                validate: (value) => {
                                    return (
                                        (value <= 10 && value >= 0) ||
                                        "Tổng điểm phải lớn hơn 0 bé hơn 10!"
                                    );
                                },
                            })}
                            // value={totalMarkScore}
                        />
                        {errors?.totalMark?.type && (
                            <p className=" text-normal text-red-500">
                                {errors?.totalMark?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* <button onClick={handleSubmit}>Submit</button> */}

                {/* <div>
                        {criterias?.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={item.title}
                                    disabled
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type="text"
                                    value={item.weight}
                                    disabled
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "weight",
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type="text"
                                    disabled={item.weight == "0"}
                                    value={item.score}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            "score",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        ))}
                        <button onClick={() => addItem(1)}>
                            Add Level 1 Item
                        </button>
                        <button onClick={() => addItem(2)}>
                            Add Level 2 Item
                        </button>
                        <button onClick={handleSubmit}>Submit</button>
                    </div> */}
                <ButtonConfirm type={type} />
            </form>
        </div>
    );
};

export default MarkEvaluationCriteria;
