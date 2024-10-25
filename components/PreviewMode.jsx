import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const PreviewMode = ({ formData }) => (
  <Card id="cv-preview">
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
