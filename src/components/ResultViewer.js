import "./ResultViewer.css";
import Button from "./Button";

const ResultViewer = ({content, doAgain, goMain}) => {
    return (
        <div className="ResultViewer">
            <h4>나의 매운맛 지수는</h4>
            <div className="content_wrapper">{content}</div>
            <div>
            <Button text="공유하기"/>
            <Button text="다시하기" onClick={doAgain}/>
            </div>
            <div>
                <Button text="메인페이지" onClick={goMain}/>
            </div>
        </div>
    );
}

export default ResultViewer;