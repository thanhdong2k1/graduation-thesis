import { useParams } from "react-router-dom";
import ButtonConfirm from "../../../components/button/ButtonConfirm";

const CouncilDetail = () => {
    const param = useParams();
    // console.log(param);
    return (
        <div>
            <div>This is CouncilDetail 1</div>
            <ButtonConfirm />
        </div>
    );
};

export default CouncilDetail;
