import "../styles/Friend.css";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import FriendItem from "../components/friend/FriendItem";
import RequestModal from "../components/friend/RequestModal";
import Graph from "../components/Graph";

import icon_noti from "../assets/icon/friend_notification.png";
import icon_noti_on from "../assets/icon/friend_notification_on.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie";
import axios from "axios";
import Modal from "react-modal";

const MANAGE_FRIEND = `https://mapdagu.site/api/friends`;
const REQUEST_FRIEND = `https://mapdagu.site/api/friends/request`;
const FRIENDS_LIST = `https://mapdagu.site/api/friends/me`;

const Friend = () => {
    const navigate = useNavigate();
    const accessToken = getCookie("accessToken");

    const [data, setData] = useState();
    const [requestData, setRequestData] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        try{
            axios.get(FRIENDS_LIST, {headers: {Authorization: accessToken}})
            .then(res => {
                setData(res.data.content.map((item, index) => ({
                    ...item,
                    index,
                })));
            });
            axios.get(REQUEST_FRIEND, {headers: {Authorization: accessToken}})
            .then(res => {
                setRequestData(res.data.content.map((item) => ({
                    ...item
                })));
            });
        } catch(error){
            alert(error.response.data.message);
        }
        setReload(false);
    }, [reload])
    
    const deleteRequest = (memberId) => {
        try{
            axios.delete([REQUEST_FRIEND, memberId].join("/"), {headers: {Authorization: accessToken}}); 
            setReload(true);
        } catch(error){
            alert(error.response.data.message);
        }
    }
    const manageFriend = (memberId, isAdd) => {
        try{
            if(isAdd){
                axios.post([MANAGE_FRIEND, memberId].join("/"), {memberId}, {headers: {Authorization: accessToken}});                
            }
            else{
                if(window.confirm("삭제하시겠습니까?")){
                    axios.delete([MANAGE_FRIEND, memberId].join("/"), {headers: {Authorization: accessToken}});    
                }
            }
            setReload(true);
        } catch(error){
            alert(error.response.data.message);
        }
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    const modalStyle = {
        content: {
            width: "350px",
            height: "500px",
            margin: "auto",
            padding: "20px",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
    }

    return(
        <div className="container">
            <div className="header">
                <Header
                    type={1}
                    isFriend={true}
                />
            </div>
            <div className="content">
                <div className="Friend">
                    <div className="contents_top">
                        <button className="text_title" onClick={() => navigate(0)}>친구 목록</button>
                        <img className="img_noti" onClick={() => {setModalIsOpen(true)}} alt="noti" src={ !requestData || requestData.length === 0 ? icon_noti : icon_noti_on}/>
                        <Modal style={modalStyle} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>    
                            <RequestModal closeModal={closeModal} requestData={requestData} deleteRequest={deleteRequest} manageFriend = {manageFriend}/>
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
                                    onDelete={manageFriend}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer">
                <Navigator current="friend"/>
            </div>
        </div>
    )
}

export default Friend;