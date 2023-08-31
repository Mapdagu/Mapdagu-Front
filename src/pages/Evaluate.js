import Header from "../components/Header";
import Navigator from "../components/Navigator";
import EvaluationList from "../components/EvaluationList";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = `https://mapdagu.site/api/evaluations/me`;

const Evaluate = ({accessToken}) => {
    const navigate = useNavigate();
    const [newData, setNewData] = useState();
        
    useEffect(() => {
        try{
            axios.get(SERVER_URL, {headers: {Authorization: accessToken}})
            .then(res => {
                setNewData(res.data.content.map((item, index) => ({
                    id: index,
                    ...item
                })));
            })
        } catch(error){
            alert(error.response.data.message);
        }
    }, [])

    const handleCreateEval = () => {
        navigate(`/new`);       
    }

    return(
        <div>
            <Header
                title="evaluate page"
            />
            <Navigator/> 
            <Button text="새로운 맵기평가 작성하기" onClick={handleCreateEval}/>     
            <EvaluationList data={newData} />
        </div>
    )
};

export default Evaluate;