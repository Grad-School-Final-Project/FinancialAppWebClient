import Button from "@mui/material/Button";

export function getTableColumns(){
    let columns = [
        {Header: "Budget Name", accessor: "budget", width: "19%"},
        {Header: "Amount Spent", accessor: "spent", width: "19%"},
        {Header: "Amount Budgeted", accessor: "budgeted", width: "19%"},
        {Header: "Percent Spent", accessor: "percent", width: "19%"},
    ]

    return columns
}

export async function getRowData(authToken, username, firstname, lastname, handleEditClicked, month){
    let rows = []

    let uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_BUDGET_API_PATH + process.env.REACT_APP_GET_USER_BUDGETS

    console.log(uri)

    let body = {
        username: username,
        firstname: firstname,
        lastname: lastname,
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
    let response = await fetch(uri, request)

    console.log(response.status)
    let json = await response.json()
    let budgets = JSON.parse(JSON.stringify(json))
    console.log(budgets)

    uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_BUDGET_API_PATH + process.env.REACT_APP_GET_BUDGET_SPENDING

    console.log(uri)

    body = {
        budgetDTOs : json,
        month : month
    }
    request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': 'Bearer ' + authToken
        },
    }

    response = await fetch(uri, request)
    json = await response.json()
    let budgetSpending = JSON.parse(JSON.stringify(json))
    console.log(budgetSpending)

    let row = 0
    budgets.forEach(b => {
        let transaction = {
            budget: b['budgetNickname'],
            spent: "$" + -1*budgetSpending[b['budget_id']],
            budgeted: "$" + b['monthlyAmount'],
            percent: Math.round((-1*budgetSpending[b['budget_id']]/b['monthlyAmount'])*100) + "%",
        }

        rows.push(transaction)

    })

    return rows
}