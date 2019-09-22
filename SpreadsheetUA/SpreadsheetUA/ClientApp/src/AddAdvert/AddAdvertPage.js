import React from 'react';
import { connect } from 'react-redux';

import { advertActions } from '../actions/advert.actions';

class AddAdvertPage extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            Title: '',
            Description: '',
            Image: "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg",
            submitted: false,
           
        };
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    onselectImage = (e) => {
        console.log("Upload image");
        this.inputFileElement.click();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { Title, Description, Image } = this.state;
        const { dispatch } = this.props;
        if (Title && Description && Image !== "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg") {
            dispatch(advertActions.add(Title, Description, Image, this.props.user.id, this.props.user.token));
        }
    }


    onChangeSelectFile = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files && files[0]) {
            if (files[0].type.match(/^image\//)) {
                const reader = new FileReader();
                reader.onload = () => {
                 
                    this.setState({ Image: reader.result});
                };
                reader.readAsDataURL(files[0]);
            }
            else {
                alert("Невірний тип файлу");
            }
        }
        else {
            alert("Будь ласка виберіть файл");
        }
    }

    render() {
        const { adding } = this.props;
        const { Title, Description, submitted} = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add Advert</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !Title ? ' has-error' : '')}>
                        <label htmlFor="Title">Title</label>
                        <input type="text" className="form-control" name="Title" value={Title} onChange={this.handleChange} />
                        {submitted && !Title &&
                            <div className="help-block">Title is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Description ? ' has-error' : '')}>
                        <label htmlFor="Description">Description</label>
                        <input type="text" className="form-control" name="Description" value={Description} onChange={this.handleChange} />
                        {submitted && !Description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className="form-group">



                        <img
                            onClick={this.onselectImage}
                            className="imgUpload"
                            src={this.state.Image}
                            alt=""
                            width="500px">
                        </img>


                        <input ref={input => this.inputFileElement = input} onChange={this.onChangeSelectFile} type="file" className="d-none"></input>

                       
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add</button>
                        {adding &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { adding } = state.addadvert;
    const { user } = state.authentication;
    return {
        adding,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(AddAdvertPage);
export { connectedLoginPage as AddAdvertPage }; 