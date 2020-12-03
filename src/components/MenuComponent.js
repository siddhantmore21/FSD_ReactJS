import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Form} from 'reactstrap';
import DishDetailComponent from './DishDetailComponent';

class Menu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            selectedDish: null
            
        }
    }

    onDishSelect(dish)
    {
        this.setState({selectedDish: dish});
        
    }
    
    render()
    {
        const menu = this.props.dishes.map((dish) => {
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1 ">
                    <Card onClick = {() =>  this.onDishSelect(dish)}>
                        
                        <CardImg width="100%"  src = {dish.image} alt = {dish.name}/>
                        

                        <CardImgOverlay  className="ml-5">
                            <CardTitle><h4>{dish.name}</h4></CardTitle>
                            
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return( 
            <div className= "container">
                <div className="row">
                    {menu}

                </div>
                
                <DishDetailComponent dish = {this.state.selectedDish}/>
                
            </div>

        );
    }
}

export default Menu;