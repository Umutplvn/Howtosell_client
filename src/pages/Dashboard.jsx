import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardPage from "../components/DashboardPage";
import UsersPage from "../components/UsersPage";
import StatsPage from "../components/StatsPage";
import Account from "../components/Account";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const demoTheme = createTheme({
  palette: {
    primary: { main: "#000000" },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
    action: {
      hover: "#f0f0f0",
      active: "#000000",
      selected: "black",
      selectedOpacity: "0",
      activatedOpacity: "black",
      hoverOpacity: "black",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  let content;
  const { owner, authorization } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  switch (pathname) {
    case "/dashboard":
      if (owner || authorization) {
        content = <DashboardPage />;
      } else {
        content = (
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", fontFamily: "Helvetica sans-seri" }}
          >
            Authorization required!
          </Typography>
        );
      }
      break;
    case "/users":
      if (owner) {
        content = <UsersPage />;
      } else {
        content = (
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", fontFamily: "Helvetica sans-seri" }}
          >
            No Access!
          </Typography>
        );
      }
      break;
    case "/stats":
      if (owner || authorization) {
        content = <StatsPage />;
      } else {
        content = (
          <Typography
            variant="h4"
            sx={{ fontWeight: "600", fontFamily: "Helvetica sans-seri" }}
          >
            Authorization required!
          </Typography>
        );
      }
      break;
    case "/account":
      content = <Account />;
      break;
      default:
        if (owner || authorization) {
          content = <DashboardPage />
        } else {
          content = <Typography variant="h4" sx={{fontWeight:"600", fontFamily: "Helvetica sans-serif"}}>Page Not Found</Typography>;
        }
    }


  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {content}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;
  const { owner } = useSelector((state) => state?.auth);

  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const NAVIGATION = [
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: "stats",
      title: "Stats",
      icon: <BarChartIcon />,
    },
    {
      kind: "divider",
    },
    ...(owner
      ? [
          {
            segment: "users",
            title: "Users",
            icon: <SupervisorAccountIcon />,
          },
          {
            kind: "divider",
          },
        ]
      : []),
    {
      segment: "account",
      title: "Account",
      icon: <AccountCircleIcon />,
    },
  ];

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{ title: "How To Sell", logo: "" }}      
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
