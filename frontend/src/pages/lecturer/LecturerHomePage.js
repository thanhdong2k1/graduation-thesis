import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../utils/createInstance";
import { logginSuccess } from "../../redux/authSlice";
import { apiLecturer } from "../../redux/apiRequest";
import { useEffect, useState } from "react";
import {
    TbHome2,
    TbUserShield,
    TbFileCertificate,
    TbUser,
    TbUsersGroup,
    TbBooks,
    TbLayersLinked,
    TbGridPattern,
    TbLayoutGrid,
    TbFileText,
    TbCheckupList,
    TbFlag,
    TbUserPlus,
    TbFilePencil,
    TbFilePlus,
    TbFileSearch2,
    TbFileCode,
} from "react-icons/tb";

const LecturerHomePage = () => {
    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);

    const [statistic, setStatistic] = useState();
    useEffect(() => {
        apiLecturer
            .getStatisticLecturer({
                user: currentUser,
                axiosJWT: axiosJWT,
            })
            .then((res) => {
                setStatistic(res?.data);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div class="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                                                <TbUserShield className="w-6 h-6" />

                    </div>
                    <div class="p-4 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Tổng hội đồng tham gia
                        </p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {statistic?.statisticCouncilJoin ?? "???"}
                        </h4>
                    </div>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div class="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                                                                        <TbCheckupList className="w-6 h-6" />

                    </div>
                    <div class="p-4 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Chấm điểm hội đồng
                        </p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {statistic?.statisticCouncilMark}
                        </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                        <strong
                            class={`${
                                statistic?.statisticCouncilMark ==
                                statistic?.statisticCouncilMarked
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {statistic?.statisticCouncilMarked ?? "???"}/
                            {statistic?.statisticCouncilMark ?? "???"}
                        </strong>
                        &nbsp;đồ án đã chấm
                    </div>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div class="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                                                                        <TbFileCertificate className="w-6 h-6" />

                    </div>
                    <div class="p-4 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Tổng đồ án hướng dẫn
                        </p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {statistic?.statisticTotalThesisAdvisor ?? "???"}
                        </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                        <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong
                                class={`${
                                    statistic?.statisticThesisAdvisorAvailabeResult ==
                                    statistic?.statisticTotalThesisAdvisor
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {statistic?.statisticThesisAdvisorAvailabeResult ??
                                    "???"}
                                /{statistic?.statisticTotalThesisAdvisor ?? "???"}
                            </strong>
                            &nbsp;đã có kết quả
                        </p>
                    </div>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div class="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            class="w-6 h-6 text-white"
                        >
                            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                        </svg>
                    </div>
                    <div class="p-4 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Tỷ lệ thông qua
                        </p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {(+statistic?.statisticThesisAdvisorSuccessResult/+statistic?.statisticThesisAdvisorAvailabeResult)?(+statistic?.statisticThesisAdvisorSuccessResult/+statistic?.statisticThesisAdvisorAvailabeResult)*100 : "???"}%
                        </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                        <strong
                            class={`${
                                statistic?.statisticThesisAdvisorAvailabeResult ==
                                statistic?.statisticThesisAdvisorSuccessResult
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {statistic?.statisticThesisAdvisorSuccessResult ?? "???"}/
                            {statistic?.statisticThesisAdvisorAvailabeResult ?? "???"}
                        </strong>
                        &nbsp;kết quả đạt
                    </div>
                </div>
            </div>
    );
};

export default LecturerHomePage;
