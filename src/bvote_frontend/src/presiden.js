import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import PaslonCard from "./Components/PresidenCard";
import { getCandidates, getDataUser, postVote } from "./api";

const Presiden = () => {
  const [candidates, setCandidates] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCandidates();
        if (response.success) {
          const candidatesData = response.data
            .filter(candidate => candidate.category === "Presiden")
            .map(candidate => ({
              id: candidate.id, // Ambil ID kandidat dari response API
              images: candidate.photo,
              number: candidate.number,
              capres: candidate.first_user.name,
              wapres: candidate.second_user.name
            }));
          setCandidates(candidatesData);
        } else {
          console.error('Failed to fetch candidates:', response.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const storedHasVoted = localStorage.getItem("hasVoted");
    if (storedHasVoted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = async (candidate) => {
    if (hasVoted) {
      alert("You have already voted.");
      return;
    }

    try {
      const user_id = localStorage.getItem("user_id"); // Mendapatkan user_id dari local storage

      const userDataResponse = await getDataUser(user_id);
      if (!userDataResponse.success) {
        console.error('Failed to fetch user data:', userDataResponse.error);
        alert("Failed to fetch user data. Please try again later.");
        return;
      }

      const { is_voted } = userDataResponse.data;
      if (is_voted) {
        alert("You have already voted.");
        return;
      }

      const voteResponse = await postVote(candidate.id, user_id); // Menggunakan ID kandidat dari response API
      if (voteResponse.success) {
        localStorage.setItem("hasVoted", true);
        localStorage.setItem("selectedCandidate", JSON.stringify(candidate));

        setSelectedCandidate(candidate);
        setShowSuccessModal(true);
        setHasVoted(true);
      } else {
        console.error('Failed to post vote:', voteResponse.error);
        alert("Failed to post vote. Please try again later.");
      }
    } catch (error) {
      console.error('Error handling vote:', error);
      alert("Failed to handle vote. Please try again later.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    localStorage.clear(); // Membersihkan local storage
  };


  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row xs={1} md={2} lg={3} className="g-2 justify-content-center">
          {candidates.map((candidate) => (
            <Col key={candidate.number}>
              <PaslonCard
                images={candidate.images}
                number={candidate.number}
                capres={candidate.capres}
                wapres={candidate.wapres}
                onVote={() => handleVote(candidate)}
                hasVoted={hasVoted}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidate && (
            <>
              <p>Successfully voted for Paslon Nomor {selectedCandidate.number}</p>
              <p>Nama Calon Presiden: {selectedCandidate.capres}</p>
              <p>Nama Wakil Presiden: {selectedCandidate.wapres}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" href="/verify" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Presiden;
