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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "unsecured/authentication/sign-in";
import SignUp from "unsecured/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import PrivateRoute from "./unsecured/authentication/keycloak/PrivateRoute";
import BankAccount from "./layouts/Bank Accounts";
import AddAccount from "./layouts/addAccount";
import AddTransaction from "./layouts/addTransaction";
import AddCategory from "./layouts/addCategory";
import ImportTransactions from "./layouts/importTransactions";
import Transactions from "./layouts/Transactions";
import CreditAccounts from "./layouts/Credit Accounts";
import AddBudget from "./layouts/addBudget";
import Budgets from "./layouts/Budgets";
import Stocks from "./layouts/Stocks";

const routes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <PrivateRoute><Dashboard/></PrivateRoute>,
  },
  {
    type: "collapse",
    name: "Bank Accounts",
    key: "bankAccounts",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/bankAccounts",
    component: <PrivateRoute><BankAccount/></PrivateRoute>,
  },
  {
    type: "collapse",
    name: "Credit Cards",
    key: "creditAccounts",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/creditAccounts",
    component: <PrivateRoute><CreditAccounts/></PrivateRoute>,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/transactions",
    component: <PrivateRoute><Transactions/></PrivateRoute>,
  },
  {
    type: "collapse",
    name: "Budgets",
    key: "budgets",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/budgets",
    component: <PrivateRoute><Budgets/></PrivateRoute>,
  },
  {
    type: "collapse",
    name: "Stocks",
    key: "stocks",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/stocks",
    component: <PrivateRoute><Stocks/></PrivateRoute>,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "title",
    name: "Add Account",
    key: "add-account",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/addAccount",
    component: <PrivateRoute><AddAccount></AddAccount></PrivateRoute>,
  },
  {
    type: "title",
    name: "Add Transaction",
    key: "add-transaction",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/addTransaction",
    component: <PrivateRoute><AddTransaction></AddTransaction></PrivateRoute>,
  },
  {
    type: "title",
    name: "Import Transactions",
    key: "import-transactions",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/importTransactions",
    component: <PrivateRoute><ImportTransactions></ImportTransactions></PrivateRoute>,
  },
  {
    type: "title",
    name: "Add Category",
    key: "add-category",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/addCategory",
    component: <PrivateRoute><AddCategory></AddCategory></PrivateRoute>,
  },
  {
    type: "title",
    name: "Add Budget",
    key: "add-budget",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/addBudget",
    component: <PrivateRoute><AddBudget></AddBudget></PrivateRoute>,
  },
];

export default routes;
