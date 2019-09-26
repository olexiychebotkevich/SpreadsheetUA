import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './RegisterPage.css';

import { userActions } from '../actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                FirstName: '',
                LastName: '',
                Email: '',
                Password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.FirstName && user.LastName && user.Email && user.Password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
          
            <div align="center" className="col-md-6 col-md-offset-3 form-horizontal">
                <h2>Register</h2>
                <form  name="form" onSubmit={this.handleSubmit} >
                    <div  className={'form-group' + (submitted && !user.FirstName ? ' has-error' : '')}>
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" className="form-control" name="FirstName" value={user.FirstName} onChange={this.handleChange} />
                        {submitted && !user.FirstName &&
                            <div className="help-block text-danger">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.LastName ? ' has-error' : '')}>
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" className="form-control" name="LastName" value={user.LastName} onChange={this.handleChange} />
                        {submitted && !user.LastName &&
                            <div className="help-block text-danger">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.Email ? ' has-error' : '')}>
                        <label htmlFor="Email">Email</label>
                        <input type="text" className="form-control" name="Email" value={user.Email} onChange={this.handleChange} />
                        {submitted && !user.Email &&
                            <div className="help-block text-danger">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.Password ? ' has-error' : '')}>
                        <label htmlFor="Password">Password</label>
                        <input type="password" className="form-control" name="Password" value={user.Password} onChange={this.handleChange} />
                        {submitted && !user.Password &&
                            <div className="help-block text-danger">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                        </form>
                  
                   
                    </div>
           
      
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };