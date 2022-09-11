import Grid from "@mui/material/Grid";
import DefaultInfoCard from "../examples/Cards/InfoCards/DefaultInfoCard";
import AccountDTO from "./dto/AccountDTO";

async function getAccounts() {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_ACCOUNT_API_PATH + process.env.REACT_APP_GET_USER_ACCOUNTS_PATH

    let account = new AccountDTO(1,"string", "Ally", "string", "BANK", 2100)

    return [
        account,
        new AccountDTO(1,"string", "Elevations", "string", "BANK", 2350)
    ]
}

export default getAccounts;