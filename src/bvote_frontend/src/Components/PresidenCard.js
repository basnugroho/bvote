import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const PaslonCard = ({ images, number, capres, wapres, onVote, isVoted }) => {
    return (
        <Card style={{ width: '25rem' }} className='h-100'>
            <Card.Header as="h1" className="fw-bold py-2 text-center">{number}</Card.Header>
            <Card.Img variant="top" src={images} />
            <Card.Body>
                <Row className='text-center'>
                    <Col className='mb-2'>
                        <Card.Text>
                            Calon Presiden
                        </Card.Text>
                        <Card.Text className='fw-bold'>
                            {capres}
                        </Card.Text>
                    </Col>
                    <Col className='mb-2'>
                        <Card.Text>
                            Calon Wakil Presiden
                        </Card.Text>
                        <Card.Text className='fw-bold'>
                            {wapres}
                        </Card.Text>
                    </Col>

                    <Row className='justify-content-center my-4'>
                        <Col>
                            <Card.Text className='fw-bold'>
                                Gabungan Partai Politik Pengusung
                            </Card.Text>
                            <img src={`/images/partai/${number}.png`} alt={`Partai Pendukung ${number}`} />
                        </Col>
                    </Row>
                </Row>
            </Card.Body>
            <Card.Footer className="text-center">
                <Button className="w-100" onClick={onVote} variant={isVoted ? 'secondary' : 'danger'} style={{ backgroundColor: isVoted ? "#CCCCCC" : "#EB7028" }} disabled={isVoted}>{isVoted ? 'Voted' : 'Vote'}</Button>
            </Card.Footer>
        </Card>
    );
};

export default PaslonCard;
