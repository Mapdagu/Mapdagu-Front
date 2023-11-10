import "../../styles/FriendItem.css";
import { getProfileImgById } from "../../util";

import crown_gold from "../../assets/icon/crown_gold.png";
import crown_silver from "../../assets/icon/crown_silver.png";
import crown_bronze from "../../assets/icon/crown_bronze.png";

import { useNavigate } from "react-router-dom";

const FriendItem = ({ id, index, imageNum, userName, level, onDelete}) => {
    const navigate = useNavigate();

    const goUserPage = () => {
        navigate(`/user_page/${id}`);
    }

    const handleOnDelete = () => {
        onDelete(id, false);
    }
    
    return(
        <div className="FriendItem">
            {index===0 ? <img className="img_crown" alt="crown" src={crown_gold}/>:""}
            {index===1 ? <img className="img_crown" alt="crown" src={crown_silver}/>:""}
            {index===2 ? <img className="img_crown" alt="crown" src={crown_bronze}/>:""}
            <img className="profile_img" onClick={goUserPage} alt="profile_img" src={getProfileImgById(imageNum)}/>
            <a>{userName}</a>
            <a>Level. {level}</a>
            {onDelete ? <button onClick={handleOnDelete}>삭제</button> : ""}
        </div>
    );
}

export default FriendItem;