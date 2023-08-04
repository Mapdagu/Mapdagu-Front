import "./Login.css";
import Header from "./Header";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../apikey";

const Login = ({onSubmit}) => {   
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: "",
        password: "",
    });

    // const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    // const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    // const GOOGLE_CLIENT_ID = `131547171304-i2ek49afir8ad0eeufsghep9tji5e2bs.apps.googleusercontent.com`;
    const REST_API_KEY = config.KAKAO_API_KEY;
    const NAVER_CLIENT_ID = config.NAVER_CLIENT_ID;
    const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
    console.log(config.KEY);
    
    const KAKAO_REDIRECT_URI = `http://localhost:3000/oauth/callback/kakao`;
    const NAVER_REDIRECT_URI = `http://localhost:3000/oauth/callback/naver`;
    const STATE = "flase";
    const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    const naverLink = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`

    const handleIdChange = (e) => {
        setState({
            ...state,
            id: e.target.value,
        });
    };
    const handlePasswordChange = (e) => {
        setState({
            ...state,
            password: e.target.value,
        })
    };
    const handleSubmit = () => {  
        // console.log(`${state.id}, ${state.password}`)
        onSubmit(state.id, state.password);
    }    
    const onSubscribe = () => {
        navigate(`/sign_up`);
    }
    const kakaoLoginHandler = () => {
        window.location.href = kakaoLink;
    }
    const naverLoginHandler = () => {
        window.location.href = naverLink;
    }
    return(
        <div className="Login">            
            <Header title={`login page`}/>
            <div>로그인</div>
            <div>
                <textarea value={state.id} onChange={handleIdChange} placeholder="아이디" />
                <Button text="로그인" onClick={handleSubmit}/>
            </div> 
            <div><textarea value={state.password} onChange={handlePasswordChange} placeholder="비밀번호" /></div>
            <button>아이디 찾기</button>|
            <button>비밀번호 찾기</button>|
            <button onClick={onSubscribe}>회원가입</button>
            <div>
                <Button text="kakao" onClick={kakaoLoginHandler}/>
                <Button text="naver" onClick={naverLoginHandler}/>
                <Button text="google"/>
            </div>
        </div>
    );
}

export default Login;