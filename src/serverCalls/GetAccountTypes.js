async function getAccountTypes(authToken) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_ACCOUNT_API_PATH + process.env.REACT_APP_GET_ACCOUNT_TYPES

    const request = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            // 'Authorization': 'Bearer ' + authToken
        },
    }
    const response = await fetch(uri, request)

    console.log(response.status)
    let json = await response.json()
    let accountTypes = JSON.parse(JSON.stringify(json))
    console.log(accountTypes)

    return accountTypes
}

export default getAccountTypes;