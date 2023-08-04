import "./SignUp.css";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [confirm, setConfirm] =  useState();
    const [state, setState] = useState({
        name: "",
        email: "",
        code: "",
        password: "",
        isCodeChecked: true, //수정필요
        isPasswordChecked: true, //수정필요
    });

    const handleOnChangeName = (e) => {
        setState({
            ...state,
            name: e.target.value,
        });
    }
    const handleOnChangeEmail = (e) => {
        setState({
            ...state,
            email: e.target.value,
        });
    }
    const handleOnChangeCode = (e) => {
        setState({
            ...state,
            code: e.target.value,
        });
    }
    const handleOnChangePassword = (e) => {
        setState({
            ...state,
            password: e.target.value,
        });
    }
    const handleOnChangePassword2 = (e) => {
            setConfirm(e.target.value);
        }

    const onRequestCode = () => {
        alert("인증번호를 전송했습니다");
    }
    const onCheckCode = () => {
        /*
        if(코드일치)
            확인되었습니다
            setState({
                ...state,
                isCodeChecked: true,
            })
        else{
            틀렸습니다
            setState({
                ...state,
                iscodeChecked: false,
            })
        }
        */
    }    
    
    const onSubmit = () => {
        // if(state.password === confirm){
        //     setState({
        //         ...state,
        //         isPasswordChecked: true,
        //     })
        // }
        // else{
        //     setState({
        //         ...state,
        //         isPasswordChecked: false,
        //     })
        // }

        if(state.name === ""){
            alert("이름을 입력하세요");
        }
        else if(!state.isCodeChecked){
            alert("이메일 인증을 해주세요");
        }
        else if(!state.isPasswordChecked){
            alert("비밀번호가 같지 않습니다")
        }
        else
            navigate(`/set_profile`);
    }

    return (
        <div className="Subscribe">
            <div>1. 이름</div>
            <div>
                <textarea value={state.name} onChange={handleOnChangeName} placeholder="이름 입력" />
            </div>
            <div>2. 이메일 확인</div>
            <div>
                <textarea value={state.email} onChange={handleOnChangeEmail} placeholder="이메일 입력" />
                <Button text="인증번호 요청" onClick={onRequestCode}/>
            </div>
            <div>
                <textarea value={state.code} onChange={handleOnChangeCode} placeholder="인증번호 입력" />
                <Button text="인증번호 확인" onClick={onCheckCode}/>
            </div>
            <div>3. 비밀번호 설정</div>
            <div>
                <textarea value={state.password} onChange={handleOnChangePassword} placeholder="비밀번호 설정" />
            </div>
            <div>    
                <textarea value={confirm} onChange={handleOnChangePassword2} placeholder="비밀번호 확인" />
            </div>
            <Button text="다음 단계" onClick={onSubmit}/>
        </div>
    )
}

export default SignUp;