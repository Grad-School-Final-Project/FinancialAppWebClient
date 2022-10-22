async function updateTransaction(authToken, transaction, updatedDescription, updatedCategory) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_TRANSACTION_API_PATH + process.env.REACT_APP_UPDATE_TRANSACTION

    console.log(transaction)
    let body = {
        "transactionId" : transaction["id"],
        "newDescription" : updatedDescription,
        "newCategoryName" : updatedCategory["categoryName"]
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

export default updateTransaction;