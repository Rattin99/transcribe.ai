import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react"
import { UserContext } from "./AuthProvider";


const checkAuthStatus = () => {
    const token = localStorage.getItem("token");

    if(token) {
        return true;
    }

    return false;
}

const useAuth = () => {

    const router = useRouter();

    const userContext = useContext(UserContext);

    //@ts-ignore
    const {setUser} = userContext;

    useEffect(() => {
        const isAuthenticated = checkAuthStatus();

        const id = localStorage.getItem('id');
        const email = localStorage.getItem('email');

        setUser({
            email,
            userId: id
        })

        if(!isAuthenticated) {
            router.push("/auth/login");
        };
    },[])
}


export default useAuth;