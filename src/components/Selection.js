import "./Selection.css";
import { selectionList, testItemList, getItemImgById } from "../util";
import { useState } from "react";
import OptionItem from "./OptionItem";

const Selection = ({testNum}) => {
    const [state, setState] = useState({
        selectionId: 0,
    });
    const itemInform = testItemList.filter(it => (it.id === testNum));

    const handleChangeSelection = (selectionId) => {
        setState({
            ...state,
            selectionId,
        });
    };

    return (
        <div className="Selection">
            {itemInform.map((it) => (
                <div key={it.id}>
                    <h4> 나에게 {it.itemName}은</h4>
                    <img alt="" src={getItemImgById(it.id)}/> 
                </div>
            ))} 
            <div className="input_wrapper selection_list_wrapper">
                {selectionList.map((it) => (
                    <OptionItem
                        key={it.id}
                        {...it}
                        onClick={handleChangeSelection}
                        isSelected={state.selectionId === it.id}
                    />
                ))}
            </div>
        </div>

    );
}

export default Selection;