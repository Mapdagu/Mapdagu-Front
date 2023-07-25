import "./EvaluationItem.css";
// import { useNavigate } from "react-router-dom";
import Button from "./Button";
// import React from "react";
import img0 from "../img/logo192.png";

const EvaluationItem = ({id, date, content, emotionId}) => {
    // const navigate = useNavigate();
    const goDetail = () => {
        // navigate(`/diary/${id}`);
    }
    const goEdit = () => {
        // navigate(`/edit/${id}`);
    }
    return (
        <div className="EvaluationItem">
            <div
            onClick={goDetail}
            className="img_section"
            >
                {/* <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />     */}
                <img alt="" src={img0}/>
            </div>    
            <div onClick={goDetail} className="info_section">
                <div className="item_wrapper">
                    신라면
                </div>
                <div className="date_wrapper">
                    {/* {new Date(parseInt(date)).toLocaleDateString()} */}
                    작성 날짜: {new Date().getTime() -1}
                </div>
                <div className="content_wrapper">
                    {/* {content.slice(0,25)} */}
                    아주 매웠어요
                </div>
            </div>
            <div className="button_section">
                <Button text="수정하기" onClick={goEdit}/>
            </div>
        </div>
    );
}

export default EvaluationItem;