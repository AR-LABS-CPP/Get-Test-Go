/*
    Initial-Creation: 20-October-2022
    Latest-Modification-Date: 24-December-2022

    Programmers: 
        Aliraza, Zakaria
        
    TODO:
        * nothing
*/

import { useNavigate } from "react-router-dom"
import StyledButton from "../../components/StyledButton/StyledButton"
import InputBox from "../../components/InputBox/InputBox"
import { useState } from "react"
import { useEffect } from "react"

import axios from "axios"
import { Toaster, toast } from "react-hot-toast"

const Login = () => {
  

  const navigate = useNavigate()

  const initialFormValues = {
    email: "",
    password: "",
    userType: "RECRUITER"
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validateValues(formValues))
    setIsFormSubmitted(true)
  }

  const validateValues = (vals) => {
    const errors = {}

    if (!vals.email) {
      errors.email = "please enter the email"
    }
    else if (!emailRegex.test(vals.email)) {
      errors.email = "invalid email format"
    }

    if (!vals.password) {
      errors.password = "please enter the password"
    }

    return errors
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isFormSubmitted) {
      const { email, password, userType } = formValues

      const payload = {
        "userType": userType,
        "email": email,
        "password": password
      }

      axios.post("http://localhost:4321/user/login", payload).then(response => {
        // Will store the token in http cookie after testing
        localStorage.setItem("token", response.data)
        console.log("Token Stored!")

        if(userType === "RECRUITER") {
          navigate("/recruiter-main-page")
        }
        else if(userType === "CANDIDATE") {
          navigate("/candidate-main-page")
        }
      }).catch(error => {
        if(error.response.status === 404 || error.response.status === 401) {
          toast.error(error.response.data)
        }
        else {
          console.log(error)
          toast.error("Unable to login")
        }
      })
    }
  }, [formErrors])

  return (
    <div className="bg-slate-50 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Toaster />
      <div className="w-[90%] p-6 m-auto bg-white rounded-md shadow-xl ring-2 ring-blue-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-600 uppercase">
          Log In
        </h1>
        <form className="mt-6" onSubmit={handleFormSubmit}>
          <InputBox
            labelFor="email"
            placeholder="Email"
            inputType="text"
            inputValue={formValues.email}
            onInputChange={handleFormChange} />
          <small className="text-red-500">{formErrors.email}</small>
          <InputBox
            labelFor="password"
            placeholder="Password"
            inputType="password"
            inputValue={formValues.password}
            onInputChange={handleFormChange} />
          <small className="text-red-500">{formErrors.password}</small>
          <label htmlFor="assessmentType" className="block text-sm font-semibold text-gray-800">User Type</label>
          <select onChange={handleFormChange} name="userType" id="userType" className="block rounded-md w-full border-[1px] py-2 mt-2">
            <option value="RECRUITER">Recruiter</option>
            <option value="CANDIDATE">Candidate</option>
          </select>
          <br />
          <a
            href="#"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </a>
          <StyledButton
            buttonText="Login"
            background="bg-blue-600"
            hoverColor="hover:bg-blue-500"
            focusColor="focus:bg-blue-500"
          />
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/signup-screen")}
            className="font-medium text-blue-600 hover:underline hover:cursor-pointer"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login