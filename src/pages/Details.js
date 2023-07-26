import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Details = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const handleCreateEval = () => {
        navigate(`/create_evalution`);
    }
    return(
        <div>
            <Header
                title="details page"
                leftChild={<Button text="←" onClick={goBack}/>}
                rightChild={<Button text="평가작성" onClick={handleCreateEval}/>}
            />
        </div>
    );
}

export default Details;