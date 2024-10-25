import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

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

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Enhanced validation functions
  const validateName = (name) => {
    const nameRegex = /^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]{2,50}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9\s-()]{10,20}$/;
    return phoneRegex.test(phone);
  };

  const validateDate = (startDate, endDate, current) => {
    if (!startDate) return false;
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if start date is not in the future
    if (start > today) return false;

    // If current is true or endDate is empty, no need to validate end date
    if (current || !endDate) return true;

    const end = new Date(endDate);
    return start <= end;
  };

  const validateDescription = (description) => {
    return description.length <= 1000 && description.length >= 10;
  };

  const validateSchool = (school) => {
    return school.length >= 2 && school.length <= 100;
  };

  const validateDegree = (degree) => {
    return degree.length >= 2 && degree.length <= 100;
  };

  const validateCompany = (company) => {
    return company.length >= 2 && company.length <= 100;
  };

  const validatePosition = (position) => {
    return position.length >= 2 && position.length <= 100;
  };

  const showSnackbar = (message, severity = "error") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Personal Information Validation
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (!validateName(formData.fullName)) {
      newErrors.fullName =
        "Please enter a valid name (2-50 characters, letters only)";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Education Validation
    formData.education.forEach((edu, index) => {
      if (!edu.school) {
        newErrors[`education_${index}_school`] = "School name is required";
        isValid = false;
      } else if (!validateSchool(edu.school)) {
        newErrors[`education_${index}_school`] =
          "School name must be between 2 and 100 characters";
        isValid = false;
      }

      if (!edu.degree) {
        newErrors[`education_${index}_degree`] = "Degree is required";
        isValid = false;
      } else if (!validateDegree(edu.degree)) {
        newErrors[`education_${index}_degree`] =
          "Degree must be between 2 and 100 characters";
        isValid = false;
      }

      if (!edu.startDate) {
        newErrors[`education_${index}_startDate`] = "Start date is required";
        isValid = false;
      } else if (!validateDate(edu.startDate, edu.endDate, edu.current)) {
        newErrors[`education_${index}_dates`] =
          "Invalid date range or future start date";
        isValid = false;
      }
    });

    // Experience Validation
    formData.experience.forEach((exp, index) => {
      if (!exp.company) {
        newErrors[`experience_${index}_company`] = "Company name is required";
        isValid = false;
      } else if (!validateCompany(exp.company)) {
        newErrors[`experience_${index}_company`] =
          "Company name must be between 2 and 100 characters";
        isValid = false;
      }

      if (!exp.position) {
        newErrors[`experience_${index}_position`] = "Position is required";
        isValid = false;
      } else if (!validatePosition(exp.position)) {
        newErrors[`experience_${index}_position`] =
          "Position must be between 2 and 100 characters";
        isValid = false;
      }

      if (!exp.startDate) {
        newErrors[`experience_${index}_startDate`] = "Start date is required";
        isValid = false;
      } else if (!validateDate(exp.startDate, exp.endDate, exp.current)) {
        newErrors[`experience_${index}_dates`] =
          "Invalid date range or future start date";
        isValid = false;
      }

      if (exp.description && !validateDescription(exp.description)) {
        newErrors[`experience_${index}_description`] =
          "Description must be between 10 and 1000 characters";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Enhanced form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation for personal information
    if (name === "fullName" && value && !validateName(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Please enter a valid name (2-50 characters, letters only)",
      }));
    } else if (name === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Please enter a valid email address",
      }));
    } else if (name === "phone" && value && !validatePhone(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Please enter a valid phone number",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEducationChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value,
              // Clear end date if current is checked
              ...(field === "current" && value ? { endDate: "" } : {}),
            }
          : edu
      ),
    }));

    // Clear related error when field is updated
    setErrors((prev) => ({
      ...prev,
      [`education_${id}_${field}`]: "",
      [`education_${id}_dates`]: "",
    }));
  };

  const handleExperienceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
              // Clear end date if current is checked
              ...(field === "current" && value ? { endDate: "" } : {}),
            }
          : exp
      ),
    }));

    // Clear related error when field is updated
    setErrors((prev) => ({
      ...prev,
      [`experience_${id}_${field}`]: "",
      [`experience_${id}_dates`]: "",
    }));
  };

  const addEducation = () => {
    if (formData.education.length >= 5) {
      showSnackbar("Maximum 5 education entries allowed", "warning");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          current: false,
          id: Date.now(),
        },
      ],
    }));
  };

  const addExperience = () => {
    if (formData.experience.length >= 10) {
      showSnackbar("Maximum 10 experience entries allowed", "warning");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          id: Date.now(),
        },
      ],
    }));
  };

  const handleSave = () => {
    if (validateForm()) {
      showSnackbar("CV saved successfully!", "success");
      console.log("Form data:", formData);
    } else {
      showSnackbar("Please fix the form errors before saving", "error");
    }
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

  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh", py: 4 }}>
      <Container>
        {/* Header */}
        <StyledPaper>
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
        </StyledPaper>

        {!previewMode ? (
          // Edit Mode
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Personal Information */}
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

            {/* Education Section */}
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">
                        Education #{index + 1}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => removeEducation(edu.id)}
                      >
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
                            handleEducationChange(
                              edu.id,
                              "school",
                              e.target.value
                            )
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
                            handleEducationChange(
                              edu.id,
                              "degree",
                              e.target.value
                            )
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
                            handleEducationChange(
                              edu.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ max: getCurrentDate() }}
                          error={
                            !!errors[`education_${edu.id}_startDate`] ||
                            !!errors[`education_${edu.id}_dates`]
                          }
                          helperText={
                            errors[`education_${edu.id}_startDate`] ||
                            errors[`education_${edu.id}_dates`]
                          }
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="End Date"
                          type="date"
                          value={edu.endDate}
                          onChange={(e) =>
                            handleEducationChange(
                              edu.id,
                              "endDate",
                              e.target.value
                            )
                          }
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ max: getCurrentDate() }}
                          disabled={edu.current}
                          error={!!errors[`education_${edu.id}_dates`]}
                          helperText={errors[`education_${edu.id}_dates`]}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={edu.current}
                              onChange={(e) =>
                                handleEducationChange(
                                  edu.id,
                                  "current",
                                  e.target.checked
                                )
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

            {/* Experience Section */}
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">
                        Experience #{index + 1}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => removeExperience(exp.id)}
                      >
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
                            handleExperienceChange(
                              exp.id,
                              "company",
                              e.target.value
                            )
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
                            handleExperienceChange(
                              exp.id,
                              "position",
                              e.target.value
                            )
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
                            handleExperienceChange(
                              exp.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ max: getCurrentDate() }}
                          error={
                            !!errors[`experience_${exp.id}_startDate`] ||
                            !!errors[`experience_${exp.id}_dates`]
                          }
                          helperText={
                            errors[`experience_${exp.id}_startDate`] ||
                            errors[`experience_${exp.id}_dates`]
                          }
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
                            handleExperienceChange(
                              exp.id,
                              "endDate",
                              e.target.value
                            )
                          }
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ max: getCurrentDate() }}
                          disabled={exp.current}
                          error={!!errors[`experience_${exp.id}_dates`]}
                          helperText={errors[`experience_${exp.id}_dates`]}
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
                            handleExperienceChange(
                              exp.id,
                              "description",
                              e.target.value
                            )
                          }
                          error={!!errors[`experience_${exp.id}_description`]}
                          helperText={
                            errors[`experience_${exp.id}_description`]
                          }
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save CV
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => {
                  if (validateForm()) {
                    showSnackbar("Downloading CV...", "info");
                  } else {
                    showSnackbar(
                      "Please fix the form errors before downloading",
                      "error"
                    );
                  }
                }}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        ) : (
          // Preview Mode
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ maxWidth: "48rem", mx: "auto" }}>
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography variant="h3" gutterBottom>
                    {formData.fullName || "Your Name"}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                  >
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
                          <Typography variant="subtitle1">
                            {edu.degree}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {edu.startDate} -{" "}
                            {edu.current ? "Present" : edu.endDate}
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
                            {exp.startDate} -{" "}
                            {exp.current ? "Present" : exp.endDate}
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
        )}

        {/* Error Snackbar */}
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
      </Container>
    </Box>
  );
};

export default CVBuilder;
