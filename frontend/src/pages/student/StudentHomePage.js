import { useEffect } from "react";
import { apiStudent } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { logginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../utils/createInstance";

const StudentHomePage = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    useEffect(() => {
        apiStudent.apiStudentGetInformation(currentUser, dispatch, axiosJWT);
    }, []);
    return <div>StudentHomePage.js</div>;
};

export default StudentHomePage;
