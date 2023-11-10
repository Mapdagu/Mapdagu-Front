import Header from "../components/Header.js";
import Search from "../components/search/Search.js";
import Navigator from "../components/Navigator.js";

import icon_back from "../assets/icon/header_back.png";

import { useNavigate } from "react-router-dom";

const SearchUser = () => {
    const navigate = useNavigate();

    const handleOnBack = () => {
        navigate(-1);
    }
    
    return(
        <div className="container">
            <div className="header">
                <Header 
                    type={1}
                    leftChild={<button onClick={handleOnBack}>
                        <img alt="back" src={icon_back}/>
                    </button>}
                />
            </div>
            <div className="content">
                <Search />
            </div>
            <div className="footer">
                <Navigator/>
            </div>
        </div>
    )

}

export default SearchUser;