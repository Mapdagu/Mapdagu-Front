import "./Editor.css";
import OptionItem from "./OptionItem";
import { getItemImgById, selectionList } from "../util";
import { useCallback, useEffect, useState } from "react";

const Editor = ({initData, onSubmit}) => {  
    const slicedList = selectionList.slice(1,6);
    const [state, setState] = useState({
        name: "",
        imageNum: 0,
        score: 0,
    });
    const [search, setSearch] = useState();
    const handleOnSubmit = () => {
        onSubmit(state);
    }
    const handleChangeItemName = (e) => {
        setSearch(e.target.value)
    }
    const handleSearch = () => {
        setState({
            // ...state,
            name: search,
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
            <div className="editor_container">
                <div>
                    {state.name ? "" : 
                        <input
                            onChange={handleChangeItemName}
                        />
                    }
                    {state.name ? "" : <button className="btn_search" onClick={handleSearch}>찾기</button>}
                </div>
                <div className="text_wrapper"> 
                    <h2> '{state.name}'은(는) 어느 정도 맵나요?</h2>
                    <h3>난이도: ☆☆☆☆☆</h3>
                </div>
                <div className="selection_list_wrapper">
                    {slicedList.map((it) => (
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
            </div>
            <div className="image_wrapper">
                <img alt="" src={state.imageNum ? getItemImgById(state.imageNum) : getItemImgById(0)}/> 
                <div>
                    {state.name ? <h2>{state.name}</h2> : <h4>음식을 선택해 주세요</h4>}
                </div>
            </div>
        </div>
    );
}

export default Editor;
