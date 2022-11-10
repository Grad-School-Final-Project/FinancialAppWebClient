
async function createBudget(authToken, username,firstname, lastname, category, budgetName, amount ) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_BUDGET_API_PATH + process.env.REACT_APP_ADD_BUDGET
    console.log(uri)

    let body = {
        "budgetNickname": budgetName,
        "user": {
            "username": username
        },
        "associated_category": {
            "category_id": category['id']
        },
        "monthlyAmount": amount
    }

    console.log(body)
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

    if(response.status !== 200){
        // request failed. Do something...
        return -1
    }

    return 1;
}

export default createBudget;