import Header from "../components/Header";
import Editor from "../components/evaluate/Editor";

import icon_back from "../assets/icon/header_back.png";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCookie } from "../cookie";
import axios from "axios";

const SERVER_URL = `https://mapdagu.site/api/evaluations`;

const EditEval = () => { 
    const accessToken = getCookie("accessToken");
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [data, setData] = useState({
        name: "",
        imageNum: 0,
        score: 0,
    });

    useEffect(() => { 
        try{
            axios.get([SERVER_URL, id].join("/"), {headers: {Authorization: accessToken}})
                .then(res => {
                    setData({
                        ...res.data,
                    });
                })
        } catch(error){
            alert(error.response.data.message);
        }
    }, []);
    

    const handleOnBack = () => {
        navigate(-1);
    }

    const onSubmit = async(data) => {
        if(window.confirm("평가를 정말 수정할까요?")){
            const score = data.score;
            try{
                await axios.patch([SERVER_URL, id].join("/"), {score}, {headers: {Authorization: accessToken}});
                navigate(`/evaluate`, {replace:true});        
            } catch(error){
                alert(error.response.data.message);
            }
        }
    }
    
    if(!data){
        return (<div>항목을 불러오고 있습니다...</div>)
    }else{
        return(
            <div className="container">
                <div className="header">
                    <Header
                        type = {1}
                        leftChild={<button onClick={handleOnBack}>
                            <img alt="back" src={icon_back}/>
                        </button>}
                    />
                </div>
                <div className="content">
                    <Editor initData={data} onSubmit={onSubmit}/>
                </div>
            </div>
        );
    }
    
}

export default EditEval;