import jwt from "jsonwebtoken"
import { useNavigate } from "react-router-dom"

import DashboardCard from "../../components/DashboardCard/DashboardCard"

const RecruiterMainPage = () => {    
    

    const navigate = useNavigate()

    let firstName = ''
    let lastName = ''

    const user = jwt.decode(localStorage.getItem("token"))

    if (user) {
        firstName = user.firstName
        lastName = user.lastName
    }

    return (
        <>
            <div className="pt-6 flex justify-center items-center">
                <p className="text-5xl text-gray-700 font-bold">Welcome {`${firstName} ${lastName}`}</p>
            </div>

            <div className="mt-10 grid gap-y-3 place-items-center grid-cols-2 md:grid-flow-col lg:grid-flow-col md:grid-cols-none lg:grid-cols-none">
                <DashboardCard title="6" subTitle="Assessments" style="bg-red-500 text-white" />
                <DashboardCard title="3" subTitle="Jobs Posted" style="bg-green-500 text-white" />
                <DashboardCard title="4" subTitle="Candidates Selected" style="bg-amber-500 text-white" />
                <DashboardCard title="10" subTitle="Total Candidates" style="bg-sky-500 text-white" />
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