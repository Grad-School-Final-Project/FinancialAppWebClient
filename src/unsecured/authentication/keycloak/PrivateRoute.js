import { useKeycloak } from "@react-keycloak/web";
import Cookies from 'js-cookie';


export default function PrivateRoute ({ children }) {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;
    // console.log(keycloak.idToken)
    if(isLoggedIn){
        Cookies.set('keycloak_auth_token', keycloak.idToken)
        keycloak.loadUserInfo().then(userInfo => {
                Cookies.set("username", userInfo['preferred_username'])
                Cookies.set("firstname", userInfo['given_name'])
                Cookies.set("lastname", userInfo['family_name'])
            }
        )
    }


    return isLoggedIn ? children : null;
}
