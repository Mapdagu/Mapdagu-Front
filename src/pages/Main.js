import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Search from "../components/Search";
import Graph from "../components/Graph";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER_URL = `https://mapdagu.site/api/members/me/main`;

const Main = ({accessToken}) => {
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
        <div>
            <Header
                title="main page"
            />
            <Navigator/>
            <Graph data={data}/>
            <Search text="음식 검색하기"/>
        </div>
    )
}

export default Main;