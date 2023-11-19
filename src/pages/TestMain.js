import LoginEmail from "../components/login/LoginEmail";
import LoginMain from "../components/login/LoginMain";
import '../App.css';
import { login } from "../styles/ModalStyles";

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const TestMain = ({getUserRole, role}) => {
    const navigate = useNavigate();
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showContent1, setShowContent1] = useState(true);
    const [fadeIn, setFadeIn] = useState(true);

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
        setFadeIn(false);
        let timer;
        if(modalIsOpen){
          timer = setTimeout(() => {setModalIsOpen(false); setFadeIn(true); setShowContent1(true);}, 300);
        }
    
        return () => {
          clearTimeout(timer);
        };
    }

    return (
        <div className="container">
            <button onClick={goTest}>테스트 시작하기</button>
            <Modal overlayClassName={`ReactModal__Overlay--after-open ${fadeIn}`} style={login()} ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal}>   
                {showContent1 ? <LoginMain onChange={onChange} closeModal={closeModal}/> : <LoginEmail getUserRole={getUserRole} closeModal={closeModal}/>}   
            </Modal>
        </div>
    )
}

export default TestMain;