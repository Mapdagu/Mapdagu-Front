import { useCallback, useEffect, useState } from "react";
import "./Editor.css";
import OptionItem from "./OptionItem";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { getItemImgById, selectionList } from "../util";

const Editor = ({initData, id, itemName, onSubmit}) => {  
    console.log("1111");  
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: 2,
        itemName: "itemName",
        selectionId: 0,
    });

    // const item = data.filter(it => (it.id === id));

    const handleSubmit = () => {
        onSubmit();
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

    // useEffect(() => {
    //     if(initData){
    //         setState({
    //             ...initData,
    //             date: new Date(parseInt(initData.date)),
    //         })
    //     }
    // }, [initData])

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
            <div className="editor_section bottom_section">
                {/*작성 완료, 취소*/}
                <Button text={"취소하기"} onClick={handleOnBack}/>
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default Editor;
