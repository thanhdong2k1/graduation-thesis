import { Link, Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div className="">
            <div className="">Home Page</div>
            <Link to={"/login"}>Login</Link>
        </div>
    );
};

export default Home;
