import Button from "@mui/material/Button";

export function getTableColumns(){
    let columns = [
        {Header: "Stock Symbol", accessor: "ticker", width: "19%"},
        {Header: "Shares Owned", accessor: "sharesOwned", width: "19%"},
        {Header: "Current Price", accessor: "currentPrice", width: "19%"},
        {Header: "Current Value", accessor: "currentValue", width: "19%"},
        {Header: "Total Price Paid", accessor: "pricePaid", width: "19%"},
        {Header: "% Return", accessor: "return", width: "19%"}
    ]

    return columns
}

export async function getRowData(authToken, username, firstname, lastname, handleEditClicked){
    let rows = []

    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_STOCK_API_PATH + process.env.REACT_APP_GET_USER_STOCKS

    console.log(uri)

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
    let transactions = JSON.parse(JSON.stringify(json))
    console.log(transactions)

    let row = 0
    transactions.forEach(t => {
        let percentReturn = (t['sharesOwned'] * t['currentPrice']/t['totalPricePaid'] - 1) * 100
        let currentPrice = t['currentPrice'] * 1
        let currentValue = t['sharesOwned'] * t['currentPrice']
        let totalPricePaid = t['totalPricePaid'] * 1
        let transaction = {
            ticker: t['stockTicker'],
            sharesOwned:t['sharesOwned'],
            currentPrice: "$" + currentPrice.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            currentValue: "$" + currentValue.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            pricePaid: "$" + totalPricePaid.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            return: percentReturn.toLocaleString(navigator.language, { minimumFractionDigits: 1, maximumFractionDigits:1 }) + "%",
        }

        rows.push(transaction)

    })

    return rows
}