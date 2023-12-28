import { Link, useLocation } from "react-router-dom";
import pathRoutes from "../../utils/pathRoutes";
import { FaCheck, FaXmark } from "react-icons/fa6";

const ButtonConfirm = ({ type }) => {
    const path = useLocation();
    const arrPath = path?.pathname?.split("/")?.splice(1, 2)?.filter(
            (value) =>
                value != pathRoutes?.R1?.changePassword &&
                value != pathRoutes?.R1?.changeInformation
        );
    // console.log(
    //     path?.pathname?
    //         .split("/")
    //         .splice(1, 2)
    //         .filter(
    //             (value) =>
    //                 value != pathRoutes?.R1?.changePassword &&
    //                 value != pathRoutes?.R1?.changeInformation
    //         ).length
    // );
    return (
        <div className="flex justify-center">
            <div className="listButton flex justify-evenly items-center w-[50%] media-max-md:w-[75%]">
                {arrPath.length == 1 && (
                    <Link
                        to={`/${arrPath[0]}`}
                        className="button w-[45%] flex justify-center"
                    >
                        {type == "detail" ? (
                            <span>Xong</span>
                        ) : (
                            <span>Hủy</span>
                        )}
                        <FaXmark className="icon" />
                    </Link>
                )}
                {arrPath.length == 2 && (
                    <Link
                        to={`/${arrPath[0]}/${arrPath[1]}`}
                        relative="route"
                        className="button w-[45%] flex justify-center items-center"
                    >
                        {type == "detail" ? (
                            <span>Xong</span>
                        ) : (
                            <span>Hủy</span>
                        )}
                        <FaXmark className="icon" />
                    </Link>
                )}
                {type != "detail" && (
                    <button
                        type="submit"
                        className="button w-[45%] flex justify-center items-center"
                    >
                        <span>Xác nhận</span>
                        <FaCheck className="icon" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ButtonConfirm;
