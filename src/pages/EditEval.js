import Header from "../components/Header";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "../cookie";

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

    const onClickDelete = async() => {
        if(window.confirm("평가를 정말 삭제할까요?")){
            if(data.imageNum >= 1 && data.imageNum <=3 ){
                alert("테스트 결과는 삭제할 수 없습니다.");
            } else {
                try{
                    await axios.delete([SERVER_URL, id].join("/"), {headers: {Authorization: accessToken}});
                    navigate(`/evaluate`, {replace:true});
                
                } catch(error){
                    alert(error.response.data.message);
                }
            }
        }
    }
    
    if(!data){
        return (<div>항목을 불러오고 있습니다...</div>)
    }else{
        return(
            <div className="container">
                <div className="header">
                    {/* <Header
                        type = {1}
                        leftChild={<button onClick={handleOnBack}>◁</button>}
                    /> */}
                    <Header
                        leftChild={<button onClick={handleOnBack}>취소</button>}
                        rightChild={<button onClick={onClickDelete}>삭제하기</button>}
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