import { container } from "assets/jss/material-kit-pro-react.js";

const appStyle = theme => ({
  page: {
    minHeight: "100vh",
    backgroundColor:"#111",
    backgroundSize: 'cover',
  },
  container: {
    ...container,
    zIndex: 1,
  },
  children:{
    minHeight:'77vh',
  }
});

export default appStyle;
