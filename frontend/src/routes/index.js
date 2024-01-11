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

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        role: "R1",
        pages: [
            // Trang chủ
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Trang chủ",
                path: pathRoutes?.R1?.home,
                element: <AdminHomePage />,
            },
            // Đổi thông tin
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <AdminChangeInformation />,
            },
            // Đổi mật khẩu
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <AdminChangePassword />,
            },

            // Council
            // Hội đồng
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Hội đồng",
                path: pathRoutes?.R1?.council,
                element: <Council />,
            },
            // Add Council
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Council",
                path: pathRoutes?.R1?.addCouncil,
                element: <AddCouncil type={"add"} />,
            },
            // Update Council
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Council",
                path: pathRoutes?.R1?.updateCouncilId,
                element: <AddCouncil type={"update"} />,
            },
            // Council Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Council Detail",
                path: pathRoutes?.R1?.councilDetailId,
                element: <AddCouncil type={"detail"} />,
            },
// Thesis
            // Đồ án
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đồ án",
                path: pathRoutes?.R1?.thesis,
                element: <Thesis />,
            },
            // Add Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Thesis",
                path: pathRoutes?.R1?.addThesis,
                element: <AddThesis type={"add"} />,
            },
            // Update Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Thesis",
                path: pathRoutes?.R1?.updateThesisId,
                element: <AddThesis type={"update"} />,
            },
            // Thesis Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Thesis Detail",
                path: pathRoutes?.R1?.thesisDetailId,
                element: <AddThesis type={"detail"} />,
            },

            // EvaluationMethod
            // PP đánh giá
            {
                //   icon: <HomeIcon {...icon} />,
                name: "PP đánh giá",
                path: pathRoutes?.R1?.evaluationMethod,
                element: <EvaluationMethod />,
            },
            // Add Evaluation Method
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Evaluation Method",
                path: pathRoutes?.R1?.addEvaluationMethod,
                element: <AddEvaluationMethod type={"add"} />,
            },
            // Update Evaluation Method
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Evaluation Method",
                path: pathRoutes?.R1?.updateEvaluationMethodId,
                element: <AddEvaluationMethod type={"update"} />,
            },
            // Evaluation Method Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Evaluation Method Detail",
                path: pathRoutes?.R1?.evaluationMethodDetailId,
                element: <AddEvaluationMethod type={"detail"} />,
            },

            // Lecturer
            // Giảng viên
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Giảng viên",
                path: pathRoutes?.R1?.lecturer,
                element: <Lecturer />,
            },
            // Add Lecturer
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Lecturer",
                path: pathRoutes?.R1?.addLecturer,
                element: <AddLecturer type={"add"} />,
            },
            // Update Lecturer
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Lecturer",
                path: pathRoutes?.R1?.updateLecturerId,
                element: <AddLecturer type={"update"} />,
            },
            // Lecturer Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Lecturer Detail",
                path: pathRoutes?.R1?.lecturerDetailId,
                element: <AddLecturer type={"detail"} />,
            },

            // Student
            // Sinh viên
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Sinh viên",
                path: pathRoutes?.R1?.student,
                element: <Student />,
            },
            // Add Student
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Student",
                path: pathRoutes?.R1?.addStudent,
                element: <AddStudent type={"add"} />,
            },
            // Update Student
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Student",
                path: pathRoutes?.R1?.updateStudentId,
                element: <AddStudent type={"update"} />,
            },
            // Student Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Student Detail",
                path: pathRoutes?.R1?.studentDetailId,
                element: <AddStudent type={"detail"} />,
            },
            // Department
            // Bộ môn
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Bộ môn",
                path: pathRoutes?.R1?.department,
                element: <Department />,
            },
            // Add Department
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Department",
                path: pathRoutes?.R1?.addDepartment,
                element: <AddDepartment type={"add"} />,
            },
            // Update Department
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Department",
                path: pathRoutes?.R1?.updateDepartmentId,
                element: <AddDepartment type={"update"} />,
            },
            // Department Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Department Detail",
                path: pathRoutes?.R1?.departmentDetailId,
                element: <AddDepartment type={"detail"} />,
            },
