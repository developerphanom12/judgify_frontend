import React, { useState } from "react";
import styled from "styled-components";

export const Test = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Store uploaded image preview.

  // Handle file upload and preview generation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Set the uploaded image preview
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };
  return (
    <Root>
      <div className="myevent_img">
        {/* File input */}
        <input
          type="file"
          className="file_input"
          name="event_logo"
          onChange={handleFileChange}
          accept="image/*" // Restrict to image files only
        />
        <p>Browse File</p>

        {/* Show image immediately when uploaded */}

        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="Uploaded Preview"
              className="preview_img"
              style={{ maxWidth: "300px", marginTop: "10px" }}
            />
          </div>
        )}
        
      </div>
    </Root>
  );
};
const Root = styled.section`
  .myevent_img {
    text-align: center;
    margin: 20px;
  }

  .preview_img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ccc;
    padding: 5px;
    margin-top: 10px;
  }

  .file_input {
    margin: 10px 0;
  }
`;
