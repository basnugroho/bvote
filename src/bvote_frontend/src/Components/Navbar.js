import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarDropdown from './NavbarDropdown';

function NavigationBar() {
    const [name, setName] = useState('');
    const [nik, setNik] = useState('');
    const [userIdExists, setUserIdExists] = useState(false);

    useEffect(() => {
        // Fetch data from local storage
        const storedName = localStorage.getItem('name');
        const storedNik = localStorage.getItem('nik');
        const storedUserId = localStorage.getItem('user_id');

        // Update state if data exists in local storage
        if (storedName && storedNik && storedUserId) {
            setName(storedName);
            setNik(storedNik);
            setUserIdExists(true);
        }
    }, []); // Empty dependency array ensures that effect runs only once, similar to componentDidMount

    const votingTypes = [
        'PRESIDEN DAN WAKIL PRESIDEN',
        // 'DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA',
        // 'DEWAN PERWAKILAN DAERAH',
        // 'DEWAN PERWAKILAN RAKYAT DAERAH'
    ];

    return (
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#EB7028" }} className='text-white'>
            <Container>
                <Navbar.Brand href="#home" className="text-white">
                    {/* <img
                        alt=""
                        src="/kpu-logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '} */}
                    Blockchain E-Voting
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto  justify-content-center gap-4">
                        <Nav.Link href="/">Check DPT</Nav.Link>

                        <NavDropdown title="Vote" id="collapsible-nav-dropdown" style={{ position: "initial" }}>
                            <Container fluid>
                                <Row>
                                    {votingTypes.map((type, index) => (
                                        <Col key={index}>
                                            <NavbarDropdown type={type} />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </NavDropdown>
                        <Nav.Link href="#">Validasi Pilihan</Nav.Link>
                        <Nav.Link href="#">Hasil</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {userIdExists && (
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Nama: <span className='fw-bold'>{name}</span>
                            <br/>
                            NIK: <span className='fw-bold'>{nik}</span>
                        </Navbar.Text>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
