import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import EditProfile from './EditProfile'

//two functions that return Route components, checking if authenticated, then redirecting to login or homepage location 
const PrivateRoute = ({component: Component, authenticated, ...props}) => {
    console.log("private section. Authenticated? ", Component);
    return (
        <Route
            {...props}
            render= {(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
};

const PublicRoute = ({component: Component, authenticated, ...props}) => {
    return (
        <Route
            {...props}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/' />}
        />
    );
};

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>

                <div className="container">
                   <Header />
                    <Switch>
                    
                        <PublicRoute authenticated={this.props.authenticated }  path="/signup" component={ Signup } />
                        <PublicRoute authenticated={this.props.authenticated }  path="/login" component={ Login } />
                        <PrivateRoute authenticated = {this.props.authenticated } path = "/profile" component = { Profile } />
                        <PrivateRoute authenticated = { this.props.authenticated } path = "/editprofile" component = { EditProfile } />
                        <PrivateRoute authenticated={this.props.authenticated }  path="/" component= { Home } />
                    
                    </Switch>
                    <Footer />                
                </div>
            </BrowserRouter>
            
        );
    }
}

const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(App);
