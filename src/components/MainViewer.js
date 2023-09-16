import "./MainViewer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph";
import { getProfileImgById } from "../util";
import tImg from "../img/ramen.png";

const SERVER_URL = `https://mapdagu.site/api/members/me/main`;

const MainViewer = ({accessToken}) => {
    const [data, setData] = useState({
    });

    useEffect(() => {
        try{
            axios.get(SERVER_URL, {headers: {Authorization: accessToken}})
                .then(res => {
                    setData({
                        ...res.data,
                    })
                })
        }catch(error){
            alert(error.response.data.message);
        }
    }, []);

    return(
        <div className="MainViewer">
            <div className="profile_wrapper">
                <div className="image_section">
                    <img
                        alt="profileImg"
                        src = {getProfileImgById(data.imageNum)}
                    />
                </div>
                <div className="info_section">
                    <div className="text_username">{data.userName}</div>
                    <div className="text_level">님은 Level. {data.level} 단계입니다.</div>
                </div>
            </div>
            <div className="level_info">
                <div className="graph_section">
                    <Graph level={data.level}/>
                </div>
                <div className="item_section">
                    <img alt="tImg" src={tImg}/>
                    <div className="item_info">                        
                        <div className="text_itemname">신라면</div>       
                        <div className="text_score">난이도: ☆ ☆ ☆ ☆ ☆</div>       
                        <div className="text_schoville">스코빌지수: 8000</div>
                        <button className="btn_eval">평가하러 가기</button>
                    </div>
                </div>
                <div className="item_section">
                    <img alt="tImg" src={tImg}/>
                    <div className="item_info">                        
                        <div className="text_itemname">신라면</div>       
                        <div className="text_score">난이도: ☆ ☆ ☆ ☆ ☆</div>       
                        <div className="text_schoville">스코빌지수: 8000</div>
                        <button className="btn_eval">평가하러 가기</button>
                    </div>
                </div>
                <button className="btn_viewmore">더보기</button>
            </div>

        </div>
    )
}

export default MainViewer;