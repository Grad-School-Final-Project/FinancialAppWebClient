async function deleteTransaction(authToken, transaction) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_TRANSACTION_API_PATH + process.env.REACT_APP_DELETE_TRANSACTION

    console.log(transaction)
    let body = {
        "transaction_id" : transaction["id"],
    }

    console.log(JSON.stringify(body))
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

export default deleteTransaction;