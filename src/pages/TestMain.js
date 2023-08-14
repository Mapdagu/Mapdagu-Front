import Header from "../components/Header";
import Button from "../components/Button";
import Body from "../components/Body";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import OptionItem from "../components/OptionItem";
import React, { useState } from "react";
import { selectionList } from "../util";

const TestMain = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const goTest = () => {
        navigate(`/login`);
    }
    return (
        <div>
            <Header title={"테스트 시작 페이지"}/>
            <Button text="modal open" onClick={() => setModalIsOpen(true)}/>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                {selectionList.map((it) => (
                    <OptionItem
                        key={it.id}
                        {...it}
                        // onClick={handleChangeSelection}
                        // isSelected={state.selectionId === it.id}
                    />
                ))}
                <div><Button text="modal close" onClick={() => setModalIsOpen(false)}/></div>
            </Modal>
            <Body 
                child={<Button text={"테스트 시작하기"} onClick={goTest}/>}
            />
        </div>
    )
}

export default TestMain;