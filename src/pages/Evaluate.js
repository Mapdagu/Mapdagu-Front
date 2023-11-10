import Header from "../components/Header";
import Navigator from "../components/Navigator";
import EvaluationList from "../components/evaluate/EvaluationList";

import { useEffect, useState } from "react";
import { getCookie } from "../cookie";
import axios from "axios";

const GET_ALL_ITEM = `https://mapdagu.site/api/evaluations/me`;
const GET_SEARCHED_ITEM = `https://mapdagu.site/api/evaluations?search`;

const Evaluate = ({maxTestNum}) => {
    const accessToken = getCookie("accessToken");
    
    const [data, setData] = useState();
        
    useEffect(() => {
        try{
            axios.get(GET_ALL_ITEM, {headers: {Authorization: accessToken}})
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

    const onSubmit = async(foodname) => {
        try{
            axios.get([GET_SEARCHED_ITEM, foodname].join("="), {headers: {Authorization: accessToken}})
            .then(res => {
                setData(res.data.content.map((item, index) => ({
                    id: index,
                    ...item
                })));
            })
        } catch(error){
            alert(error.response.data.message);
        }
    }

    return(
        <div className="container">
            <div className="header">
                <Header type={1}/>
            </div>            
            <div className="content"><EvaluationList data={data} onSubmit={onSubmit} maxTestNum={maxTestNum}/></div>
            <div className="footer"><Navigator current="eval"/></div> 
        </div>
    )
};

export default Evaluate;