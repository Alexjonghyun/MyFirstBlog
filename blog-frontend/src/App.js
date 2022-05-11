import logo from './logo.svg';
import {signIn} from "./auth";
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import ReadPage from "./pages/ReadPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import UpdatingPage from "./UpdatingPage";
import AuthRoute from './AuthRoute';
import {useEffect, useState} from "react";


function App() {

    return (
        <div>
            <div>
                <Link to='/'><h1>John's blog</h1></Link>
                {sessionStorage.getItem("name")==="null"? '' : sessionStorage.getItem("name")}
            </div>
            <Routes>
                <Route path='/' element={<PostListPage/>}/>
                <Route path='/login/' element={<LoginPage />}/>
                <Route path='/register/' element={<RegisterPage/>}/>
                <Route path='/write/' element={<WritePage/>}/>
                <Route path='/:postId' element={<ReadPage/>}/>
                <Route path='/update/:postId' element={<UpdatingPage/>}/>
            </Routes>
        </div>

  );
}

export default App;
