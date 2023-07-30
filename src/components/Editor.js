import "./Editor.css";
import OptionItem from "./OptionItem";
import Button from "./Button";
import Bottom from "./Bottom";
import { getFormattedDate, getItemImgById, selectionList } from "../util";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Editor = ({initData, onSubmit}) => {  
    const navigate = useNavigate();
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        itemName: "",
        selectionId: 0,
    });

    const handleSubmit = () => {
        onSubmit(state);
    }
    const handleOnBack = () => {
        navigate(-1);
    }
    const handleChangeItemName = (e) => {
        setState({
            ...state,
            itemName: e.target.value,
        })
    }
    const handleChangeSelection = useCallback((selectionId) => {
        setState((state) => ({
            ...state,
            selectionId,
        }));
    }, []);

    useEffect(() => {
        if(initData){
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            })
        }
    }, [initData])

    return (
        <div className="Editor">
            <textarea value={state.itemName} onChange={handleChangeItemName}/>
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
