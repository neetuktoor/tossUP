import Firebase from 'firebase';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_USER_INFO= 'FETCH_USER_INFO';
export const USER_ERROR = 'USER_ERROR';
export const CREATE_BET = 'CREATE_BET';
export const ADD_TO_USER = 'ADD_TO_USER;'

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

//to edit profile after submitting form
export function editProfile(updated){
	return function(dispatch){
		//find user id
		const userUid = Firebase.auth().currentUser.uid;

		//update the user with the new stuff in firebase
		Firebase.database().ref('users/' + userUid).update({
			username: updated.displayname,
			profile_picture: updated.profilepic,
			email: updated.email
		}).then(() => {
			dispatch(fetchUserInfo());
		})
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
export function userError(error){
	return{
		type: USER_ERROR,
		payload: error
	}
}

//when profile page mounts, fetch the user info to display
export function fetchUserInfo(){
	return function (dispatch){

		//find user id
		const userUid = Firebase.auth().currentUser.uid;

		Firebase.database().ref('/users/' + userUid).on('value', snapshot => {
			//console.log("snapshot: ", snapshot.val());
			dispatch({
				type: FETCH_USER_INFO,
				payload: snapshot.val()
			})

		});
	}
}



export function createBet(bets){
	return function(dispatch){


		var betRef = Firebase.database().ref('/bets/').push();
		var key = betRef.key;
		var betData = {
			id: key,
			title: bets.title,
			prize: bets.prize,
			date: bets.date,
			addUser: bets.addUser
		};

		console.log("key just made", key);

		betRef.update(betData);
		
  	}
}

//function to send notifications to user just added to new bet 
export function betAddedNotif(betadded){

	//find the unique id of the bet just added 

	//find the unique id of the user email added to bet 

	//ref notifications/useruniqueid and set to a uniqueid just added 

}





