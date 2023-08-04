// import axios from "axios";
import { useEffect } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function NaverRedirect() {
    // const code = new URL(window.location.href).searchParams.get("code");
    // const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        // async function NaverLogin() {
        //     const res = await axios.get(
        //         process.env.REACT_APP_API +
        //         `api/member/login/naver?code=${code}$state=${process.env.NAVER_STATE}`
        //     );
        //     const ACCESS_TOKEN = res.headers["authorization"];
        //     const REFRESH_TOKEN = res.headers["refresh-token"];
        //     setCookies("accessToken", ACCESS_TOKEN);
        //     setCookies("refreshToken", REFRESH_TOKEN); 
        // };
        // NaverLogin();
        navigate("/set_profile", {replace:true})
    }, []);

    return;
}

export default NaverRedirect;