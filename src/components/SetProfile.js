import "./SetProfile.css";
import Button from "./Button";
import tImg from "../img/logo192.png";
import { useState } from "react";

const SetProfile = ({onSubmit}) => {
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
    return (
        <div className="SetProfile">
            <div>1. 프로필 사진</div>
            <div><img alt="" src={tImg}/></div>
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
            <Button text="회원가입" onClick={onSubmitHandler}/>
        </div>
    );
}

export default SetProfile;