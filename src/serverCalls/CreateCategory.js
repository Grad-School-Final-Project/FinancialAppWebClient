
async function createCategory(authToken, username,firstname, lastname, categoryName, parentCategory) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_CATEGORY_API_PATH + process.env.REACT_APP_CREATE_CATEGORY
    console.log(uri)

    let body = {
        "categoryDTO": {
            "category_id": 0,
            "category_name": categoryName,
            "user": {
                "username": username,
                "firstName": firstname,
                "lastName": lastname
            }
        }
    }
    if(parentCategory === undefined || parentCategory === '') {
        body["parentCategoryId"] = null
    }
    else{
        body["parentCategoryId"] = parentCategory.id
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

export default createCategory;