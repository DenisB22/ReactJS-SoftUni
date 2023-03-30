import { useAuthContext } from "../components/contexts/AuthContext";


export const withAuth = (Component) => {
    const WrapperComponent = (props) => {
        const authContext = useAuthContext();

        return (
            <Component  {...props} auth={authContext}/>
        );
    };
    
    return WrapperComponent;
};