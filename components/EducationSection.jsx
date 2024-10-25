import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  IconButton,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";


const today = new Date().toISOString().split("T")[0];

const EducationSection = ({
  formData,
  addEducation,
  removeEducation,
  handleEducationChange,
  errors,
}) => (
  <Card>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Education</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addEducation}
        >
          Add Education
        </Button>
      </Box>
      {formData.education.map((edu, index) => (
        <Paper key={edu.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Education #{index + 1}</Typography>
            <IconButton color="error" onClick={() => removeEducation(edu.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="School"
                value={edu.school}
                onChange={(e) =>
                  handleEducationChange(edu.id, "school", e.target.value)
                }
                error={!!errors[`education_${edu.id}_school`]}
                helperText={errors[`education_${edu.id}_school`]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(edu.id, "degree", e.target.value)
                }
                error={!!errors[`education_${edu.id}_degree`]}
                helperText={errors[`education_${edu.id}_degree`]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={edu.startDate}
                onChange={(e) =>
                  handleEducationChange(edu.id, "startDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                error={!!errors[`education_${edu.id}_startDate`]}
                helperText={errors[`education_${edu.id}_startDate`]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
  fullWidth
  label="End Date"
  type="date"
  value={edu.endDate}
  onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
  InputLabelProps={{ shrink: true }}
  inputProps={{ max: today }}  
  disabled={edu.current}  
  error={!!errors[`education_${edu.id}_endDate`]}
  helperText={errors[`education_${edu.id}_endDate`]}
/>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={edu.current}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "current", e.target.checked)
                    }
                  />
                }
                label="Currently studying here"
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </CardContent>
  </Card>
);

export default EducationSection;
