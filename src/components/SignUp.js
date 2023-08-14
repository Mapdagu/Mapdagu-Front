import "./SignUp.css";
import Button from "./Button";
import { useState } from "react";

const SignUp = ({onSubmit}) => {
    const [inputValue, setInputValue] = useState({
        nickname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const { nickname, email, password, passwordConfirm } = inputValue;
    //이름 2글자 이상 5글자 이하
    const isValidName = nickname.length >= 2 && nickname.length <= 5;
    // 이메일 검사: '@', '.'이 둘 다 포함
    const isValidEmail = email.includes('@') && email.includes('.');
    // 전체 8자 이상
    const isValidPassword = password.length >= 8;
    // 모든 input의 value가 1자 이상이 될 것
    const isValidInput = nickname.length >= 1 ;
    // 이메일 코드 인증 확인
    // 비밀번호와 비밀번호 확인 값이 일치할 것
    const isPasswordChecked = ((password === passwordConfirm) ? true : false);

    // 검사한 모든 로직의 유효성 검사가 true가 될때 getIsActive함수가 작동
    const getIsActive = 
    isValidEmail && isValidPassword && isValidInput && isPasswordChecked === true;

   
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };
    
    const onSubmitHandler = () => {
        if(getIsActive){
            onSubmit(inputValue);
        }
        
    }

    return (
        <div className="SignUp">
            <form className="signUpInput">
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
                    <input 
                        name="email"
                        onChange={handleInput}
                    />
                    <h5>{(email.length!==0 && !isValidEmail) ? '이메일 형식이 틀렸어요' : ''}</h5>
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
            </form>
            <Button text="다음 단계" onClick={onSubmitHandler}/>
        </div>
    )
}

export default SignUp;