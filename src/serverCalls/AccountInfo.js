import Grid from "@mui/material/Grid";
import DefaultInfoCard from "../examples/Cards/InfoCards/DefaultInfoCard";
import AccountDTO from "./dto/AccountDTO";
import axios from "axios";

async function getAccounts(authToken, username, firstname, lastname, accountType=["BANK", "CREDIT_CARD"]) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_ACCOUNT_API_PATH + process.env.REACT_APP_GET_USER_ACCOUNTS_PATH

    let body = {
        username: username,
        firstname: firstname,
        lastname: lastname,
    }
    const request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': 'Bearer ' + authToken
        },
    }
    const response = await fetch(uri, request)

    console.log(response.status)
    let json = await response.json()
    let accounts = JSON.parse(JSON.stringify(json))
    console.log(accounts)

    accounts = accounts.filter(a => accountType.includes(a["account_type"]) )
    console.log(accounts)

    // Now that we have the accounts, make a request to get the account balances.
    let accountValueMap = await getAccountValues(authToken, accounts)
    console.log(accountValueMap[2])


    let accountArray = []
    accounts.forEach(a =>
        accountArray.push(
            new AccountDTO(a["account_id"],
                a["user"]["username"],
                a["account_nickname"],
                a["account_institution"],
                a["account_type"], accountValueMap[a["account_id"]])))
    console.log(accountArray)
    return accountArray
}

async function getAccountValues(authToken, accounts) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_ACCOUNT_API_PATH + process.env.REACT_APP_GET_ACCOUNT_VALUES

    let body = accounts
    const request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': 'Bearer ' + authToken
        },
    }
    const response = await fetch(uri, request)

    let json = await response.json()
    let accountValueMap = JSON.parse(JSON.stringify(json))


    return accountValueMap

}


export default getAccounts;
