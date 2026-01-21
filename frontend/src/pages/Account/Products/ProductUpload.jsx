import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ProductUpload() {
    return <Form className="w-full h-full flex flex-col items-center justify-center">
        <Form.Group className="mb-3 w-[270px]" controlId="formProductTitle">
            <Form.Label>Product Title*</Form.Label>
            <Form.Control required="true" type="title" placeholder="Enter title" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Product Price* ($)</Form.Label>
            <Form.Control type="number" placeholder="Enter price" />
        </Form.Group>
            <Form.Group className='flex'>

            <Form.Label className="text-muted inline">
                Enter discount
            </Form.Label>
            <Form.Check type="checkbox" />
            </Form.Group>
            <Form.Group>

            <Form.Label>Enter Discount (%)</Form.Label>
            <Form.Control type="number" placeholder="Enter price" />
            </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
}

export default ProductUpload;