import "./Navigator.css";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
    const pageType = "default";
    const navigate = useNavigate();
    const goMain = () => {
        navigate(`/main`);
    }
    const goFriend = () => {
        navigate(`/friend`);
    }
    const goEval = () => {
        navigate(`/evaluate`);
    }
    const goMyPage = () => {
        navigate(`/mypage`);
    }
    return (
        <div className={["Navigator", `Navigator_${pageType}`].join(" ")}>
            <button onClick={goMain}>홈</button> 
            <button onClick={goFriend}>친구</button> 
            <button onClick={goEval}>맵기평가</button> 
            <button onClick={goMyPage}>마이페이지</button>           
        </div>
    )
}

export default Navigator;