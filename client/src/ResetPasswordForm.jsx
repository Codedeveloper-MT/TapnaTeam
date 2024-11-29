import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate replaces useHistory
import axios from "axios";
import styled from "@emotion/styled";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate replaces useHistory
  const { token } = useParams(); // Get token from URL

  // Handle password reset request
  const handleResetRequest = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await axios.post(
        `http://localhost:5002/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/login"); // Use navigate to redirect to login page
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <Container>
      <Logo>TT</Logo>
      <Heading>Reset Password</Heading>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleResetRequest}>
        <InputField
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      <LinkContainer>
        <p>Remember your password?</p>
        <Link to="/login">Log In</Link>
      </LinkContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: blue;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  max-width: 350px;
  margin-bottom: 15px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: blue;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    background-color: grey;
  }
`;

const SuccessMessage = styled.div`
  color: green;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Link = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export default ResetPasswordForm;
