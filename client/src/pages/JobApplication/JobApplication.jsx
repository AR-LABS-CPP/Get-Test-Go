import { useLocation } from "react-router-dom"

const JobApplication = () => {
    const { state } = useLocation()

    return (
        <div>
            <div className="p-5 m-5 flex justify-between items-center border-[1px] rounded-md shadow-md">
                <p className="font-bold">Total Time:</p>
                <p className="font-bold">Section:</p>
                <p className="font-bold">Time:</p>
            </div>        
        </div>
    )
}

export default JobApplication