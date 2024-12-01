/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: '',
    email: '',
    photos: '',
  });

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const fetchUserProfile = () => {
    fetch(`http://localhost:5002/profile/${username}`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEditData({
          displayName: data.displayName,
          email: data.email,
          photos: data.photos?.[0]?.value || '',
        });
      })
      .catch((err) => console.error('Error fetching user profile:', err));
  };

  const saveUserProfile = () => {
    fetch(`http://localhost:5002/profile/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then(() => {
        setUser(editData);
        setIsEditing(false);
      })
      .catch((err) => console.error('Error saving user profile:', err));
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  if (!user) {
    return (
      <div>
        <h2>Enter a GitHub Username:</h2>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="GitHub Username"
        />
        <button onClick={fetchUserProfile}>Fetch Profile</button>
      </div>
    );
  }

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>Profile: {user.displayName}</h1>
      <h2 css={styles.username}>Username: {user.username}</h2>
      <img
        src={user.photos?.[0]?.value || 'default-image-url'}
        alt="Profile"
        css={styles.image}
      />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editData.displayName}
            onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
            placeholder="Display Name"
          />
          <input
            type="email"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={editData.photos}
            onChange={(e) => setEditData({ ...editData, photos: e.target.value })}
            placeholder="Profile Photo URL"
          />
          <button onClick={saveUserProfile}>Save Changes</button>
        </div>
      ) : (
        <p css={styles.email}>Email: {user.email}</p>
      )}
      <button onClick={toggleEditMode}>
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
    </div>
  );
};

const styles = {
  container: css`
    text-align: center;
    margin: 20px;
  `,
  title: css`
    font-size: 2em;
    color: #333;
  `,
  username: css`
    font-size: 1.5em;
    color: #666;
  `,
  image: css`
    border-radius: 50%;
    width: 150px;
    height: 150px;
  `,
  email: css`
    font-size: 1.2em;
    color: #666;
  `,
};

export default UserProfile;
