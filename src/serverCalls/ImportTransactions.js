async function importTransactions(authToken, accountID, fileContents) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_TRANSACTION_API_PATH + process.env.REACT_APP_IMPORT_TRANSACTIONS
    console.log(fileContents.split('\n'))
    let body = {
        "account": {
            "account_id": accountID
        },
        "csv": fileContents.split('\n'),
        "currencyCode": "USD"
    }

    console.log(body)
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

export default importTransactions;