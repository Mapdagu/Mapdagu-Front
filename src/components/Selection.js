import "./Selection.css";
import { selectionList, testItemList, getItemImgById } from "../util";
import { useState } from "react";
import OptionItem from "./OptionItem";
import Bottom from "./Bottom";
import Button from "./Button";
import ProgressBar from "./ProgressBar";

const Selection = ({testNum, maxTestNum, goNext, goBack}) => {
    const percent = (testNum)/(maxTestNum+1);
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
        setState({
            selectionId: 0,
        })
    }

    return (
        <div className="Selection">
            <div className="selection_wrapper">
                <h3> 이거 먹었을 때 어땠어?</h3>
                {itemInform.map((it) => (
                    <div key={it.id}>
                        <div className="image_wrapper">
                            <img alt="" src={getItemImgById(it.id+1)}/> 
                        </div>
                        <h4> 나에게 {it.itemName}은</h4>
                    </div>
                ))} 
                <div className="selection_list_wrapper">
                    {selectionList.map((it) => (
                        <OptionItem
                            key={it.id}
                            {...it}
                            onClick={handleChangeSelection}
                            isSelected={state.selectionId === it.id}
                        />
                    ))}
                </div>
                <div className="progress_bar_wrapper">
                    <div className="progress_bar">
                        <ProgressBar width={100} color={"#D9D9D9"}>
                            <ProgressBar width={100*percent} color={"#000000"}/>
                        </ProgressBar>
                    </div>
                     {testNum+1}/{maxTestNum+1}
                </div>
                <Bottom leftChild={<Button text="이전" onClick={handleOnBack}/>}
                        rightChild={<Button text="다음" onClick={handleOnNext}/>}
                />
            </div>
        </div>

    );
}

export default Selection;