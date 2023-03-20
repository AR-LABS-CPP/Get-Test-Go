import axios from "axios"
import jwt from "jsonwebtoken"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import DashboardCard from "../../components/DashboardCard/DashboardCard"

const RecruiterMainPage = () => {
    const [stats, setStats] = useState([])
    
    const navigate = useNavigate()

    let firstName = ''
    let lastName = ''

    const user = jwt.decode(localStorage.getItem("token"))

    if (user) {
        firstName = user.firstName
        lastName = user.lastName
    }

    useEffect(() => {
        axios.post("http://localhost:4321/recruiter/stats", {
            recruiterEmail: user.email 
        }).then(response => {
            setStats(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <div className="pt-6 flex justify-center items-center">
                <p className="text-5xl text-gray-700 font-bold">Welcome {`${firstName} ${lastName}`}</p>
            </div>

            <div className="mt-10 grid gap-y-3 gap-x-5 mx-10 place-items-center grid-cols-2 md:grid-flow-col lg:grid-flow-col md:grid-cols-none lg:grid-cols-none">
                {
                    stats
                    &&
                    <DashboardCard title={6} subTitle="Assessments Created" style="bg-red-500 text-white col-span-6" />
                }
                {
                    stats
                    &&
                    <DashboardCard title={6} subTitle="Jobs Created" style="bg-green-500 text-white col-span-6" />
                }
            </div>

            <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white px-20 rounded-lg py-3 mt-10 mb-10" onClick={() => navigate("/create-job")}>
                    Create New Job
                </button>
            </div>
        </>
    )
}

export default RecruiterMainPage