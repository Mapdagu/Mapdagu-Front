import "../styles/Main.css";
import Graph from "../components/Graph";
import Navigator from "../components/Navigator";
import { getTipById } from "../util";
import { getCookie } from "../cookie";

import icon_search from "../assets/icon/header_search_white.png";
import icon_setting from "../assets/icon/header_setting_white.png";
import icon_change from "../assets/icon/main_changeTip.png";
import tImg from "../assets/ramen.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GET_PROFILE = `https://mapdagu.site/api/members/me/main`;
const SEARCH_SCOVILLE = `https://mapdagu.site/api/foods/scoville?search`;

const Main = () => { 
    const accessToken = getCookie("accessToken");
    const [data, setData] = useState({});
    const [search, setSearch] = useState("");
    const [result, setResult] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        try{
            axios.get(GET_PROFILE, {headers: {Authorization: accessToken}})
                .then(res => {
                    setData({
                        ...res.data,
                    })
                })
        }catch(error){
            alert(error.response.data.message);
        }
    }, []);

    const onSubmit = (search) => {
        try{
            axios.get([SEARCH_SCOVILLE, search].join("="), {headers: {Authorization: accessToken}})
                .then(res => {
                    setResult({
                        ...res.data,
                    })
                })
        }catch(error){
            alert(error.response.data.message);
        }
    }    
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    return(
        <div className="container">            
            <div className="content">
        <div className="Main">
            <div className="top_section">
                <div className="profile_wrapper">
                        <div className="text_username">{data.userName}</div>
                        <div className="text_level">
                            {data.userName} 님은
                            <a> Level. {data.level} </a>
                            단계입니다.
                        </div>
                </div>
                <div className="header_icons">
                    <img onClick={()=>{navigate(`/search`)}} alt="search" src={icon_search}/>
                    <img onClick={()=>{navigate(`/mypage`)}} alt="setting" src={icon_setting}/>
                </div>
            </div>
            <div className="level_info">
                <div className="graph_section">
                    <Graph level={data.level}/>
                </div>    
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
                    {result ? 
                    <img alt="food_img" src={result.image}/>
                    : <img alt="default_img" src={tImg}/>}
                    <div className="text_result">스코빌지수: {result ? result.scoville : "none"}</div>
                </div>
                <div className="item_section right">
                    <div className="text_search">스코빌지수 검색창</div>
                    <input 
                        className="search_box" 
                        value={search}
                        onChange={onChangeSearch}
                        placeholder="ex)쭈꾸미볶음"
                    />
                    <button onClick={()=>{onSubmit(search)}}className="btn_submit">검색하기</button>
                </div>
            </div>
            <div className="tip_box">
                <img className="btn_change" alt="change" src={icon_change}/>
                Tip.
                <div className="text_tip">
                    {getTipById(1)}
                </div>
            </div>
        </div>
            </div>
            <div className="footer">
                <Navigator current="main" />
            </div>
        </div>
    )
}

export default Main;