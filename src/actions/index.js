import Firebase from 'firebase';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

//holds the shit to hold access key for firebase 
var config = {
    apiKey: "AIzaSyDBlxK-zxp7wRMEneeUYCsDlHrdYngU-Ro",
    authDomain: "tossup-6ed50.firebaseapp.com",
    databaseURL: "https://tossup-6ed50.firebaseio.com",
    projectId: "tossup-6ed50",
    storageBucket: "tossup-6ed50.appspot.com",
    messagingSenderId: "569045236586"
  };

Firebase.initializeApp(config);

//for firebase use 
export function signUpUser(credentials){
	return function(dispatch){
		Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
			.then(response => {
				console.log("finished signing up in firebase");
				dispatch (authUser());
			})
			.catch(error => {
				console.log(error);
				dispatch(authError(error));
			})
	}
}

//for firebase use 
export function signInUser(credentials) {
    return function(dispatch) {
        Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
            	console.log("finished logging in in firebase");
                dispatch(authUser());
            })
            .catch(error => {
                dispatch(authError(error));
            });
    }
}


//for front end react
export function signOutUser(){
	return function (dispatch) {
		Firebase.auth().signOut()
			.then(() => {
				dispatch({
					type: SIGN_OUT_USER
				})
			});
	}
}

//to verify if already logged in or out when refreshing the page
export function verifyAuth(){
	return function (dispatch){
		Firebase.auth().onAuthStateChanged(user => {
			if (user){
				dispatch(authUser());
			}
			else{
				dispatch(signOutUser());
			}
		});
	}
}

export function authUser(){
	return{
		type: AUTH_USER
	}
}

export function authError(error){
	return {
		type: AUTH_ERROR, 
		payload: error
	}
}