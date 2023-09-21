import { useNavigate } from "react-router-dom";
import "./Header.css";
import icon_search from "../img/icon/header_search.png";
import icon_setting from "../img/icon/header_setting.png";

const Header = ({type, title, leftChild, rightChild}) => {
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
                    <button><img alt="search" src={icon_search}/></button>
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