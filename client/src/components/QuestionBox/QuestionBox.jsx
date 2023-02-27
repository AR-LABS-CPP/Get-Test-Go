const QuestionBox = (props) => {
    return (
        props.visible
        &&
        <div>
            {
                props.truefalse
                &&
                <div className="m-5 flex gap-y-4 flex-col border-[1px] rounded-lg shadow-md">
                    <p className="p-5 border-[1px] m-4 rounded-lg text-center">{props.question}</p>
                    <div className="m-4">
                        <select onChange={props.handleQuestionOptionClick} name="answer" id="answer" className="w-1/2 mt-1 border-[1px] py-2 px-1">
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                </div>
            }

            {
                props.mcq
                &&
                <div className="m-5 flex gap-y-4 flex-col border-[1px] rounded-lg shadow-md">
                    <p className="p-5 border-[1px] m-4 rounded-lg text-center">{props.question}</p>
                    <div className="mx-4 flex items-center">
                        <input type="radio" name="questionOption" onClick={props.handleQuestionOptionClick} value={props.optionOne} />
                        <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionOne}</p>
                    </div>
                    <div className="mx-4 flex items-center">
                        <input type="radio" name="questionOption" onClick={props.handleQuestionOptionClick} value={props.optionTwo} />
                        <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionTwo}</p>
                    </div>
                    <div className="mx-4 flex items-center">
                        <input type="radio" name="questionOption" onClick={props.handleQuestionOptionClick} value={props.optionThree} />
                        <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionThree}</p>
                    </div>
                    <div className="mx-4 flex items-center">
                        <input type="radio" name="questionOption" onClick={props.handleQuestionOptionClick} value={props.optionFour} />
                        <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{props.optionFour}</p>
                    </div>
                    <span className="py-2"></span>
                </div>
            }
        </div>
    )
}

export default QuestionBox