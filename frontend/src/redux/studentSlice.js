import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "student",
    initialState: {
        isFetching: false,
        error: false,
        information: [],
        councils: [],
        departments: [],
        majors: [],
        blocks: [],
        lecturers: [],
        topics: [],
        classes: [],
        students: [],
        theses: [],
        points: [],
        councilDetails: [],
        thesisSessions: [],
        pointCriterias: [],
        evaluationMethods: [],
        evaluationCriterias: [],
        totalRecords: 0,
        gender: [],
        role: [],
        position: [],
        status: [],
        handle: [],
        result: [],
        permissions: [],
        errMessage: null,
    },
    reducers: {
        getInformationStudentStart: (state) => {
            state.isFetching = true;
        },
        getInformationStudentSuccess: (state, action) => {
            state.isFetching = false;
            state.information = action?.payload?.information;
            state.error = false;
        },
        getInformationStudentFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getGenderStart: (state) => {
            state.isFetching = true;
        },
        getGenderSuccess: (state, action) => {
            state.isFetching = false;
            state.gender = action?.payload?.code;
            state.error = false;
        },
        getGenderFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getPositionStart: (state) => {
            state.isFetching = true;
        },
        getPositionSuccess: (state, action) => {
            state.isFetching = false;
            state.position = action?.payload?.code;
            state.error = false;
        },
        getPositionFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getRoleStart: (state) => {
            state.isFetching = true;
        },
        getRoleSuccess: (state, action) => {
            state.isFetching = false;
            state.role = action?.payload?.code;
            state.error = false;
        },
        getRoleFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getStatusStart: (state) => {
            state.isFetching = true;
        },
        getStatusSuccess: (state, action) => {
            state.isFetching = false;
            state.status = action?.payload?.code;
            state.error = false;
        },
        getStatusFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getHandleStart: (state) => {
            state.isFetching = true;
        },
        getHandleSuccess: (state, action) => {
            state.isFetching = false;
            state.handle = action?.payload?.code;
            state.error = false;
        },
        getHandleFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getResultStart: (state) => {
            state.isFetching = true;
        },
        getResultSuccess: (state, action) => {
            state.isFetching = false;
            state.result = action?.payload?.code;
            state.error = false;
        },
        getResultFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getPermissionsStart: (state) => {
            state.isFetching = true;
        },
        getPermissionsSuccess: (state, action) => {
            state.isFetching = false;
            state.permissions = action?.payload?.code;
            state.error = false;
        },
        getPermissionsFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        getStudentCouncilsSuccess: (state, action) => {
            state.councils = action?.payload?.councils;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentCouncilsStart: (state) => {
            state.isFetching = true;
        },
        getStudentCouncilsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentDepartmentsSuccess: (state, action) => {
            state.departments = action?.payload?.departments;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentDepartmentsStart: (state) => {
            state.isFetching = true;
        },
        getStudentDepartmentsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentBlocksSuccess: (state, action) => {
            state.blocks = action?.payload?.blocks;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentBlocksStart: (state) => {
            state.isFetching = true;
        },
        getStudentBlocksFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentEvaluationMethodsSuccess: (state, action) => {
            state.evaluationMethods = action?.payload?.evaluationMethods;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentEvaluationMethodsStart: (state) => {
            state.isFetching = true;
        },
        getStudentEvaluationMethodsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentEvaluationCriteriasSuccess: (state, action) => {
            state.evaluationCriterias = action?.payload?.result;
            state.isFetching = false;
            state.error = false;
        },
        getStudentEvaluationCriteriasStart: (state) => {
            state.isFetching = true;
        },
        getStudentEvaluationCriteriasFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentLecturersSuccess: (state, action) => {
            state.lecturers = action?.payload?.lecturers;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentLecturersStart: (state) => {
            state.isFetching = true;
        },
        getStudentLecturersFailed: (state) => {
            state.lecturers = [];
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentThesesSuccess: (state, action) => {
            state.theses = action?.payload?.theses;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentThesesStart: (state) => {
            state.isFetching = true;
        },
        getStudentThesesFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentMajorsSuccess: (state, action) => {
            state.majors = action?.payload?.majors;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentMajorsStart: (state) => {
            state.isFetching = true;
        },
        getStudentMajorsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentClassesSuccess: (state, action) => {
            state.classes = action?.payload?.classes;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentClassesStart: (state) => {
            state.isFetching = true;
        },
        getStudentClassesFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentStudentsSuccess: (state, action) => {
            state.students = action?.payload?.students;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentStudentsStart: (state) => {
            state.isFetching = true;
        },
        getStudentStudentsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentTopicsSuccess: (state, action) => {
            state.topics = action?.payload?.topics;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentTopicsStart: (state) => {
            state.isFetching = true;
        },
        getStudentTopicsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },

        getStudentThesisSessionsSuccess: (state, action) => {
            state.thesisSessions = action?.payload?.thesisSessions;
            state.totalRecords = action?.payload?.totalRecords;
            state.isFetching = false;
            state.error = false;
        },
        getStudentThesisSessionsStart: (state) => {
            state.isFetching = true;
        },
        getStudentThesisSessionsFailed: (state) => {
            state.totalRecords = 0;
            state.error = true;
            state.isFetching = false;
        },
    },
});

export const {
    getInformationStudentFailed,
    getInformationStudentStart,
    getInformationStudentSuccess,
    getGenderFailed,
    getGenderStart,
    getGenderSuccess,
    getHandleFailed,
    getHandleStart,
    getHandleSuccess,
    getPositionFailed,
    getPositionStart,
    getPositionSuccess,
    getResultFailed,
    getResultStart,
    getResultSuccess,
    getRoleFailed,
    getRoleStart,
    getRoleSuccess,
    getStatusFailed,
    getStatusStart,
    getStatusSuccess,
    getPermissionsFailed,
    getPermissionsStart,
    getPermissionsSuccess,
    getStudentCouncilsFailed,
    getStudentCouncilsStart,
    getStudentCouncilsSuccess,
    getStudentDepartmentsFailed,
    getStudentDepartmentsStart,
    getStudentDepartmentsSuccess,
    getStudentBlocksFailed,
    getStudentBlocksStart,
    getStudentBlocksSuccess,
    getStudentEvaluationMethodsFailed,
    getStudentEvaluationMethodsStart,
    getStudentEvaluationMethodsSuccess,
    getStudentEvaluationCriteriasFailed,
    getStudentEvaluationCriteriasStart,
    getStudentEvaluationCriteriasSuccess,
    getStudentLecturersFailed,
    getStudentLecturersStart,
    getStudentLecturersSuccess,
    getStudentMajorsFailed,
    getStudentMajorsStart,
    getStudentMajorsSuccess,
    getStudentClassesFailed,
    getStudentClassesStart,
    getStudentClassesSuccess,
    getStudentStudentsFailed,
    getStudentStudentsStart,
    getStudentStudentsSuccess,
    getStudentTopicsFailed,
    getStudentTopicsStart,
    getStudentTopicsSuccess,
    getStudentThesesFailed,
    getStudentThesesStart,
    getStudentThesesSuccess,
    getStudentThesisSessionsFailed,
    getStudentThesisSessionsStart,
    getStudentThesisSessionsSuccess,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;
