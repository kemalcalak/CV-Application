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

const ExperienceSection = ({
  formData,
  addExperience,
  removeExperience,
  handleExperienceChange,
  errors,
}) => (
  <Card>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Experience</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addExperience}
        >
          Add Experience
        </Button>
      </Box>
      {formData.experience.map((exp, index) => (
        <Paper key={exp.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Experience #{index + 1}</Typography>
            <IconButton color="error" onClick={() => removeExperience(exp.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "company", e.target.value)
                }
                error={!!errors[`experience_${exp.id}_company`]}
                helperText={errors[`experience_${exp.id}_company`]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position"
                value={exp.position}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "position", e.target.value)
                }
                error={!!errors[`experience_${exp.id}_position`]}
                helperText={errors[`experience_${exp.id}_position`]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "startDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                error={!!errors[`experience_${exp.id}_startDate`]}
                helperText={errors[`experience_${exp.id}_startDate`]}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "endDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                disabled={exp.current}
                error={!!errors[`experience_${exp.id}_endDate`]}
                helperText={errors[`experience_${exp.id}_endDate`]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exp.current}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "current",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Currently working here"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={exp.description}
                onChange={(e) =>
                  handleExperienceChange(exp.id, "description", e.target.value)
                }
                error={!!errors[`experience_${exp.id}_description`]}
                helperText={errors[`experience_${exp.id}_description`]}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </CardContent>
  </Card>
);

export default ExperienceSection;
