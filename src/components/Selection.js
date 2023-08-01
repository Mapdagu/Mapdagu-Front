import "./Selection.css";
import { selectionList, testItemList, getItemImgById } from "../util";
import { useState } from "react";
import OptionItem from "./OptionItem";
import Bottom from "./Bottom";
import Button from "./Button";

const Selection = ({testNum, goNext, goBack}) => {
    const [state, setState] = useState({
        selectionId: 0,
    });
    const itemInform = testItemList.filter(it => (it.id === testNum));

    const handleChangeSelection = (selectionId) => {
        setState({
            ...state,
            date: new Date().getTime(),
            itemName: itemInform.map((it) => it.itemName),
            selectionId,
        });
    };
    const handleOnBack = () => {
        goBack(state);
    }
    const handleOnNext = () => {
        goNext(state);
    }

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
            <Bottom leftChild={<Button text="이전" onClick={handleOnBack}/>}
                    rightChild={<Button text="다음" onClick={handleOnNext}/>}
            />
        </div>

    );
}

export default Selection;