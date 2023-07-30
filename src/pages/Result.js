import Header from "../components/Header";
import ResultViewer from "../components/ResultViewer";

const Result = ({maxTestNum, idRef}) => {
    return(
        <div>
            <div>
                <Header title="result page"/>
                <ResultViewer maxTestNum={maxTestNum} idRef={idRef}/>                
            </div>
        </div>
    )
}

export default Result;