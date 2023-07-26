import Header from "../components/Header";
import Navigator from "../components/Navigator";
import EvaluationList from "../components/EvaluationList";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Evaluate = ({data}) => {
    const navigate = useNavigate();
    const handleCreateEval = () => {
        navigate(`/create_evalution`);
    }
    return(
        <div>
            <Header
                title="evaluate page"
            />
            <Navigator/> 
            <Button text="새로운 맵기평가 작성하기" onClick={handleCreateEval}/>     
            <EvaluationList data={data} />
        </div>
    )
}

export default Evaluate;