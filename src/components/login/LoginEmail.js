import "../../styles/LoginEmail.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../cookie";
import axios from "axios";

const SERVER_URL = 'https://mapdagu.site/login';

const LoginEmail = ({getUserRole, closeModal}) => {  
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
        const isValidEmail = email.includes('@') && email.includes('.');
        if(isValidEmail && password.length > 0){
            try {
                const res = (await axios.post(SERVER_URL, {email, password}));
                const role = res.data.role;
                const accessToken = res.headers[`authorization`];
                const refreshToken = res.headers[`authorization-refresh`];
                setCookie("accessToken", accessToken);
                setCookie("refreshToken", refreshToken); 
                if(role === "NOT_TEST_USER"){
                    navigate(`/test`);
                } else if(role === "USER"){
                    navigate(`/main`);
                } else {
                    navigate(`/set_profile`);
                }
                getUserRole(role);
            }catch (error) {
                alert(error.response.data.message);
            }
        }
    }    

    const onSignUp = () => {
        navigate(`/sign_up`);
    }

    return (
        <div className="LoginEmail">
            <div className="login_input">
                    <input 
                        name="email"
                        onChange={handleInput}
                        placeholder="ID"
                    />
                    <input 
                        type = "password"
                        name="password"
                        onChange={handleInput}
                        placeholder="P/W"
                    />
                <button className="btn_login" onClick={onSubmit}>로그인</button>
            </div>
            <div className="buttons">
                <button>아이디 찾기</button>|
                <button>비밀번호 찾기</button>|
                <button onClick={onSignUp}>회원가입</button>
            </div>
            <div><button className="btn_close" onClick={closeModal}>나중에 할래요</button></div>           
        </div>
    );
}

export default LoginEmail;