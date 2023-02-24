import axios from "axios"
import jwt from "jsonwebtoken"
import useTilg from "tilg"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"

const CreateNewAssessment = () => {
    useTilg()

    let timeout = null
    let recruiterEmail = jwt.decode(localStorage.getItem("token")).email

    const navigate = useNavigate()

    const initialValues = {
        jobName: "",
        jobDetails: "",
        jobType: "",
        requiredAssessments: []
    }

    const [formVals, setFormVals] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [jobTypes, setJobTypes] = useState([])
    const [assessments, setAssessments] = useState([])
    const [requiredAssessments, setRequiredAssessments] = useState([])
    const [formSaved, setFormSaved] = useState(false)

    const handleRequiredAssessments = (e) => {
        if (requiredAssessments.includes(e.target.value)) {
            toast.error('Assessment is already added')
        }
        else {
            setRequiredAssessments([...requiredAssessments, e.target.value])
        }
        console.log(requiredAssessments)
    }

    const handleDeleteRequiredAssessment = (e) => {
        let oldRequiredAssessments = requiredAssessments

        let newRequiredAssessments = oldRequiredAssessments.filter(reqAssessment => {
            return reqAssessment != e.target.id
        })

        setRequiredAssessments(newRequiredAssessments)
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormVals({ ...formVals, [name]: value })
    }

    const handleSave = () => {
        setErrors(validateValues(formVals))
        setFormSaved(true)
    }

    const validateValues = (vals) => {
        const errors = {}

        if (!vals.jobName) {
            errors.jobName = "Job name is required"
        }
        else if(vals.jobName.length > 50) {
            errors.jobName = "Job name must be less than 50 characters"
        }

        if (!vals.jobDetails) {
            errors.jobDetails = "Job details are required"
        }

        if (!vals.jobType) {
            errors.jobType = "Please re-select the job type"
        }
        
        if(requiredAssessments.length === 0) {
            errors.requiredAssessments = "Job post must have at least one assessment"
        }

        return errors
    }

    useEffect(() => {
        axios.get("http://localhost:4321/job/types").then(response => {
            setJobTypes(response.data)
        }).catch(error => {
            console.log(error)
        })

        axios.post("http://localhost:4321/assessment/recruiter/assessments", {
            recruiter_email: recruiterEmail
        }).then(response => {
            setAssessments(response.data)
        }).catch(error => {
            console.log(error)
        })

        console.log(jobTypes)
        console.log(assessments)
    }, [])

    useEffect(() => {
        if (Object.keys(errors).length === 0 && formSaved) {
            const payload = {
                "recruiterEmail": recruiterEmail,
                "jobName": formVals.jobName,
                "jobDetails": formVals.jobDetails,
                "jobType": formVals.jobType,
                "requiredAssessments": requiredAssessments
            }
            
            axios.post("http://localhost:4321/job/new", payload).then(response => {
                toast.success(response.data)
            }).catch(error => {
                console.log(error)
                toast.error(error)
            })
        }
    }, [errors])

    return (
        <div className="flex flex-col items-center mt-5">
            <Toaster />
            <form onSubmit={handleSave} className="flex flex-col justfiy-center w-[70%] md:w-[50%] lg:w-[50%] rounded-lg shadow-xl border-[1px] bg-white p-4">
                <label htmlFor="jobName" className="font-semibold">Job Name</label>
                <input name="jobName" value={formVals.jobName} onChange={handleFormChange} type="text" className="border-[1px] rounded-md py-2 px-1 mt-1" />
                <small className="text-red-500">{errors.jobName}</small>

                <label htmlFor="jobDetails" className="font-semibold mt-3">Job Details</label>
                <textarea value={formVals.jobDetails} onChange={handleFormChange} name="jobDetails" id="" cols="30" rows="5" className="mt-1 border-[1px] rounded-md px-1"></textarea>
                <small className="text-red-500">{errors.jobDetails}</small>

                <label htmlFor="jobType" className="font-semibold mt-3">Job Type</label>
                <select onChange={handleFormChange} name="jobType" id="jobCategory" className="mt-1 border-[1px] py-2 px-1">
                    {
                        jobTypes.map(jobType => {
                            return <option key={jobType.job_type_name} value={jobType.job_type_name}>{jobType.job_type_name}</option>
                        })
                    }
                </select>
                <small className="text-red-500">{errors.jobType}</small>

                <label htmlFor="requiredAssessments" className="font-semibold mt-3">Required Assessments</label>
                <select onChange={handleRequiredAssessments} name="requiredAssessments" id="assessments" className="mt-1 border-[1px] py-2 px-1">
                    {
                        assessments.map(assessment => {
                            return <option key={assessment.assessment_name} value={assessment.assessment_name}>{assessment.assessment_name}</option>
                        })
                    }
                </select>
                <small className="text-red-500">{errors.requiredAssessments}</small>

                <span className="py-2"></span>

                {
                    requiredAssessments.map(reqAssessment => {
                        return <div key={reqAssessment} className="flex justify-between items-center mt-3 border-[1px] rounded-md">
                            <span id={reqAssessment} className="text-red-600 font-bold border-[1px] py-2 px-4 hover:bg-red-600 hover:text-white hover:cursor-pointer" onClick={handleDeleteRequiredAssessment}>X</span>
                            <div className="flex justify-center w-full font-semibold">
                                {reqAssessment}
                            </div>
                        </div>
                    })
                }
            </form>

            <div className="flex w-[70%] md:w-[50%] lg:w-[50%] justify-center mt-10">
                <button className="w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white rounded-lg py-2" onClick={() => handleSave()}>Save</button>
            </div>
        </div>
    )
}

export default CreateNewAssessment