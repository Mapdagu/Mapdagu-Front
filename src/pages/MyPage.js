import Header from "../components/Header";
import Navigator from "../components/Navigator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getProfileImgById } from "../util";

const PROFILE_URL = `https://mapdagu.site/api/members/me/info`;
const LOGOUT_URL = `https://mapdagu.site/api/auth/logout`;

const MyPage = ({accessToken, initUserInf}) => {
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
                initUserInf();
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
                    />
                </div>
                <div className="content">
                    <div><img alt="profile image" src={getProfileImgById(state.imageNum)}/></div>
                    <div>{state.userName}</div>
                    <div><button onClick={handleEdit}>회원정보수정</button></div>
                    <div><button onClick={doAgain}>테스트 다시하기</button></div>
                    <div><button onClick={handleLogout}>로그아웃</button></div>
                    <div><button onClick={handleWithdrawal}>회원탈퇴</button></div>
                </div>
                <div className="footer">
                    <Navigator/>
                </div>
            </div>
        )
    }
}

export default MyPage;