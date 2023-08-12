import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminLayout from "./components/layouts/admin/AdminLayout";
import StudentLayout from "./components/layouts/student/StudentLayout";
import Login from "./pages/Login";
import Class from "./pages/admin/class/Class";
import ClassDetail from "./pages/admin/class/ClassDetail";
import { routes } from "./routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logginSuccess } from "./redux/authSlice";
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
    const userData = useSelector((state) => state.auth.login.currentUser);
    const rolePath =
        userData?.roleId == "R1"
            ? "admin"
            : userData?.roleId == "R2"
            ? "secretary"
            : userData?.roleId == "R3"
            ? "lecturer"
            : "";
    const route = routes.filter((route) => route.role == rolePath)[0]
        ? routes.filter((route) => route.role == rolePath)[0]
        : "";

    useEffect(() => {
        console.log(userData);
    }, [userData]);
    return (
        // <RouterProvider router={routers} />;
        <Routes>
            <Route path="" element={<Home />} />
            <Route path={`${rolePath}/*`} element={<AdminLayout />}>
                {route &&
                    route.pages.map((route, index) => (
                        <Route path={route.path} element={route.element} />
                        // <Route path="class" element={<Class />} />
                        // <Route path="class/:id" element={<ClassDetail />} />
                    ))}
                <Route path="*" element={<Navigate to="" replace />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
    );
}

export default App;
