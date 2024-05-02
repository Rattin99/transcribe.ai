import { useRouter } from "next/navigation";
import { useEffect } from "react"


const checkAuthStatus = () => {
    const token = localStorage.getItem("token");

    if(token) {
        return true;
    }

    return false;
}

const useAuth = () => {

    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = checkAuthStatus();

        if(!isAuthenticated) {
            router.push("/auth/login");
        };
    },[])
}


export default useAuth;