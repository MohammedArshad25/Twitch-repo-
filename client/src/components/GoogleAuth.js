import React from "react";
import {connect} from 'react-redux';
import {signIn, signOut } from "../actions";


class GoogleAuth extends React.Component {

        

    componentDidMount() {
        //here we are loading client and secomnd argument is the call back aftere it gets loaded we will initialise library
        window.gapi.load("client:auth2", ()=>{
            window.gapi.client.init({
                clientId: '714652709335-pghod89n1rggjfnkgopkn2coleuumpl1.apps.googleusercontent.com', 
                scope : 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        if(this.props.isSignedIn === null ) {
            return null;
        }else if (this.props.isSignedIn)
        {
            return (<button onClick = {this.onSignOutClick} className="ui button red google button">
                <i className="google icon" />
                Sign Out
            </button>
            );
        }
        else {
            return (<button onClick = {this.onSignInClick} className="ui button red google button">
            <i className="google icon" />
            Sign in with google
        </button>
        )
        }
    }
    render () {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = state =>{
    return { isSignedIn: state.auth.isSignedIn};
}

export default connect(
    mapStateToProps,
    {signIn , signOut}
)(GoogleAuth);