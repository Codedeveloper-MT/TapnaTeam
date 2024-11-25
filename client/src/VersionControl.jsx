/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { jsPDF } from "jspdf";
import { css } from "@emotion/react";

function VersionControl() {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [versions, setVersions] = useState([]);
  const [branches, setBranches] = useState(["main"]);
  const [selectedBranch, setSelectedBranch] = useState("main");

  const handleAddVersion = () => {
    const newVersion = {
      id: Date.now(),
      name: `Version ${versions.length + 1}`,
      timestamp: new Date().toLocaleString(),
      author: "User C",
      branch: selectedBranch,
      changeHistory: `Changes made in ${selectedBranch} branch by User C`,
    };
    setVersions((prevVersions) => [...prevVersions, newVersion]);
  };

  const handleSelectVersion = (version) => {
    setSelectedVersion(version);
  };

  const handleCreateBranch = () => {
    const newBranch = `branch-${branches.length + 1}`;
    setBranches((prevBranches) => [...prevBranches, newBranch]);
    setSelectedBranch(newBranch);
  };

  const handleSwitchBranch = (branch) => {
    setSelectedBranch(branch);
  };

  const handleRevert = () => {
    if (selectedVersion) {
      alert(`Reverted to ${selectedVersion.name}`);
      setSelectedVersion(null);
    }
  };

  const handleCompare = (versionToCompare) => {
    if (selectedVersion && versionToCompare) {
      alert(
        `Comparing ${selectedVersion.name} with ${versionToCompare.name}: \n` +
          `- ${selectedVersion.changeHistory} \n` +
          `- ${versionToCompare.changeHistory}`
      );
    }
  };

  const handleDownload = () => {
    if (selectedVersion) {
      const fileData = `Version: ${selectedVersion.name}\n` +
                       `Timestamp: ${selectedVersion.timestamp}\n` +
                       `Author: ${selectedVersion.author}\n` +
                       `Change History: ${selectedVersion.changeHistory}`;
      
      const blob = new Blob([fileData], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${selectedVersion.name}.txt`;
      link.click();
    }
  };

  const handleDownloadPDF = () => {
    if (selectedVersion) {
      const doc = new jsPDF();
      doc.text(`Version: ${selectedVersion.name}`, 10, 10);
      doc.text(`Timestamp: ${selectedVersion.timestamp}`, 10, 20);
      doc.text(`Author: ${selectedVersion.author}`, 10, 30);
      doc.text(`Change History: ${selectedVersion.changeHistory}`, 10, 40);
      doc.save(`${selectedVersion.name}.pdf`);
    }
  };

  return (
    <Container>
      <Header>Version Control with Git Integration</Header>
      <MainContent>
        <VersionHistory>
          <SectionHeader>Version History</SectionHeader>
          <VersionList>
            {versions.length === 0 ? (
              <Placeholder>No versions available</Placeholder>
            ) : (
              versions.filter(version => version.branch === selectedBranch).map((version) => (
                <VersionItem key={version.id} onClick={() => handleSelectVersion(version)}>
                  {version.name} - {version.timestamp}
                </VersionItem>
              ))
            )}
          </VersionList>
          <AddButton onClick={handleAddVersion}>Commit to {selectedBranch}</AddButton>
          <BranchActions>
            <SwitchBranchDropdown>
              <label>Switch Branch:</label>
              <select onChange={(e) => handleSwitchBranch(e.target.value)} value={selectedBranch}>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </SwitchBranchDropdown>
            <CreateBranchButton onClick={handleCreateBranch}>Create New Branch</CreateBranchButton>
          </BranchActions>
        </VersionHistory>

        <VersionDetails>
          {selectedVersion ? (
            <>
              <SectionHeader>Details for {selectedVersion.name}</SectionHeader>
              <p><strong>Timestamp:</strong> {selectedVersion.timestamp}</p>
              <p><strong>Author:</strong> {selectedVersion.author}</p>
              <p><strong>Branch:</strong> {selectedVersion.branch}</p>
              <p><strong>Change History:</strong> {selectedVersion.changeHistory}</p>
              <Actions>
                <ActionButton onClick={handleRevert}>Revert</ActionButton>
                <ActionButton onClick={() => handleCompare(selectedVersion)}>Compare</ActionButton>
                <ActionButton onClick={handleDownload}>Download TXT</ActionButton>
                <ActionButton onClick={handleDownloadPDF}>Download PDF</ActionButton>
              </Actions>
            </>
          ) : (
            <Placeholder>Select a version to view details</Placeholder>
          )}
        </VersionDetails>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f9f9f9;
  height: 100vh;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VersionHistory = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SectionHeader = styled.h2`
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
`;

const VersionList = styled.div`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  margin-bottom: 20px;
`;

const VersionItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ecf0f1;
  }
`;

const AddButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #3498db;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateX(-50%) translateY(-3px);
  }
`;

const BranchActions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const SwitchBranchDropdown = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CreateBranchButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #2ecc71;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;

const VersionDetails = styled.div`
  flex: 2;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const Placeholder = styled.div`
  color: #7f8c8d;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
`;

const Actions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #f39c12;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e67e22;
  }
`;

export default VersionControl;
