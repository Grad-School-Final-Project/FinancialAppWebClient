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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DefaultInfoCard from "../../examples/Cards/InfoCards/DefaultInfoCard";
import MDBadge from "../../components/MDBadge";

import getAccounts from "../../serverCalls/AccountInfo"
import getCategories from "../../serverCalls/CategoryInfo"
import {Component} from "react";
import {useKeycloak} from "@react-keycloak/web";
import bgImage from "../../assets/images/bg-sign-up-cover.jpeg";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import {Link} from "react-router-dom";
import CoverLayout from "../../unsecured/authentication/components/CoverLayout";
import {FormControl, InputLabel, Modal, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import createTransaction from "../../serverCalls/CreateTransaction";
import createCategory from "../../serverCalls/CreateCategory";
import createAccount from "../../serverCalls/CreateAccount";

const customStyles = (width = 100, height = 40) => {
    return {
        container: (base) => ({
            ...base,
            display:'inline-block',
            width: width,
        }),
        valueContainer: (base) => ({
            ...base,
            minHeight: height,
        })
    }
}


class AddCategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            parentCategory:"",
            categories:[],
            category: "",
            modalOpen: false
        }
    }

    componentDidMount() {

        getAccounts(Cookies.get("keycloak_auth_token"), Cookies.get("username"), Cookies.get("firstname"), Cookies.get("lastname")).then(value => {
                this.setState({
                    accounts : value
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
    }

    handleParentCategoryChange = (e) => {
        this.setState({parentCategory : e.target.value})
    }

    handleCategoryChange = (e) => {
        this.setState({category : e.target.value})
    }
    handleSubmitted = (e) => {
        createCategory(Cookies.get("keycloak_auth_token"),
            Cookies.get("username"),
            Cookies.get("firstname"),
            Cookies.get("lastname"),
            this.state.category,
            this.state.parentCategory).then(status => {

            if(status > 0){
                alert("Successfully Created Category")

            }
            else{
                alert("Category unable to be created")
            }
        })

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
                            Add a Category
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={2} pb={2} px={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={2}>
                                <InputLabel id="demo-simple-select-label">Parent Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.parentCategory}
                                    label="Category"
                                    onChange={this.handleParentCategoryChange}

                                >
                                    {this.state.categories.map(c => <MenuItem value={c}>{c["categoryName"]}</MenuItem>)}

                                </Select>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput type="text" label="Category Name" variant="standard" onChange={this.handleCategoryChange}  fullWidth />
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

export default AddCategory;
