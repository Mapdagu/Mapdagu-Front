import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';
import axios  from 'axios';
import { setCookie } from './cookie';

/*pages*/
import TestMain from './pages/TestMain';
import SignUpPage from './pages/SignUpPage';
import KakaoRedirect from './components/login/KakaoRedirect';
import NaverRedirect from './components/login/NaverRedirect';
import SetProfilePage from './pages/SetProfilePage';
import Test from './pages/Test';
import Result from './pages/Result';
import Main from './pages/Main';
import SearchPage from './pages/SearchPage';
import SearchUser from './pages/SearchUser';
import Friend from './pages/Friend';
import UserPage from './pages/UserPage';
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
export const SearchStateContext = React.createContext();
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
      return state.filter((it) => String(it.id) === -1);
    }
    default: {
      return state;
    }
  }
}

const maxTestNum = 2;

function App() {
  const [testData, testDispatch] = useReducer(reducer, []);
  const [searchData, searchDispatch] = useReducer(reducer, []);
  const [idRef, setIdRef] = useState(0);
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
})
  const [role, setRole] = useState("");

  const {nickname, email, password, isSocial} = userInf;  

  useEffect(() => {
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
          
          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken); 
          setRole(role);
          initUserInf();
        }catch (error) {
          alert(error.response.data.message);
        }
      navigate(`/test`, {replace: true});
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const getUserRole = (role) => {
    setRole(role);
  }
  const initUserRole = () => {
    setRole("");
  }
  const initUserInf = () => {
    setUserInf({
      nickname: "",
      email: "",
      password: "",
      userName: "",
      imageNum: 0,
      intro: "",
    })
  }

  const onCreate = (type, itemName, targetId, selectionId) => {
    if(type===1){
      testDispatch({
        type: "CREATE",
        data: {
          id: targetId,
          itemName,
          selectionId,
        }
      })
    }else if(type===2){
      searchDispatch({
        type: "CREATE",
        data: {
          id: idRef,
          itemName,
        }
      })
      setIdRef(idRef+1);
    }
  }
  const onUpdate = (type, itemName, targetId, selectionId) => {
    if(type===1){
      testDispatch({
        type: "UPDATE",
        data: {
          id: targetId,
          itemName,
          selectionId,
        },
      });
    }
  };
  const onDelete = (type, targetId) => {
    if(type===1){
      testDispatch({
        type: "DELETE",
        targetId,
      });
    }else if(type===2){
      searchDispatch({
        type: "DELETE",
        targetId,
      });
    }else{
      searchDispatch({
        type: "INIT"
      });
    }
  };
  
  const onSubmit = async() => {    
    setRole("USER");
  }

  if(!isDataLoaded)
    return <div>데이터를 불러오는 중입니다</div>
  else {
    return (
      <EvalStateContext.Provider value={testData}>
        <SearchStateContext.Provider value={searchData}>
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
                  <Route path = "/" element ={<TestMain getUserRole={getUserRole} role={role}/>}/>
                  <Route path = "/sign_up" element ={<SignUpPage getSignUpInf={getSignUpInf}/>}/>
                  <Route path = "/set_profile" element ={<SetProfilePage getProfileInf={getProfileInf}/>}/>
                  <Route path = "/login/callback" element ={<KakaoRedirect />}/>
                  <Route path = "/oauth2/code/naver" element ={<NaverRedirect />}/>
                  <Route path = "/test" element ={<Test maxTestNum={maxTestNum}/>}/>
                  <Route path = "/result" element ={<Result maxTestNum={maxTestNum} role={role}/>}/>
                  <Route path = "/main" element ={<Main />}/>
                  <Route path = "/search" element ={<SearchPage />}/>
                  <Route path = "/search_user" element ={<SearchUser />}/>
                  <Route path = "/detail/:id" element ={<Details />}/>
                  <Route path = "/friend" element ={<Friend />}/>
                  <Route path = "/user_page/:id" element ={<UserPage />}/>
                  <Route path = "/evaluate" element ={<Evaluate maxTestNum={maxTestNum}/>}/>
                  <Route path = "/new" element ={<New />}/>
                  <Route path = "/edit/:id" element ={<EditEval />}/>
                  <Route path = "/mypage" element ={<MyPage email={email} initUserRole={initUserRole}/>}/>
                  <Route path = "/edit_profile" element ={<EditProfile />}/>
                </Routes>
            </div>
          </EvalDispatchContext.Provider>
        </SearchStateContext.Provider>
      </EvalStateContext.Provider>
    );
  }
}

export default App;
