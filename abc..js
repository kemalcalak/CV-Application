Components
    EducationSection.jsx
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
  Snackbar,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ExperienceSection from "./components/ExperienceSection";

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
        <Button variant="contained" startIcon={<AddIcon />} onClick={addEducation}>
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
                onChange={(e) => handleEducationChange(edu.id, "school", e.target.value)}
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
                onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
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
                onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
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
                    onChange={(e) => handleEducationChange(edu.id, "current", e.target.checked)}
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

ExperienceSection.jsx
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
        <Button variant="contained" startIcon={<AddIcon />} onClick={addExperience}>
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
                onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
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
                onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
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
                onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
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
                onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
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
                    onChange={(e) => handleExperienceChange(exp.id, "current", e.target.checked)}
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
                onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
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
Header.jsx 
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
PersonelInformationForm.jsx
import React from "react";
import { Card, CardContent, Typography, Grid, TextField } from "@mui/material";

const PersonalInformationForm = ({ formData, handleInputChange, errors }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default PersonalInformationForm;

PreviewMode.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const PreviewMode = ({ formData }) => (
  <Card>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ maxWidth: "48rem", mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            {formData.fullName || "Your Name"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {formData.email && (
              <Typography variant="body1" color="text.secondary">
                📧 {formData.email}
              </Typography>
            )}
            {formData.phone && (
              <Typography variant="body1" color="text.secondary">
                📱 {formData.phone}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Education Section */}
        {formData.education.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
            >
              Education
            </Typography>
            <Box sx={{ mt: 2 }}>
              {formData.education.map((edu) => (
                <Box key={edu.id} sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {edu.school}
                  </Typography>
                  <Typography variant="subtitle1">{edu.degree}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Experience Section */}
        {formData.experience.length > 0 && (
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
            >
              Experience
            </Typography>
            <Box sx={{ mt: 2 }}>
              {formData.experience.map((exp) => (
                <Box key={exp.id} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {exp.position}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {exp.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Typography>
                  {exp.description && (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {exp.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default PreviewMode;

Snackbar.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import CVBuilder from "./src/CVBuilder";

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


src/CVBuilder.jsx
import React, { useState } from "react";
import { Container, Box, Button } from "@mui/material";
import Header from "../components/Header";
import PersonalInformationForm from "../components/PersonalInformationForm";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import PreviewMode from "../components/PreviewMode";
import SnackbarAlert from "../components/SnackbarAlert";

const CVBuilder = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: [],
    experience: [],
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Validation functions
  const validateName = (name) => /^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]{2,50}$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[0-9\s-()]{10,20}$/.test(phone);
  const validateField = (value, minLength, maxLength) => value.length >= minLength && value.length <= maxLength;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "fullName" && !validateName(value)) {
      setErrors((prev) => ({ ...prev, fullName: "Invalid name (2-50 characters)" }));
    } else if (name === "email" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else if (name === "phone" && !validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: "Invalid phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleEducationChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleExperienceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), school: "", degree: "", startDate: "", endDate: "", current: false },
      ],
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" },
      ],
    }));
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleSave = () => {
    if (formData.fullName && formData.email && formData.phone) {
      setSnackbar({ open: true, message: "CV saved successfully!", severity: "success" });
    } else {
      setSnackbar({ open: true, message: "Please fill out all fields correctly.", severity: "error" });
    }
  };

  const handleDownload = () => {
    if (formData.fullName && formData.email && formData.phone) {
      setSnackbar({ open: true, message: "Downloading CV...", severity: "info" });
    } else {
      setSnackbar({ open: true, message: "Please fix errors before downloading.", severity: "error" });
    }
  };

  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", py: 4 }}>
      <Container>
        <Header previewMode={previewMode} setPreviewMode={setPreviewMode} />
        {!previewMode ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <PersonalInformationForm
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
            <EducationSection
              formData={formData}
              addEducation={addEducation}
              removeEducation={removeEducation}
              handleEducationChange={handleEducationChange}
              errors={errors}
            />
            <ExperienceSection
              formData={formData}
              addExperience={addExperience}
              removeExperience={removeExperience}
              handleExperienceChange={handleExperienceChange}
              errors={errors}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="contained" color="success" onClick={handleSave}>
                Save CV
              </Button>
              <Button variant="contained" onClick={handleDownload}>
                Download PDF
              </Button>
            </Box>
          </Box>
        ) : (
          <PreviewMode formData={formData} />
        )}
        <SnackbarAlert snackbar={snackbar} setSnackbar={setSnackbar} />
      </Container>
    </Box>
  );
};

export default CVBuilder;

