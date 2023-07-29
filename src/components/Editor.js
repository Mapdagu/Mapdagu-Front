import "./Editor.css";
import OptionItem from "./OptionItem";
import Button from "./Button";
import Bottom from "./Bottom";
import { getItemImgById, selectionList } from "../util";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Editor = ({initData, onSubmit}) => {  
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: 2,
        itemName: "itemName",
        selectionId: 0,
    });

    const handleSubmit = () => {
        onSubmit(state);
    }
    const handleOnBack = () => {
        navigate(-1);
    }
    const handleChangeSelection = useCallback((selectionId) => {
        setState((state) => ({
            ...state,
            selectionId,
        }));
        console.log(`state.id: ${state.id}`);
        console.log(`state.itemName: ${state.itemName}`);
    }, []);

    useEffect(() => {
        if(initData){
            setState({
                ...initData,
            })
        }
    }, [initData])

    return (
        <div className="Editor">
            <h4> 나에게 {state.itemName}은</h4>
            <img alt="" src={getItemImgById(state.id)}/> 
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
            <Bottom leftChild={<Button text={"취소하기"} onClick={handleOnBack}/>}
                    rightChild={<Button text={"작성완료"} type={"positive"} onClick={handleSubmit}/>}
            />
        </div>
    );
}

export default Editor;
