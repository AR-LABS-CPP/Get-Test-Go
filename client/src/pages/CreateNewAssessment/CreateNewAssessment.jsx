import axios from "axios"
import jwt from "jsonwebtoken"

import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"

const CreateNewAssessment = () => {
    

    let timeout = null
    let recruiterEmail = jwt.decode(localStorage.getItem("token")).email

    const navigate = useNavigate()

    const initialValues = {
        assessmentName: "",
        assessmentDetails: "",
        assessmentType: "GENERAL"
    }

    const [formVals, setFormVals] = useState(initialValues)
    const [assessmentTypes, setAssessmentTypes] = useState([])
    const [errors, setErrors] = useState({})
    const [formSaved, setFormSaved] = useState(false)

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

        if (!vals.assessmentName) {
            errors.assessmentName = "assessment name is required"
        }

        if (!vals.assessmentDetails) {
            errors.assessmentDetails = "assessment details are required"
        }
        else if(vals.assessmentDetails.length > 110) {
            errors.assessmentDetails = "assessment details must be less than 110 characters"
        }

        return errors
    }

    useEffect(() => {
        axios.get("http://localhost:4321/assessment/type").then(response => {
            setAssessmentTypes(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (Object.keys(errors).length === 0 && formSaved) {
            const payload = {
                "assessmentName": formVals.assessmentName,
                "assessmentDetails": formVals.assessmentDetails,
                "assessmentType": formVals.assessmentType,
                "recruiterEmail": recruiterEmail
            }

            axios.post("http://localhost:4321/assessment/new", payload).then(_ => {
                toast.success("Assessment created successfully")
                timeout = setTimeout(() => {
                    console.log("Create New Assessment Screen Timeout cleared")
                    clearTimeout(timeout)
                    navigate("/add-questions", {
                        state: {
                            assessment_name: formVals.assessmentName,
                            recruiter_email: recruiterEmail
                        }
                    })
                })
            }).catch(error => {
                if (error.response.status === 409) {
                    toast.error(error.response.data)
                }
                else {
                    console.log(error)
                }
            })
        }
    }, [errors])

    return (
        <div className="flex flex-col items-center mt-5">
            <Toaster />
            <form onSubmit={handleSave} className="flex flex-col justfiy-center w-[70%] md:w-[50%] lg:w-[50%] rounded-lg shadow-xl border-[1px] bg-white p-4">
                <label htmlFor="assessmentName" className="font-semibold">Assessment Name</label>
                <input name="assessmentName" value={formVals.assessmentName} onChange={handleFormChange} type="text" className="border-[1px] rounded-md py-2 px-1 mt-1" />
                <small className="text-red-500">{errors.assessmentName}</small>

                <label htmlFor="assessmentDetails" className="font-semibold mt-3">Assessment Details</label>
                <textarea value={formVals.assessmentDetails} onChange={handleFormChange} name="assessmentDetails" id="" cols="30" rows="5" className="mt-1 border-[1px] rounded-md px-1"></textarea>
                <small className="text-red-500">{errors.assessmentDetails}</small>

                <label htmlFor="assessmentType" className="font-semibold mt-3">Assessment Type</label>
                <select onChange={handleFormChange} name="assessmentType" id="assessmentCategory" className="mt-1 border-[1px] py-2 px-1">
                    {
                        assessmentTypes.map(assessmentType => {
                            return <option key={assessmentType.assessment_type_name} value={assessmentType.assessment_type_name}>{assessmentType.assessment_type_name}</option>
                        })
                    }
                </select>
            </form>

            <div className="flex w-[70%] md:w-[50%] lg:w-[50%] justify-center mt-10">
                <button className="w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white rounded-lg py-2" onClick={() => handleSave()}>Save</button>
            </div>
        </div>
    )
}

export default CreateNewAssessment