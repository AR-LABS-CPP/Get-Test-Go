const AddonQuestionBox = (props) => {
    return (
        props.visible
        &&
        <div className="m-5 flex flex-col border-[1px] rounded-lg shadow-md">
            <p className="p-5">{props.question}</p>
            <p className="p-5">{props.optionOne}</p>
            <p className="p-5">{props.optionTwo}</p>
            <p className="p-5">{props.optionThree}</p>
            <p className="p-5">{props.optionFour}</p>
        </div>
    )
}

export default AddonQuestionBox