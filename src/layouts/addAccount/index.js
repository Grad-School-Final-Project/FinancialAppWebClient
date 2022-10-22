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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Cookies from "js-cookie";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import MDBadge from "../../components/MDBadge";

import getAccounts from "../../serverCalls/AccountInfo"
import {Component} from "react";
import {useKeycloak} from "@react-keycloak/web";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import {InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MDInput from "../../components/MDInput";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import CoverLayout from "../../unsecured/authentication/components/CoverLayout";
import getAccountTypes from "../../serverCalls/GetAccountTypes";
import createAccount from "../../serverCalls/CreateAccount";
import {useNavigate} from "react-router-dom";


class AddAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accounts : [],
            accountTypes : [],
            selectedAccountType :"",
            accountName:"",
            accountInstitution: "",
            initialBalance: 0.0,
        }
    }

    componentDidMount() {
        getAccountTypes(Cookies.get("keycloak_auth_token")).then(types =>{
            this.setState({accountTypes : types})
            if(types.length > 0){
                this.setState({selectedAccountType : types[0]})
            }
            this.state.accountTypes.forEach(t => console.log(t))
        } )
    }

    handleSubmitted = (e) => {
        createAccount(Cookies.get("keycloak_auth_token"),
            Cookies.get("username"),
            Cookies.get("firstname"),
            Cookies.get("lastname"),
            this.state.accountName,
            this.state.accountInstitution,
            this.state.selectedAccountType,
            this.state.initialBalance).then(status => {

                if(status > 0){
                    alert("Successfully Created Account")
                    this.setState({selectedAccountType :"",
                        accountName:"",
                        accountInstitution: "",
                        initialBalance: 0.0})
                    e.target.reset()
                }
                else{
                    alert("Account unable to be created")
                }
        })

    }

    handleTypeChanged = (e) => {
        this.setState({selectedAccountType : e.target.value})

    }

    handleAccountNameChanged = (e) =>{
        this.setState({accountName : e.target.value})
    }

    handleAccountInstitutionChanged = (e) =>{
        this.setState({accountInstitution : e.target.value})
    }

    handleInitialBalanceChanged = (e) =>{
        this.setState({initialBalance : e.target.value})
    }

    render() {
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
                            Add an Account
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={2} pb={2} px={3}>
                        <MDBox component="form" role="form">

                            <MDBox mb={2}>
                                <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.selectedAccountType}
                                    label="AccountType"
                                    onChange={this.handleTypeChanged}

                                >
                                    {this.state.accountTypes.map((type) =><MenuItem value={type}>{type}</MenuItem>)}

                                </Select>
                            </MDBox>

                            <MDBox mb={2}>
                                <MDInput type="text" label="Account Name" variant="standard" onChange={this.handleAccountNameChanged}  fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Account Institution" variant="standard" onChange={this.handleAccountInstitutionChanged}  fullWidth />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="number" label="Initial Balance" variant="standard" onChange={this.handleInitialBalanceChanged}  fullWidth />
                            </MDBox>
                            <MDBox mt={4} mb={1}>
                                <MDButton variant="gradient" color="info" onClick={this.handleSubmitted} fullWidth >
                                    Create
                                </MDButton>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Card>
            </CoverLayout>
        );
    }
}

export default AddAccount;
