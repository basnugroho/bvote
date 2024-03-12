import React, { useState } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import { searchByNIK } from "./api";

const Home = () => {
  const [nik, setNik] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    // Check if the NIK input meets the required length and consists of digits only
    if (nik.length !== 16 || isNaN(nik)) {
      setErrorModalMessage("NIK harus terdiri dari 16 digit angka.");
      setShowFailureModal(true);
      return;
    }
  
    const result = await searchByNIK(nik);
  
    if (result.success) {
      setUserData(result.data.data); // Set data pengguna jika berhasil ditemukan
      setShowSuccessModal(true);
    } else {
      setErrorModalMessage(result.error);
      setShowFailureModal(true);
    }
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
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
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pencarian Data Pemilih Pemilu</Card.Title>
              <Card.Text>
                Data Hasil Penetapan DPSHP oleh Kabupaten/Kota
              </Card.Text>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="number" // Mengubah input type menjadi number
                    placeholder="Nomor Induk Kependudukan/Paspor"
                    required
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  size="lg"
                  onClick={handleSearch}
                >
                  Pencarian
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Modal Sukses */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>NIK: {userData?.nik}</p>
          <p>Nama: {userData?.name}</p>
          <p>Tanggal Lahir: {userData ? formatTanggal(userData.date_of_birth) : null}</p>
          <p>Sudah Pilih {userData?.is_voted}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Gagal */}
      <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Gagal</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorModalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowFailureModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
