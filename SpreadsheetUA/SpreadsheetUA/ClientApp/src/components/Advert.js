import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';


class Advert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
  
  
    render() {
        return (
            <Card body outline color="primary">
                <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
                    <CardBody>
                    <CardTitle>{this.props.title}</CardTitle>
                    <CardText>Category:category</CardText>
                    <Button outline color="primary">Open</Button>
                    </CardBody>
                 </Card>
        );
    }
}

//function mapStateToProps(state) {
//    const { loggedIn, user } = state.authentication;
//    return {
//        loggedIn,
//        user
//    };
//}

export default Advert;



