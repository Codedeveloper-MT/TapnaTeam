/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Section = styled.div`
  flex: 1;
  max-width: 500px;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  margin: 15px 0;
`;

const EventCard = styled.div`
  padding: 15px;
  background-color: #f1f1f1;
  border-radius: 8px;
  margin-top: 20px;
`;

const Info = styled.p`
  color: #555;
  font-size: 14px;
  margin: 5px 0;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

    span {
      color: #007bff;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const FileSchedule = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [eventDetails, setEventDetails] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEventChange = (e) => {
    setEventDetails(e.target.value);
  };

  const handleUploadFile = () => {
    if (file) {
      setFiles([...files, file]);
      setFile(null);
      alert("File Uploaded: " + file.name);
    } else {
      alert("No file selected");
    }
  };

  const handleDownloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Section>
        <Link to="/admin">Back</Link>
        <Title>
          <FaUsers /> Event Management
        </Title>
        <Textarea
          placeholder="Enter Event Details"
          value={eventDetails}
          onChange={handleEventChange}
        />
        <FileInput type="file" onChange={handleFileChange} />
        <Button onClick={handleUploadFile} disabled={!file}>
          Upload File
        </Button>
      </Section>

      <Section>
        <h3>Event Details</h3>
        <EventCard>
          <Info>{eventDetails || "No details entered yet."}</Info>
        </EventCard>
        <h3>Uploaded Files ({files.length})</h3>
        {files.length > 0 ? (
          <FileList>
            {files.map((f, index) => (
              <li key={index}>
                {f.name}{" "}
                <span onClick={() => handleDownloadFile(f)}>Download</span>
              </li>
            ))}
          </FileList>
        ) : (
          <Info>No files uploaded yet.</Info>
        )}
      </Section>
    </Container>
  );
};

export default FileSchedule;
