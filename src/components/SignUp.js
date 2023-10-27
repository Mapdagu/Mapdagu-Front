import "./SignUp.css";
import { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = 'https://mapdagu.site/api/sign-up/email';

const SignUp = ({onSubmit}) => {
    const [initInput, setInitInput] = useState(false);
    const [isSended, setIsSended] = useState(false);
    const [isCodeChecked, setIsCodeChecked] = useState(false);
    const [response, setResponse] = useState();
    const [time, setTime] = useState(180);
    const [isRunning, setIsRunning] = useState(false);

    const [inputValue, setInputValue] = useState({
        nickname: "",
        email: "",
        checkedEmail: "",
        code: "",
        password: "",
        passwordConfirm: "",
    });
    const { nickname, email, checkedEmail, code, password, passwordConfirm } = inputValue;
    //이름 2글자 이상 5글자 이하
    const isValidName = nickname.length >= 2 && nickname.length <= 5;
    // 이메일 검사: '@', '.'이 둘 다 포함
    const isValidEmail1 = email.includes('@') && email.includes('.');
    const isValidEmail2 = checkedEmail.includes('@') && checkedEmail.includes('.');
    // 비밀번호 8자 이상
    const isValidPassword = password.length >= 8;
    // 비밀번호와 비밀번호 확인 값이 일치할 것
    const isPasswordChecked = ((password === passwordConfirm) ? true : false);

    useEffect(()=> {
        let interval;
        if(isRunning){
            interval = setInterval(()=> {
                if(time>0){
                    setTime(time-1);
                } else{
                    clearInterval(interval);
                    setIsRunning(false);
                }
            }, 1000);
        }else{
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
        setInitInput(false);
    };
    
    const sendCode = async (e) => {
        if(isValidEmail1){
            setIsSended(true);
            setResponse((await axios.post(SERVER_URL, {email})).data.authCode);
            setIsRunning(true);
            setTime(180);
        }
        setInputValue({
            ...inputValue,
            checkedEmail: email,
        })
        setInitInput(true);
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
    isValidName && isValidEmail2 && isCodeChecked && isValidPassword && isPasswordChecked === true;

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
            <h1>회원가입</h1>
            <div className="signUpInput">
                <div className="sign_up_container">
                    <div className="inputMessage">이름</div>
                    <input 
                        name="nickname"
                        onChange={handleInput}
                        placeholder="이름 입력 (2~6자)"
                    />
                    <div className="text_red">{(nickname.length!==0 && !isValidName) ? '2글자 이상 5글자 이하로 입력해 주세요😢' : ''}</div>
                </div>

                <div className="sign_up_container">
                    <div className="inputMessage">이메일</div>
                    <div className="wrapper">
                        <input 
                            name="email"
                            onChange={handleInput}
                            placeholder="이메일 주소 입력"
                        />
                        <button className="btn_type1" onClick={sendCode}>인증번호 전송</button>   
                    </div>
                    <div className="text_red">{(email.length!==0 && !isValidEmail1 && !isValidEmail2) ? '이메일 형식이 틀렸어요😢' : ''}</div>
                    <div className="text_green">{(isSended && isValidEmail2) ? '인증번호가 전송되었어요' : ''}</div>
                </div>
                <div className="sign_up_container">
                    <div className="inputMessage">인증번호</div>
                    <div className="wrapper">
                        <input 
                            name="code"
                            onChange={handleInput}
                            placeholder="인증번호 입력"
                        />
                        {(isSended) ?
                        <div className="time_limit">{Math.floor(time / 60)}:{time % 60 < 10 ? '0' : ''}{time % 60}</div>
                        :""}
                        <button className="btn_type1" onClick={checkCode}>인증번호 확인</button>       
                    </div>
                    <div className="text_green">{(isCodeChecked) ? '인증번호가 확인되었어요' : ''}</div>
                </div>

                <div className="sign_up_container">
                    <div className="inputMessage">비밀번호</div>
                    <input 
                        type='password'
                        name="password"
                        value={initInput && password.length === 0 ? "" : password}
                        onChange={handleInput}
                        placeholder="비밀번호 입력 (8자 이상)"
                    />
                    <div className="text_red">{(password.length!==0 && !isValidPassword) ? '8글자 이상으로 설정해 주세요😢' : ''}</div>
                </div>
                <div className="sign_up_container">        
                    <div className="inputMessage">비밀번호 확인</div>
                    <input 
                        type='password'
                        name="passwordConfirm"
                        value={initInput && passwordConfirm.length === 0 ? "" : passwordConfirm}
                        onChange={handleInput}
                        placeholder="비밀번호 재입력"
                    />
                    <div className="text_red">{(passwordConfirm.length!==0 && !isPasswordChecked) ? '비밀번호가 일치하지 않아요😢' : ''}</div>
                </div>
            </div>
            <button className="btn_type2" onClick={onSubmitHandler}>확인</button>
        </div>
    )
}

export default SignUp;