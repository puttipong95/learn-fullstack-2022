import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from 'react'
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false
  })

  useEffect(() => {
    axios.get(
      'http://localhost:3001/auth/auth', 
      {headers: {accessToken: localStorage.getItem('accessToken')}}
    ).then(res => {
      if(res.data.error){
        setAuthState({...authState, status: false})
      }else{
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true
        })
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAuthState({
      username: '',
      id: 0,
      status: false
    })
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {!authState.status ? (
              <>
                <Link to="/login"> Login </Link>
                <Link to="/register"> Register </Link>
              </>
            ) : (
              <>
                <Link to="/"> Home Page </Link>
                <Link to="/createpost"> Create A Post </Link>
                <button onClick={logout}>Logout</button>
              </>
            )}

            <h1>
              {"\u00a0"}
              {authState.username}
            </h1>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/createpost" element={<CreatePost />} />
            <Route exact path="/post/:id" element={<Post />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
