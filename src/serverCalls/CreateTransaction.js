async function createTransaction(authToken, accountID, categoryID, amount, currency,description, notes, date) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_TRANSACTION_API_PATH + process.env.REACT_APP_CREATE_TRANSACTION

    let body = {
        "description": description,
        "associatedAccount": {
            "account_id": accountID,
        },
        "notes": notes,
        "amount": amount,
        "currency": currency,
        "category": {
            "category_id": categoryID,
        },
        "date": date
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

export default createTransaction;