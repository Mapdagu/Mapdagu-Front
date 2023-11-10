import Header from "../components/Header"
import Navigator from "../components/Navigator"

import { useParams } from "react-router-dom";
import { getCookie } from "../cookie";
import axios from "axios"

const SERVER_URL = `https://mapdagu.site/api/friends/request`;

const UserPage = () => {
    const accessToken = getCookie("accessToken");
    const { id } = useParams();

    const friendId = id;

    const onRequest = async() => {
        try{
            console.log(friendId);
            await axios.post([SERVER_URL, friendId].join("/"), {friendId}, {headers: {Authorization: accessToken}});    
        }catch(error){
            alert(error.response.data.message);
        }
    }
    
    return(
        <div className="container">
            <div className="header">
                <Header
                    type={1}
                />
            </div>
            <div className="content">
                <button onClick={onRequest}>친구 요청</button>
            </div>
            <div className="footer">
                <Navigator/>
            </div>
        </div>
    )
}

export default UserPage;