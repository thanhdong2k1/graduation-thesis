import { useParams } from "react-router-dom";
import ButtonConfirm from "../../../components/button/ButtonConfirm";

const ClassDetail = () => {
    const param = useParams();
    // console.log(param);
    return (
        <div>
            <div>This is ClassDetail 1</div>
            <ButtonConfirm />
        </div>
    );
};

export default ClassDetail;
