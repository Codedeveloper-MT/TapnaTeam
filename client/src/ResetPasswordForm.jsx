/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

// Styled Components for Reset Password Form
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensures container takes full height of viewport */
  width: 100%;
  background-color: #f0f0f0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  margin-top: 15px;
  font-size: 0.9rem;
  color: #333;
`;

const ResetPasswordForm = () => {
  return (
    <Container>
      <Logo>
        OT
        <br />
        Tapna Team
      </Logo>
      <InputField type="email" placeholder="E-mail Address" />
      <Button>Reset Password</Button>
      <LinkContainer>
        <p>Already have an account?</p>
        {/* Link to Login Page */}
        <Link to="/" style={{ color: "#6c63ff", textDecoration: "none" }}>
          Log In
        </Link>
      </LinkContainer>
    </Container>
  );
};

export default ResetPasswordForm;
