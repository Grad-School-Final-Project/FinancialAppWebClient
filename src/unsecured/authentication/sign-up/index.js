/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "unsecured/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import userSignUp from "../../../serverCalls/SignUp";
import { useNavigate } from "react-router-dom";

function Cover() {
  const navigate = useNavigate();

  let username = ''
  let firstName = ''
  let lastName = ''
  let email = ''
  let password = ''

  const handleFirstNameChange = (e) =>{
    console.log("In handle name change")
    console.log(e.target.value)
    firstName = e.target.value
  }

  const handleLastNameChange = (e) =>{
    console.log("In handle name change")
    console.log(e.target.value)
    lastName = e.target.value
  }

  const handleEmailChange = (e) =>{
    console.log("In handle name change")
    console.log(e.target.value)
    email = e.target.value
  }

  const handleUsernameChange = (e) => {
    username = e.target.value
  }

  const handlePasswordChange = (e) => {
    password = e.target.value
  }

  const handleSubmitted = (e) => {
    console.log(e)
    console.log(process.env)
    userSignUp(username, firstName, lastName, email, password, navigate)
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Username" variant="standard" onChange={handleUsernameChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="First Name" variant="standard" onChange={handleFirstNameChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Last Name" variant="standard" onChange={handleLastNameChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" onChange={handleEmailChange} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" onChange={handlePasswordChange} fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSubmitted} fullWidth >
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text" on>
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
