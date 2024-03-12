import React from 'react';
import { Card, NavDropdown, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Mengganti useHistory dengan useNavigate

const NavbarDropdown = ({ type }) => {
    const navigate = useNavigate(); // Mengganti useHistory dengan useNavigate

    const getColor = () => {
        switch (type) {
            case 'PRESIDEN DAN WAKIL PRESIDEN':
                return '#4C4C4C';
            case 'DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA':
                return '#FAF01D';
            default:
                return '#000000';
        }
    };

    const handleClick = () => {
        switch (type) {
            case 'PRESIDEN DAN WAKIL PRESIDEN':
                navigate('/presiden'); // Mengganti history.push dengan navigate
                break;
            case 'DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA':
                // Menangani kasus lain jika diperlukan
                break;
            default:
                break;
        }
    };

    return (
        <NavDropdown.Item onClick={handleClick}>
            <Card style={{ width: '21vw', height: '250px' }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>SURAT SUARA</Card.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Text>{type}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
                <div style={{ background: getColor(), height: '2rem' }}></div>
            </Card>
        </NavDropdown.Item>
    );
}

NavbarDropdown.propTypes = {
    type: PropTypes.oneOf([
        'PRESIDEN DAN WAKIL PRESIDEN',
        'DEWAN PERWAKILAN RAKYAT REPUBLIK INDONESIA',
        'DEWAN PERWAKILAN DAERAH',
        'DEWAN PERWAKILAN RAKYAT DAERAH'
    ]).isRequired
};

export default NavbarDropdown;
