const AssessmentCard = (props) => {
    return (
        <div>
            <p className="w-full text-center text-white font-bold bg-blue-400 rounded-tl-lg rounded-tr-lg">{props.badgeText}</p>
            <div className={`w-72 h-64 flex flex-col justify-around border-[1px] border-gray-300 shadow-lg h-92 rounded-bl-lg rounded-br-lg overflow-hidden ${props.additionalStyling}`}>
                <p className="p-2 text-center text-2xl font-bold text-gray-600">
                    {props.cardTitle}
                </p>
                <p className="p-2 h-24 text-center overflow-ellipsis">{props.cardDescription}</p>
                <div className="flex justify-center items-center">
                    <button className="w-[150px] bg-blue-600 hover:bg-blue-500 py-2 text-white rounded-md" onClick={props.viewClickHandler}>View</button>
                </div>
            </div>
        </div>
    )
}

export default AssessmentCard