import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KakaoRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/set_profile", {replace:true})
    }, []);

    return;
}

export default KakaoRedirect;