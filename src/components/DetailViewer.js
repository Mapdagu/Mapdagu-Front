import "./DetailViewer.css";
import { useNavigate } from "react-router-dom";
import star from "../img/icon/star.png";
import star_border from "../img/icon/star-border.png";
import { useEffect, useState } from "react";
import { getSelectionTextById } from "../util";

const DetailViewer = ({initData}) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: 0,
        name: "",
        image: "",
        score: 0,
        scoville: 0,
        isEvaluated: false,
    });
    useEffect(() => {
        if(initData){
            setState({
                ...initData
            })
        }
    }, [initData])

    const {id, image, isEvaluated, name, score, scoville} = state;

    const goEvaluate = () => {
        navigate(`/edit/${id}`);
    }

    if(!state){
        return(<div>불러오는 중입니다...</div>);
    }
    else{
        return(
            <div className="DetailViewer">
                <div className="viewer_container">
                    <div className="text_wrapper"> 
                        <div className="text_scoville"> 스코빌지수 {scoville}</div>
                        {isEvaluated ?
                        <div>
                            <div className="difficulty_score">
                                난이도 :
                                {score>1 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                                {score>2 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                                {score>3 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                                {score>4 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                                {score>5 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }  
                            </div>
                            <button className="btn_score">{getSelectionTextById(score)}</button>
                        </div>
                        :""}
                        <div className="text_section">
                            text
                        </div>
                    </div>
                    <div className="buttons">
                        <button >친구랑 같이 먹기</button>
                        <button onClick={goEvaluate}>{isEvaluated?"수정하기":"평가하기"}</button>
                    </div>                
                </div>
                <div className="image_wrapper">
                    <img alt="food_img" src={image}/> 
                    <div>
                        <div className="text_name">{name}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailViewer;