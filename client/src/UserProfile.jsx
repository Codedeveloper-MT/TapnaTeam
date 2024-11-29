import React, { useState } from "react";
import styled from "@emotion/styled";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    about: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(true); // Show edit page initially for new users

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, avatar: URL.createObjectURL(file) });
    }
  };

  return (
    <ProfileContainer>
      {isEditing ? (
        <ProfileCard>
          <ProfileHeader>
            <ProfileAvatar
              src={profileData.avatar || "https://via.placeholder.com/100"}
              alt="Profile Avatar"
            />
            <input type="file" onChange={handleImageChange} />
          </ProfileHeader>
          <InputField
            type="text"
            name="name"
            placeholder="First Name"
            value={profileData.name}
            onChange={handleInputChange}
          />
          <InputField
            type="text"
            name="surname"
            placeholder="Surname"
            value={profileData.surname}
            onChange={handleInputChange}
          />
          <SectionTitle>About Me</SectionTitle>
          <TextArea
            name="about"
            placeholder="Write something about yourself..."
            value={profileData.about}
            onChange={handleInputChange}
          />
          <SectionTitle>Contact Information</SectionTitle>
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={profileData.email}
            onChange={handleInputChange}
          />
          <InputField
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={profileData.phone}
            onChange={handleInputChange}
          />
          <ButtonGroup>
            <Button onClick={handleSaveChanges} primary>
              Save Changes
            </Button>
          </ButtonGroup>
        </ProfileCard>
      ) : (
        <ProfileCard>
          <ProfileHeader>
            <ProfileAvatar
              src={profileData.avatar || "https://via.placeholder.com/100"}
              alt="Profile Avatar"
            />
            <ProfileName>
              {profileData.name} {profileData.surname}
            </ProfileName>
          </ProfileHeader>
          <ProfileDetails>
            <SectionTitle>About Me</SectionTitle>
            <ProfileText>
              {profileData.about || "No information provided"}
            </ProfileText>
            <SectionTitle>Contact Information</SectionTitle>
            <ProfileText>
              <strong>Email:</strong> {profileData.email || "No email provided"}
            </ProfileText>
            <ProfileText>
              <strong>Phone:</strong>{" "}
              {profileData.phone || "No phone number provided"}
            </ProfileText>
          </ProfileDetails>
          <ButtonGroup>
            <Button onClick={handleEditClick} primary>
              Edit Profile
            </Button>
          </ButtonGroup>
        </ProfileCard>
      )}
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9f9f9;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileAvatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 2px solid #007acc;
  margin-bottom: 10px;
`;

const ProfileName = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const ProfileDetails = styled.div`
  text-align: left;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #007acc;
  margin-top: 20px;
`;

const ProfileText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#007acc" : "#ccc")};
  color: white;

  &:hover {
    background-color: ${(props) => (props.primary ? "#005fa3" : "#aaa")};
  }
`;

export default UserProfile;
