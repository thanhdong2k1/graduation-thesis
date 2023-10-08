import {
    Navigate,
    Route,
    Routes,
    createBrowserRouter,
    useNavigate,
} from "react-router-dom";
import "./App.css";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminLayout from "./components/layouts/admin/AdminLayout";
import Login from "./pages/Login";
import { routes } from "./routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logginSuccess } from "./redux/authSlice";
import HomeLayout from "./components/layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import ListTopic from "./pages/ListTopic";
import { apiAuth, apiUser } from "./redux/apiRequest";
import { createAxios } from "./utils/createInstance";
import { toast } from "react-toastify";
import { getErrMessageSuccess } from "./redux/adminSlice";
// export const routers = createBrowserRouter([
//     {
//         path: "",
//         element: <StudentLayout />,
//         children: [{ path: "register" }],
//     },
//     {
//         path: "login",
//         element: <Login />,
//     },
//     {
//         path: "admin",
//         element: <AdminLayout />,
//         children: [
//             { path: "", element: <AdminHomePage />, id: "Home" },
//             { path: "class", element: <Class />, id: "Class Room" },
//             { path: "class/:id", element: <ClassDetail />, id: "Class Detail" },
//         ],
//     },
// ]);
function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const errMessage = useSelector((state) => state.admin.errMessage);
    const rolePath =
        currentUser?.roleId == "R1"
            ? "admin"
            : currentUser?.roleId == "R2"
            ? "dean"
            : currentUser?.roleId == "R3"
            ? "lecturer"
            : currentUser?.roleId == "R4"
            ? "student"
            : null;
    const route = routes.filter((route) => route.role == currentUser?.roleId)[0]
        ? routes.filter((route) => route.role == currentUser?.roleId)[0]
        : "";
    // useEffect(() => {
    //     // console.log(route, rolePath);

    //     if (rolePath == "") {
    //         navigate("");
    //     }
    // }, [currentUser]);
    return (
        <Routes>
            <Route path="" element={<HomeLayout />}>
                <Route path="" element={<HomePage />} />
                <Route path="list-topic" element={<ListTopic />} />
            </Route>
            <Route
                path={`${rolePath}/*`}
                element={
                    // rolePath == "student" ? <StudentLayout /> :
                    <AdminLayout />
                }
            >
                {route &&
                    route?.pages &&
                    route?.pages?.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                {/* <Route path="" element={<Navigate to="home" replace />} /> */}
                <Route path="*" element={<Navigate to="home" replace />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
    );
}

export default App;
