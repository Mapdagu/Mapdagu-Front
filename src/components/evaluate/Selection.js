import "../../styles/Selection.css";
import OptionItem from "./OptionItem";
import ProgressBar from "../ProgressBar";
import { EvalStateContext } from "../../App";
import { selectionList, testItemList, getItemImgById } from "../../util";

import icon_rope from "../../assets/test_rope.png";
import icon_back from "../../assets/icon/test_btn_back.png";

import { useContext } from "react";

const Selection = ({testNum, maxTestNum, goNext, goBack}) => {
    const testData = useContext(EvalStateContext);
    const percent = (testNum+1)/(maxTestNum+1);
    const itemInform = testItemList.filter(it => (it.id === testNum));
    const selectionInform = testData.filter(it => (it.id === testNum));
    const handleOnBack = () => {
        goBack();
    }
    const handleOnNext = (selectionId) => {
        goNext(itemInform.map((it) => it.itemName), selectionId);
    };

    return (
        <div className="Selection">
        <img className="img_rope" alt="rope" src={icon_rope}/>
            <div className="selection_wrapper">
                <div className="button_section">
                    <button className="btn_back" onClick={handleOnBack}>
                        <img alt="back" src={icon_back}/>
                    </button>
                </div>
                <h3> 이거 먹었을 때 어땠어?</h3>
                {itemInform.map((it) => (
                    <div key={it.id}>
                        <div className="image_wrapper">
                            <img alt="" src={getItemImgById(it.id+1)}/> 
                        </div>
                        <h4>{it.itemName}</h4>
                    </div>
                ))} 
                <div className="selection_list_wrapper">
                    {selectionList.map((it) => (
                        <OptionItem
                            key={it.id}
                            {...it}
                            onClick={handleOnNext}
                            isSelected = {selectionInform.length !== 0 ? selectionInform[0].selectionId === it.id : 0 === it.id}
                        />
                    ))}
                </div>
                <div className="progress_bar_wrapper">
                    <div className="progress_bar">
                        <ProgressBar width={100} color={"#D9D9D9"}>
                            <ProgressBar width={100*percent} color={"#000000"}/>
                        </ProgressBar>
                    </div>
                    {testNum+1} / {maxTestNum+1}
                </div>
            </div>
        </div>

    );
}

export default Selection;