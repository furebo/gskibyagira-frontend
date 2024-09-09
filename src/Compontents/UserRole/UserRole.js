import React from "react";
import Tablez from "./table";
import useStyles from "../Shared/Styles/UserRoleStyles";
//import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
//import { useTranslation } from "react-i18next";

export const UserRole = () => {
  const classes = useStyles();
  //const { t } = useTranslation();
  return (
    
      <div className={classes.wrapper}>
        <div className={classes.titleSection}>
          <p  className={classes.titleSection}></p>
        </div>
        <Tablez />
      </div>
    
  );
};
//export default UserRole;