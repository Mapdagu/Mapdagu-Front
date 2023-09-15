import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({type, title, leftChild, rightChild}) => {
    const navigate = useNavigate();
    
    const changePage = () => {
        navigate(`/`);
    }
    const goMyPage = () => {
        navigate(`/mypage`);
    }   

    if(type === 1){
        return (
            <div className="Header">
                <div className="header_left">
                    {(leftChild) ? leftChild : <button onClick={changePage}>처음으로</button>}                    
                </div>
                <div className="header_title">
                    <button>내가 맵다 했지!</button>
                </div>
                <div className="header_right">
                    <button>🔍</button>
                    <button onClick={goMyPage}>🙂</button>
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