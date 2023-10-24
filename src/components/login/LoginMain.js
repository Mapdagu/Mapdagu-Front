import "./LoginMain.css";
import icon_kakao from "../../img/icon/login_kakao.png";
import icon_google from "../../img/icon/login_google.png";
import icon_naver from "../../img/icon/login_naver.png";
import icon_mail from "../../img/icon/login_mail.png";

const LoginMain = ({onChange, closeModal}) => {
    const KAKAO_REDIRECT_URI = `https://mapdagu.site/oauth2/authorization/kakao`;
    const NAVER_REDIRECT_URI = `https://mapdagu.site/oauth2/authorization/naver`;
    const GOOGLE_REDIRECT_URI = `https://mapdagu.site/oauth2/authorization/google`;
       
    const kakaoLoginHandler = () => {
        window.location.href = KAKAO_REDIRECT_URI;
    }
    const naverLoginHandler = () => {
        window.location.href = NAVER_REDIRECT_URI;
    }

    const googleLoginHandler = () => {
        window.location.href = GOOGLE_REDIRECT_URI;
    }

    const emailLoginHandler = () => {
        onChange();
    }

    return (
        <div className="LoginMain"> 
            <h2>3초 로그인 및 회원가입 후</h2>
            <h2>바로 이용해보세요!</h2>
            <div className="buttons">
                <img alt="kakao" src={icon_kakao} onClick={kakaoLoginHandler}/>
                <img alt="google" src={icon_google} onClick={googleLoginHandler}/>
                <img alt="naver" src={icon_naver} onClick={naverLoginHandler}/>
                <img alt="mail" src={icon_mail} onClick={emailLoginHandler}/>
            </div>    
            <div><button className="btn_close" onClick={closeModal}>나중에 할래요</button></div>           
        </div>
    );
}

export default LoginMain;