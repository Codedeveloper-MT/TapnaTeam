import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Themisa Skosana",
    tagline: "BSc Student | Full-Stack Developer | Coffee Drinker",
    about:
      "I'm a computer science student passionate about creating innovative solutions. I enjoy coding, solving problems, and making technology accessible. When not programming, you'll find me enjoying cheesy dishes or exploring tech trends.",
    skills: "JavaScript, HTML, CSS, React",
  });

  const [editableData, setEditableData] = useState(profileData);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditableData(profileData); // We will reset unsaved changes
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

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar src="public\myPic.jpg" alt="User Profile" />
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
          <h2>About Me</h2>
          {isEditing ? (
            <textarea
              name="about"
              value={editableData.about}
              onChange={handleChange}
              rows="4"
            />
          ) : (
            <p>{profileData.about}</p>
          )}
          <h2>Skills</h2>
          {isEditing ? (
            <textarea
              name="skills"
              value={editableData.skills}
              onChange={handleChange}
              rows="2"
            />
          ) : (
            <p>{profileData.skills}</p>
          )}
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
  border-radius: 6px;
  max-width: 600px;
  width: 100%;
  padding: 20px;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileAvatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const ProfileName = styled.h1`
  font-size: 1.5rem;
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
    padding: 10px;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${(props) => (props.primary ? "#2ea44f" : "#d1d5da")};
  color: ${(props) => (props.primary ? "#fff" : "#24292e")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "#22863a" : "#c6ced6")};
  }
`;

export default UserProfile;
