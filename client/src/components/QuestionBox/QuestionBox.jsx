import { useEffect, useState } from "react"

const QuestionBox = (props) => {

    const [mcqselectedOption, setMcqSelectedOption] = useState("")
    const [tfSelectedOption, setTfSelectedOption] = useState(true)
    const [secondsLeft, setSecondsLeft] = useState(15)
    const [errorText, setErrorText] = useState("")

    useEffect(() => {
        let intervalId = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        handleCheckTime()
    }, [secondsLeft])

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleCheckTime = () => {
        console.log(secondsLeft)

        if (secondsLeft === 0) {
            if(props.questionType === "MCQ" && mcqselectedOption !== "") {
                props.saveAnswerCB(mcqselectedOption)
            }
            else if(props.questionType === "TrueFalse") {
                props.saveAnswerCB(tfSelectedOption)
            }

            props.handleNextQuestion()
        }
    }

    const handleSubmit = () => {
        if(props.questionType === "MCQ" && mcqselectedOption === "") {
            setErrorText("Please select an option")
        }
        else if(props.questionType === "TrueFalse") {
            props.saveAnswerCB(tfSelectedOption)
        }
        else {
            props.saveAnswerCB(mcqselectedOption)
        }

        props.handleNextQuestion()
    }

    const handleQuestionOptionClick = (evt) => {
        console.log(mcqselectedOption)
        console.log(tfSelectedOption) 

        if (props.questionType === "MCQ") {
            setMcqSelectedOption(evt.target.value)
        }
        else if (props.questionType === "TrueFalse") {
            setTfSelectedOption(evt.target.value)
        }        
    }

    return (
        props.visible
        &&
        <div>
            <div className="m-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-rows-1 border-[1px] rounded-lg shadow-md">
                <div className="flex flex-col">
                    <p className="rounded-tr-lg rounded-tl-lg md:rounded-tr-none lg:rounded-tr-none bg-blue-500 w-full text-white text-center py-2 font-bold">Section</p>
                    <p className="text-center py-2 font-bold">{props.sectionName}</p>
                </div>
                <div className="flex flex-col">
                    <p className="bg-blue-500 w-full text-white text-center py-2 font-bold">Total Questions</p>
                    <p className="text-center py-2 font-bold">{props.totalQuestions}</p>
                </div>
                <div className="flex flex-col">
                    <p className="rounded-tr-none md:rounded-tr-lg lg:rounded-tr-lg xl:rounded-tr-lg bg-blue-500 w-full text-white text-center py-2 font-bold">Time remaining for this question</p>
                    <p className="text-center py-2 font-bold">{formatTime(secondsLeft)}</p>
                </div>
            </div>

            <div className="w-full text-center">
                <span className="text-sm text-red-500">{errorText}</span>
            </div>

            {
                props.truefalse
                &&
                <div className="m-5 flex gap-y-4 flex-col border-[1px] rounded-lg shadow-md">
                    <p className="p-5 border-[1px] m-4 rounded-lg text-center">{props.question}</p>
                    <div className="m-4">
                        <select onChange={handleQuestionOptionClick} name="answer" id="answer" className="w-1/2 mt-1 border-[1px] py-2 px-1">
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>

                    <div className="w-full flex justify-center gap-x-3 text-white">
                        <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 px-10 py-2 rounded-md">
                            {
                                props.buttonText
                            }
                        </button>
                    </div>
                </div>
            }

            {
                props.mcq
                &&
                <div>
                    <div className="m-5 flex gap-y-4 flex-col border-[1px] rounded-lg shadow-md">
                        <p className="p-5 border-[1px] m-4 rounded-lg text-center">{props.question}</p>
                        <div className="mx-4 flex items-center">
                            <input type="radio" name="questionOption" onClick={handleQuestionOptionClick} value={props.optionOne} />
                            <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionOne}</p>
                        </div>
                        <div className="mx-4 flex items-center">
                            <input type="radio" name="questionOption" onClick={handleQuestionOptionClick} value={props.optionTwo} />
                            <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionTwo}</p>
                        </div>
                        <div className="mx-4 flex items-center">
                            <input type="radio" name="questionOption" onClick={handleQuestionOptionClick} value={props.optionThree} />
                            <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionThree}</p>
                        </div>
                        <div className="mx-4 flex items-center">
                            <input type="radio" name="questionOption" onClick={handleQuestionOptionClick} value={props.optionFour} />
                            <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionFour}</p>
                        </div>
                        <span className="py-2"></span>
                    </div>

                    <div className="w-full flex justify-center gap-x-3 text-white">
                        <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 px-10 py-2 rounded-md">
                            {
                                props.buttonText
                            }
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default QuestionBox