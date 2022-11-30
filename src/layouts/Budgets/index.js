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
import HorizontalBarChart from "../../examples/Charts/BarCharts/HorizontalBarChart";
import {PieChart} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import ComplexStatisticsCard from "../../examples/Cards/StatisticsCards/ComplexStatisticsCard";
import {getRowData, getTableColumns} from "./BudgetData";


class Budgets extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accounts : [],
            totalAccountValue : 0,
            rows : [],
            columns: getTableColumns(),
            currentMonth: new Date().toLocaleString(
                'default', {month: 'long'})
        }
    }

    componentDidMount() {

        getAccounts(Cookies.get("keycloak_auth_token"), Cookies.get("username"), Cookies.get("firstname"), Cookies.get("lastname"), "CREDIT_CARD").then(value => {
            let sum = 0
            value.forEach(account => {sum+=account.value})
            this.setState({
                accounts : value,
                totalAccountValue : sum
            })
            }
        )


        console.log(this.state.accounts)

        getRowData(Cookies.get("keycloak_auth_token"),
            Cookies.get("username"),
            Cookies.get("firstname"),
            Cookies.get("lastname"),
            this.handleEditTransaction,
            this.state.currentMonth.toUpperCase()).then(value =>{
                this.setState({rows:value})
            }
        )

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
                    {this.state.currentMonth} Budget
                </MDBox>
                <MDBox pt={6} pb={3}>
                    <DataTable table={{
                        columns: this.state.columns,
                        rows: this.state.rows
                    }}
                               defaultSortField="date"
                               globalFilterFields={['account']}
                    />
                </MDBox>
                <Footer/>
            </DashboardLayout>
        );
    }
}

export default Budgets;
