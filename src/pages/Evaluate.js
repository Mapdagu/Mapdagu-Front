import Navigator from "../components/Navigator";
import EvaluationList from "../components/EvaluationList";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = `https://mapdagu.site/api/evaluations/me`;

const Evaluate = ({accessToken}) => {
    const navigate = useNavigate();
    const [data, setData] = useState();
        
    useEffect(() => {
        try{
            axios.get(SERVER_URL, {headers: {Authorization: accessToken}})
            .then(res => {
                setData(res.data.content.map((item, index) => ({
                    id: index,
                    ...item
                })));
            })
        } catch(error){
            alert(error.response.data.message);
        }
    }, [])

    return(
        <div className="container">
            <div className="header">
                <Header type={1}/>
            </div>
            {/* <Button text="새로운 맵기평가 작성하기" onClick={handleCreateEval}/>      */}
            <div className="content"><EvaluationList data={data} /></div>
            <div className="footer"><Navigator/></div> 
        </div>
    )
};

export default Evaluate;