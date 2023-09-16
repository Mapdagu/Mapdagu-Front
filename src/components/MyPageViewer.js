import "./MyPageViewer.css";
import { useNavigate } from "react-router-dom";
import { getProfileImgById } from "../util";
const MyPageViewer = ({imageNum, userName, handleLogout, handleWithdrawal}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit_profile`);
    }
    const doAgain = () => {
        if(window.confirm("테스트를 다시 진행하시겠습니까?")){
            navigate(`/test`);
        }
    }
    return(
        <div className="MyPageViewer">
            <div className="profile_section">
                <div><img alt="profile image" src={getProfileImgById(imageNum)}/></div>
                <h1>{userName}</h1>
            </div>
            <div className="buttons">
                <div><button onClick={handleEdit}>회원정보수정</button></div>
                <div><button onClick={doAgain}>테스트 다시하기</button></div>
                <div><button onClick={handleLogout}>로그아웃</button></div>
                <div><button onClick={handleWithdrawal}>회원탈퇴</button></div>
            </div>
        </div>
    )
}

export default MyPageViewer;