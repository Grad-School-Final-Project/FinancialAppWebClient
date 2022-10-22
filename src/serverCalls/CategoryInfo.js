import AccountDTO from "./dto/AccountDTO";
import CategoryDTO from "./dto/CategoryDTO";

async function getCategories(authToken, username, firstname, lastname) {
    const uri = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_CATEGORY_API_PATH + process.env.REACT_APP_GET_CATEGORIES

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
    let categories = JSON.parse(JSON.stringify(json))
    console.log(categories)

    let categoryArray = []
    categories.forEach(c =>
        categoryArray.push(
            new CategoryDTO(c["category_id"],
                            c["user"]["username"],
                            c["category_name"],
                            c["parentCategory"])))
    console.log(categoryArray)
    return categoryArray
}

export default getCategories;