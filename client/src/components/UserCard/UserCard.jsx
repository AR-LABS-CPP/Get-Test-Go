/*
    Initial-Creation: 25-October-2022
    Latest-Modification-Date: 26-October-2022

    Programmers: 
        Aliraza, Zakaria
        
    TODO:
        * Nothing
*/

const UserCard = (props) => {
    return (
        <div onClick={() => props.clickHandler(props.userType)} className={`m-4 px-3 py-5 bg-white w-60 h-96 rounded-lg shadow-2xl flex flex-col justify-center items-center hover:bg-gray-100 hover:scale-95 hover:cursor-pointer transition-all duration-300 ${props.additionalStyling}`}>
            <img src={props.cardIcon} className="object-cover w-[60%]" />
            <p className="text-3xl mt-5">{props.cardTitle}</p>
            <p className="text-center mt-5">{props.cardDescription}</p>
        </div>
    )
}

export default UserCard