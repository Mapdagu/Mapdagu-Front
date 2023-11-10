import "../../styles/SetProfile.css";
import Header from "../Header";
import ProfileItem from "./ProfileItem";
import { getProfileImgById, profileImgList } from "../../util";

import icon_edit from "../../assets/icon/profile_edit.png";

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";
import Modal from "react-modal";

const SERVER_URL = `https://mapdagu.site/api/members/userName/isDuplicated`;

const SetProfile = ({title, initData, onSubmit}) => {
    const accessToken = getCookie("accessToken");
    const navigate = useNavigate();
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [profileId, setProfileId] = useState((initData && initData.imageNum) || 0);
    const [checkUserName, setCheckUserName] = useState({
        isChanged: false,
        isDuplicated: false,
        isClicked: false,
    })
    const [inputValue, setInputValue] = useState({
        userName: "",
        imageNum: 0,
        intro: ""
    });
    const {userName, intro} = inputValue;
    const isValidUserName = userName.length >= 2 && userName.length <= 7; 
    const isDuplicatedUserName = !checkUserName.isChanged || (!checkUserName.isDuplicated && checkUserName.isClicked);
    const isValidIntro = intro.length <= 20;

    useEffect(() => {
        if(initData){
            setInputValue({
                ...initData
            });
            setProfileId(initData.imageNum);
        }
    }, [initData])

    const goBack = () => {
        navigate(-1);
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
        if(name === "userName" && isValidUserName){
            setCheckUserName({
                ...checkUserName,
                isChanged: true,
                isClicked: false,
            });
        }
    };
    const onCheckDuplicated = async() => {
        if(isValidUserName){
            try{
                await axios.post(SERVER_URL, {userName}, {headers: {Authorization: accessToken}})
                .then(res => {
                    setCheckUserName({
                        ...checkUserName,
                        isDuplicated: res.data.isDuplicated,
                        isClicked: true,
                    })
                });
            } catch (error){
                alert(error.response.data.message);
            }
        }        
    }
    const onSubmitHandler = async(e) => {
        if(isValidUserName && isDuplicatedUserName && isValidIntro){
            onSubmit(inputValue);
        }
        else if(!isDuplicatedUserName){
            alert("닉네임 중복을 확인해주세요");
        }
    }
    const handleChangeSelection = useCallback((profileId) => {
        setProfileId(profileId);
    }, []);
    const handleChangeProfile = () => {
        setModalIsOpen(false);
        setInputValue({
            ...inputValue,
            imageNum: profileId,
        });
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
            justifyContent: "center",
        }
    }
    
    return (
        <div className="SetProfile">
            <div className="header">
                <Header 
                        title={title}
                        leftChild={<button onClick={goBack}>취소</button>}
                        rightChild={<button onClick={onSubmitHandler}>완료</button>}
                /> 
            </div>
            <div className="profile_input">
                <div className="profile_container">
                    <div><img className="img_profile" alt="" src={getProfileImgById(inputValue.imageNum)}/></div>
                    <button className="btn_overlay" onClick={() => setModalIsOpen(true)}>
                        <img alt="edit" src={icon_edit}/>
                    </button>
                    <Modal style={modalStyle} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>    
                        <div className="modal_title">프로필 선택</div>
                        <div><button className="btn_modal_close" onClick={() => setModalIsOpen(false)}>×</button></div>
                        <div className="profile_list_wrapper">
                            <div className="profile_images">
                                <a>Hot</a>
                                {profileImgList("HOT").map((it) => (
                                    <ProfileItem
                                        key={it.id}
                                        {...it}
                                        onClick={handleChangeSelection}
                                        isSelected={profileId === it.id}
                                    />
                                ))}
                            </div>
                            <div className="profile_images">
                                <a>Cute</a>
                                {profileImgList("CUTE").map((it) => (
                                    <ProfileItem
                                        key={it.id}
                                        {...it}
                                        onClick={handleChangeSelection}
                                        isSelected={profileId === it.id}
                                    />
                                ))}
                            </div>
                        </div>
                        <div><button className="btn_profile_submit" onClick={handleChangeProfile}>선택하기</button></div>
                    </Modal>
                </div>

                <div className="text_container">
                    <div className="inputMessage">닉네임</div>
                    <div>
                        <div className="wrapper">
                            <input 
                                name="userName"
                                onChange={handleInput}
                                value={inputValue.userName}
                            />
                            <button className="btn_duplicate" onClick={onCheckDuplicated}>중복확인</button>
                        </div>
                        <h5>{(userName.length!==0 && !isValidUserName) ? '2글자 이상 5글자 이하로 입력해 주세요😢' : ''}</h5>
                        <h5>{(checkUserName.isClicked && !isDuplicatedUserName) ? '사용할 수 없는 닉네임입니다😢' : ''}</h5>
                        <h6>{(checkUserName.isClicked && isDuplicatedUserName) ? '사용 가능한 닉네임입니다' : ''}</h6>
                    </div>
                </div>

                <div className="text_container">
                    <div className="inputMessage">한줄소개</div>
                    <div>
                        <input 
                            name="intro"
                            onChange={handleInput}
                            value={inputValue.intro}
                        />
                        <h5>{(intro.length!==0 && !isValidIntro) ? '20글자 이하로 입력해 주세요😢' : ''}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetProfile;