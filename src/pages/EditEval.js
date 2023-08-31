import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const SERVER_URL = `https://mapdagu.site/api/evaluations`;

const EditEval = ({accessToken}) => {    
    const navigate = useNavigate();
    //임시
    const id =4;
    const [newData, setNewData] = useState({
        name: "",
        imageNum: 0,
        score: 0,
    });

    useEffect(() => {
        try{
            axios.get([SERVER_URL, id].join("/"), {headers: {Authorization: accessToken}})
                .then(res => {
                    console.log(res.data);
                    setNewData({
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
            // onUpdate(id, date, itemName, selectionId);
        }
    }

    const onClickDelete = async() => {
        if(window.confirm("평가를 정말 삭제할까요?")){
            try{
                await axios.delete([SERVER_URL, id].join("/"), {headers: {Authorization: accessToken}});
                navigate(`/evaluate`, {replace:true});
            
            } catch(error){
                alert(error.response.data.message);
            }
        //     onDelete(id);
        }
    }
    
    if(!newData){
        return (<div>항목을 불러오고 있습니다...</div>)
    }else{
        return(
            <div>
                <Header
                    title="edit page"
                    leftChild={<Button text="←" onClick={handleOnBack}/>}
                    rightChild={<Button text="삭제하기" onClick={onClickDelete}/>}
                />
                <Editor initData={newData} onSubmit={onSubmit}/>
            </div>
        );
    }
    
}

export default EditEval;