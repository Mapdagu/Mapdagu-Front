import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useReducer, useEffect } from 'react';
import axios  from 'axios';

/*pages*/
import TestMain from './pages/TestMain';
import SignUpPage from './pages/SignUpPage';
import KakaoRedirect from './components/login/KakaoRedirect';
import NaverRedirect from './components/login/NaverRedirect';
import SetProfilePage from './pages/SetProfilePage';
import Test from './pages/Test';
import Result from './pages/Result';
import Main from './pages/Main';
import Friend from './pages/Friend';
import Evaluate from './pages/Evaluate';
import MyPage from './pages/MyPage';
import EditProfile from './pages/EditProfile';
import Details from './pages/Details';
import EditEval from './pages/EditEval';
import New from './pages/New'

const SIGN_UP_URL = 'https://mapdagu.site/api/sign-up';
const SOCIAL_SIGN_UP_URL = 'https://mapdagu.site/api/sign-up/social';
const LOGIN_URL = 'https://mapdagu.site/login';

export const EvalStateContext = React.createContext();
export const UserStateContext = React.createContext();
export const EvalDispatchContext = React.createContext();

function reducer(state, action) {
  switch(action.type){
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) => 
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case "INIT": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

const maxTestNum = 2;

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [userInf, setUserInf] = useState({
    nickname: "",
    email: "",
    password: "",
    userName: "",
    imageNum: 0,
    intro: "",
    isSocial: true,
    role: "",
    accessToken: "",
    refreshToken: "",
})

  const {nickname, email, password, isSocial, role, accessToken} = userInf;  

  useEffect(() => {
    // dispatch({
    //   type: "INIT",
    //   data: mockData,
    // });
    setIsDataLoaded(true);
  }, []);

  const getSignUpInf = (nickname, email, password) => {
    setUserInf({ 
      ...userInf,
      nickname,
      email,
      password,
      isSocial: false,
    });
    navigate(`/set_profile`, {replace: true});
  }

  const getProfileInf = (userName, imageNum, intro) => {
    setUserInf({ 
      ...userInf,
      userName,
      imageNum,
      intro,
    });
    signUpHandler(userName, imageNum, intro);
  }

  const signUpHandler = async(userName, imageNum, intro) => {
    try {
      if(!isSocial){
      await axios.post(SIGN_UP_URL, {nickname, email, password, userName, imageNum, intro});
      } else{
        await axios.patch(SOCIAL_SIGN_UP_URL, {userName, imageNum, intro});
      }      
      alert("회원가입이 완료되었습니다!");
        try {
          const res = (await axios.post(LOGIN_URL, {email, password}));
          const role = res.data.role;
          const accessToken = res.headers[`authorization`];
          const refreshToken = res.headers[`authorization-refresh`];
          getUserInfRes(role, accessToken, refreshToken);
        }catch (error) {
          alert(error.response.data.message);
        }
      navigate(`/test`, {replace: true});
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const getUserInfRes = (role, accessToken, refreshToken) => {
    setUserInf({ 
      ...userInf,
      role,
      accessToken,
      refreshToken,
    });
  }

  const initUserInf = () => {
    setUserInf({
      nickname: "",
      email: "",
      password: "",
      userName: "",
      imageNum: 0,
      intro: "",
      isSocial: true,
      role: "",
      accessToken: "",
      refreshToken: "",
    })
  }

  const onCreate = (itemName, selectionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        itemName,
        selectionId,
      }
    })
    idRef.current += 1;
  }
  const onUpdate = (targetId, itemName, selectionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        itemName,
        selectionId,
      },
    });
  };
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  const onSubmit = async() => {    
    setUserInf({ 
      ...userInf,
      role: "USER",
    });
  }

  if(!isDataLoaded)
    return <div>데이터를 불러오는 중입니다</div>
  else {
    return (
      <EvalStateContext.Provider value={data}>
        <UserStateContext.Provider value={userInf}>
          <EvalDispatchContext.Provider
            value={{
              onCreate,
              onUpdate,
              onDelete,
              onSubmit,
            }}
          >
            <div className="App">
                <Routes>
                  <Route path = "/" element ={<TestMain getUserInfRes={getUserInfRes} role={role}/>}/>
                  <Route path = "/sign_up" element ={<SignUpPage getSignUpInf={getSignUpInf}/>}/>
                  <Route path = "/set_profile" element ={<SetProfilePage getProfileInf={getProfileInf}/>}/>
                  <Route path = "/login/callback" element ={<KakaoRedirect />}/>
                  <Route path = "/oauth2/code/naver" element ={<NaverRedirect />}/>
                  <Route path = "/test" element ={<Test maxTestNum={maxTestNum} role={role} accessToken={accessToken}/>}/>
                  <Route path = "/result" element ={<Result role={role} accessToken={accessToken}/>}/>
                  <Route path = "/main" element ={<Main accessToken={accessToken}/>}/>
                  <Route path = "/detail/:id" element ={<Details />}/>
                  <Route path = "/friend" element ={<Friend />}/>
                  <Route path = "/evaluate" element ={<Evaluate accessToken={accessToken}/>}/>
                  <Route path = "/new" element ={<New accessToken={accessToken}/>}/>
                  <Route path = "/edit/:id" element ={<EditEval accessToken={accessToken}/>}/>
                  <Route path = "/mypage" element ={<MyPage email={email} accessToken={accessToken} initUserInf={initUserInf}/>}/>
                  <Route path = "/edit_profile" element ={<EditProfile accessToken={accessToken}/>}/>
                </Routes>
            </div>
          </EvalDispatchContext.Provider>
        </UserStateContext.Provider>
      </EvalStateContext.Provider>
    );
  }
}

export default App;
