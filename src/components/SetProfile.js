import "./SetProfile.css";
import { useState, useCallback } from "react";
import Modal from "react-modal";
import ProfileItem from "../components/ProfileItem";
import { getProfileImgById, profileImgList } from "../util";
import { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const SetProfile = ({title, initData, onSubmit}) => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [profileId, setProfileId] = useState((initData && initData.imageNum) || 0);

    const [inputValue, setInputValue] = useState({
        userName: "",
        imageNum: 0,
        intro: ""
    });
    const {userName, intro} = inputValue
    const isValidUserName = userName.length >= 2 && userName.length <= 7; 
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
    };
    const onSubmitHandler = async(e) => {
        onSubmit(inputValue);
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
                    <div><img alt="" src={getProfileImgById(inputValue.imageNum)}/></div>
                    <button className="btn_overlay" onClick={() => setModalIsOpen(true)}>✏️</button>
                    <Modal style={modalStyle} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>    
                        <div className="modal_title">프로필 선택</div>
                        <div><button className="btn_profile_close" onClick={() => setModalIsOpen(false)}>×</button></div>
                        <div className="profile_list_wrapper">
                            <div className="profile_images">
                                <p>Hot</p>
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
                                <p>Cute</p>
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
                        <input 
                            name="userName"
                            onChange={handleInput}
                            value={inputValue.userName}
                        />
                        <h5>{(userName.length!==0 && !isValidUserName) ? '2글자 이상 5글자 이하로 입력해 주세요😢' : ''}</h5>
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