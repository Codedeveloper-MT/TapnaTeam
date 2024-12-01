/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Styled components using Emotion
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
`;

const InputField = styled.input`
  height: 40px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  padding: 0 8px;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  height: 100px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
`;

const Button = styled.input`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  display: block;
`;

const TaskCreation = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      .then(
        () => {
          console.log('SUCCESS! Email sent successfully.');
        },
        (error) => {
          console.log('FAILED... Email sending failed.', error.text);
        },
      );
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1>Task Creation</h1>
      <form ref={form} onSubmit={sendEmail}>
        <Label>Name</Label>
        <InputField type="text" name="user_name" placeholder="Enter your name" required />

        <Label>Email</Label>
        <InputField type="email" name="user_email" placeholder="Enter your email" required />

        <Label>Message</Label>
        <TextArea name="message" placeholder="Enter your message" required></TextArea>

        <Button type="submit" value="Send" />
      </form>
    </Container>
  );
};

export default TaskCreation;
