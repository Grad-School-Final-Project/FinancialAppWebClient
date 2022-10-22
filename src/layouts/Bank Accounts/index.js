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


class BankAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accounts : [],
            totalAccountValue : 0
        }
    }

    componentDidMount() {

        getAccounts(Cookies.get("keycloak_auth_token"), Cookies.get("username"), Cookies.get("firstname"), Cookies.get("lastname")).then(value => {
            let sum = 0
            value.forEach(account => {sum+=account.value})
            this.setState({
                accounts : value,
                totalAccountValue : sum
            })
            }
        )


        console.log(this.state.accounts)

    }

    render() {
        return (
            <DashboardLayout>
                <DashboardNavbar/>
                <MDBox
                    color="white"
                    bgColor="info"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    opacity={1}
                    p={2}
                >
                    Total Cash: ${this.state.totalAccountValue.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}
                </MDBox>
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        {this.state.accounts.map((account) => (
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultInfoCard icon="account_balance" title={account.nickname} description="" value={"$" + account.value.toLocaleString(navigator.language, { minimumFractionDigits: 2 }) }/>
                            </Grid>
                        ))}
                    </Grid>
                </MDBox>
                <Footer/>
            </DashboardLayout>
        );
    }
}

export default BankAccount;
