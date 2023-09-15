import "./MainViewer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph";
import { getProfileImgById } from "../util";

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
                    <h2>{data.userName}</h2>
                    <h4>님은 Level. {data.level}입니다.</h4>
                </div>
            </div>
            <div className="level_info">
                <div className="graph_section">
                    <Graph />
                </div>
                <button className="btn_viewmore">더보기</button>
            </div>

        </div>
    )
}

export default MainViewer;