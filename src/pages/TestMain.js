import Header from "../components/Header";
import Button from "../components/Button";
// import Body from "../components/Body";
import { useNavigate } from "react-router-dom";
import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import LoginEmail from "../components/login/LoginEmail";
import LoginMain from "../components/login/LoginMain";

const TestMain = ({getUserInfRes, role}) => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showContent1, setShowContent1] = useState(true);

    const goTest = () => {
        if(role === ""){
            setModalIsOpen(true);
            // navigate(`/login`);
        } else if(role === "USER"){
            navigate(`/main`);
        } else if(role === "NOT_TEST_USER"){
            navigate(`/test`);
        } else {
            navigate(`/set_profile`);
        }
    }

    const onChange = () => {
        setShowContent1(false);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setShowContent1(true);
    }

    return (
        <div>
            <Header title={"테스트 시작 페이지"}/>
            <Button text={"테스트 시작하기"} onClick={goTest}/>
            <Button text={"로그인 페이지 전환"} onClick={() => navigate(`/login`)}/>
            <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>   
                {showContent1 ? <LoginMain onChange={onChange}/> : <LoginEmail getUserInfRes={getUserInfRes}/>}            
                <div><Button text="나중에 할래요" onClick={closeModal}/></div>           
            </Modal>
        </div>
    )
}

export default TestMain;