import "../styles/Friend.css";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import FriendItem from "../components/friend/FriendItem";
import RequestModal from "../components/friend/RequestModal";
import Graph from "../components/Graph";
import '../App.css';
import { checkRequests } from "../styles/ModalStyles";

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

const mockData = [
    {id: 789798,imageNum: 1,level: 1,userName: "통모짜핫도그",},
    {id: 1231,imageNum: 2,level: 2,userName: "고양이",},
    {id: 87456,imageNum: 3,level: 12,userName: "일곱글자닉네임"},
    {id: 12,imageNum: 4,level: 2,userName: "연필",},
    {id: 24516876,imageNum: 5,level: 2,userName: "지코바",},
    {id: 231684,imageNum: 6,level: 3,userName: "우유",},
    {id: 23164,imageNum: 7,level: 11,userName: "고구마",},
    {id: 4861,imageNum: 8,level: 12,userName: "감자",},
    {id: 9123,imageNum: 1,level: 1,userName: "통모짜핫도그",},
    {id: 1242352435,imageNum: 2,level: 2,userName: "고양이",},
    {id: 678567658,imageNum: 3,level: 3,userName: "일곱글자닉네임"},
    {id: 97897897,imageNum: 4,level: 4,userName: "연필",},
    {id: 123,imageNum: 5,level: 5,userName: "지코바",},
    {id: 4567,imageNum: 6,level: 6,userName: "우유",},
    {id: 3452,imageNum: 7,level: 11,userName: "고구마",},
    {id: 925,imageNum: 8,level: 12,userName: "감자",}
];

const Friend = () => {
    const navigate = useNavigate();
    const accessToken = getCookie("accessToken");

    const [data, setData] = useState(mockData);
    const [rank, setRank] = useState({
        first: 1,
        second: 0,
        third: 0,
    });
    const [levelCounts, setLevelCounts] = useState();
    const [totalFriends, setTotalFriends] = useState(0);

    const [requestData, setRequestData] = useState(mockData);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fadeIn, setFadeIn] = useState(true);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        try{
            // axios.get(FRIENDS_LIST, {headers: {Authorization: accessToken}})
            // .then(res => {
            //     //친구 레벨순 정렬
            //     setData((res.data.content.sort((a, b) => new Date(b.level) - new Date(a.level))).map((item)=>({
            //         ...item,
            //     })));
            //     const levels = res.data.content.map(item => item.level);
            
            // for mockData
                setData(data.sort((a, b) => new Date(b.level) - new Date(a.level)));
                const levels = data.map((item)=> item.level);
                
                const sortedLevels = levels.sort((a, b) => b - a);

                const firstHighestLevel = sortedLevels[0];
                const secondHighestLevel = sortedLevels.find(item => item < firstHighestLevel) || null;
                const thirdHighestLevel = sortedLevels.find(item => item < secondHighestLevel) || null;
        
                setRank({
                    first: firstHighestLevel,
                    second: secondHighestLevel,
                    third: thirdHighestLevel,
                });   

                //레벨 별 유저 수 카운트
                const counts = {}; 
                data.forEach(user => {
                  const { level } = user;
                  counts[level] = (counts[level] || 0) + 1;
                });  
                setLevelCounts(counts);
                //전체 친구 수
                setTotalFriends(data.length);
            // });
            // axios.get(REQUEST_FRIEND, {headers: {Authorization: accessToken}})
            // .then(res => {
            //     setRequestData(res.data.content.map((item) => ({
            //         ...item
            //     })));
            // });  
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
        setFadeIn(false);
        let timer;
        if(modalIsOpen){
          timer = setTimeout(() => {setModalIsOpen(false); setFadeIn(true);}, 300);
        }

        return () => {
          clearTimeout(timer);
        };
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
                        <Modal overlayClassName={`ReactModal__Overlay--after-open ${fadeIn}`} className="modal-content fade-out" style={checkRequests()} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>    
                            <RequestModal closeModal={closeModal} requestData={requestData} deleteRequest={deleteRequest} manageFriend = {manageFriend}/>
                        </Modal>
                    </div>
                    <div className="graph_wrapper">
                        <Graph isFriend={true} totalFriends={totalFriends} levelCounts={levelCounts}/>
                    </div>
                    <div className="list_container">
                        { !data || data.length === 0 ?
                        <p>아직 친구가 없어요<br/>친구를 추가해보세요!</p>:
                        <div className="list_wrapper">
                            <div className="total_friends">
                                <a><b>{totalFriends}명</b>의 친구</a>
                            </div>
                            <div className="list">
                                {data.map((it) => (                            
                                    <FriendItem
                                        key={it.id}
                                            {...it}
                                            rank={rank}
                                            onDelete={manageFriend}
                                    />
                                ))}
                            </div>
                        </div>
                        }
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