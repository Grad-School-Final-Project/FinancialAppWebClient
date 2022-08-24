import Keycloak from "keycloak-js";

const kc = new Keycloak({
    url: "http://localhost:3456",
    realm: "MyDemo",
    clientId: "financeApp",
});

export default kc;