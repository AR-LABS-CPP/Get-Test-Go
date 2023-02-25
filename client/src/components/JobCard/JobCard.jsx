const JobCard = (props) => {
    return (
        <div>
            <p className="w-full text-center text-white font-bold bg-blue-400 rounded-tl-lg rounded-tr-lg">{props.badgeText}</p>
            <div className={`w-72 h-52 flex flex-col justify-between border-[1px] border-gray-300 shadow-lg h-92 rounded-bl-lg rounded-br-lg overflow-hidden ${props.additionalStyling}`}>
                <p className="p-2 text-center text-2xl font-bold text-gray-600">
                    {props.cardTitle}
                </p>
                <div className="px-4 mb-5 flex gap-x-2 justify-center items-center">
                    <button className="w-1/2 bg-blue-600 hover:bg-blue-500 py-2 text-white rounded-md" onClick={props.viewClickHandler}>View</button>
                    {
                        props.applyButton
                        &&
                        <button className="w-1/2 bg-blue-600 hover:bg-blue-500 py-2 text-white rounded-md" onClick={props.applyClickHandler}>Apply</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default JobCard