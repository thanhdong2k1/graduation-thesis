import { useParams } from "react-router-dom";
import ButtonConfirm from "../../../components/button/ButtonConfirm";

const AddCouncil = () => {
    const param = useParams();
    // console.log(param);
    return (
        <div>
            <div>This is AddCouncil 1</div>
            <ButtonConfirm />
        </div>
    );
};

export default AddCouncil;
