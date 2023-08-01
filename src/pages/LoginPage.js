import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const onSubmit = (id, password) => {
        //if(id, pw 정보가 db에 있으면)
        navigate(`/test`);
        //else
        //alert("아이디 혹은 비밀번호가 틀렸습니다");
    }
    return (
        <div>
            <Login onSubmit={onSubmit}/>
        </div>
    );
}

export default LoginPage;