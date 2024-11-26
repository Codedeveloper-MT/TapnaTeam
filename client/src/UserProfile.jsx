import React, { useState } from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Themisa Skosana",
    tagline: "BSc Student | Full-Stack Developer | Coffee Enthusiast",
    about:
      "I'm a passionate computer science student who thrives on solving real-world problems through innovative technology. When I'm not coding, you can find me enjoying a cup of coffee or diving into the latest tech trends. I'm driven to make technology more accessible and impactful.",
    skills: "JavaScript, HTML, CSS, React, Node.js, Python",
    email: "themisa.skosana@example.com",
    phone: "+27 123 456 7890",
    avatar: "public/myPic.jpg",
  });

  const [editableData, setEditableData] = useState(profileData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditableData(profileData);
    }
  };

  const handleSaveClick = () => {
    setProfileData(editableData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, avatar: URL.createObjectURL(file) });
    }
  };

  const handleFileClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar src={profileData.avatar} alt="User Profile" />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editableData.name}
                onChange={handleChange}
              />
            ) : (
              <ProfileName>{profileData.name}</ProfileName>
            )}
            {isEditing ? (
              <input
                type="text"
                name="tagline"
                value={editableData.tagline}
                onChange={handleChange}
              />
            ) : (
              <ProfileTagline>{profileData.tagline}</ProfileTagline>
            )}
          </div>
        </ProfileHeader>
        <ProfileDetails>
          <SectionTitle>About Me</SectionTitle>
          {isEditing ? (
            <textarea
              name="about"
              value={editableData.about}
              onChange={handleChange}
              rows="4"
            />
          ) : (
            <ProfileText>{profileData.about}</ProfileText>
          )}

          <SectionTitle>Skills</SectionTitle>
          {isEditing ? (
            <textarea
              name="skills"
              value={editableData.skills}
              onChange={handleChange}
              rows="2"
            />
          ) : (
            <ProfileText>{profileData.skills}</ProfileText>
          )}

          <SectionTitle>Contact Information</SectionTitle>
          <ProfileText>
            <strong>Email:</strong> {profileData.email}
          </ProfileText>
          <ProfileText>
            <strong>Phone:</strong> {profileData.phone}
          </ProfileText>

          <SectionTitle>Change Profile Picture</SectionTitle>
          <ProfileText>
            <Label onClick={handleFileClick}>Choose Photo</Label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </ProfileText>
        </ProfileDetails>

        <ButtonGroup>
          {isEditing ? (
            <>
              <Button onClick={handleEditClick}>Cancel</Button>
              <Button primary onClick={handleSaveClick}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button primary onClick={handleEditClick}>
              Edit Profile
            </Button>
          )}
        </ButtonGroup>
      </ProfileCard>
    </ProfileContainer>
  );
};

// Styling
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f6f8;
  font-family: "Arial", sans-serif;
`;

const ProfileCard = styled.div`
  background: #fff;
  border: 1px solid #d1d5da;
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
  padding: 30px;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileAvatar = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-right: 20px;
  border: 3px solid #2ea44f;
`;

const ProfileName = styled.h1`
  font-size: 1.8rem;
  color: #24292e;
`;

const ProfileTagline = styled.p`
  color: #586069;
  margin-top: 5px;
`;

const ProfileDetails = styled.div`
  margin-top: 20px;

  h2 {
    font-size: 1.2rem;
    color: #24292e;
    margin-bottom: 10px;
  }

  textarea,
  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 12px;
    border: 1px solid #d1d5da;
    border-radius: 6px;
    font-size: 1rem;
  }

  p {
    font-size: 1rem;
    color: #586069;
    margin: 5px 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #24292e;
  margin-top: 20px;
`;

const ProfileText = styled.p`
  font-size: 1rem;
  color: #586069;
`;

const Label = styled.label`
  color: #2ea44f;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  &:hover {
    color: #22863a;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#2ea44f" : "#f6f8fa")};
  color: ${(props) => (props.primary ? "#fff" : "#24292f")};

  &:hover {
    background-color: ${(props) => (props.primary ? "#22863a" : "#c6ced6")};
  }
`;

export default UserProfile;
