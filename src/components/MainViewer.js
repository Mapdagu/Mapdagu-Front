import "./MainViewer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph";
import { getTipById } from "../util";
import tImg from "../img/ramen.png";
import { getCookie } from "../cookie";

const SERVER_URL = `https://mapdagu.site/api/members/me/main`;

const MainViewer = () => {
    const accessToken = getCookie("accessToken");
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
                    <div className="text_username">{data.userName}</div>
                    <div className="text_level">
                        {data.userName} 님은
                        <a> Level. {data.level} </a>
                        단계입니다.
                    </div>
            </div>
            <div className="level_info">
                <div className="graph_section">
                    <Graph level={data.level}/>
                </div>               
                {/* <div className="lines">
                    <svg width="200" height="20">
                    <line x1="100" x2="100" y1="0" y2="20" stroke="#F77F2E" strokeWidth="2" />
                    </svg>
                    <svg width="200" height="20">
                    <line x1="100" x2="100" y1="0" y2="20" stroke="#F77F2E" strokeWidth="2" />
                    </svg>
                </div> */}
                <div className="item_wrapper">
                    <div className="item_section">
                        <img alt="tImg" src={tImg}/>
                        <div className="item_info">                        
                            <div className="text_itemname">신라면</div>         
                            <div className="text_scoville">스코빌지수: 8000</div>
                            <div className="text_score">난이도: ☆ ☆ ☆ ☆ ☆</div>     
                        </div>
                    </div>
                    <div className="item_section">
                        <img alt="tImg" src={tImg}/>
                        <div className="item_info">                        
                            <div className="text_itemname">신라면</div>       
                            <div className="text_scoville">스코빌지수: 8000</div>
                            <div className="text_score">난이도: ☆ ☆ ☆ ☆ ☆</div>   
                        </div>
                    </div>
                </div>     
                <button className="btn_viewmore">내 레벨에 맞는 음식 전체보기</button>
            </div>
            <div className="search_boxs">
                <div className="item_section left">
                    <img alt="tImg" src={tImg}/>
                </div>
                <div className="item_section right">
                    <textarea 
                        placeholder="스코빌 지수를 알고 싶은 음식을 검색해보세요!"
                    />
                    <button className="btn_submit">검색하기</button>
                </div>
            </div>
            <div className="tip_box">
                Tip.
                <div className="text_tip">
                    {getTipById(1)}
                </div>
            </div>
        </div>
    )
}

export default MainViewer;