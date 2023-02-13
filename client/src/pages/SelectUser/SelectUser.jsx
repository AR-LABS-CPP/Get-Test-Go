/*
    Initial-Creation: 26-October-2022
    Latest-Modification-Date: 26-October-2022

    Programmers: 
        Aliraza, Zakaria
        
    TODO:
        * Nothing
*/

import UserCard from "../../components/UserCard/UserCard"
import CANDIDATE_ICON from "../../assets/CANDIDATE_ICON.png"
import RECRUITER_ICON from "../../assets/RECRUITER_ICON.png"
import { useNavigate } from "react-router-dom"

const SelectUser = () => {
    const navigate = useNavigate()

    const handleUserSelection = (usertype) => {
        sessionStorage.setItem("USER-TYPE", JSON.stringify(usertype))
        navigate("/login-screen")
    }

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen bg-slate-50">
            <UserCard 
                cardIcon={RECRUITER_ICON}
                cardTitle="Recruiter"
                cardDescription="As a recruiter you will be able to create and post jobs, create assessments, evaluate candidates and select potential people for the job."
                userType="RECRUITER"
                additionalStyling="border-t-2 border-l-2 border-black"
                clickHandler={handleUserSelection}
            />

            <UserCard 
                cardIcon={CANDIDATE_ICON}
                cardTitle="Candidate"
                cardDescription="As a candidate you will be able to search for jobs, take assessments and get the right job for yourself."
                userType="CANDIDATE"
                additionalStyling="border-b-2 border-r-2 border-black"
                clickHandler={handleUserSelection}
            />
        </div>
    )
}

export default SelectUser