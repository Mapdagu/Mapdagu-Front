import Header from "../components/Header";
import Navigator from "../components/Navigator";
import MyPageViewer from "../components/MyPageViewer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../cookie";
import icon_back from "../img/icon/header_back.png";

const PROFILE_URL = `https://mapdagu.site/api/members/me/info`;
const LOGOUT_URL = `https://mapdagu.site/api/auth/logout`;

const MyPage = ({initUserRole}) => {
    const accessToken = getCookie("accessToken");
    const navigate = useNavigate();
    const [state, setState] = useState();

    useEffect(() => {
        try{
            axios.get(PROFILE_URL, {headers: {Authorization: accessToken}})
                .then(res => {
                    setState({
                        ...res.data,
                    })
                })
        }catch(error){
            alert(error.response.data.message);
        }
    }, [])

    const goBack = () => {
        navigate(-1);
    }
    const handleLogout = async() => {
        if(window.confirm("로그아웃하시겠습니까?")){
            try{
                await axios.post(LOGOUT_URL, {}, {headers: {Authorization: accessToken}});
                navigate(`/`, {replace: true});
                initUserRole();
            } catch(error){
                alert(error.response.data.message);
            }
        }
    }
    const handleWithdrawal = () => {
        if(window.confirm("회원탈퇴하시겠습니까?")){
            //탈퇴
        }
    }
    if(!state){
        return <div>불러오는 중입니다.</div>
    }
    else{
        return(
            <div className="container">
                <div className="header">
                    <Header
                        type={1}
                        leftChild={<button onClick={goBack}>
                            <img alt="back" src={icon_back}/>
                        </button>}
                    />
                </div>
                <div className="content">
                    <MyPageViewer imageNum={state.imageNum} userName={state.userName} handleLogout={handleLogout} handleWithdrawal={handleWithdrawal}/>
                </div>
                <div className="footer">
                    <Navigator/>
                </div>
            </div>
        )
    }
}

export default MyPage;