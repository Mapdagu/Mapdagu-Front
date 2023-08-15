import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SetProfile from "../components/SetProfile";

const EditProfile = () => {
    const navigate = useNavigate();

    // const [inputValue, setInputValue] = useState({
    //     userName: "",
    //     intro: "",
    // });
    // const { userName, intro } = inputValue;

    // const isValidNickname = userName.length >= 2 && userName.length <= 5;
    
    // const handleInput = (e) => {
    //     const { name, value } = e.target;
    //     setInputValue({
    //         ...inputValue,
    //         [name]: value,
    //     });
    // };

    const handleOnBack = () => {
        navigate(-1);
    }
    const handleOnSubmit = () => {
        // if(!isValidNickname){
        //     alert("닉네임 형식이 틀렸어요");
        // }
        // else{
        //     alert("변경되었습니다");
        //     navigate(`/mypage`);
        console.log("done");
        // }        
    }
    return (
        <div>
            <Header title="edit profile"
                    leftChild={<Button text="취소" onClick={handleOnBack}/>}
                    rightChild={<Button text="완료" onClick={handleOnSubmit}/>}
            />            
            {/* <div>닉네임</div>
            <input name="userName" onChange={handleInput}/>
            <h5>{(userName.length!==0 && !isValidNickname) ? '2글자 이상 5글자 이하로 입력하세요' : ''}</h5>
            <div>한줄소개</div>
            <input name="intro"/> */}
            <SetProfile/>
        </div>
    );
}

export default EditProfile;