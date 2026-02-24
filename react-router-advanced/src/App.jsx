import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
import BlogPost from "./components/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          
          <Route path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          
          <Route path="/blog/:id" element={<BlogPost />} />

    </Routes>
  );

      </BrowserRouter>
    </>
  )
}

export default App
