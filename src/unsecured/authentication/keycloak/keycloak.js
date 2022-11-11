import Keycloak from "keycloak-js";

const kc = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,//"http://localhost:3456",
    realm: "MyDemo",
    clientId: "financeApp",
});

export default kc;