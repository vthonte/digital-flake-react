import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, component }) => {

    const digitalFlake = JSON.parse(localStorage.getItem("digitalFlake"));
    if (!digitalFlake?.isLoggedIn) {
        return <Navigate to="/authentication/simple/login" replace />;
    } else {
        return <>
            {component}
        </>
    }
};
export default Protected;