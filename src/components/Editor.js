import "./Editor.css";
import OptionItem from "./OptionItem";
import { selectionList } from "../util";
import { useCallback, useEffect, useState } from "react";
import star from "../img/icon/star.png";
import star_border from "../img/icon/star-border.png";
import defaultImage from "../img/default.png";
import Modal from "react-modal";
import Search from "./Search";

const Editor = ({initData, onSubmit}) => {  
    const slicedList = selectionList.slice(1,6);
    const [isModalSizeBig, setIsModalBig] = useState(false);
    const [state, setState] = useState({
        name: "",
        image: "",
        score: 0,
    });
    const {name, image, score} = state;  
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if(initData){
            setState({
                ...initData
            })
        }
    }, [initData])

    const handleOnSubmit = () => {
        onSubmit(state);
    }
    const handleChangeSelection = useCallback((score) => {
        setState((state) => ({
            ...state,
            score,
        }));
    }, []);
    const onSelect = useCallback((name, image) => {
        setState((state) => ({
            ...state,
            name,
            image,
        }));
        setModalIsOpen(false);
    }, []);
    const changeModalSize = (isBig) => {
        setIsModalBig(isBig);
    }
    const onClickImage = () => {
        if(!initData){
            setModalIsOpen(true);
        }
    }
    const modalStyle1 = {
        content: {
            width: "350px",
            height: "160px",
            margin: "220px auto auto auto",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
    }
    const modalStyle2 = {
        content: {
            width: "350px",
            height: "510px",
            margin: "100px auto auto auto",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
    }
    return (
        <div className="Editor">
            <div className="editor_container">
                <div className="text_wrapper"> 
                    <h2>{name? `${name}'은(는) 어느 정도 맵나요?` : "음식을 선택해 주세요"}</h2>
                <div className="difficulty_score">
                    난이도 :
                    {score>1 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                    {score>2 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                    {score>3 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                    {score>4 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }
                    {score>5 ? <img alt="★" src={star}/> : <img alt="☆" src={star_border}/> }  
                </div>
                </div>
                <div className="selection_list_wrapper">
                    {slicedList.map((it) => (
                        <OptionItem
                            key={it.id}
                            {...it}
                            isTest={false}
                            onClick={handleChangeSelection}
                            isSelected={score === it.id}
                        />
                    ))}
                </div>
                <button className="btn_submit" onClick={handleOnSubmit}>작성하기</button>
            </div>
            <div className="image_wrapper">
                <img alt="food_img" src={image ? image : defaultImage} onClick={onClickImage}/>
                <Modal style={isModalSizeBig?modalStyle2:modalStyle1} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={()=>{setModalIsOpen(false);setIsModalBig(false)}}>       
                    <div className="search_modal_title">음식 선택</div>                     
                    <div><button className="btn_modal_close" onClick={()=>{setModalIsOpen(false);setIsModalBig(false)}}>×</button></div>
                    <Search isFood={true} isModal={true} onSelect={onSelect} changeModalSize={changeModalSize}/>
                </Modal>
                <div>
                    <h2>{name ? name : ""}</h2>
                </div>
            </div>
        </div>
    );
}

export default Editor;
