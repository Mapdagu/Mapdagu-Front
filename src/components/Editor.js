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
        name: "",
        score: 0,
    });

    const handleOnSubmit = () => {
        onSubmit(state);
    }
    const handleOnBack = () => {
        navigate(-1);
    }
    const handleChangeItemName = (e) => {
        setState({
            ...state,
            name: e.target.value,
        })
    }
    const handleChangeSelection = useCallback((score) => {
        setState((state) => ({
            ...state,
            score,
        }));
    }, []);

    useEffect(() => {
        if(initData){
            setState({
                ...initData
            })
        }
    }, [initData])

    return (
        <div className="Editor">
            <textarea value={state.name} onChange={handleChangeItemName}/>
            <h4> 나에게 {state.name}은</h4>
            <img alt="" src={getItemImgById(state.id)}/> 
            <div className="input_wrapper selection_list_wrapper">
                {selectionList.map((it) => (
                    <OptionItem
                        key={it.id}
                        {...it}
                        onClick={handleChangeSelection}
                        isSelected={state.score === it.id}
                    />
                ))}
            </div>
            <Bottom leftChild={<Button text={"취소하기"} onClick={handleOnBack}/>}
                    rightChild={<Button text={"작성완료"} onClick={handleOnSubmit}/>}
            />
        </div>
    );
}

export default Editor;
