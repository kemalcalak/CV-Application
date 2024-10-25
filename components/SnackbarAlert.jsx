import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ snackbar, setSnackbar }) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert
      onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      severity={snackbar.severity}
      variant="filled"
    >
      {snackbar.message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
