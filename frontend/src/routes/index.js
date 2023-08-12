import AdminHomePage from "../pages/admin/AdminHomePage";
import Class from "../pages/admin/class/Class";
import ClassDetail from "../pages/admin/class/ClassDetail";
import LecturerHomePage from "../pages/lecturer/LecturerHomePage";
import Topic from "../pages/lecturer/topic/Topic";

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
                path: "",
                element: <AdminHomePage />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Class",
                path: "class",
                element: <Class />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Class Detail",
                path: "class/:id",
                element: <ClassDetail />,
            },
        ],
    },
    {
        role: "R2",
        pages: [
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Home",
                path: "",
                element: <LecturerHomePage />,
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
