import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { useRef, useEffect, useReducer } from 'react';

import TestMain from './pages/TestMain';
import Test from './pages/Test';
import Result from './pages/Result';
import Main from './pages/Main';
import Friend from './pages/Friend';
import Evaluate from './pages/Evaluate';
import MyPage from './pages/MyPage';

const mockData = [
  {
    id: "id1",
    date: new Date().getTime() -1,
    itemName: "신라면",
    selectionId: 1,
  },
  {
    id: "id2",
    date: new Date().getTime() -1,
    itemName: "불닭볶음면",
    selectionId: 2,
  },
  {
    id: "id3",
    date: new Date().getTime() -1,
    itemName: "엽기떡볶이 오리지널",
    selectionId: 3,
  }
]

function App() {
  // const idRef = useRef(0);
  // const [data, dispatch] = useReducer(reducer, []);

  // useEffect(() => {
  //   idRef.current = mockData[0].id + 1;
  //   dispatch({
  //       data: mockData,
  //   });
  // }, []);

  // const onCreate = (itemName, selectionId) => {
  //   dispatch({
  //     data: {
  //       id: idRef.current,
  //       itemName: itemName,
  //       selectionId: selectionId,
  //     }
  //   })
  // }

  return (
    <div className="App">
      <Routes>
        <Route path = "/" element ={<TestMain />}/>
        <Route path = "/test/:id" element ={<Test data={mockData}/>}/>
        <Route path = "/result" element ={<Result />}/>
        <Route path = "/main" element ={<Main />}/>
        <Route path = "/friend" element ={<Friend />}/>
        <Route path = "/evaluate" element ={<Evaluate data={mockData}/>}/>
        <Route path = "/mypage" element ={<MyPage />}/>
      </Routes>
      {/* <TestMain/>
      <Main/> */}
    </div>
  );
}

export default App;
