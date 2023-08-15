import Header from "../components/Header";
import SignUp from "../components/SignUp";

const SignUpPage = ({getSignUpInf}) => {
    const onSubmit = (data) => {
        const { nickname, email, password } = data;
        getSignUpInf(nickname, email, password);
    }
    return (
        <div>
            <Header title="sign up page"/>
            <SignUp onSubmit={onSubmit}/>
        </div>
    );
}

export default SignUpPage;