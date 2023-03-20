const DashboardCard = (props) => {
    return (
        <div className={`w-full bg-white shadow-lg h-60 rounded-lg flex flex-col justify-center items-center ${props.style}`}>
            <p className="font-bold text-7xl">{props.title}</p>
            <p className="text-xl mt-5">{props.subTitle}</p>
        </div>
    )
}

export default DashboardCard