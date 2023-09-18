import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export const actionsEdit = (handle) => {
    return {
        handle: handle,
        icon: <FaPencil className="icon hover:text-PrimaryColor" />,
        type: "Edit",
    };
};
export const actionsRemove = (handle) => {
    return {
        handle: handle,
        icon: <FaRegTrashAlt className="icon hover:text-PrimaryColor" />,
        type: "Remove",
    };
};
