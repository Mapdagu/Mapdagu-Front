import Button from "../Button";

const LoginMain = ({onChange}) => {
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
            <div>3초 로그인 후 바로 이용해보세요!</div>
            <div>
                <Button text="카카오" onClick={kakaoLoginHandler}/>
                <Button text="네이버" onClick={naverLoginHandler}/>
                <Button text="구글" onClick={googleLoginHandler}/>
                <Button text="이메일" onClick={emailLoginHandler}/>
            </div>
        </div>
    );
}

export default LoginMain;