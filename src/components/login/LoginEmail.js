import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import axios from "axios";

const SERVER_URL = 'https://mapdagu.site/login';

const LoginEmail = ({getUserInfRes}) => {  
    const navigate = useNavigate();  
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const { email, password } = state;

    const handleInput = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const onSubmit = async() => {  
        try {
            const res = (await axios.post(SERVER_URL, {email, password}));
            const role = res.data.role;
            const accessToken = res.headers[`authorization`];
            const refreshToken = res.headers[`authorization-refresh`];
            if(role === "NOT_TEST_USER"){
                navigate(`/test`);
            } else if(role === "USER"){
                navigate(`/main`);
            } else {
                navigate(`/set_profile`);
            }
            getUserInfRes(role, accessToken, refreshToken);
        }catch (error) {
            alert(error.response.data.message);
        }
    }    
    const onSignUp = () => {
        navigate(`/sign_up`);
    }

    return (
        <div className="LoginEmail">
            <div>이메일 로그인</div>
            <div>
                <input 
                    name="email"
                    onChange={handleInput}
                    placeholder="아이디"
                />
            </div> 
            <div>
                <input 
                    type = "password"
                    name="password"
                    onChange={handleInput}
                    placeholder="비밀번호"
                />                
            </div>
            <div><Button text="로그인" onClick={onSubmit}/></div>
            <button>아이디 찾기</button>|
            <button>비밀번호 찾기</button>|
            <button onClick={onSignUp}>회원가입</button>
        </div>
    );
}

export default LoginEmail;