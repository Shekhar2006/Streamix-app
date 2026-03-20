import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import toast, { Toaster } from 'react-hot-toast'
import PageLoader from './components/PageLoader.jsx'
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'


const App = () => {

  const { isLoading, authUser } = useAuthUser();

  if (isLoading) return <PageLoader />
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  return (
    <div className="h-screen" data-theme="forest" >
      <Routes>

        <Route path="/" element={isAuthenticated && isOnboarded ? (<HomePage />) : (
          <Navigate to={
            !isAuthenticated ? "/login" : "/onboarding"}
          />)}
        />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/" />} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/" />} />

      </Routes>
      <Toaster />

    </div>
  )
}

export default App
