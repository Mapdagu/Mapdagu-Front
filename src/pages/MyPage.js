import Button from "../components/Button";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import { useNavigate } from "react-router-dom";
import { EvalDispatchContext } from "../App";
import { useContext } from "react";

const MyPage = ({maxTestNum, idRef}) => {
    const {onDelete} = useContext(EvalDispatchContext);
    const navigate = useNavigate();
    const doAgain = () => {
        if(window.confirm("테스트를 다시 진행하시겠습니까?")){
            navigate(`/`);
            for(var i = 3 ; i <= 3+maxTestNum ; i ++){
                console.log(i);
                onDelete(i);           
            }
            idRef.current -= maxTestNum+1;
        }
    }
    const handleLogout = () => {
        if(window.confirm("로그아웃하시겠습니까?")){
            navigate(`/test/1`);
        }
    }
    const handleWithdrawal = () => {
        if(window.confirm("회원탈퇴하시겠습니까?")){
            navigate(`/test/1`);
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