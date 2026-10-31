import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";


const Logout = ()=>{

    const {loading, handleLogout} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async ()=>{
        await handleLogout();
        navigate("/login")
    }

    return (
        <button
            type="button"
            onClick={handleSubmit}
            className="logout-button"
            disabled={loading}
        >
            {loading ? "Logging out…" : "Logout"}
        </button>
    )
}

export default Logout