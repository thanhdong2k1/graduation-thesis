import ChangeInformation from "../pages/ChangeInformation";
import ChangePassword from "../pages/ChangePassword";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AddCouncil from "../pages/admin/council/AddCouncil";
import Council from "../pages/admin/council/Council";
import CouncilDetail from "../pages/admin/council/CouncilDetail";
import LecturerHomePage from "../pages/lecturer/LecturerHomePage";
import Topic from "../pages/lecturer/topic/Topic";
import StudentHomePage from "../pages/student/StudentHomePage";
import pathRoutes from "../utils/pathRoutes";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        role: "R1",
        pages: [
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Home",
                path: pathRoutes.R1.home,
                element: <AdminHomePage />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Information",
                path: pathRoutes.R1.changeInformation,
                element: <ChangeInformation />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Password",
                path: pathRoutes.R1.changePassword,
                element: <ChangePassword />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Council",
                path: pathRoutes.R1.council,
                element: <Council />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Council",
                path: pathRoutes.R1.addCouncil,
                element: <AddCouncil />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Council Detail",
                path: pathRoutes.R1.councilDetail,
                element: <CouncilDetail />,
            },
        ],
    },
    {
        role: "R2",
        pages: [
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Home",
                path: "home",
                element: <LecturerHomePage />,
            },

            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Information",
                path: pathRoutes.R1.changeInformation,
                element: <ChangeInformation />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Password",
                path: pathRoutes.R1.changePassword,
                element: <ChangePassword />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic",
                path: "topic",
                element: <Topic />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Council",
                path: pathRoutes.R1.council,
                element: <Council />,
            },
        ],
    },
    {
        role: "R3",
        pages: [
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Home",
                path: "home",
                element: <LecturerHomePage />,
            },

            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Information",
                path: pathRoutes.R1.changeInformation,
                element: <ChangeInformation />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Password",
                path: pathRoutes.R1.changePassword,
                element: <ChangePassword />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic",
                path: "topic",
                element: <Topic />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Council",
                path: pathRoutes.R1.council,
                element: <Council />,
            },
        ],
    },
    {
        role: "R4",
        pages: [
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Home",
                path: "home",
                element: <StudentHomePage />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Information",
                path: pathRoutes.R1.changeInformation,
                element: <ChangeInformation />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Change Password",
                path: pathRoutes.R1.changePassword,
                element: <ChangePassword />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic",
                path: "topic",
                element: <Topic />,
            },
        ],
    },
];
