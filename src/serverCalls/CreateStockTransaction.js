async function createStockTransaction(authToken, username, accountID, stockTicker, unitsPurchased, pricePerUnit, date) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_STOCK_API_PATH + process.env.REACT_APP_CREATE_STOCK_TRANSACTION

    let body =
    {
        "username": username,
        "stockTicker": stockTicker,
        "associatedAccountId": accountID,
        "unitsPurchased": unitsPurchased,
        "pricePerUnit": pricePerUnit,
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

export default createStockTransaction;