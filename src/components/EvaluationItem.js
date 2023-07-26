import "./EvaluationItem.css";
// import { useNavigate } from "react-router-dom";
import Button from "./Button";
// import React from "react";
import { getItemImgById, getSelectionTextById } from "../util";

const EvaluationItem = ({id, date, itemName, selectionId}) => {
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
                <img alt="" src={getItemImgById(id)}/>
            </div>    
            <div onClick={goDetail} className="info_section">
                <div className="item_wrapper">
                    {itemName}
                </div>
                <div className="date_wrapper">
                    {new Date(date).toLocaleDateString()}
                </div>
                <div className="content_wrapper">
                    {/* {content.slice(0,25)} */}
                    {getSelectionTextById(selectionId)}
                </div>
            </div>
            <div className="button_section">
                <Button text="수정" onClick={goEdit}/>
            </div>
        </div>
    );
}

export default EvaluationItem;