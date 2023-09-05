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
        name: "",
        imageNum: 0,
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
            {/* <textarea value={state.name} onChange={handleChangeItemName}/> */}
            <div className="container">
                <div className="text_wrapper"> 
                    <h2> '{state.name}'은(는) 어느 정도 맵나요?</h2>
                    <h3>난이도: ☆☆☆☆☆</h3>
                </div>
                <div className="selection_list_wrapper">
                    {selectionList.map((it) => (
                        <OptionItem
                            key={it.id}
                            {...it}
                            isTest={false}
                            onClick={handleChangeSelection}
                            isSelected={state.score === it.id}
                        />
                    ))}
                </div>
                <button className="btn_submit" onClick={handleOnSubmit}>작성하기</button>
                {/* <Bottom leftChild={<Button text={"취소하기"} onClick={handleOnBack}/>}
                        rightChild={<Button text={"작성완료"} onClick={handleOnSubmit}/>}
                /> */}
            </div>
            <div className="image_wrapper">
                <img alt="" src={state.imageNum ? getItemImgById(state.imageNum) : getItemImgById(1)}/> 
                <div>
                    <h2>{state.name ? state.name : "음식을 선택해 주세요"}</h2>
                </div>
            </div>
        </div>
    );
}

export default Editor;
