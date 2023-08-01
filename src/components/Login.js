import "./Login.css";
import Header from "./Header";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({onSubmit}) => {    
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: "",
        password: "",
    });
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
        navigate(`/subscribe`);
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
        </div>
    );
}

export default Login;