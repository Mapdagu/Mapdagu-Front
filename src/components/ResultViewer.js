import "./ResultViewer.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const ResultViewer = () => {    
    const content="content: empty";
    const navigate = useNavigate();
    
    const copyUrlRef = useRef();
    const copyUrl = (e) => {
        if(!document.queryCommandSupported("copy")){
            return alert("복사 기능이 지원되지 않는 브라우저입니다");
        }
        copyUrlRef.current.select();
        document.execCommand('copy');
        e.target.focus();

        alert("복사되었습니다!");
    }
    const doAgain = () => {
        navigate(`/test`);
    }
    const goMain = () => {
        navigate(`/main`);
    }  
    return (
        <div className="ResultViewer">
            <h4>나의 매운맛 지수는</h4>
            <div className="content_wrapper">{content}</div>
            <div>
            <Button text="링크복사" onClick={copyUrl}/>
            <form>
                    <textarea
                        ref={copyUrlRef}
                        defaultValue={window.location.href}
                    />
                </form>
            <Button text="다시하기" onClick={doAgain}/>
            </div>
            <div>
                <Button text="메인페이지" onClick={goMain}/>
            </div>
        </div>
    );
}

export default ResultViewer;