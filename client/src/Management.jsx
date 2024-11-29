/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  color: blue;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 200px;
`;

const Button = styled.button`
  background-color: blue;
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

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px;
  border-radius: 8px;
  max-width: 300px;
  flex: 1;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 10px;
  }
`;

const Info = styled.p`
  color: #555;
  font-size: 14px;
  margin: 5px 0;
`;

const Contributor = styled.div`
  background-color: #f1f1f1;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Management = () => {
  const [username, setUsername] = useState('');
  const [repository, setRepository] = useState('');
  const [repoData, setRepoData] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);

  const handleFindData = async () => {
    if (username && repository) {
      const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repository}`);
      const repoData = await repoResponse.json();
      setRepoData(repoData);

      const contributorsResponse = await fetch(`https://api.github.com/repos/${username}/${repository}/contributors`);
      const contributorsData = await contributorsResponse.json();
      setContributors(contributorsData);

      setInputDisabled(true);
    }
  };

  const handleChange = () => {
    setUsername('');
    setRepository('');
    setRepoData(null);
    setContributors([]);
    setInputDisabled(false);
  };

  const handleDownload = () => {
    const fileUrl = repoData.html_url;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = "repo_info.txt";
    link.click();
  };

  return (
    <Container>
        <Title>Find Team Management Info</Title>
        <Link to="/admin">Bank</Link>
        <FormContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Enter GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={inputDisabled}
            />
            <Input
              type="text"
              placeholder="Enter Repository Name"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              disabled={inputDisabled}
            />
          </InputContainer>
          <Button onClick={handleFindData} disabled={inputDisabled}>Find Data</Button>
        </FormContainer>
        <Button onClick={handleChange} disabled={!inputDisabled}>Change</Button>
        {repoData ? (
          <ResultsContainer>
            <Card>
              <h2>{repoData.name}</h2>
              <Info><strong>Description:</strong> {repoData.description}</Info>
              <Info><strong>Stars:</strong> {repoData.stargazers_count}</Info>
              <Info><strong>Watchers:</strong> {repoData.watchers_count}</Info>
              <Info><strong>Forks:</strong> {repoData.forks_count}</Info>
              <Info><strong>Language:</strong> {repoData.language}</Info>
              <Button onClick={handleDownload}>Download Repository</Button>

              <h3>Contributors</h3>
              {contributors.length > 0 ? (
                contributors.map((contributor) => (
                  <Contributor key={contributor.id}>
                    <span>{contributor.login}</span>
                    <span>{contributor.contributions} contributions</span>
                  </Contributor>
                ))
              ) : (
                <p>No contributors found</p>
              )}
            </Card>
          </ResultsContainer>
        ) : (
          <p>Loading Team Management data...</p>
        )}
    </Container>
  );
};

export default Management;
