import "./OptionItem.css";
import React from "react";

const OptionItem = ({id, name, onClick, isSelected}) => {
    const handleOnClick = () => {
        onClick(id);
    }
    return(
        <div 
            className = {[
                "OptionItem",
                isSelected ? `OptionItem_on` : `OptionItem_off`,
            ].join(" ")}
            onClick={handleOnClick}>
            <span>{name}</span>
        </div>
    );
}

export default React.memo(OptionItem);