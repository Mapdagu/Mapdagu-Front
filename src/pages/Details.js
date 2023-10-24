import Header from "../components/Header";
import DetailViewer from "../components/DetailViewer";
import { useNavigate, useParams } from "react-router-dom";
import icon_back from "../img/icon/header_back.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../cookie";

const GET_FOOD_INFO = `https://mapdagu.site/api/foods`;

const Details = () => {
    const { id } = useParams();
    const accessToken = getCookie("accessToken");
    const [data, setData] = useState();
    const navigate = useNavigate();

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

    const handleOnBack = () => {
        navigate(-1);
    }
    return (
        <div className="container">
            <div className="header">
                <Header type={1} leftChild={<button onClick={handleOnBack}><img alt="back" src={icon_back}/></button>}/>                
            </div>
            <div className="content">
                <DetailViewer initData={data}/>
            </div>
        </div>
    )
}

export default Details;