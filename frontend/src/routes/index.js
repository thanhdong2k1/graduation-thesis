import AdminChangeInformation from "../pages/admin/AdminChangeInformation";
import AdminChangePassword from "../pages/admin/AdminChangePassword";
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
import AddStudent from "../pages/admin/student/AddStudent";
import Student from "../pages/admin/student/Student";
import AddThesis from "../pages/admin/thesis/AddThesis";
import Thesis from "../pages/admin/thesis/Thesis";
import AddThesisSession from "../pages/admin/thesisSession/AddThesisSession";
import ThesisSession from "../pages/admin/thesisSession/ThesisSession";
import AddTopic from "../pages/admin/topic/AddTopic";
import Topic from "../pages/admin/topic/Topic";
import DeanHomePage from "../pages/lecturer/DeanHomePage";
import LecturerHomePage from "../pages/lecturer/LecturerHomePage";
import CouncilLecturer from "../pages/lecturer/council/CouncilLecturer";
import MarkEvaluationCriteria from "../pages/lecturer/council/MarkEvaluationCriteria";
import ThesisCouncilLecturer from "../pages/lecturer/council/ThesisCouncilLecturer";
import AddThesisDean from "../pages/lecturer/deanThesis/AddThesisDean";
import ThesisDean from "../pages/lecturer/deanThesis/ThesisDean";
import AddStudentAdvisor from "../pages/lecturer/student/AddStudentAdvisor";
import StudentAdvisor from "../pages/lecturer/student/StudentAdvisor";
import AddThesisLecturer from "../pages/lecturer/thesis/AddThesisLecturer";
import ThesisLecturer from "../pages/lecturer/thesis/ThesisLecturer";
import AddTopicLecturer from "../pages/lecturer/topic/AddTopicLecturer";
import TopicLecturer from "../pages/lecturer/topic/TopicLecturer";
import StudentChangeInformation from "../pages/student/StudentChangeInformation";
import StudentChangePassword from "../pages/student/StudentChangePassword";
import StudentHomePage from "../pages/student/StudentHomePage";
import AddLecturerAdvisor from "../pages/student/lecturerAdvisor/AddLecturerAdvisor";
import LecturerAdvisor from "../pages/student/lecturerAdvisor/LecturerAdvisor";
import AddThesisStudent from "../pages/student/thesis/AddThesisStudent";
import ThesisStudent from "../pages/student/thesis/ThesisStudent";
import AddTopicStudent from "../pages/student/topic/AddTopicStudent";
import TopicStudent from "../pages/student/topic/TopicStudent";
import pathRoutes from "../utils/pathRoutes";
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

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        role: "R1",
        pages: [
            // Trang chủ
            {
                icon: <TbHome2  className="icon mr-2" />,
                name: "Trang chủ",
                path: pathRoutes?.R1?.home,
                element: <AdminHomePage />,
            },
            // Đổi thông tin
            {
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <AdminChangeInformation />,
            },
            // Đổi mật khẩu
            {
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <AdminChangePassword />,
            },

            // Council
            // Hội đồng
            {
                icon: <TbUserShield  className="icon mr-2" />,
                name: "Hội đồng",
                path: pathRoutes?.R1?.council,
                element: <Council />,
            },
            // Add Council
            {
                name: "Add Council",
                path: pathRoutes?.R1?.addCouncil,
                element: <AddCouncil type={"add"} />,
            },
            // Update Council
            {
                name: "Update Council",
                path: pathRoutes?.R1?.updateCouncilId,
                element: <AddCouncil type={"update"} />,
            },
            // Council Detail
            {
                name: "Council Detail",
                path: pathRoutes?.R1?.councilDetailId,
                element: <AddCouncil type={"detail"} />,
            },
            // Thesis
            // Đồ án
            {
                icon: <TbFileCertificate  className="icon mr-2" />,
                name: "Đồ án",
                path: pathRoutes?.R1?.thesis,
                element: <Thesis />,
            },
            // Add Thesis
            {
                name: "Add Thesis",
                path: pathRoutes?.R1?.addThesis,
                element: <AddThesis type={"add"} />,
            },
            // Update Thesis
            {
                name: "Update Thesis",
                path: pathRoutes?.R1?.updateThesisId,
                element: <AddThesis type={"update"} />,
            },
            // Thesis Detail
            {
                name: "Thesis Detail",
                path: pathRoutes?.R1?.thesisDetailId,
                element: <AddThesis type={"detail"} />,
            },

            // Lecturer
            // Giảng viên
            {
                icon: <TbUser  className="icon mr-2" />,
                name: "Giảng viên",
                path: pathRoutes?.R1?.lecturer,
                element: <Lecturer />,
            },
            // Add Lecturer
            {
                name: "Add Lecturer",
                path: pathRoutes?.R1?.addLecturer,
                element: <AddLecturer type={"add"} />,
            },
            // Update Lecturer
            {
                name: "Update Lecturer",
                path: pathRoutes?.R1?.updateLecturerId,
                element: <AddLecturer type={"update"} />,
            },
            // Lecturer Detail
            {
                name: "Lecturer Detail",
                path: pathRoutes?.R1?.lecturerDetailId,
                element: <AddLecturer type={"detail"} />,
            },

            // Student
            // Sinh viên
            {
                icon: <TbUsersGroup  className="icon mr-2" />,
                name: "Sinh viên",
                path: pathRoutes?.R1?.student,
                element: <Student />,
            },
            // Add Student
            {
                name: "Add Student",
                path: pathRoutes?.R1?.addStudent,
                element: <AddStudent type={"add"} />,
            },
            // Update Student
            {
                name: "Update Student",
                path: pathRoutes?.R1?.updateStudentId,
                element: <AddStudent type={"update"} />,
            },
            // Student Detail
            {
                name: "Student Detail",
                path: pathRoutes?.R1?.studentDetailId,
                element: <AddStudent type={"detail"} />,
            },
            // Department
            // Bộ môn
            {
                icon: <TbBooks  className="icon mr-2" />,
                name: "Bộ môn",
                path: pathRoutes?.R1?.department,
                element: <Department />,
            },
            // Add Department
            {
                name: "Add Department",
                path: pathRoutes?.R1?.addDepartment,
                element: <AddDepartment type={"add"} />,
            },
            // Update Department
            {
                name: "Update Department",
                path: pathRoutes?.R1?.updateDepartmentId,
                element: <AddDepartment type={"update"} />,
            },
            // Department Detail
            {
                name: "Department Detail",
                path: pathRoutes?.R1?.departmentDetailId,
                element: <AddDepartment type={"detail"} />,
            },
            // Major
            // Ngành
            {
                icon: <TbLayersLinked  className="icon mr-2" />,
                name: "Ngành",
                path: pathRoutes?.R1?.major,
                element: <Major />,
            },
            // Add Major
            {
                name: "Add Major",
                path: pathRoutes?.R1?.addMajor,
                element: <AddMajor type={"add"} />,
            },
            // Update Major
            {
                name: "Update Major",
                path: pathRoutes?.R1?.updateMajorId,
                element: <AddMajor type={"update"} />,
            },
            // Major Detail
            {
                name: "Major Detail",
                path: pathRoutes?.R1?.majorDetailId,
                element: <AddMajor type={"detail"} />,
            },
            // Block
            // Khối
            {
                icon: <TbGridPattern  className="icon mr-2" />,
                name: "Khối",
                path: pathRoutes?.R1?.block,
                element: <Block />,
            },
            // Add Block
            {
                name: "Add Block",
                path: pathRoutes?.R1?.addBlock,
                element: <AddBlock type={"add"} />,
            },
            // Update Block
            {
                name: "Update Block",
                path: pathRoutes?.R1?.updateBlockId,
                element: <AddBlock type={"update"} />,
            },
            // Block Detail
            {
                name: "Block Detail",
                path: pathRoutes?.R1?.blockDetailId,
                element: <AddBlock type={"detail"} />,
            },

            // Class
            // Lớp
            {
                icon: <TbLayoutGrid  className="icon mr-2" />,
                name: "Lớp",
                path: pathRoutes?.R1?.class,
                element: <Class />,
            },
            // Add Class
            {
                name: "Add Class",
                path: pathRoutes?.R1?.addClass,
                element: <AddClass type={"add"} />,
            },
            // Update Class
            {
                name: "Update Class",
                path: pathRoutes?.R1?.updateClassId,
                element: <AddClass type={"update"} />,
            },
            // Class Detail
            {
                name: "Class Detail",
                path: pathRoutes?.R1?.classDetailId,
                element: <AddClass type={"detail"} />,
            },

            // Topic
            // Đề tài
            {
                icon: <TbFileText  className="icon mr-2" />,
                name: "Đề tài",
                path: pathRoutes?.R1?.topic,
                element: <Topic />,
            },
            // Add Topic
            {
                name: "Add Topic",
                path: pathRoutes?.R1?.addTopic,
                element: <AddTopic type={"add"} />,
            },
            // Update Topic
            {
                name: "Update Topic",
                path: pathRoutes?.R1?.updateTopicId,
                element: <AddTopic type={"update"} />,
            },
            // Topic Detail
            {
                name: "Topic Detail",
                path: pathRoutes?.R1?.topicDetailId,
                element: <AddTopic type={"detail"} />,
            },

            // EvaluationMethod
            // PP đánh giá
            {
                icon: <TbCheckupList  className="icon mr-2" />,
                name: "PP đánh giá",
                path: pathRoutes?.R1?.evaluationMethod,
                element: <EvaluationMethod />,
            },
            // Add Evaluation Method
            {
                name: "Add Evaluation Method",
                path: pathRoutes?.R1?.addEvaluationMethod,
                element: <AddEvaluationMethod type={"add"} />,
            },
            // Update Evaluation Method
            {
                name: "Update Evaluation Method",
                path: pathRoutes?.R1?.updateEvaluationMethodId,
                element: <AddEvaluationMethod type={"update"} />,
            },
            // Evaluation Method Detail
            {
                name: "Evaluation Method Detail",
                path: pathRoutes?.R1?.evaluationMethodDetailId,
                element: <AddEvaluationMethod type={"detail"} />,
            },

            // ThesisSession
            // Khóa luận
            {
                icon: <TbFlag  className="icon mr-2" />,
                name: "Khóa luận",
                path: pathRoutes?.R1?.thesisSession,
                element: <ThesisSession />,
            },
            // Add Thesis Session
            {
                name: "Add Thesis Session",
                path: pathRoutes?.R1?.addThesisSession,
                element: <AddThesisSession type={"add"} />,
            },
            // Update Thesis Session
            {
                name: "Update Thesis Session",
                path: pathRoutes?.R1?.updateThesisSessionId,
                element: <AddThesisSession type={"update"} />,
            },
            // Thesis Session Detail
            {
                name: "Thesis Session Detail",
                path: pathRoutes?.R1?.thesisSessionDetailId,
                element: <AddThesisSession type={"detail"} />,
            },
        ],
    },
    {
        role: "R2",
        pages: [
            // Trang chủ
            {
                icon: <TbHome2  className="icon mr-2" />,
                name: "Trang chủ",
                path: "home",
                element: <DeanHomePage />,
            },

            // Đổi thông tin
            {
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <AdminChangeInformation />,
            },
            // Đổi mật khẩu
            {
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <AdminChangePassword />,
            },
            // SV Đăng ký HD
            {
                icon: <TbUserPlus  className="icon mr-2" />,
                name: "Xác nhận hướng dẫn",
                path: pathRoutes?.R1?.student,
                element: <StudentAdvisor />,
            },
            // Add Student
            {
                name: "Add Student",
                path: pathRoutes?.R1?.addStudent,
                element: <AddStudentAdvisor type={"add"} />,
            },
            // Update Student
            {
                name: "Update Student",
                path: pathRoutes?.R1?.updateStudentId,
                element: <AddStudentAdvisor type={"update"} />,
            },
            // Student Detail
            {
                name: "Student Detail",
                path: pathRoutes?.R1?.studentDetailId,
                element: <AddStudentAdvisor type={"detail"} />,
            },
            // SV Đăng ký đề tài
            {
                icon: <TbFilePlus  className="icon mr-2" />,
                name: "Xác nhận đề tài",
                path: pathRoutes?.R3?.topic,
                element: <TopicLecturer />,
            },
            // Add Topic
            {
                name: "Add Topic",
                path: pathRoutes?.R3?.addTopic,
                element: <AddTopicLecturer type={"add"} />,
            },
            // Update Topic
            {
                name: "Update Topic",
                path: pathRoutes?.R3?.updateTopicId,
                element: <AddTopicLecturer type={"update"} />,
            },
            // Topic Detail
            {
                name: "Topic Detail",
                path: pathRoutes?.R3?.topicDetailId,
                element: <AddTopicLecturer type={"detail"} />,
            },

            // Hội đồng
            {
                icon: <TbUserShield  className="icon mr-2" />,
                name: "Hội đồng tham gia",
                path: pathRoutes?.R3?.council,
                element: <CouncilLecturer />,
            },
            // CouncilDetail
            {
                name: "CouncilDetail",
                path: pathRoutes?.R3?.councilDetailId,
                element: <ThesisCouncilLecturer />,
            },
            // CouncilDetailThesis
            {
                name: "CouncilDetailThesis",
                path: pathRoutes?.R3?.councilDetailThesisId,
                element: <MarkEvaluationCriteria />,
            },
            // Thesis
            // Đồ án
            {
                icon: <TbFilePencil  className="icon mr-2" />,
                name: "Đồ án hướng dẫn",
                path: pathRoutes?.R3?.thesis,
                element: <ThesisLecturer />,
            },
            // Add Thesis
            {
                name: "Add Thesis",
                path: pathRoutes?.R3?.addThesis,
                element: <AddThesisLecturer type={"add"} />,
            },
            // Update Thesis
            {
                name: "Update Thesis",
                path: pathRoutes?.R3?.updateThesisId,
                element: <AddThesisLecturer type={"update"} />,
            },
            // Thesis Detail
            {
                name: "Thesis Detail",
                path: pathRoutes?.R3?.thesisDetailId,
                element: <AddThesisLecturer type={"detail"} />,
            },

            // Topic
            // Đề tài
            {
                icon: <TbFileText  className="icon mr-2" />,
                name: "Đề tài bộ môn",
                path: pathRoutes?.R1?.topic,
                element: <Topic />,
            },
            // Add Topic
            {
                name: "Add Topic",
                path: pathRoutes?.R1?.addTopic,
                element: <AddTopic type={"add"} />,
            },
            // Update Topic
            {
                name: "Update Topic",
                path: pathRoutes?.R1?.updateTopicId,
                element: <AddTopic type={"update"} />,
            },
            // Topic Detail
            {
                name: "Topic Detail",
                path: pathRoutes?.R1?.topicDetailId,
                element: <AddTopic type={"detail"} />,
            },
            // Đồ án
            {
                icon: <TbFileCertificate  className="icon mr-2" />,
                name: "Đồ án bộ môn",
                path: pathRoutes?.R1?.thesis,
                element: <ThesisDean />,
            },
            // Add Thesis
            {
                name: "Add Thesis",
                path: pathRoutes?.R1?.addThesis,
                element: <AddThesisDean type={"add"} />,
            },
            // Update Thesis
            {
                name: "Update Thesis",
                path: pathRoutes?.R1?.updateThesisId,
                element: <AddThesisDean type={"update"} />,
            },
            // Thesis Detail
            {
                name: "Thesis Detail",
                path: pathRoutes?.R1?.thesisDetailId,
                element: <AddThesisDean type={"detail"} />,
            },
        ],
    },
    {
        role: "R3",
        pages: [
            // Trang chủ
            {
                icon: <TbHome2  className="icon mr-2" />,
                name: "Trang chủ",
                path: "home",
                element: <LecturerHomePage />,
            },
            // Đổi thông tin
            {
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <AdminChangeInformation />,
            },
            // Đổi mật khẩu
            {
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <AdminChangePassword />,
            },
            // SV Đăng ký HD
            {
                icon: <TbUserPlus  className="icon mr-2" />,
                name: "Xác nhận hướng dẫn",
                path: pathRoutes?.R3?.student,
                element: <StudentAdvisor />,
            },
            // Add Student
            {
                name: "Add Student",
                path: pathRoutes?.R3?.addStudent,
                element: <AddStudentAdvisor type={"add"} />,
            },
            // Update Student
            {
                name: "Update Student",
                path: pathRoutes?.R3?.updateStudentId,
                element: <AddStudentAdvisor type={"update"} />,
            },
            // Student Detail
            {
                name: "Student Detail",
                path: pathRoutes?.R3?.studentDetailId,
                element: <AddStudentAdvisor type={"detail"} />,
            },
            // SV Đăng ký đề tài
            {
                icon: <TbFilePlus  className="icon mr-2" />,
                name: "Xác nhận đề tài",
                path: pathRoutes?.R3?.topic,
                element: <TopicLecturer />,
            },
            // Add Topic
            {
                name: "Add Topic",
                path: pathRoutes?.R3?.addTopic,
                element: <AddTopicLecturer type={"add"} />,
            },
            // Update Topic
            {
                name: "Update Topic",
                path: pathRoutes?.R3?.updateTopicId,
                element: <AddTopicLecturer type={"update"} />,
            },
            // Topic Detail
            {
                name: "Topic Detail",
                path: pathRoutes?.R3?.topicDetailId,
                element: <AddTopicLecturer type={"detail"} />,
            },

            // Hội đồng
            {
                icon: <TbUserShield  className="icon mr-2" />,
                name: "Hội đồng tham gia",
                path: pathRoutes?.R3?.council,
                element: <CouncilLecturer />,
            },
            // CouncilDetail
            {
                name: "CouncilDetail",
                path: pathRoutes?.R3?.councilDetailId,
                element: <ThesisCouncilLecturer />,
            },
            // CouncilDetailThesis
            {
                name: "CouncilDetailThesis",
                path: pathRoutes?.R3?.councilDetailThesisId,
                element: <MarkEvaluationCriteria />,
            },
            // Thesis
            // Đồ án
            {
                icon: <TbFilePencil  className="icon mr-2" />,
                name: "Đồ án hướng dẫn",
                path: pathRoutes?.R3?.thesis,
                element: <ThesisLecturer />,
            },
            // Add Thesis
            {
                name: "Add Thesis",
                path: pathRoutes?.R3?.addThesis,
                element: <AddThesisLecturer type={"add"} />,
            },
            // Update Thesis
            {
                name: "Update Thesis",
                path: pathRoutes?.R3?.updateThesisId,
                element: <AddThesisLecturer type={"update"} />,
            },
            // Thesis Detail
            {
                name: "Thesis Detail",
                path: pathRoutes?.R3?.thesisDetailId,
                element: <AddThesisLecturer type={"detail"} />,
            },
        ],
    },
    {
        role: "R4",
        pages: [
            // Trang chủ
            {
                icon: <TbHome2  className="icon mr-2" />,
                name: "Trang chủ",
                path: "home",
                element: <StudentHomePage />,
            },
            // Đổi thông tin
            {
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <StudentChangeInformation />,
            },
            // Đổi mật khẩu
            {
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <StudentChangePassword />,
            },

            // Giảng viên hướng dẫn
            {
                icon: <TbUserPlus  className="icon mr-2" />,
                name: "Đăng ký hướng dẫn",
                path: pathRoutes?.R1?.lecturer,
                element: <LecturerAdvisor />,
            },
            // Lecturer Detail
            {
                name: "Lecturer Detail",
                path: pathRoutes?.R1?.lecturerDetailId,
                element: <AddLecturerAdvisor type={"detail"} />,
            },
            // Topic
            // Đề tài
            {
                icon: <TbFilePlus  className="icon mr-2" />,
                name: "Đăng ký đề tài",
                path: pathRoutes?.R1?.topic,
                element: <TopicStudent />,
            },
            // Add Topic
            {
                name: "Add Topic",
                path: pathRoutes?.R1?.addTopic,
                element: <AddTopicStudent type={"add"} />,
            },
            // Topic Detail
            {
                name: "Topic Detail",
                path: pathRoutes?.R1?.topicDetailId,
                element: <AddTopicStudent type={"detail"} />,
            },

            // Topic
            
            // Thesis
            // Đồ án
            {
                icon: <TbFileCertificate  className="icon mr-2" />,
                name: "Đồ án thực hiện",
                path: pathRoutes?.R1?.thesis,
                element: <ThesisStudent />,
            },
            // Add Thesis
            {
                name: "Add Thesis",
                path: pathRoutes?.R1?.addThesis,
                element: <AddThesisStudent type={"add"} />,
            },
            // Update Thesis
            {
                name: "Update Thesis",
                path: pathRoutes?.R1?.updateThesisId,
                element: <AddThesisStudent type={"update"} />,
            },
            // Thesis Detail
            {
                name: "Thesis Detail",
                path: pathRoutes?.R1?.thesisDetailId,
                element: <AddThesisStudent type={"detail"} />,
            },
        ],
    },
];
