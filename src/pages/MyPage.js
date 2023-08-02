import Button from "../components/Button";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const doAgain = () => {
        if(window.confirm("테스트를 다시 진행하시겠습니까?")){
            navigate(`/test`);
        }
    }
    const handleLogout = () => {
        if(window.confirm("로그아웃하시겠습니까?")){
            navigate(`/test`);
        }
    }
    const handleWithdrawal = () => {
        if(window.confirm("회원탈퇴하시겠습니까?")){
            navigate(`/test`);
        }
    }
    return(
        <div>
            <Header
                title="my page"
            />
            <Navigator/>
            <div><Button text="회원정보 수정"/></div>
            <div><Button text="테스트 다시하기" onClick={doAgain}/></div>
            <div><Button text="로그아웃" onClick={handleLogout}/></div>
            <div><Button text="회원탈퇴" onClick={handleWithdrawal}/></div>
        </div>
    )
}

export default MyPage;