import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import Header from "../components/Header";
import PersonalInformationForm from "../components/PersonalInformationForm";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import PreviewMode from "../components/PreviewMode";
import SnackbarAlert from "../components/SnackbarAlert";
import html2pdf from "html2pdf.js";

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

  useEffect(() => {
    const savedData = localStorage.getItem("cvData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const validateName = (name) => /^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]{2,50}$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[0-9\s-()]{10,20}$/.test(phone);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation
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

    // Date validation for education
    if (field === "endDate") {
      const selectedStartDate = formData.education.find((edu) => edu.id === id)?.startDate;
      if (selectedStartDate && new Date(value) < new Date(selectedStartDate)) {
        setErrors((prev) => ({
          ...prev,
          [`education_${id}_endDate`]: "End date cannot be before start date.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [`education_${id}_endDate`]: "",
        }));
      }
    }
  };

  const handleExperienceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));

    // Date validation for experience
    if (field === "endDate") {
      const selectedStartDate = formData.experience.find((exp) => exp.id === id)?.startDate;
      if (selectedStartDate && new Date(value) < new Date(selectedStartDate)) {
        setErrors((prev) => ({
          ...prev,
          [`experience_${id}_endDate`]: "End date cannot be before start date.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [`experience_${id}_endDate`]: "",
        }));
      }
    }
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          current: false,
        },
      ],
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
    // Clear any related errors
    const newErrors = { ...errors };
    delete newErrors[`education_${id}_endDate`];
    setErrors(newErrors);
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
    // Clear any related errors
    const newErrors = { ...errors };
    delete newErrors[`experience_${id}_endDate`];
    setErrors(newErrors);
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    // Validate for any existing errors
    if (Object.keys(errors).some(key => errors[key])) {
      setSnackbar({
        open: true,
        message: "Please fix all errors before saving.",
        severity: "error",
      });
      return;
    }

    try {
      localStorage.setItem("cvData", JSON.stringify(formData));
      setSnackbar({
        open: true,
        message: "CV saved successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving CV:", error);
      setSnackbar({
        open: true,
        message: "Error saving CV. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDownload = async () => {
    try {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setSnackbar({ 
          open: true, 
          message: "Please fill in all required fields before downloading.", 
          severity: "error" 
        });
        return;
      }

      setPreviewMode(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const element = document.getElementById("cv-preview");
      
      if (!element) {
        throw new Error("Preview element not found");
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${formData.fullName.replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          windowWidth: element.offsetWidth
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      };

      setSnackbar({ 
        open: true, 
        message: "Preparing your CV for download...", 
        severity: "info" 
      });

      await html2pdf().set(opt).from(element).save();

      setSnackbar({ 
        open: true, 
        message: "CV downloaded successfully!", 
        severity: "success" 
      });

    } catch (error) {
      console.error("PDF download error:", error);
      setSnackbar({ 
        open: true, 
        message: "Error downloading PDF. Please try again.", 
        severity: "error" 
      });
    } finally {
      setPreviewMode(false);
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
              <Button 
                variant="contained" 
                onClick={handleDownload}
                disabled={!formData.fullName || !formData.email || !formData.phone}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        ) : (
          <div id="cv-preview">
            <PreviewMode formData={formData} />
          </div>
        )}
        <SnackbarAlert snackbar={snackbar} setSnackbar={setSnackbar} />
      </Container>
    </Box>
  );
};

export default CVBuilder;