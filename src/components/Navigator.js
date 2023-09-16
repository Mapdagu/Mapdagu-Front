import "./Navigator.css";
import { useNavigate } from "react-router-dom";
import icon_main_on from "../img/icon/navi_main_on.png"
import icon_main_off from "../img/icon/navi_main_off.png"
import icon_friend_on from "../img/icon/navi_friend_on.png"
import icon_friend_off from "../img/icon/navi_friend_off.png"
import icon_eval_on from "../img/icon/navi_eval_on.png"
import icon_eval_off from "../img/icon/navi_eval_off.png"

const Navigator = ({current}) => {
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
        <div className="Navigator">
            <button onClick={goMain}>
                {current === "main" ? 
                <img alt="main_on" src={icon_main_on}/>
                : <img alt="main_off" src={icon_main_off}/>}
            </button> 
            <button onClick={goFriend}>                
                {current === "friend" ? 
                <img alt="friend_on" src={icon_friend_on}/>
                : <img alt="friend_off" src={icon_friend_off}/>}    
            </button> 
            <button onClick={goEval}>
                {current === "eval" ? 
                <img alt="eval_on" src={icon_eval_on}/>
                : <img alt="eval_off" src={icon_eval_off}/>}
            </button> 
            {/* <button onClick={goMyPage}>마이페이지</button>            */}
        </div>
    )
}

export default Navigator;