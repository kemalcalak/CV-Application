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

    // Tarih doğrulama
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
      localStorage.setItem("cvData", JSON.stringify(formData));
      setSnackbar({ open: true, message: "CV successfully registered!", severity: "success" });
    } else {
      setSnackbar({ open: true, message: "Please fill in all fields correctly.", severity: "error" });
    }
  };

  const handleDownload = () => {
    if (formData.fullName && formData.email && formData.phone) {
      const element = document.getElementById("cv-preview");
      
      html2pdf()
        .from(element)
        .set({
          margin: 0.5,
          filename: `${formData.fullName}_CV.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, logging: true, useCORS: true },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
        })
        .save();
  
      setSnackbar({ open: true, message: "Downloading CV...", severity: "info" });
    } else {
      setSnackbar({ open: true, message: "Please fill in all fields before downloading.", severity: "error" });
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
