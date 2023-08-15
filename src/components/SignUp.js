import "./SignUp.css";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

const SERVER_URL = 'https://mapdagu.site/api/sign-up/email';

const SignUp = ({onSubmit}) => {
    const [isSended, setIsSended] = useState(false);
    const [isCodeChecked, setIsCodeChecked] = useState(false);
    const [response, setResponse] = useState();

    const [inputValue, setInputValue] = useState({
        nickname: "",
        email: "",
        code: "",
        password: "",
        passwordConfirm: "",
    });
    const { nickname, email, code, password, passwordConfirm } = inputValue;
    //이름 2글자 이상 5글자 이하
    const isValidName = nickname.length >= 2 && nickname.length <= 5;
    // 이메일 검사: '@', '.'이 둘 다 포함
    const isValidEmail = email.includes('@') && email.includes('.');
    // 전체 8자 이상
    const isValidPassword = password.length >= 8;
    // 모든 input의 value가 1자 이상이 될 것
    const isValidInput = nickname.length >= 1 ;
    // 비밀번호와 비밀번호 확인 값이 일치할 것
    const isPasswordChecked = ((password === passwordConfirm) ? true : false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };
    
    const sendCode = async (e) => {
        console.log("send");
        if(isValidEmail){
            setIsSended(true);
            setResponse((await axios.post(SERVER_URL, {email})).data.authCode);
            console.log(response);
        }
        else{
            console.log("fail");
        }
        console.log(isSended);
    }
    const checkCode = () => {
        if(code === response){
            setIsCodeChecked(true);
        }
        else{
            setIsCodeChecked(false);
            alert("인증번호를 다시 입력해주세요");
        }
    }
    const getIsActive = 
    isValidEmail && isCodeChecked && isValidPassword && isValidInput && isPasswordChecked === true;

    const onSubmitHandler = () => {
        if(getIsActive){
            onSubmit(inputValue);
        }        
        else{
            alert("항목을 채워주세요");
        }
    }

    return (
        <div className="SignUp">
            <div className="signUpInput">
                <div className="nameInput">
                    <div className="inputMessage">1. 이름</div>
                    <input 
                        name="nickname"
                        onChange={handleInput}
                    />
                    <h5>{(nickname.length!==0 && !isValidName) ? '2글자 이상 5글자 이하로 입력하세요' : ''}</h5>
                </div>
                <div className="emailInput">
                    <div className="inputMessage">2. 이메일 인증</div>
                    <div className="wrapper">
                        <input 
                            name="email"
                            onChange={handleInput}
                        />
                        <Button text="인증번호 전송" onClick={sendCode}/>
                    </div>
                    <h5>{(email.length!==0 && !isValidEmail) ? '이메일 형식이 틀렸어요' : ''}</h5>
                    <h6>{(isSended && isValidEmail) ? '인증번호가 전송되었어요' : ''}</h6>
                    <div className="inputMessage"> 인증번호</div>
                    <div className="wrapper">
                        <input 
                            name="code"
                            onChange={handleInput}
                        />
                        <Button text="인증번호 확인" onClick={checkCode}/>
                    </div>
                    <h6>{(isCodeChecked) ? '인증번호가 확인되었어요' : ''}</h6>
                </div>
                <div className="passwordInput">
                    <div className="inputMessage">3. 비밀번호 설정</div>
                    <input 
                        type='password'
                        name="password"
                        onChange={handleInput}
                    />
                    <h5>{(password.length!==0 && !isValidPassword) ? '8글자 이상으로 설정해주세요' : ''}</h5>
                    <div className="inputMessage">4. 비밀번호 확인</div>
                    <input 
                        type='password'
                        name="passwordConfirm"
                        onChange={handleInput}
                    />
                    <h5>{(passwordConfirm.length!==0 && !isPasswordChecked) ? '비밀번호가 일치하지 않아요' : ''}</h5>
                </div>             
            </div>
            <Button text="다음 단계" onClick={onSubmitHandler}/>
        </div>
    )
}

export default SignUp;