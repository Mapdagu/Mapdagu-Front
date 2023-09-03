import "./SetProfile.css";
import Button from "./Button";
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
    const [state, setState] = useState({
        profileId: 0,
    })
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
            })
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
        setState((state) => ({
            ...state,
            profileId,
        }));
    }, []);
    const handleChangeProfile = () => {
        setModalIsOpen(false);
        setInputValue({
            ...inputValue,
            imageNum: state.profileId,
        });
    }
    return (
        <div className="SetProfile">
            <Header leftChild={<button onClick={goBack}>취소</button>}
                    rightChild={<button onClick={onSubmitHandler}>완료</button>}
            /> 
            <h1>{title}</h1>
            <div className="profile_input">
                <div className="profile_container">
                    <div><img alt="" src={getProfileImgById(inputValue.imageNum)}/></div>
                    <button className="btn_overlay" onClick={() => setModalIsOpen(true)}>✏️</button>
                    <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>    
                        <div className="profile_list_wrapper">
                            {profileImgList.map((it) => (
                                <ProfileItem
                                    key={it.id}
                                    {...it}
                                    onClick={handleChangeSelection}
                                    isSelected={state.profileId === it.id}
                                />
                            ))}
                        </div>
                        <div><Button text="완료" onClick={handleChangeProfile}/></div>
                    </Modal>
                </div>

                <div className="container">
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

                <div className="container">
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