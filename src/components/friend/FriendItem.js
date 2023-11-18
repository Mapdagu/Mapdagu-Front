import "../../styles/FriendItem.css";
import { getProfileImgById } from "../../util";

import crown_gold from "../../assets/icon/crown_gold.png";
import crown_silver from "../../assets/icon/crown_silver.png";
import crown_bronze from "../../assets/icon/crown_bronze.png";

import { useNavigate } from "react-router-dom";

const FriendItem = ({ id, imageNum, userName, level, rank, onDelete}) => {
    const navigate = useNavigate();

    const goUserPage = () => {
        navigate(`/user_page/${id}`);
    }

    const handleOnDelete = () => {
        onDelete(id, false);
    }
    // console.log(userName, index);
    return(
        <div className="FriendItem">
            {rank && level===rank.first && <img className="img_crown" alt="crown" src={crown_gold}/>}
            {rank && level===rank.second && <img className="img_crown" alt="crown" src={crown_silver}/>}
            {rank && level===rank.third && <img className="img_crown" alt="crown" src={crown_bronze}/>}
            <img className="profile_img" onClick={goUserPage} alt="profile_img" src={getProfileImgById(imageNum)}/>
            <a className="username">{userName}</a>
            <a className="level">Level. {level}</a>
            {onDelete ? <button onClick={handleOnDelete}>삭제</button> : ""}
        </div>
    );
}

export default FriendItem;