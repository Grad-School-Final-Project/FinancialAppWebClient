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

import { useState, useEffect } from "react";

// react-github-btn
import GitHubButton from "react-github-btn";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";
import {useNavigate} from "react-router-dom";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    openConfigurator,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];
  const navigate = useNavigate();
  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => {
    setTransparentSidenav(dispatch, true);
    setWhiteSidenav(dispatch, false);
  };
  const handleWhiteSidenav = () => {
    setWhiteSidenav(dispatch, true);
    setTransparentSidenav(dispatch, false);
  };
  const handleDarkSidenav = () => {
    setWhiteSidenav(dispatch, false);
    setTransparentSidenav(dispatch, false);
  };
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  const handleAddAccount = (e) =>{
    navigate("/addAccount")

  }

  const handleAddTransaction = (e) =>{
   navigate("/addTransaction")

  }

  const handleAddTransactions = (e) =>{
    navigate("/importTransactions")

  }

  const handleAddCategories = (e) => {
    navigate("/addCategory")
  }

  const handleAddBudget = (e) => {
    navigate("/addBudget")
  }

  const handleAddStock = (e) => {
    navigate("/addStock")
  }

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">Manage</MDTypography>

          <MDBox mb={0.5}>
            <MDTypography variant="button" color="text">
              <MDButton color="dark"
                        variant="gradient" sx={sidenavTypeButtonsStyles} onClick={handleAddAccount} fullWidth>Add Account</MDButton>
            </MDTypography>
          </MDBox>
          <MDBox mb={0.5}>
            <MDTypography variant="button" color="text">
              <MDButton color="dark"
                        variant="gradient" sx={sidenavTypeButtonsStyles} onClick={handleAddTransaction} fullWidth>Add Transaction</MDButton>
            </MDTypography>
          </MDBox>
          <MDBox mb={0.5}>
            <MDTypography variant="button" color="text">
              <MDButton color="dark"
                        variant="gradient" sx={sidenavTypeButtonsStyles} onClick={handleAddTransactions} fullWidth>Import Transactions</MDButton>
            </MDTypography>
          </MDBox>
          <MDBox mb={0.5}>
            <MDTypography variant="button" color="text">
              <MDButton color="dark"
                        variant="gradient" sx={sidenavTypeButtonsStyles} onClick={handleAddCategories} fullWidth>Add Categories</MDButton>
            </MDTypography>
          </MDBox>
          <MDBox mb={0.5}>
            <MDTypography variant="button" color="text">
              <MDButton color="dark"
                        variant="gradient" sx={sidenavTypeButtonsStyles} onClick={handleAddBudget} fullWidth>Add Budget</MDButton>
            </MDTypography>
          </MDBox>
          <MDBox mb={0.5}>
            <MDTypography variant="button" color="text">
              <MDButton color="dark"
                        variant="gradient" sx={sidenavTypeButtonsStyles} onClick={handleAddStock} fullWidth>Add Stocks</MDButton>
            </MDTypography>
          </MDBox>
        </MDBox>


      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
