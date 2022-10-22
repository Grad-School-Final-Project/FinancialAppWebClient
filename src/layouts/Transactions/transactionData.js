import Button from "@mui/material/Button";

export function getTableColumns(){
    let columns = [
        {Header: "Date", accessor: "date", width: "19%"},
        {Header: "Description", accessor: "description", width: "19%"},
        {Header: "Category", accessor: "category", width: "19%"},
        {Header: "Account", accessor: "account", width: "19%"},
        {Header: "Amount", accessor: "amount", width: "19%"},
        {Header: "Edit", accessor: "edit", width: "5%"},
    ]

    return columns
}

export async function getRowData(authToken, username, firstname, lastname, handleEditClicked){
    let rows = []

    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_TRANSACTION_API_PATH + process.env.REACT_APP_GET_USER_TRANSACTIONS

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
        let transaction = {
            id: t['transaction_id'],
            date:t['date'],
            description: t['description'],
            category: t['category']['category_name'],
            account: t['associatedAccount']['account_nickname'],
            amount: t['amount'],
            edit: <Button value={row++} onClick={handleEditClicked}>Edit</Button>,
        }

        rows.push(transaction)

    })

    return rows
}