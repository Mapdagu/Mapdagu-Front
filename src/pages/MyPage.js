import "../styles/MyPage.css";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import { getProfileImgById } from "../util";

import icon_back from "../assets/icon/header_back.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie";
import axios from "axios";

const PROFILE_URL = `https://mapdagu.site/api/members/me/info`;
const LOGOUT_URL = `https://mapdagu.site/api/auth/logout`;

const MyPage = ({initUserRole}) => {
    const accessToken = getCookie("accessToken");
    const navigate = useNavigate();

    const [data, setData] = useState();

    useEffect(() => {
        try{
            axios.get(PROFILE_URL, {headers: {Authorization: accessToken}})
                .then(res => {
                    setData({
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
    const handleEdit = () => {
        navigate(`/edit_profile`);
    }
    const doAgain = () => {
        if(window.confirm("테스트를 다시 진행하시겠습니까?")){
            navigate(`/test`);
        }
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
    
    if(!data){
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
                    <div className="MyPage">
                        <div className="profile_section">
                            <div><img alt="profile image" src={getProfileImgById(data.imageNum)}/></div>
                            <h1>{data.userName}</h1>
                        </div>
                        <div className="buttons">
                            <div><button onClick={handleEdit}>회원정보수정</button></div>
                            <div><button onClick={doAgain}>테스트 다시하기</button></div>
                            <div><button onClick={handleLogout}>로그아웃</button></div>
                            <div><button onClick={handleWithdrawal}>회원탈퇴</button></div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Navigator/>
                </div>
            </div>
        )
    }
}

export default MyPage;