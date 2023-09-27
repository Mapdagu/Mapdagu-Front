import Graph from "../Graph";
import "./FriendViewer.css";
import icon_noti from "../../img/icon/friend_notification.png";
import icon_noti_on from "../../img/icon/friend_notification_on.png";
import FriendItem from "./FriendItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../../cookie";
import Modal from "react-modal";
import RequestItem from "./RequestItem";
import { useNavigate } from "react-router-dom";

const MANAGE_FRIEND = `https://mapdagu.site/api/friends`;
const REQUEST_FRIEND = `https://mapdagu.site/api/friends/request`;
const SEARCH_FRIEND = `https://mapdagu.site/api/friends?search`;
const FRIENDS_LIST = `https://mapdagu.site/friends/me`;

const FriendViewer = () => {
    const navigate = useNavigate();
    const accessToken = getCookie("accessToken");
    const [data, setData] = useState();
    const [requestData, setRequestData] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
        try{
            // axios.get(FRIENDS_LIST, {headers: {Authorization: accessToken}})
            // .then(res => {
            //     setData(res.data.content.map((item) => ({
            //         ...item
            //     })));
            // });
            axios.get(REQUEST_FRIEND, {headers: {Authorization: accessToken}})
            .then(res => {
                setRequestData(res.data.content.map((item) => ({
                    ...item
                })));
            });
        } catch(error){
            alert(error.response.data.message);
        }
    }, [])

    const deleteRequest = (friendId) => {
        try{
            console.log(friendId);
            axios.delete([REQUEST_FRIEND, friendId].join("/"), {headers: {Authorization: accessToken}});              
        } catch(error){
            alert(error.response.data.message);
        }
    }
    const managefriend = (friendId, isAdd) => {
        try{
            if(isAdd){
                axios.post([MANAGE_FRIEND, friendId].join("/"), {friendId}, {headers: {Authorization: accessToken}});
            }
            else{
                axios.delete([REQUEST_FRIEND, friendId].join("/"), {headers: {Authorization: accessToken}});    
            }
        } catch(error){
            alert(error.response.data.message);
        }
    }

    const modalStyle = {
        content: {
            width: "350px",
            height: "600px",
            margin: "auto",
            padding: "20px",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
    }

    return(
        <div className="FriendViewer">
            <div className="contents_top">
                <button className="text_title" onClick={() => navigate(0)}>친구 목록</button>
                <img className="img_noti" onClick={() => {setModalIsOpen(true)}}alt="noti" src={ !requestData || requestData.length === 0 ? icon_noti : icon_noti_on}/>
                <Modal style={modalStyle} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>    
                    <div className="friend_modal_title">친구 요청</div>
                    <div><button className="btn_profile_close" onClick={() => setModalIsOpen(false)}>×</button></div>
                    <div className="request_list_wrapper">
                        { !requestData || requestData.length === 0 ?
                        <p>받은 요청이 없습니다</p> :
                        requestData.map((it) => (                            
                            <RequestItem
                                key={it.id}
                                    {...it}
                                    onAccept={managefriend}
                                    onDelete={deleteRequest}
                            />
                        ))}
                    </div>
                </Modal>
            </div>
            <div className="graph_wrapper">
                <Graph level = {1}/>
            </div>
            <div className="list_wrapper">
                { !data || data.length === 0 ?
                <p>아직 친구가 없어요<br/>친구를 추가해보세요!</p>:
                data.map((it) => (                            
                    <FriendItem
                        key={it.id}
                            {...it}
                            onDelete={managefriend}
                    />
                ))}
            </div>
        </div>
    )    
}

export default FriendViewer;