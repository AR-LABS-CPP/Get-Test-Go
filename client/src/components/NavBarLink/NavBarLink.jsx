import { useNavigate } from "react-router-dom"

const NavBarLink = (props) => {
    const navigate = useNavigate()

    const style = "w-full text-center transition-colors hover:bg-blue-500 hover:text-white hover:cursor-pointer py-3 px-2 mx-2 rounded-md text-sm md:text-md lg:text-md"

    return (
        props.navigateURL ?
                <p onClick={() => navigate(props.navigateURL)} className={style}>{props.title}</p>
                : <p onClick={() => props.clickHandler()} className={style}>{props.title}</p>
    )
}

export default NavBarLink