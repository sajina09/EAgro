import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions';


/**
* @author
* @function Products
**/

const Products = (props) => {

  const category = useSelector(state => state.category);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [location, setLocation] = useState('');
  const [productPictures, setproductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();



  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    form.append('location', location);
    for(let pic of productPictures){

      form.append('productPictures', pic);

    }
    dispatch(addProduct(form));

    setShow(false);
  }
  const handleShow = () => setShow(true);

  const createCategoryList = (categories , options= []) => {
    for(let category of categories) {
      options.push({ value : category._id, name : category.name});
      if(category.children.length>0){
        createCategoryList(category.children,options);
      }
    }
    return options;
  }

  const handleProductPicture = (e) => {
    setproductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }
  console.log(productPictures);

  return (

    <Layout sidebar>
       <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Product is working</h1>

              <button onClick={handleShow} >Add</button>
            </div>
          </Col>
        </Row>
        </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Quantity"
            value={quantity}
            placeholder={`Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
          />
            <Input
            label="Price"
            value={price}
            placeholder={`Price`}
            onChange={(e) => setPrice(e.target.value)}
          />
            <Input
            label="Description"
            value={description}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
          />
           <Input
            label="Location"
            value={location}
            placeholder={`Optional`}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
           className="form-control"
           value ={categoryId}
           onChange={(e) => setCategoryId(e.target.value)}>
            <option>Select Category</option>
            {
              createCategoryList(category.categories).map(option => 
                <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </select>
          {
            productPictures.length > 0 ?
            productPictures.map((pic,index) => <div key={index}>{pic.name}</div>) : null
          }
          <input type="file" name="productPicture" onChange={handleProductPicture} />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{background :'#59b791'}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )

}

export default Products