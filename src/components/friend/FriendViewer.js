import Graph from "../Graph";
import "./FriendViewer.css";
import icon_noti from "../../img/icon/friend_notification.png";
import icon_noti_on from "../../img/icon/friend_notification_on.png";
import FriendItem from "./FriendItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../../cookie";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import RequestModal from "./RequestModal";

const MANAGE_FRIEND = `https://mapdagu.site/api/friends`;
const REQUEST_FRIEND = `https://mapdagu.site/api/friends/request`;
const FRIENDS_LIST = `https://mapdagu.site/api/friends/me`;

const FriendViewer = () => {
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
        <div className="FriendViewer">
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
    )    
}

export default FriendViewer;