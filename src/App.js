import './App.css';
import { Routes, Route } from 'react-router-dom';

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
    name: "1",
    selectionId: 1,
  },
  {
    id: "id2",
    name: "2",
    selectionId: 2,
  },
  {
    id: "id3",
    name: "3",
    selectionId: 3,
  }
]

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element ={<TestMain />}/>
        <Route path = "/test/:id" element ={<Test data={mockData}/>}/>
        <Route path = "/result" element ={<Result />}/>
        <Route path = "/main" element ={<Main />}/>
        <Route path = "/friend" element ={<Friend />}/>
        <Route path = "/evaluate" element ={<Evaluate />}/>
        <Route path = "/mypage" element ={<MyPage />}/>
      </Routes>
      {/* <TestMain/>
      <Main/> */}
    </div>
  );
}

export default App;
