import "./FriendItem.css";
import { getProfileImgById } from "../../util";
import { useNavigate } from "react-router-dom";

const FriendItem = ({ id, imageNum, username, level, onDelete}) => {
    const navigate = useNavigate();

    const goUserPage = () => {
        navigate(`/user_page/${id}`);
    }

    const handleOnDelete = () => {
        onDelete(id, false);
    }
    return(
        <div onClick={goUserPage} className="FriendItem">
            <img alt="friend_profile" src={getProfileImgById(imageNum)}/>
            <a>{username}</a>
            <a>Level. {level}</a>
            {onDelete ? <button onClick={handleOnDelete}>삭제</button> : ""}
        </div>
    );
}

export default FriendItem;