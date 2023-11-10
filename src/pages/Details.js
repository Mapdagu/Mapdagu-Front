import Header from "../components/Header";
import { getSelectionTextById } from "../util";
import "../styles/Detail.css";

import star from "../assets/icon/star.png";
import star_border from "../assets/icon/star-border.png";
import icon_back from "../assets/icon/header_back.png";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../cookie"; 
import axios from "axios";

const GET_FOOD_INFO = `https://mapdagu.site/api/foods`;

const Details = () => {
    const { id } = useParams();
    const accessToken = getCookie("accessToken");
    const navigate = useNavigate();

    const [data, setData] = useState({
        id: 0,
        name: "",
        image: "",
        score: 0,
        scoville: 0,
        isEvaluated: false,
    });
    const {image, isEvaluated, name, score, scoville} = data;
    
    useEffect(()=>{
        try{
            axios.get([GET_FOOD_INFO, id].join("/"), {headers: {Authorization: accessToken}})
            .then(res => {
                setData({
                    ...res.data,
                })
            });
        } catch(error){
            alert(error.response.data.message);
        }
    }, [])

    const goEvaluate = () => {
        navigate(`/edit/${id}`);
    }
    const handleOnBack = () => {
        navigate(-1);
    }
    if(!data){
        return(<div>불러오는 중입니다...</div>);
    }
    else{
        return (
            <div className="container">
                <div className="header">
                    <Header type={1} leftChild={<button onClick={handleOnBack}><img alt="back" src={icon_back}/></button>}/>                
                </div>
                <div className="content">
                <div className="Detail">
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
                </div>
            </div>
        )
    }
}

export default Details;