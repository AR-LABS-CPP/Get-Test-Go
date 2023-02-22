const AssessmentCard = (props) => {
    return (
        <div className={`w-full h-56 flex flex-col justify-around border-[1px] border-gray-300 shadow-lg h-92 m-2 rounded-lg overflow-hidden ${props.additionalStyling}`}>
            {/* <div className="card-image-holder">
                <img className="aspect-video object-fit" src={props.cardImage} alt="job_image" />
            </div> */}
            <p className="p-2 text-center text-2xl font-bold text-gray-600">
                {props.cardTitle}
            </p>
            <p className="p-2 h-24 text-center overflow-ellipsis">{props.cardDescription}</p>
            <div className="flex justify-center items-center p-3 gap-x-3">
                <button className="w-1/2 bg-emerald-600 hover:bg-emerald-500 py-2 text-white rounded-md" onClick={props.viewClickHandler}>View</button>
            </div>
        </div>
    )
}

export default AssessmentCard