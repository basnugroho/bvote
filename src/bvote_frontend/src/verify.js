import React, { useState } from 'react';
import { Form, Button, Modal, Alert, Container, Card } from 'react-bootstrap';
import { searchByNIK } from './api'; // Import fungsi API yang telah dipisahkan
import { uploadKTP } from './api'; // Import fungsi API untuk upload KTP

const Verify = () => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      setError('File KTP harus diunggah');
      return;
    }

    setError('');

    try {
      const nik = await uploadKTP(photo);

      if (nik) {
        const result = await searchByNIK(nik);

        if (result.success) {
          const userData = result.data.data;

          // Menyimpan data ke dalam local storage
          localStorage.clear();
          localStorage.setItem('user_id', userData.id);
          localStorage.setItem('name', userData.name);
          localStorage.setItem('nik', userData.nik);

          setUserData(userData);
          setShowSuccessModal(true);
        } else {
          setErrorModalMessage(result.error);
          setShowFailureModal(true);
        }

      } else {
        setError('NIK tidak ditemukan dalam respons');
      }
    } catch (error) {
      console.error('Error uploading KTP:', error);
      setError('Terjadi kesalahan saat mengunggah file KTP');
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setUserData(null);
  };

  const handleCloseFailureModal = () => {
    setShowFailureModal(false);
    setErrorModalMessage('');
  };

  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Card className='g-4 p-4'>
        <h2 className='text-center'>Verify KTP</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPhoto">
            <Form.Label>Upload KTP</Form.Label>
            <Form.Control type="file" onChange={handlePhotoChange} />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" className='mt-4'>
            Submit
          </Button>
        </Form>

        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Data User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {userData && (
              <div>
                <p>NIK: {userData.nik}</p>
                <p>Nama: {userData.name}</p>
                <p>Tanggal Lahir: {userData.date_of_birth}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button href='/presiden'>
              Lanjutkan
            </Button>
            <Button variant="secondary" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showFailureModal} onHide={handleCloseFailureModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorModalMessage && <p>{errorModalMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFailureModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </Card>
      </Container>
    </div>
  );
};

export default Verify;
