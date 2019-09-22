import React from 'react';
import { connect } from 'react-redux';
import Advert from './Advert';
import { CardColumns} from 'reactstrap';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adverts: [],
            serverurl: "http://localhost:63140",
           
        };
       
    }

    componentDidMount() {

        fetch(`api/advert/GetAdverts`)
            .then(results => {
                return results.json();
            }).then(data => {
                console.log("data: ",data);
                if (data) {
                    
                    let adverts = data.map((advert) => {
                        console.log("imge: ", this.state.uploaded + '/Images/' + advert.imagePath);
                        return (
                            <Advert title={advert.title} description={advert.description} image={this.state.serverurl + '/Images/' + advert.imagePath} />
                        )
                    })

                    this.setState({ adverts: adverts });
                }
            
            })
    }


    render() {
        return (
            <CardColumns>
                {this.state.adverts}
            </CardColumns>
        );
    }
}


export default connect()(Home);



