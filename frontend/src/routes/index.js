import ChangeInformation from "../pages/ChangeInformation";
import ChangePassword from "../pages/ChangePassword";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AddBlock from "../pages/admin/block/AddBlock";
import Block from "../pages/admin/block/Block";
import AddClass from "../pages/admin/class/AddClass";
import Class from "../pages/admin/class/Class";
import AddCouncil from "../pages/admin/council/AddCouncil";
import Council from "../pages/admin/council/Council";
import AddDepartment from "../pages/admin/department/AddDepartment";
import Department from "../pages/admin/department/Department";
import AddEvaluationMethod from "../pages/admin/evaluationMethod/AddEvaluationMethod";
import EvaluationMethod from "../pages/admin/evaluationMethod/EvaluationMethod";
import AddLecturer from "../pages/admin/lecturer/AddLecturer";
import Lecturer from "../pages/admin/lecturer/Lecturer";
import AddMajor from "../pages/admin/major/AddMajor";
import Major from "../pages/admin/major/Major";
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

            // Council
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
                element: <AddCouncil type={"add"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Council",
                path: pathRoutes.R1.updateCouncilId,
                element: <AddCouncil type={"update"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Council Detail",
                path: pathRoutes.R1.councilDetailId,
                element: <AddCouncil type={"detail"} />,
            },

            // Department
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Department",
                path: pathRoutes.R1.department,
                element: <Department />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Department",
                path: pathRoutes.R1.addDepartment,
                element: <AddDepartment type={"add"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Department",
                path: pathRoutes.R1.updateDepartmentId,
                element: <AddDepartment type={"update"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Department Detail",
                path: pathRoutes.R1.departmentDetailId,
                element: <AddDepartment type={"detail"} />,
            },

            // Block
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Block",
                path: pathRoutes.R1.block,
                element: <Block />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Block",
                path: pathRoutes.R1.addBlock,
                element: <AddBlock type={"add"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Block",
                path: pathRoutes.R1.updateBlockId,
                element: <AddBlock type={"update"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Block Detail",
                path: pathRoutes.R1.blockDetailId,
                element: <AddBlock type={"detail"} />,
            },

            // Major
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Major",
                path: pathRoutes.R1.major,
                element: <Major />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Major",
                path: pathRoutes.R1.addMajor,
                element: <AddMajor type={"add"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Major",
                path: pathRoutes.R1.updateMajorId,
                element: <AddMajor type={"update"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Major Detail",
                path: pathRoutes.R1.majorDetailId,
                element: <AddMajor type={"detail"} />,
            },

            // Class
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Class",
                path: pathRoutes.R1.class,
                element: <Class />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Class",
                path: pathRoutes.R1.addClass,
                element: <AddClass type={"add"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Class",
                path: pathRoutes.R1.updateClassId,
                element: <AddClass type={"update"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Class Detail",
                path: pathRoutes.R1.classDetailId,
                element: <AddClass type={"detail"} />,
            },

            // Lecturer
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Lecturer",
                path: pathRoutes.R1.lecturer,
                element: <Lecturer />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Lecturer",
                path: pathRoutes.R1.addLecturer,
                element: <AddLecturer type={"add"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Lecturer",
                path: pathRoutes.R1.updateLecturerId,
                element: <AddLecturer type={"update"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Lecturer Detail",
                path: pathRoutes.R1.lecturerDetailId,
                element: <AddLecturer type={"detail"} />,
            },

            // EvaluationMethod
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Evaluation Method",
                path: pathRoutes.R1.evaluationMethod,
                element: <EvaluationMethod />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Evaluation Method",
                path: pathRoutes.R1.addEvaluationMethod,
                element: <AddEvaluationMethod type={"add"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Evaluation Method",
                path: pathRoutes.R1.updateEvaluationMethodId,
                element: <AddEvaluationMethod type={"update"} />,
            },
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Evaluation Method Detail",
                path: pathRoutes.R1.evaluationMethodDetailId,
                element: <AddEvaluationMethod type={"detail"} />,
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
