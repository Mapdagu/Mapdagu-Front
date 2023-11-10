import "../../styles/ProfileItem.css";
import React from "react";

const ProfileItem = ({ id, img, onClick, isSelected}) => {
    const handleOnClick = () => {
        onClick(id);
    }
    
    return(
        <div 
            className = {[
                "ProfileItem",
                isSelected ? `ProfileItem_on` : `ProfileItem_off`,
            ].join(" ")}
            onClick={handleOnClick}>
            <img alt={`profile${id}`} src={img}/>   
        </div>
    );
}

export default React.memo(ProfileItem);