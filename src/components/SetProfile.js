import "./SetProfile.css";
import Button from "./Button";
import { useState, useCallback } from "react";
import Modal from "react-modal";
import ProfileItem from "../components/ProfileItem";
import { getProfileImgById, profileImgList } from "../util";

const SetProfile = ({onSubmit}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [state, setState] = useState({
        profileId: 0,
    })
    const [inputValue, setInputValue] = useState({
        userName: "",
        imageNum: 0,
        intro: ""
    });
    const {userName, imageNum, intro} = inputValue;

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
            <div>1. 프로필 이미지</div>
            <div><img alt="" src={getProfileImgById(state.profileId)}/></div>
            <Button text="이미지 선택" onClick={() => setModalIsOpen(true)}/>
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
            <div>2. 닉네임</div>
            <div>
                <input 
                    name="userName"
                    onChange={handleInput}
                />
            </div>
            <div>3. 한줄소개</div>
            <div>
                <input 
                    name="intro"
                    onChange={handleInput}
                />
            </div>
            { onSubmit ? <Button text="회원가입" onClick={onSubmitHandler}/> : ""}
        </div>
    );
}

export default SetProfile;