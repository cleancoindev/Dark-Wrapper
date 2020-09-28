import { container } from "assets/jss/material-kit-pro-react.js";
import bgImage from "assets/img/dv_bg.jpg";
const appStyle = theme => ({
  page: {
    // backgroundColor: "#232733",
    minHeight: "100vh",
    background:'no-repeat center/100% url('+bgImage+')',
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
