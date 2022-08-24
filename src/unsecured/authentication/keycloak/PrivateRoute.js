import { useKeycloak } from "@react-keycloak/web";


export default function PrivateRoute ({ children }) {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : null;
}
