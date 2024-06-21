import { Form, Button, Container } from 'react-bootstrap';
import { useState, useEffect, useContext, useRef } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function AddProduct() {
    const { user } = useContext(UserContext);

    const txtnameRef = useRef(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    function addProduct(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.error === 'Product already exists') {
                Swal.fire({
                    title: "Product already exists",
                    icon: 'error',
                    text: "Product already added in the database."
                });
            } else if (data.error === 'Failed to save the product.') {
                Swal.fire({
                    title: "Unsuccessful Product Creation",
                    icon: 'error',
                    text: "Failed to save the course."
                });
            } else if (data) {
                Swal.fire({
                    title: "Product successfully added",
                    icon: 'success',
                    text: "You have successfully add for this product."
                });

                
                navigate("/products");
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please try again."
                });
            }
        });

        setName("");
        setDescription("");
        setPrice(0);
    }

    const clearButton = async () => {
        const result = await Swal.fire({
            title: "Clearing of Form",
            icon: "warning",
            text: "Are you sure you want to clear the form?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            setName("");
            setDescription("");
            setPrice(0);
            Swal.fire({
                title: "Form Cleared!",
                icon: "success",
                text: "The form has been cleared."
            });
            txtnameRef.current.focus();
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected file:', selectedFile);
    };

    useEffect(() => {
        if (name !== '' && description !== '' && price !== "0" && price !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, description, price]);

    return (
        (!user.isAdmin) ?
            <Navigate to="/products" />
            :
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '95vh' }}>
                <Form onSubmit={(e) => addProduct(e)} className="w-75 px-3 border border-2 mt-5">
                    <h4 className="my-3 text-center text-success">Add Product</h4>

                    <Form.Group className="mt-3 px-5 text-success">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            ref={txtnameRef}
                            id="txtname"
                            type="text"
                            placeholder="Enter Product name"
                            required
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="px-5 text-success">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            required
                            value={price}
                            onChange={e => { setPrice(e.target.value) }}
                        />
                    </Form.Group>

                    <Form.Group className="px-5 text-success">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" rows={6}
                            placeholder="Enter product description"
                            required
                            value={description}
                            onChange={e => { setDescription(e.target.value) }}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="px-5 text-success">
                        <Form.Label>Upload Product Image</Form.Label>
                        <div className="d-flex align-items-center">
                            <input 
                                type="file" 
                                id="fileInput" 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange} 
                            />
                            <Button 
                                variant="secondary" 
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                Choose File
                            </Button>
                            {selectedFile && (
                                <span className="ms-2">{selectedFile.name}</span>
                            )}
                        </div>
                    </Form.Group>
                    
                    <Button className="m-4 ms-5"
                        variant="success"
                        type="submit"
                        id="submitBtn"
                        disabled={!isActive}
                    >
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={clearButton}>Cancel</Button>
                </Form>
            </Container>
    )
}
