import Login from "../components/login/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = 'https://mapdagu.site/login';

const LoginPage = ({getUserInfRes}) => {
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const { email, password } = data;
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
    return (
        <div>
            <Login onSubmit={onSubmit}/>
        </div>
    );
}

export default LoginPage;