


async function userSignUp(username, firstName, lastName, email, password, navigate) {
    const uri = process.env.REACT_APP_SERVER_URL + "createUser"
    console.log(firstName)

    console.log(process.env.REACT_APP_SERVER_URL)
    const body = {
        username: username,
        password: password,
        email: email,
        firstname: firstName,
        lastname: lastName
    }
    const request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }

    }
    const response = await fetch(uri, request)

    console.log(response.status)
    if(response.status === 200){
        // all good. Redirect to the sign page
        navigate("/authentication/sign-in")
    }
    else {
        // we had an issue.
    }
}

export default  userSignUp;