/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  color: #333;
  margin: 0;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dc3545;
  color: white;
  padding: 15px;
  font-size: 1.5em;
  font-weight: bold;
  flex-shrink: 0;
`;

const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 0 15px 15px 15px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SenderName = styled.div`
  font-size: 0.9em;
  color: #555;
  font-weight: bold;
`;

const Message = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ sender }) => (sender === 'user' ? '#dcf8c6' : '#fff0f0')};
  max-width: 60%;
  align-self: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  margin: 5px 0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  border: ${({ sender }) => (sender === 'user' ? '1px solid #28a745' : '1px solid #dc3545')};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: ${({ sender }) => (sender === 'user' ? 'calc(100% + 5px)' : '-15px')};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: ${({ sender }) => (sender === 'user' ? '10px solid #28a745' : '10px solid #dc3545')};
  }
`;

const InputAreaContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
`;

const InputArea = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
`;

const Button = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 15px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const FilePreview = styled.div`
  margin-top: 10px;
  max-width: 200px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 8px 12px;
  font-size: 1em;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 5px;

  &:hover {
    background-color: #218838;
  }
`;

function CollaborationTools() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [files, setFiles] = useState([]);

  const handleSendMessage = () => {
    if (messageText.trim() || files.length > 0) {
      const newMessage = { sender: 'user', text: messageText, senderName: 'You' }; 

      // Add message text if available
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Add files if available
      if (files.length > 0) {
        files.forEach((file) => {
          const fileMessage = { sender: 'user', text: `Shared file: ${file.name}`, file, senderName: 'You' };
          setMessages((prevMessages) => [...prevMessages, fileMessage]);
        });
      }

      // Clear the input fields after sending
      setMessageText('');
      setFiles([]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles([...files, file]);
    }
  };

  const renderFilePreview = (file) => {
    const fileType = file.type.split('/')[0];
    const fileUrl = URL.createObjectURL(file); 

    if (fileType === 'image') {
      return (
        <FilePreview>
          <ImagePreview src={fileUrl} alt={file.name} />
          <DownloadButton href={fileUrl} download={file.name}>
            Download
          </DownloadButton>
        </FilePreview>
      );
    } else if (fileType === 'application' && file.type.includes('pdf')) {
      return (
        <FilePreview>
          <iframe
            src={fileUrl}
            title={file.name}
            width="100%"
            height="200px"
            style={{ border: 'none' }}
          />
          <DownloadButton href={fileUrl} download={file.name}>
            Download
          </DownloadButton>
        </FilePreview>
      );
    } else {
      return (
        <FilePreview>
          <span>{file.name}</span>
          <DownloadButton href={fileUrl} download={file.name}>
            Download
          </DownloadButton>
        </FilePreview>
      );
    }
  };

  return (
    <Container>
      <Header>Collaboration Tools</Header>
      <ChatBox>
        {messages.map((msg, index) => (
          <MessageContainer key={index}>
            <SenderName>{msg.senderName}:</SenderName> 
            <Message sender={msg.sender}>{msg.text}</Message>
            {msg.file && renderFilePreview(msg.file)}
          </MessageContainer>
        ))}
      </ChatBox>
      <InputAreaContainer>
        <InputArea
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSendMessage}>Send</Button>
        <Button as="label">
          Attach
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Button>
      </InputAreaContainer>
    </Container>
  );
}

export default CollaborationTools;
