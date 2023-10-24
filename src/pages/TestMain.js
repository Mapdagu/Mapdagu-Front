import { useNavigate } from "react-router-dom";
import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import LoginEmail from "../components/login/LoginEmail";
import LoginMain from "../components/login/LoginMain";

const TestMain = ({getUserRole, role}) => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showContent1, setShowContent1] = useState(true);

    const goTest = () => {
        if(role === ""){
            setModalIsOpen(true);
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
            width: "290px",
            height: "240px",
            margin: "auto",
            padding: "10px",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
    }

    return (
        <div className="container">
            <button onClick={goTest}>테스트 시작하기</button>
            <Modal style={modalStyle} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>   
                {showContent1 ? <LoginMain onChange={onChange} closeModal={closeModal}/> : <LoginEmail getUserRole={getUserRole} closeModal={closeModal}/>}   
            </Modal>
        </div>
    )
}

export default TestMain;