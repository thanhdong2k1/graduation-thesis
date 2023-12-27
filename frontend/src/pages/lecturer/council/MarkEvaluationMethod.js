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

const MarkEvaluationMethod = ({ type }) => {
    // let { id } = useParams();
    let { thesisSessionId, coundilId, thesisId } = useParams();
    console.log("type", type, coundilId, thesisId);

    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    const status = useSelector((state) => state.admin.status);
    const thesisSessions = useSelector((state) => state.admin.thesisSessions);
    let codeThesisSessions = thesisSessions.map((v) => {
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
                  .apiAddEvaluationMethod({
                      user: currentUser,
                      data: data,
                      criterias: criterias,
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
                  .apiUpdateEvaluationMethod({
                      user: currentUser,
                      data: data,
                      criterias: criterias,
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
        console.log("thesisSessionId", thesisSessionId);
        if (thesisSessionId) {
            async function fetchData() {
                try {
                    const response =
                        await apiLecturer.getEvaluationCriteriaByThesisSessionId(
                            {
                                user: currentUser,
                                id: thesisSessionId,
                                axiosJWT: axiosJWT,
                            }
                        );
                    console.log(response);
                    setCriterias(response.result);
                } catch (e) {
                    console.error(e);
                }
            }
            fetchData();
        }
    }, [currentUser]);

    const [criterias, setCriterias] = useState([]);

    const [totalScore, setTotalScore] = useState(0);

    const updateItem = (index, field, value) => {
        const updatedItems = [...criterias];
        updatedItems[index][field] = value;
        updatedItems[index][field] = value;
        setCriterias(updatedItems);
    };

    useEffect(() => {
        // const isLengthColumn = criterias.length;
        // const isFilled = criterias.filter(
        //     (item) => item.weight == "0" || item.score
        // ).length;
        // if (isFilled == isLengthColumn) {
        //     console.log("Đã bằng");
        //     for (var i = 0; i < criterias.length; i++) {}
        // }
        // console.log(isLengthColumn, isFilled);
        let total = 0;
        criterias.map((item) => {
            item.weight >= 1
                ? (total += +item.mark ? +item.mark * (item.weight / 10) : 0)
                : (total += +item.mark ? +item.mark * item.weight : 0);
        });
        // setTotalScore(total);
        setValue("total", total);
        console.log(criterias, total);
    }, [criterias]);

    return (
        <div className="changeInformationDiv flex flex-col justify-center items-center gap-2">
            <div className=" font-semibold text-h1FontSize">Chấm điểm</div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="formDiv flex flex-col gap-2  media-min-md:w-[80%]"
            >
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
                                            //     required: "Name is required",
                                            // })}
                                            value={item.name}
                                        />
                                    </div>
                                    {errors.idCriteria?.type && (
                                        <p className=" text-normal text-red-500">
                                            {errors.idCriteria?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col w-1/5 media-min-md:w-1/2">
                                {index == 0 && (
                                    <>
                                        <label className="labelInput flex justify-between">
                                            <span>Trọng số</span>
                                            {/* <span>Total: {totalScore}</span> */}
                                        </label>
                                    </>
                                )}

                                <div className="flex flex-row gap-2">
                                    {item.weight && item.weight != 0 && (
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
                                            //     required: "Name is required",
                                            // })}
                                            value={item.weight}
                                        />
                                    )}
                                </div>
                                {/* {errors.weightCriteria?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.weightCriteria?.message}
                                </p>
                            )} */}
                            </div>
                            <div className="col w-1/5 media-min-md:w-1/2">
                                {index == 0 && (
                                    <>
                                        <label className="labelInput flex justify-between">
                                            <span>Điểm</span>
                                            {/* <span>Total: {totalScore}</span> */}
                                        </label>
                                    </>
                                )}

                                <div className="flex flex-row gap-2">
                                    {item.weight && item.weight != 0 && (
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
                                            //     required: "Name is required",
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
                                    )}
                                </div>
                                {/* {errors.weightCriteria?.type && (
                                <p className=" text-normal text-red-500">
                                    {errors.weightCriteria?.message}
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
                            // max={10}
                            // min={0}
                            {...register("total", {
                                validate: (value) => {
                                    return (
                                        (value <= "10" && value >= "0") ||
                                        "Tổng điểm phải lớn hơn 0 bé hơn 10!"
                                    );
                                },
                            })}
                            // value={totalScore}
                        />
                        {errors.total?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.total?.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* <button onClick={handleSubmit}>Submit</button> */}

                {/* <div>
                        {criterias.map((item, index) => (
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

export default MarkEvaluationMethod;
