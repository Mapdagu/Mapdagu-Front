import Header from "../components/Header";
import ResultViewer from "../components/ResultViewer";
import { useNavigate } from "react-router-dom";

const Result = () => {
    const content="content: empty";
    const navigate = useNavigate();
    const doAgain = () => {
        navigate(`/`);
    }
    const goMain = () => {
        navigate(`/main`);
    }
    return(
        <div>
            <div>
                <Header title="result page"/>
                <ResultViewer content={content} doAgain={doAgain} goMain={goMain}/>                
            </div>
        </div>
    )
}

export default Result;