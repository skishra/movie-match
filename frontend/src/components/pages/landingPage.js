import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Landingpage = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('https://media.themoviedb.org/t/p/w440_and_h660_face/bkbmInoAnEaMH4oxpXAXWwKr8Kd.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'green', // Background color
            }}
        >
            <Card style={{ width: '30rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} className="mx-2 my-2">
                <Card.Body>
                    <Card.Title className="text-center font-bold text-lg">
                        Movie Match App
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted text-center">
                        A starting point for an application.
                    </Card.Subtitle>
                    <Card.Text className="text-center">
                        If you see this with a styled background and improved buttons, the design is working!
                    </Card.Text>
                    <div className="d-flex justify-content-around mt-4">
                        <Button
                            style={{
                                backgroundColor: 'green', // Button background color
                                borderColor: 'green',
                                padding: '10px 20px',
                                fontWeight: 'bold',
                            }}
                            href="/signup"
                        >
                            Sign Up
                        </Button>
                        <Button
                            style={{
                                backgroundColor: 'green', // Button background color
                                borderColor: 'green',
                                padding: '10px 20px',
                                fontWeight: 'bold',
                            }}
                            href="/login"
                        >
                            Login
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Landingpage;