import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil, FaRegEye } from "react-icons/fa6";

export const actionsEdit = (handle) => {
    return {
        handle: handle,
        icon: <FaPencil className="icon hover:text-PrimaryColor" />,
        type: "Edit",
        permissions: "PERE",
    };
};
export const actionsDetail = (handle) => {
    return {
        handle: handle,
        icon: <FaRegEye className="icon hover:text-PrimaryColor" />,
        type: "Detail",
        permissions: "PERR",
    };
};
export const actionsRemove = (handle) => {
    return {
        handle: handle,
        icon: <FaRegTrashAlt className="icon hover:text-PrimaryColor" />,
        type: "Remove",
        permissions: "PERD",
    };
};
