import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function NavigationBar(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Workouts", path: "/workouts" },
    { name: "Exercises", path: "/exercises" },
    { name: "Stats", path: "/stats" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250, bgcolor: "#252525", height: "100%" }}
      onClick={handleDrawerToggle}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${props.accentColor}30`,
        }}
      >
        <FitnessCenterIcon
          sx={{ mr: 1, fontSize: 28, color: props.accentColor }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.8,
            color: "#f5f5f5",
            textTransform: "uppercase",
          }}
        >
          Workout Tracker
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            component={Link}
            to={item.path}
            key={item.name}
            sx={{
              my: 1,
              mx: 1,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: `${props.accentColor}20`,
              },
            }}
          >
            <ListItemText
              primary={item.name}
              sx={{
                color: "#f5f5f5",
                "& .MuiTypography-root": {
                  fontWeight: 600,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: "#1A1A1A",
        borderBottom: `1px solid ${props.accentColor}30`,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: isMobile ? "space-between" : "center",
          gap: { xs: 0, sm: 20, md: 35 },
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <FitnessCenterIcon
            sx={{ mr: 1, fontSize: 28, color: props.accentColor }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              fontSize: "1.2rem",
              backgroundImage: `linear-gradient(45deg, ${props.accentColor}, #f5f5f5)`,
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
          >
            Workout Tracker
          </Typography>
        </Box>

        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 2 }}
          >
            <MenuIcon sx={{ color: props.accentColor }} />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: { xs: 1, sm: 2, md: 3 } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: `${props.accentColor}20`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 8px ${props.accentColor}30`,
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}

        <Drawer
          variant="temporary"
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
            display: { xs: "block", sm: "none" },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
