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
import Class from "./pages/admin/class/Class";
import ClassDetail from "./pages/admin/class/ClassDetail";
import { routes } from "./routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logginSuccess } from "./redux/authSlice";
import HomeLayout from "./components/layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import ListTopic from "./pages/ListTopic";
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
    const userData = useSelector((state) => state.auth.currentUser);
    const rolePath =
        userData?.roleId == "R1"
            ? "admin"
            : userData?.roleId == "R2"
            ? "secretary"
            : userData?.roleId == "R3"
            ? "lecturer"
            : userData?.roleId == "R4"
            ? "student"
            : null;
    const route = routes.filter((route) => route.role == userData?.roleId)[0]
        ? routes.filter((route) => route.role == userData?.roleId)[0]
        : "";
    useEffect(() => {
        // console.log(route, rolePath);

        if (rolePath == "") {
            navigate("");
        }
    }, [userData]);
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
