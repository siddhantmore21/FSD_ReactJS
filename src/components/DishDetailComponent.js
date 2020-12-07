import  React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
       Button, Label,  Col, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';

  


  
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component
{

    constructor(props)
    {
        super(props);
                   
        this.state = 
            {
                isModalOpen : false,
            };
        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        
    }

    handleSubmit(values)
    {
        
        alert("Current State is "+ JSON.stringify(values))
        this.setState({isModalOpen : !this.state.isModalOpen})
    }
    
    toggleModal()
    {
        this.setState({isModalOpen : !this.state.isModalOpen})
    }
        
    
    render(){

        return(
                <>
                    <Button outline onClick = {this.toggleModal} className="btn-md">
                        <span className="fa fa-pencil fa-lg"></span>
                         Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal}>
                        <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            
                        <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor='rating' className="col-12">Rating</Label>
                                <Col className="col-12">
                                    <Control.select model=".rating" id="rating" name="rating" 
                                    className="form-control"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='author' className="col-12">Your Name</Label>
                                <Col className="col-12">
                                    <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name" 
                                    className="form-control"
                                    validators = {{required, minLength: minLength(3), maxLength: maxLength(15)}}

                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be less than 15 characters'}}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group" >
                                <Label htmlFor="comment" className="col-12">Comment</Label>
                                <Col className="col-12">
                                    <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group" >
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
                
        );

    };

    
}



   function RenderDish({dish})
   {

    if (dish != null) {
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle><h4>{dish.name}</h4></CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}

 function  RenderComments({comments})
   {
    console.log(comments);
    if (comments != null) {

        return(
            <div className = "">
                   
                 <h4>Comments</h4>
                <ul className="">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                
                            </li>
                            
                        );
                    })}
                </ul> 
                <CommentForm/>  
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}
   
   
const DishDetail = (props) =>{
    if(props.dish !=null)
    {
        return(

            <div className="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                </div>
                <div className = "row">
                    
                    <div className ="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish}/>
                    </div>
                    <div className ="col-12 col-md-5 m-1">
                        <RenderComments  comments = {props.comments}/>
                        
                        
                        
                    </div>
                        
                           
                </div>
           </div>
           
       )
    }
    else
    {
        return(
            <div></div>
        )
    }   

   }
 
   


export default DishDetail;