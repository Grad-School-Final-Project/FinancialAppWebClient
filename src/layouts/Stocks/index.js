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
import {getRowData, getTableColumns} from "./brokerageAccountData";
import userSignUp from "../../serverCalls/SignUp";
import {InputLabel, Modal, Select} from "@mui/material";
import Button from "@mui/material/Button";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import MenuItem from "@mui/material/MenuItem";
import getCategories from "../../serverCalls/CategoryInfo";
import updateTransaction from "../../serverCalls/UpdateTransaction";
import deleteTransaction from "../../serverCalls/DeleteTransaction";


class Stocks extends Component{
    constructor(props) {
        super(props);
        this.state = {
            accounts : [],
            columns : getTableColumns(),
            rows : [],
            selectedRow : 0,
            totalAccountValue : 0,
            modalOpen: false,
            selectedDescription:"Description",
            category:"",
            categories:[],
            selectedCategory: ""
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

        getCategories(Cookies.get("keycloak_auth_token"), Cookies.get("username"), Cookies.get("firstname"), Cookies.get("lastname"))
            .then(value => {
                    this.setState({
                        categories : value
                    })
                }
            )

        this.setState({columns : getTableColumns()})

        getRowData(Cookies.get("keycloak_auth_token"), Cookies.get("username"), Cookies.get("firstname"), Cookies.get("lastname"), this.handleEditTransaction).then(value =>{
            this.setState({rows:value})
            }
        )

        console.log(this.state.columns)
        console.log(this.state.categories)

    }

    handleEditTransaction = (e) => {
        console.log("Edit the transaction")
        console.log(e)
        console.log(this.state.rows[e.target.value])
        this.setState({selectedRow: e.target.value})
        this.setState({selectedDescription:this.state.rows[e.target.value]['description']})
        this.setState({selectedCategory:this.state.rows[e.target.value]['category'] })
        this.setState({modalOpen:true})
    }

    toggleModal = (e) => {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    handleCategoryChange = (e) => {
        this.setState({selectedCategory : e.target.value})
    }

    handleSubmitTransactionChange = (e) => {
        updateTransaction(Cookies.get("keycloak_auth_token"),
            this.state.rows[this.state.selectedRow],
            this.state.selectedDescription,
            this.state.selectedCategory).then(r => {
                if(r > 0){
                    this.toggleModal()
                    this.componentDidMount()
                }
                else {
                    alert("Unable to update transaction")
                }
        })
    }

    handleDescriptionChanged = (e) => {
        this.setState({selectedDescription: e.target.value})
    }

    handleDeleteTransaction = (e) => {
        deleteTransaction(Cookies.get("keycloak_auth_token"), this.state.rows[this.state.selectedRow] ).then(r => {
            if(r > 0){
                this.toggleModal()
                this.componentDidMount()
            }
            else {
                alert("Unable to update transaction")
            }
        })
    }

    render() {
        return (
            <DashboardLayout>
                <DashboardNavbar/>
                <Modal open={this.state.modalOpen}
                       onRequestClose={this.toggleModal}
                       style={{
                           top: '35%',
                           left: '50%',
                           right: 'auto',
                           bottom: 'auto',
                           marginRight: '-50%',
                           width: '25%',
                           transform: 'translate(-40%, -10%)',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           backgroundColor: "transparent",
                           borderRadius: "25px",
                       }}>
                    <Card>
                        <MDBox
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="success"
                            mx={10}
                            mt={-3}
                            p={3}
                            mb={1}
                            textAlign="center"
                        >
                            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                Edit Transaction
                            </MDTypography>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="text" label="Description" defaultValue={this.state.selectedDescription} onChange={this.handleDescriptionChanged} variant="standard"   fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.selectedCategory}
                                label="Category"
                                onChange={this.handleCategoryChange}

                            >
                                {this.state.categories.map(c => <MenuItem value={c}>{c["categoryName"]}</MenuItem>)}

                            </Select>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton variant="gradient" color="info" onClick={this.handleSubmitTransactionChange} fullWidth >
                                Submit
                            </MDButton>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton variant="gradient" color="info" onClick={this.handleDeleteTransaction} fullWidth >
                                Delete
                            </MDButton>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton variant="gradient" color="info" onClick={this.toggleModal} fullWidth >
                                Close
                            </MDButton>
                        </MDBox>
                    </Card>
                </Modal>
                <DataTable table={{
                    columns: this.state.columns,
                    rows: this.state.rows
                }}
                           defaultSortField="date"
                           globalFilterFields={['account']}
                           />
                <Footer/>
            </DashboardLayout>
        );
    }
}

export default Stocks;
