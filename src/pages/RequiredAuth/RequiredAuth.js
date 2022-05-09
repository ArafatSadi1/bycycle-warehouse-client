import { Spinner } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, useLocation } from "react-router-dom"
import auth from "../../firebase.init"

const RequiredAuth = ({children}) =>{
    const location = useLocation();
    const [user, loading] = useAuthState(auth);

    if(loading){
        return <Spinner></Spinner>
    }

    if(!user){
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    return children;
}
export default RequiredAuth;