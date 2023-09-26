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

const MANAGE_FRIEND = `https://mapdagu.site/api/friends`;
const REQUEST_FRIEND = `https://mapdagu.site/api/friends/request`;
const SEARCH_FRIEND = `https://mapdagu.site/api/friends?search`;

const FriendViewer = () => {
    const accessToken = getCookie("accessToken");
    const isNotiOn = true;  
    const [data, setData] = useState();
    const [searchedData, setSearchedData] = useState();
    // const [requestData, setRequestData] = useState();
    const requestData = [
        { id: 0, imageNum: 3, userName:"닉네임", level: 2},
        { id: 1, imageNum: 5, userName:"닉네임", level: 1},
        { id: 2, imageNum: 6, userName:"닉네임", level: 11},
    ]
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
        try{
            axios.get(REQUEST_FRIEND, {headers: {Authorization: accessToken}})
            .then(res => {
                setData(res.data.content.map((item) => ({
                    ...item
                })));
            })
        } catch(error){
            alert(error.response.data.message);
        }
    }, [])

    const onSearch = (userName) => {
        try{
            axios.post([SEARCH_FRIEND, userName].join("="), {headers: {Authorization: accessToken}})
            .then(res => {
            
            })
        } catch(error){
            alert(error.response.data.message);
        }
    }
    const getRequestList = () => {
        // try{
        //     axios.get(REQUEST_FRIEND, {headers: {Authorization: accessToken}})
        //     .then(res => {
        //         setRequestData(res.data.content.map((item) => ({
        //             ...item
        //         })));
        //     })
        // } catch(error){
        //     alert(error.response.data.message);
        // }
    }
    const manageRequest = (id, isSend) => {
        try{
            if(isSend){
                axios.post([REQUEST_FRIEND, id].join("/"), {headers: {Authorization: accessToken}});    
            }
            else{
                axios.delete([REQUEST_FRIEND, id].join("/"), {headers: {Authorization: accessToken}});    
            }            
        } catch(error){
            alert(error.response.data.message);
        }
    }
    const managefriend = (id, isAdd) => {
        try{
            if(isAdd){
                axios.post([MANAGE_FRIEND, id].join("/"), {headers: {Authorization: accessToken}});
            }
            else{
                axios.delete([REQUEST_FRIEND, id].join("/"), {headers: {Authorization: accessToken}});    
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
                <div className="text_title">친구 목록</div>
                <img className="img_noti" onClick={() => {getRequestList();setModalIsOpen(true)}}alt="noti" src={isNotiOn ? icon_noti_on : icon_noti}/>
                <Modal style={modalStyle} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>    
                    <div className="friend_modal_title">친구 요청</div>
                    <div><button className="btn_profile_close" onClick={() => setModalIsOpen(false)}>×</button></div>
                    <div className="request_list_wrapper">
                        { !requestData || requestData.length === 0 ?
                        "받은 요청이 없습니다" :
                        requestData.map((it) => (                            
                            <RequestItem
                                key={it.id}
                                    {...it}
                                    onAccept={managefriend}
                                    onDelete={manageRequest}
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
                "친구를 추가해보세요" :
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