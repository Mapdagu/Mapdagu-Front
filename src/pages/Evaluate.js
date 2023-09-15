import Navigator from "../components/Navigator";
import EvaluationList from "../components/EvaluationList";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const GET_ALL_ITEM = `https://mapdagu.site/api/evaluations/me`;
const GET_SEARCHED_ITEM = `https://mapdagu.site/api/evaluations?search=`;

const Evaluate = ({accessToken}) => {
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
            axios.get([GET_SEARCHED_ITEM, foodname].join("/"), {headers: {Authorization: accessToken}})
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
            
            <div className="content"><EvaluationList data={data} onSubmit={onSubmit}/></div>
            <div className="footer"><Navigator/></div> 
        </div>
    )
};

export default Evaluate;