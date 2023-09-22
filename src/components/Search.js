import "./Search.css";
import icon_back from "../img/icon/header_back.png";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return(
        <div className="Search">
            <div className="contents_top">
                <button className="btn_back" onClick={goBack}><img alt="back" src={icon_back}/></button>
                <input/>
            </div>
            <div className="contents_top">
                <div className="left">
                    <h1>최근 검색어</h1>
                </div>
                <div className="right">
                    <button className="btn_delete">전체 삭제</button>
                </div>
            </div>
            <div className="list_wrapper">

            </div>
        </div>
    );
}

export default Search;