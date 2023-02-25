/*
    Initial-Creation: 20-October-2022
    Latest-Modification-Date: 29-October-2022

    Programmers: 
        Aliraza, Zakaria
        
    TODO:
        * Nothing
*/

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import jwt from "jsonwebtoken"
import AnimatedText from "./components/AnimatedText/AnimatedText"
import NavBar from "./components/NavBar/NavBar"

import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Assessments from './pages/Assessments/Assessments'
import Jobs from './pages/RecruiterJobs/Jobs'
import Recruit from './pages/Recruit/Recruit'
import Results from './pages/Results/Results'
import ViewJob from './pages/ViewJob/ViewJob'
import RecruiterMainPage from './pages/RecruiterMainPage/RecruiterMainPage'
import CandidateMainPage from './pages/CandidateMainPage/CandidateMainPage'
import CreateNewAssessment from './pages/CreateNewAssessment/CreateNewAssessment'
import ViewAssessment from "./pages/ViewAssessment/ViewAssessment"
import CreateNewJob from './pages/CreateNewJob/CreateNewJob'
import AddQuestions from './pages/AddQuestions/AddQuestions'

const App = () => {
  const Auth = ({ children }) => {
    const token = localStorage.getItem("token")
    const user = jwt.decode(token)

    if (!user) {
      return <Navigate to="/login-screen" />
    }

    return children
  }

  const CheckLogin = ({ children }) => {
    const user = jwt.decode(localStorage.getItem("token"))

    if (user) {
      if (user.userType === "RECRUITER") {
        return <Navigate to="/recruiter-main-page" />
      }
      else if (user.userType === "CANDIDATE") {
        return <Navigate to="/candidate-main-page" />
      }
    }

    return children
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route path='/' element={<AnimatedText text="Get Test Go" />} /> */}
        {/* <Route path='/login-screen' element={<CheckLogin><Login /></CheckLogin>} /> */}
        <Route path='/' element={<CheckLogin><Login /></CheckLogin>} />
        <Route path='/signup-screen' element={<CheckLogin><SignUp /></CheckLogin>} />
        <Route path='/assessments' element={<Auth><Assessments /></Auth>} />
        <Route path='/create-assessment' element={<Auth><CreateNewAssessment /></Auth>} />
        <Route path='/view-assessment' element={<Auth><ViewAssessment /></Auth>} />
        <Route path='/create-job' element={<Auth><CreateNewJob /></Auth>} />
        <Route path='/add-questions' element={<Auth><AddQuestions /></Auth>} />
        <Route path='/recruiter-jobs' element={<Auth><Jobs /></Auth>} />
        <Route path='/recruit' element={<Auth><Recruit /></Auth>} />
        <Route path='/results' element={<Auth><Results /></Auth>} />
        <Route path='/view-recruiter-job' element={<Auth><ViewJob /></Auth>} />
        <Route path='/recruiter-main-page' element={<Auth><RecruiterMainPage /></Auth>} />
        <Route path='/candidate-main-page' element={<Auth><CandidateMainPage /></Auth>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App