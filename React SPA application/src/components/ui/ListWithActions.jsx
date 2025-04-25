import AlignItemsList from "./AlignItemsList";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function ListWithActions(props) {
  const { type } = props;
  const title = type.charAt(0).toUpperCase() + type.slice(1) + "s";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: "20px",
          my: 2,
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/${type}/new`}
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            textTransform: "none",
            fontWeight: "bold",
            py: 1,
          }}
        >
          Add new {type}
        </Button>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <AlignItemsList type={type} />
      </Box>
    </Box>
  );
}
