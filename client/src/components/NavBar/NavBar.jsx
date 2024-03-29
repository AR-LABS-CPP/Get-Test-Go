import jwt from "jsonwebtoken"

import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBarLink from "../NavBarLink/NavBarLink"

const NavBar = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const navigate = useNavigate()

    const getUserType = () => {
        return localStorage.getItem("token") && jwt.decode(localStorage.getItem("token")).userType
    }

    const logoutHandler = () => {
        localStorage.getItem("token") && localStorage.removeItem("token")
        navigate("/login-screen")
    }

    const isLoggedIn = () => {
        return jwt.decode(localStorage.getItem("token")) !== null
    }

    const navigateToMainPage = () => {
        if(getUserType() == "CANDIDATE") {
            navigate("/candidate-main-page")
        }
        else if(getUserType() == "RECRUITER") {
            navigate("/recruiter-main-page")
        }
    }

    useEffect(() => {
        setIsUserLoggedIn(isLoggedIn())
    }, [document.location.href])

    return (
        isUserLoggedIn
        &&
        <nav className="w-full flex flex-wrap flex-col md:flex-row justify-between items-center py-4 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
            <div className="navbar-logo px-4">
                <p className="ml-5 text-5xl font-bold text-blue-500 hover:cursor-pointer" onClick={() => navigateToMainPage()}>GTG</p>
            </div>

            {
                getUserType() === "RECRUITER" ?
                    <div className="flex w-full md:w-[60%] items-center md:justify-end mt-3 md:mt-0 lg:mt-0">
                        <NavBarLink title="Home" navigateURL='/recruiter-main-page' />
                        <NavBarLink title='Jobs' navigateURL='/recruiter-jobs' />
                        <NavBarLink title='IQ/EQ Scores' navigateURL="/iq-eq-scores" />
                        <NavBarLink title='Recruit' navigateURL='/recruit' />
                        <NavBarLink title='Assessments' navigateURL='/assessments' />
                        <NavBarLink title='Log out' clickHandler={logoutHandler} />
                    </div>
                    :
                    <div className="flex w-full md:w-[60%] items-center md:justify-end mt-3 md:mt-0 lg:mt-0">
                        <NavBarLink title='Home' navigateURL='/candidate-main-page' />
                        <NavBarLink title='View Jobs' navigateURL='/candidate-jobs' />
                        <NavBarLink title='Applied Jobs' navigateURL='/applied-jobs' />
                        <NavBarLink title='Results' navigateURL='/results' />
                        <NavBarLink title='Log out' clickHandler={logoutHandler} />
                    </div>
            }
        </nav>
    )
}

export default NavBar