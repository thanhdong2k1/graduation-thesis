import { useEffect, useState } from "react";
import { apiAdmin } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { logginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../utils/createInstance";
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

const AdminHomePage = () => {
    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);

    const [statistic, setStatistic] = useState();
    useEffect(() => {
        apiAdmin
            .getStatistic({
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
        <>
            <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div class="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                                                <TbUsersGroup className="w-6 h-6" />

                    </div>
                    <div class="p-4 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Tổng sinh viên
                        </p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {statistic?.statisticTotalStudent ?? "???"}
                        </h4>
                    </div>
                    {/* <div class="border-t border-blue-gray-50 p-4">
                        <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong class="text-green-500">+3%</strong>
                            &nbsp;than last month
                        </p>
                    </div> */}
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div class="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                                                                        <TbUser className="w-6 h-6" />

                    </div>
                    <div class="p-4 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Tổng giảng viên
                        </p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {statistic?.statisticTotalLecturer ?? "???"}
                        </h4>
                    </div>
                    {/* <div class="border-t border-blue-gray-50 p-4">
                        <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong class="text-red-500">-2%</strong>&nbsp;than
                            yesterday
                        </p>
                    </div> */}
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div class="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                                                                        <TbFileCertificate className="w-6 h-6" />

                    </div>
                    <div class="p-4 text-right">
                        <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Tổng đồ án
                        </p>
                        <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {statistic?.statisticTotalThesis ?? "???"}
                        </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                        <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong
                                class={`${
                                    statistic?.statisticThesisAvailabeResult ==
                                    statistic?.statisticTotalThesis
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {statistic?.statisticThesisAvailabeResult ??
                                    "???"}
                                /{statistic?.statisticTotalThesis ?? "???"}
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
                            {(+statistic?.statisticThesisSuccessResult/+statistic?.statisticThesisAvailabeResult)?(+statistic?.statisticThesisSuccessResult/+statistic?.statisticThesisAvailabeResult).toFixed(4)*100 : "???"}%
                        </h4>
                    </div>
                    <div class="border-t border-blue-gray-50 p-4">
                        <strong
                            class={`${
                                statistic?.statisticThesisAvailabeResult ==
                                statistic?.statisticThesisSuccessResult
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {statistic?.statisticThesisSuccessResult ?? "???"}/
                            {statistic?.statisticThesisAvailabeResult ?? "???"}
                        </strong>
                        &nbsp;kết quả đạt
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHomePage;
