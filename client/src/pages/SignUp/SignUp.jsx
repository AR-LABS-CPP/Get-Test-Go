/*
    Initial-Creation: 20-October-2022
    Latest-Modification-Date: 10-December-2022

    Programmers: 
        Aliraza, Zakaria
        
    TODO:
        * nothing
*/

import { useState, useEffect } from "react"
import useTilg from "tilg"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import StyledButton from "../../components/StyledButton/StyledButton"
import InputBox from "../../components/InputBox/InputBox"
import { toast, Toaster } from "react-hot-toast"

const SignUp = () => {
  useTilg()

  let timeout = null

  const navigate = useNavigate()

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "RECRUITER"
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

  const [signUpFormValues, setSignUpFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setSignUpFormValues({ ...signUpFormValues, [name]: value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validateValues(signUpFormValues))
    setIsFormSubmitted(true)
  }

  const validateValues = (formValues) => {
    const errors = {}

    if (!formValues.firstName) {
      errors.firstName = "first name is required"
    }
    else if (formValues.firstName.length < 3) {
      errors.firstName = "first name cannot be less than 3 characters"
    }

    if (!formValues.lastName) {
      errors.lastName = "last name is required"
    }
    else if (formValues.lastName.length < 3) {
      errors.lastName = "last name cannot be less than 3 characters"
    }

    if (!formValues.email) {
      errors.email = "email is required"
    }
    else if (!emailRegex.test(formValues.email)) {
      errors.email = "invalid email format"
    }

    if (!formValues.password) {
      errors.password = "password is required"
    }
    else if (formValues.password.length < 5) {
      errors.password = "password must be greater than 5 characters"
    }
    else if (formValues.password.length > 15) {
      errors.password = "password cannot exceed 15 characters"
    }
    else if (formValues.password !== formValues.confirmPassword) {
      errors.password = "password and confirm password don't match"
    }

    return errors
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isFormSubmitted) {
      const { firstName, lastName, email, password, userType } = signUpFormValues

      const payload = {
        "userType": userType,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
      }

      axios.post("http://localhost:4321/user/register", payload).then(_ => {
        toast.success("Registered successfully")

        timeout = setTimeout(() => {
          clearTimeout(timeout)
          navigate("/login-screen")
        })
      }).catch(error => {
        if(error.response.status === 403) {
          toast.error(error.response.data)
        }
        else {
          toast.error("Something wrong with the signup")
        }
      })
    }
  }, [formErrors])

  return (
    <div className="bg-slate-50 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Toaster />
      <div className="w-[90%] p-6 mx-auto my-6 bg-white rounded-md shadow-xl ring-2 ring-blue-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-600 uppercase">
          Sign Up
        </h1>
        <form className="mt-6" onSubmit={handleFormSubmit}>
          <InputBox
            labelFor="firstName"
            placeholder="First Name"
            inputType="text"
            inputValue={signUpFormValues.firstName}
            onInputChange={handleFormChange} />
          <small className="text-red-500">{formErrors.firstName}</small>
          <InputBox
            labelFor="lastName"
            placeholder="Last Name"
            inputType="text"
            inputValue={signUpFormValues.lastName}
            onInputChange={handleFormChange} />
          <small className="text-red-500">{formErrors.lastName}</small>
          <InputBox
            labelFor="email"
            placeholder="Email"
            inputType="text"
            inputValue={signUpFormValues.email}
            onInputChange={handleFormChange} />
          <small className="text-red-500">{formErrors.email}</small>
          <InputBox
            labelFor="password"
            placeholder="Password"
            inputType="password"
            inputValue={signUpFormValues.password}
            onInputChange={handleFormChange} />
          <small className="text-red-500">{formErrors.password}</small>
          <InputBox
            labelFor="confirmPassword"
            placeholder="Confirm Password"
            inputType="password"
            inputValue={signUpFormValues.confirmPassword}
            onInputChange={handleFormChange} />
          <small className="text-red-500">{formErrors.password}</small>
          <label htmlFor="assessmentType" className="block text-sm font-semibold text-gray-800">User Type</label>
          <select onChange={handleFormChange} name="userType" id="userType" className="block rounded-md w-full border-[1px] py-2 mt-2">
            <option value="RECRUITER">Recruiter</option>
            <option value="CANDIDATE">Candidate</option>
          </select>
          <StyledButton
            buttonText="Sign Up"
            background="bg-blue-700"
            hoverColor="hover:bg-blue-600"
            focusColor="focus:bg-blue-600" />
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Have an account?{" "}
          <a
            onClick={() => navigate("/login-screen")}
            className="font-medium text-blue-600 hover:underline hover:cursor-pointer"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUp