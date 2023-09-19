import "./ResultViewer.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Graph from "./Graph.js"
import img_title from "../img/title_result.png";
import icon_rope from "../img/test_rope.png";
import { getResultContentByLevel } from "../util";

const ResultViewer = () => {    
    //임시
    const level = 10;
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
            <div className="result_wrapper">
                <img className="img_rope" alt="rope" src={icon_rope}/>
                <div className="title_1">나의 매운맛 수준은?</div>
                {/* <h1>맵기 레벨 테스트</h1> */}
                <img className="title_2"alt="title" src={img_title}/>
                    <div className="text_wrapper">
                        <div className="text_style_1">당신의 맵기는</div>
                        <div className="text_style_1_level">Level. {level} </div>
                        <div className="text_style_1"> 단계입니다.</div>
                    </div>
                    <div className="graph_wrapper">
                        <Graph level={level}/>
                    </div>                    
                <div className="content_wrapper">
                    <div className="text_wrapper">
                        <div className="text_style_2_level">Level. {level}</div>
                        <div className="text_style_2">인 당신은</div>                        
                    </div>
                    <div className="text_style_2">{getResultContentByLevel(level)}</div>
                </div>
                <div className="button_wrapper">
                    <button className="btn_type1" onClick={doAgain}>다시 하기</button>
                    <button className="btn_type1" onClick={copyUrl}>결과 공유하기</button>
                    <form>
                            <textarea
                                ref={copyUrlRef}
                                defaultValue={window.location.href}
                            />
                        </form>                    
                </div>
                <div>
                    <div className="text_bottom">나의 레벨에 맞는 음식 보러가기</div>
                    <button className="btn_type2" onClick={goMain}>메인페이지</button>
                </div>
            </div>
        </div>
    );
}

export default ResultViewer;