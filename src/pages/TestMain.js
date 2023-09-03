import Header from "../components/Header";
import Button from "../components/Button";
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

    const modalStyle = {
        content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "50px", 
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }
    }

    return (
        <div>
            <Header title={"테스트 시작 페이지"}/>
            <Button text={"테스트 시작하기"} onClick={goTest}/>
            <Button text={"로그인 페이지 전환"} onClick={() => navigate(`/login`)}/>
            <Modal style={modalStyle} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>   
                {showContent1 ? <LoginMain onChange={onChange} closeModal={closeModal}/> : <LoginEmail getUserInfRes={getUserInfRes} closeModal={closeModal}/>}   
            </Modal>
        </div>
    )
}

export default TestMain;