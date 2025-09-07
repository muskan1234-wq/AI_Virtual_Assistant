import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Customize from './pages/Customize.jsx';
import Customize2 from './pages/Customize2.jsx';
import Home from './pages/Home.jsx';

import UserContextProvider, { userDataContext } from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

function AppRoutes() {
  const { userData } = useContext(userDataContext);

  return (
    <Routes>
      {/* Root Route */}
      <Route
        path="/"
        element={
          (userData?.assistantImage && userData?.assistantName)
            ? <Home />
            : <Navigate to="/customize" />
        }
      />

      <Route path="/home" element={<Home />} />

      {/* Auth Routes */}
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />

      {/* Customization Routes */}
      <Route
        path="/customize"
        element={!userData ? <Customize /> : <Navigate to="/signup" />}
      />

      <Route
        path="/customize2"
        element={!userData ? <Customize2 /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
