import "../styles/Header.css";

import icon_search from "../assets/icon/header_search.png";
import icon_setting from "../assets/icon/header_setting.png";
import icon_friend from "../assets/icon/header_friend.png";

import { useNavigate } from "react-router-dom";

const Header = ({type, title, leftChild, rightChild, isFriend}) => {
    const navigate = useNavigate();
    
    const changePage = () => {
        navigate(`/`);
    }
    const goMyPage = () => {
        navigate(`/mypage`);
    }   
    const goMain = () => {
        navigate(`/main`);
    }
    const goSearch = () => {
        if(isFriend){
            navigate(`/search_user`);
        }
        else{
            navigate(`/search`);
        }
    }

    if(type === 1){
        return (
            <div className="Header">
                <div className="header_left">
                    {(leftChild) ? leftChild : <button onClick={changePage}>처음으로</button>}                    
                </div>
                <div className="header_title">
                    <button onClick={goMain}>내가 맵다 했지!</button>
                </div>
                <div className="header_right">
                    <button onClick={goSearch}>
                        {(isFriend) ? <img alt="add_friend" src={icon_friend}/> : <img alt="search" src={icon_search}/>}
                    </button>
                    <button onClick={goMyPage}><img alt="setting" src={icon_setting}/></button>
                </div>
            </div>
        )        
    } else {
        return (
            <div className="Header">
                <div className="header_left">{leftChild}</div>
                <div className="header_title">{title}</div>
                <div className="header_right">{rightChild}</div>
            </div>
        )
    } 
}

export default Header;