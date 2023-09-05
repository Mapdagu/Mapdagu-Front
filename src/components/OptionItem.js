import "./OptionItem.css";
import React from "react";

const OptionItem = ({ id, name, onClick, isSelected, isTest}) => {
    const handleOnClick = () => {
        onClick(id);
    }
    if(isTest){
        return(
            <div 
                className = {[
                    "OptionItem",
                    isSelected ? `OptionItem_on` : `OptionItem_off_for_test`,
                ].join(" ")}
                onClick={handleOnClick}>
                <span>{name}</span>
            </div>
        );
    }
    else{
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
}

export default React.memo(OptionItem);