import "./SetProfile.css";
import Button from "./Button";
import tImg from "../img/logo192.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetProfile = () => {
    const navigate = useNavigate();
    const [context, setContext] = useState();
    const handleOnChangeContext = (e) => {
        setContext(e.target.value);
    } 
    const onSubmit = () => {
        // if(닉네임 중복){}
        // else{
            navigate(`/test`);
        // }
    }
    return (
        <div className="SetProfile">
            <div>1. 프로필 사진</div>
            <div><img src={tImg}/></div>
            <div>2. 닉네임</div>
            <div>
                <textarea 
                    value={context} 
                    onChange={handleOnChangeContext} 
                    placeholder="이메일 입력" />
            </div>
            <Button text="회원가입" onClick={onSubmit}/>
        </div>
    );
}

export default SetProfile;