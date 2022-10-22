import CategoryDTO from "./dto/CategoryDTO";

async function createAccount(authToken, username, firstname, lastname, accountName, institution, type, initialBalance) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_ACCOUNT_API_PATH + process.env.REACT_APP_CREATE_ACCOUNT

    let body = {
        "accountDTO": {
            "user": {
                "username": username,
                "firstName": firstname,
                "lastName": lastname
            },
            "account_nickname": accountName,
            "account_institution": institution,
            "account_type": type
        },
        "initialBalance": initialBalance
    }
    let request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': 'Bearer ' + authToken
        },
    }
    const response = await fetch(uri, request)

    if(response.status !== 200){
        // request failed. Do something...
        return -1
    }

    return 1;

}

export default createAccount;