// Major
            // Ngành
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Ngành",
                path: pathRoutes?.R1?.major,
                element: <Major />,
            },
            // Add Major
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Major",
                path: pathRoutes?.R1?.addMajor,
                element: <AddMajor type={"add"} />,
            },
            // Update Major
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Major",
                path: pathRoutes?.R1?.updateMajorId,
                element: <AddMajor type={"update"} />,
            },
            // Major Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Major Detail",
                path: pathRoutes?.R1?.majorDetailId,
                element: <AddMajor type={"detail"} />,
            },
            // Block
            // Khối
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Khối",
                path: pathRoutes?.R1?.block,
                element: <Block />,
            },
            // Add Block
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Block",
                path: pathRoutes?.R1?.addBlock,
                element: <AddBlock type={"add"} />,
            },
            // Update Block
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Block",
                path: pathRoutes?.R1?.updateBlockId,
                element: <AddBlock type={"update"} />,
            },
            // Block Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Block Detail",
                path: pathRoutes?.R1?.blockDetailId,
                element: <AddBlock type={"detail"} />,
            },

            

            // Class
            // Lớp
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Lớp",
                path: pathRoutes?.R1?.class,
                element: <Class />,
            },
            // Add Class
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Class",
                path: pathRoutes?.R1?.addClass,
                element: <AddClass type={"add"} />,
            },
            // Update Class
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Class",
                path: pathRoutes?.R1?.updateClassId,
                element: <AddClass type={"update"} />,
            },
            // Class Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Class Detail",
                path: pathRoutes?.R1?.classDetailId,
                element: <AddClass type={"detail"} />,
            },

            

            // Topic
            // Đề tài
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đề tài",
                path: pathRoutes?.R1?.topic,
                element: <Topic />,
            },
            // Add Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Topic",
                path: pathRoutes?.R1?.addTopic,
                element: <AddTopic type={"add"} />,
            },
            // Update Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Topic",
                path: pathRoutes?.R1?.updateTopicId,
                element: <AddTopic type={"update"} />,
            },
            // Topic Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic Detail",
                path: pathRoutes?.R1?.topicDetailId,
                element: <AddTopic type={"detail"} />,
            },

            
            // ThesisSession
            // Khóa luận
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Khóa luận",
                path: pathRoutes?.R1?.thesisSession,
                element: <ThesisSession />,
            },
            // Add Thesis Session
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Thesis Session",
                path: pathRoutes?.R1?.addThesisSession,
                element: <AddThesisSession type={"add"} />,
            },
            // Update Thesis Session
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Thesis Session",
                path: pathRoutes?.R1?.updateThesisSessionId,
                element: <AddThesisSession type={"update"} />,
            },
            // Thesis Session Detail
            {
                //   icon: <HomeIcon {...icon} />,
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
                //   icon: <HomeIcon {...icon} />,
                name: "Trang chủ",
                path: "home",
                element: <DeanHomePage />,
            },

            // Đổi thông tin
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <AdminChangeInformation />,
            },
            // Đổi mật khẩu
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <AdminChangePassword />,
            },
            // SV Đăng ký HD
            {
                //   icon: <HomeIcon {...icon} />,
                name: "SV Đăng ký HD",
                path: pathRoutes?.R1?.student,
                element: <StudentAdvisor />,
            },
            // Add Student
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Student",
                path: pathRoutes?.R1?.addStudent,
                element: <AddStudentAdvisor type={"add"} />,
            },
            // Update Student
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Student",
                path: pathRoutes?.R1?.updateStudentId,
                element: <AddStudentAdvisor type={"update"} />,
            },
            // Student Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Student Detail",
                path: pathRoutes?.R1?.studentDetailId,
                element: <AddStudentAdvisor type={"detail"} />,
            },
            // SV Đăng ký đề tài
            {
                //   icon: <HomeIcon {...icon} />,
                name: "SV Đăng ký đề tài",
                path: pathRoutes?.R3?.topic,
                element: <TopicLecturer />,
            },
            // Add Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Topic",
                path: pathRoutes?.R3?.addTopic,
                element: <AddTopicLecturer type={"add"} />,
            },
            // Update Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Topic",
                path: pathRoutes?.R3?.updateTopicId,
                element: <AddTopicLecturer type={"update"} />,
            },
            // Topic Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic Detail",
                path: pathRoutes?.R3?.topicDetailId,
                element: <AddTopicLecturer type={"detail"} />,
            },
            
            // Hội đồng
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Hội đồng",
                path: pathRoutes?.R3?.council,
                element: <CouncilLecturer />,
            },
            // CouncilDetail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "CouncilDetail",
                path: pathRoutes?.R3?.councilDetailId,
                element: <ThesisCouncilLecturer />,
            },
            // CouncilDetailThesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "CouncilDetailThesis",
                path: pathRoutes?.R3?.councilDetailThesisId,
                element: <MarkEvaluationCriteria />,
            },
            // Thesis
            // Đồ án
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đồ án hướng dẫn",
                path: pathRoutes?.R3?.thesis,
                element: <ThesisLecturer />,
            },
            // Add Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Thesis",
                path: pathRoutes?.R3?.addThesis,
                element: <AddThesisLecturer type={"add"} />,
            },
            // Update Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Thesis",
                path: pathRoutes?.R3?.updateThesisId,
                element: <AddThesisLecturer type={"update"} />,
            },
            // Thesis Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Thesis Detail",
                path: pathRoutes?.R3?.thesisDetailId,
                element: <AddThesisLecturer type={"detail"} />,
            },


            // Topic
            // Đề tài
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đề tài bộ môn",
                path: pathRoutes?.R1?.topic,
                element: <Topic />,
            },
            // Add Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Topic",
                path: pathRoutes?.R1?.addTopic,
                element: <AddTopic type={"add"} />,
            },
            // Update Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Topic",
                path: pathRoutes?.R1?.updateTopicId,
                element: <AddTopic type={"update"} />,
            },
            // Topic Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic Detail",
                path: pathRoutes?.R1?.topicDetailId,
                element: <AddTopic type={"detail"} />,
            },
            // Đồ án
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đồ án bộ môn",
                path: pathRoutes?.R1?.thesis,
                element: <ThesisDean />,
            },
            // Add Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Thesis",
                path: pathRoutes?.R1?.addThesis,
                element: <AddThesisDean type={"add"} />,
            },
            // Update Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Thesis",
                path: pathRoutes?.R1?.updateThesisId,
                element: <AddThesisDean type={"update"} />,
            },
            // Thesis Detail
            {
                //   icon: <HomeIcon {...icon} />,
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
                //   icon: <HomeIcon {...icon} />,
                name: "Trang chủ",
                path: "home",
                element: <LecturerHomePage />,
            },
            // Đổi thông tin
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <AdminChangeInformation />,
            },
            // Đổi mật khẩu
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <AdminChangePassword />,
            },
            // SV Đăng ký HD
            {
                //   icon: <HomeIcon {...icon} />,
                name: "SV Đăng ký HD",
                path: pathRoutes?.R3?.student,
                element: <StudentAdvisor />,
            },
            // Add Student
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Student",
                path: pathRoutes?.R3?.addStudent,
                element: <AddStudentAdvisor type={"add"} />,
            },
            // Update Student
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Student",
                path: pathRoutes?.R3?.updateStudentId,
                element: <AddStudentAdvisor type={"update"} />,
            },
            // Student Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Student Detail",
                path: pathRoutes?.R3?.studentDetailId,
                element: <AddStudentAdvisor type={"detail"} />,
            },
            // SV Đăng ký đề tài
            {
                //   icon: <HomeIcon {...icon} />,
                name: "SV Đăng ký đề tài",
                path: pathRoutes?.R3?.topic,
                element: <TopicLecturer />,
            },
            // Add Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Topic",
                path: pathRoutes?.R3?.addTopic,
                element: <AddTopicLecturer type={"add"} />,
            },
            // Update Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Topic",
                path: pathRoutes?.R3?.updateTopicId,
                element: <AddTopicLecturer type={"update"} />,
            },
            // Topic Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic Detail",
                path: pathRoutes?.R3?.topicDetailId,
                element: <AddTopicLecturer type={"detail"} />,
            },
            
            // Hội đồng
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Hội đồng",
                path: pathRoutes?.R3?.council,
                element: <CouncilLecturer />,
            },
            // CouncilDetail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "CouncilDetail",
                path: pathRoutes?.R3?.councilDetailId,
                element: <ThesisCouncilLecturer />,
            },
            // CouncilDetailThesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "CouncilDetailThesis",
                path: pathRoutes?.R3?.councilDetailThesisId,
                element: <MarkEvaluationCriteria />,
            },
            // Thesis
            // Đồ án
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đồ án hướng dẫn",
                path: pathRoutes?.R3?.thesis,
                element: <ThesisLecturer />,
            },
            // Add Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Thesis",
                path: pathRoutes?.R3?.addThesis,
                element: <AddThesisLecturer type={"add"} />,
            },
            // Update Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Thesis",
                path: pathRoutes?.R3?.updateThesisId,
                element: <AddThesisLecturer type={"update"} />,
            },
            // Thesis Detail
            {
                //   icon: <HomeIcon {...icon} />,
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
                //   icon: <HomeIcon {...icon} />,
                name: "Trang chủ",
                path: "home",
                element: <StudentHomePage />,
            },
            // Đổi thông tin
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi thông tin",
                path: pathRoutes?.R1?.changeInformation,
                element: <StudentChangeInformation />,
            },
            // Đổi mật khẩu
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đổi mật khẩu",
                path: pathRoutes?.R1?.changePassword,
                element: <StudentChangePassword />,
            },

            // Topic
            // Đề tài
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đề tài",
                path: pathRoutes?.R1?.topic,
                element: <TopicStudent />,
            },
            // Add Topic
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Topic",
                path: pathRoutes?.R1?.addTopic,
                element: <AddTopicStudent type={"add"} />,
            },
            // Topic Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Topic Detail",
                path: pathRoutes?.R1?.topicDetailId,
                element: <AddTopicStudent type={"detail"} />,
            },
            
            // Topic
            // Giảng viên hướng dẫn
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Giảng viên hướng dẫn",
                path: pathRoutes?.R1?.lecturer,
                element: <LecturerAdvisor />,
            },
            // Lecturer Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Lecturer Detail",
                path: pathRoutes?.R1?.lecturerDetailId,
                element: <AddLecturerAdvisor type={"detail"} />,
            },
            // Thesis
            // Đồ án
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Đồ án",
                path: pathRoutes?.R1?.thesis,
                element: <ThesisStudent />,
            },
            // Add Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Add Thesis",
                path: pathRoutes?.R1?.addThesis,
                element: <AddThesisStudent type={"add"} />,
            },
            // Update Thesis
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Update Thesis",
                path: pathRoutes?.R1?.updateThesisId,
                element: <AddThesisStudent type={"update"} />,
            },
            // Thesis Detail
            {
                //   icon: <HomeIcon {...icon} />,
                name: "Thesis Detail",
                path: pathRoutes?.R1?.thesisDetailId,
                element: <AddThesisStudent type={"detail"} />,
            },

        ],
    },
];
