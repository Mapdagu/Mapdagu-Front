import "./RequestItem.css";
import { getProfileImgById } from "../../util";

const RequestItem = ({id, imageNum, userName, level, onAccept, onDelete}) => {
    const handleOnAccept = () => {
        onAccept(id, true);
    }
    const handleOnDelete = () => {
        onDelete(id);
    }
    return (
        <div className="RequestItem">
            <div className="image_section">
                <img alt="profile img" src={getProfileImgById(imageNum)}/>
            </div>
            <div className="info_section">
                <div className="text_userName">{userName}</div>
                <div className="text_level">Level. {level}</div>
            </div>
            <div className="buttons">
                <button className="btn_accept" onClick={handleOnAccept}>수락</button>
                <button className="btn_delete" onClick={handleOnDelete}>삭제</button>
            </div>

        </div>
    )
}

export default RequestItem;