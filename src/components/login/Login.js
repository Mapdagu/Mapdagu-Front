import "./Login.css";
import Header from "../Header";
import Button from "../Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import config from "../../apikey";
import KakaoRedirect from "./KakaoRedirect";

const Login = ({onSubmit}) => {   
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    // const REST_API_KEY = config.KAKAO_API_KEY;
    // const NAVER_CLIENT_ID = config.NAVER_CLIENT_ID;
    // const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
    
    const KAKAO_REDIRECT_URI = `https://mapdagu.site/oauth2/authorization/kakao`;
    const NAVER_REDIRECT_URI = `https://mapdagu.site/oauth2/authorization/naver`;
    const GOOGLE_REDIRECT_URI = `https://mapdagu.site/oauth2/authorization/google`;
    
    // const STATE = "flase";
    // const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    // const naverLink = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`

    const handleInput = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };
    const handleSubmit = () => {  
        onSubmit(state);
    }    
    const onSignUp = () => {
        navigate(`/sign_up`);
    }
    const kakaoLoginHandler = () => {
        window.location.href = KAKAO_REDIRECT_URI;
        // KakaoRedirect();
    }
    const naverLoginHandler = () => {
        window.location.href = NAVER_REDIRECT_URI;
    }

    const googleLoginHandler = () => {
        window.location.href = GOOGLE_REDIRECT_URI;
    } 
    return(
        <div className="Login">            
            <Header title={`login page`}/>
            <div>로그인</div>
            <div>
                <input 
                        name="email"
                        onChange={handleInput}
                />
            </div> 
            <div>
                <input 
                        type = "password"
                        name="password"
                        onChange={handleInput}
                />                
                <Button text="로그인" onClick={handleSubmit}/>
            </div>
            <button>아이디 찾기</button>|
            <button>비밀번호 찾기</button>|
            <button onClick={onSignUp}>회원가입</button>
            <div>
                <Button text="kakao" onClick={kakaoLoginHandler}/>
                <Button text="naver" onClick={naverLoginHandler}/>
                <Button text="google" onClick={googleLoginHandler}/>
            </div>
        </div>
    );
}

export default Login;