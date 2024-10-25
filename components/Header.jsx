import React from "react";
import { Box, Typography, FormControlLabel, Switch } from "@mui/material";

const Header = ({ previewMode, setPreviewMode }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box>
      <Typography variant="h4" gutterBottom>
        CV Builder
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Create your professional CV in minutes
      </Typography>
    </Box>
    <FormControlLabel
      control={
        <Switch
          checked={previewMode}
          onChange={() => setPreviewMode(!previewMode)}
        />
      }
      label={previewMode ? "Edit Mode" : "Preview Mode"}
    />
  </Box>
);

export default Header;
