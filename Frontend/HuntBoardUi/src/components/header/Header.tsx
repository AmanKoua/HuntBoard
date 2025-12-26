import "./header.scss"
import { useNavigate } from "react-router";

export const Header = () => {

    const navigate = useNavigate();

    return <header>
        <p className="title">
            HuntBoard
        </p>
        <button onClick={()=>{
            navigate("/")
        }}>
            Profile
        </button>
    </header>
}