import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil, FaRegEye } from "react-icons/fa6";

export const actionsEdit = (handle) => {
    return {
        handle: handle,
        icon: <FaPencil className="icon hover:text-PrimaryColor" />,
        type: "Sửa",
        permissions: "PERE",
    };
};
export const actionsDetail = (handle) => {
    return {
        handle: handle,
        icon: <FaRegEye className="icon hover:text-PrimaryColor" />,
        type: "Xem",
        permissions: "PERR",
    };
};
export const actionsRemove = (handle) => {
    return {
        handle: handle,
        icon: <FaRegTrashAlt className="icon hover:text-PrimaryColor" />,
        type: "Xóa",
        permissions: "PERD",
    };
};

export const actionsCustom = (handle, content) => {
    return {
        handle: handle,
        content: content,
        color: "bg-amber-300"
    };
};
