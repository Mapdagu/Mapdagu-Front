import "../styles/Result.css";
import Graph from "../components/Graph.js";
import { EvalDispatchContext, EvalStateContext } from "../App";
import { getResultContentByLevel } from "../util.js";

import img_title from "../assets/title_result.png";
import icon_rope from "../assets/test_rope.png";

import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie";
import axios from "axios";

const TEST_URL = `https://mapdagu.site/api/test`;
const RESULT_URL = `https://mapdagu.site/api/test/info`;

const Result = ({maxTestNum, role}) => {
    const navigate = useNavigate();
    const accessToken = getCookie("accessToken");

    const data = useContext(EvalStateContext);
    const { onDelete, onSubmit } = useContext(EvalDispatchContext);
    
    //임시 데이터
    const scoville = 3000; 
    const level = 2;

    const dtoList = data.map(item => {
        return {
          name: item.itemName[0],
          score: item.selectionId,
        };
      });
    
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
    useEffect(() => {
          if(role === "NOT_TEST_USER"){
            try{
                axios.post(TEST_URL, {dtoList}, {headers: {Authorization: accessToken}});
                onSubmit();
              } catch (error) {
                alert(error.response.data.message);
            }
          } else{   
              try{
                axios.patch(TEST_URL, {dtoList}, {headers: {Authorization: accessToken}});
              } catch (error) {
                alert(error.response.data.message);
            }
          }
          try{
              axios.patch(RESULT_URL, {scoville, level}, {headers: {Authorization: accessToken}});
          } catch (error) {
              alert(error.response.data.message);
          }
          
        for(let i=0; i<maxTestNum+1; i++){
          onDelete(1, "", i);
        }
    }, []);
    
    return(
        <div className="container">
            <div className="content">
        <div className="Result">
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
            </div>
        </div>
    )
}

export default Result;