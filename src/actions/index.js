import Firebase from 'firebase';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_USER_INFO= 'FETCH_USER_INFO';
export const USER_ERROR = 'USER_ERROR';
export const CREATE_BET = 'CREATE_BET';
export const ADD_TO_USER = 'ADD_TO_USER';
export const FETCH_INVITE_NOTIFICATIONS = 'FETCH_INVITE_NOTIFICATIONS';
export const FETCH_ACCEPTED_NOTIFICATIONS = 'FETCH_ACCEPTED_NOTIFICATIONS';
export const FETCH_DECLINED_NOTIFICATIONS = 'FETCH_DECLINED_NOTIFICATIONS';
export const FETCH_BETS = 'FETCH_BETS';

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

		Firebase.database().ref('users/' + userUid).update({
			id: userUid,
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
		var inviter = Firebase.auth().currentUser.uid;

		var betRef = Firebase.database().ref('/bets/').push();
		var key = betRef.key;
		var betData = {
			id: key,
			title: bets.title,
			prize: bets.prize,
			date: bets.date,
			addUser: bets.addUser,
			inviter: inviter
		};

		console.log("key just made", key);

		betRef.update(betData, function(error){
			console.log(betData);
			betAddedNotif(betData);
		});

    Firebase.database().ref('/users/' + inviter + '/bets/' + key).update({

        bets: key,
        inviter: inviter

      })

    };
}

//function to fetch all the bets for that user in the database
export function fetchBetInfo(){
  return function(dispatch){
    //find unique id of the current user
    var currentUser = Firebase.auth().currentUser.uid;
    //search the database for bets under that unique id
    Firebase.database().ref('/users/' + currentUser).on('value', snapshot => {
        //if doesn’t exist, send back data with empty strings
        if (snapshot.val() === null) { dispatch({
            type: FETCH_BETS,
            payload: [{bet: '', prize: '', participant1: '', participant2: ''}]
            })
        }
        if (snapshot.val() !== null && snapshot.val().bets !== undefined){
           //capture the bets in an array
          var betArray = Object.keys(snapshot.val().bets);
          // console.log(“bets” , snapshot.val().bets[betArray[1]]);
          var currentBets = [];
          //make an array of objects containing current user and bet id
          betArray.map(function(wager){

            currentBets.push({bet: snapshot.val().bets[wager].bets, user: snapshot.val().username});
          });
          //for each of the bets, find bet name, added user & prize
          var info = [];
          currentBets.map(function(infos){

            Firebase.database().ref('/bets/' + infos.bet ).on('value' , snap => {

                var hello =  snap.val().inviter;
                var bett = snap.val().title;
                var prizee = snap.val().prize;
                var p2 = snap.val().addUser;
                var p1 = snap.val().inviter;
                if (currentUser === hello){
                    info.push( {
                        bet: bett,
                        prize: prizee,
                        participant1: infos.user,
                        participant2: p2
                    });
                }

                else{
                    info.push({
                        bet: bett,
                        prize: prizee,
                        participant1: infos.user,
                        participant2: p1
                    });
                    }

             });

           });

           //MIKE THIS IS WHERE THE CODE BREAKS AND DOESNT TAKE THE FUNCTION BELOW
          //for each bet detail of variable info, find the username of participant2
          var betInfo = [];

          info.map(function(data){
            console.log("data", data);
            Firebase.database().ref('/users/' + data.participant2 + '/username').on('value', snapshot =>{


                betInfo.push({
                    bet: data.bet,
                    prize: data.prize,
                    participant1: data.participant1,
                    participant2: snapshot.val()
                });
            });
          })
          dispatch({
            type: FETCH_BETS,
            payload: betInfo
          })
         }
         //sending the bets for that user to reducers
         else {
            dispatch({
                    type: FETCH_BETS,
                    payload: [{bet: '', prize: '', participant1: '', participant2: ''}]
            });
        }
      });

    }
}

//function to store notifications to user just added to new bet in firebase
export function betAddedNotif(betadded){

	//find the unique id of the bet just added
	var betID = betadded.id;
	var inviter = betadded.inviter;
	console.log("Bet unique:", betID);

	//find the unique id of the user email added to bet
	Firebase.database().ref().child('users').orderByChild('email').equalTo(betadded.addUser).on('value', function(snapshot){

		var keys = Object.keys(snapshot.val());
		console.log(keys);
		//this the user unique id
		var userID = keys[0];

		//ref notifications/useruniqueid and set to a uniqueid just added
		Firebase.database().ref('/notifications/' + userID + '/betsAddedTo/'+ betID).update({
			bet: betID,
			inviter: inviter
		});

	});
}

//function to get all the notifications for that user to the database
export function fetchInviteNotifs(){

	return function(dispatch){
		//find the unique id of the current user
		const user = Firebase.auth().currentUser.uid;

		//search the database for notifications under that user unique id
		Firebase.database().ref('/notifications/' + user).on('value', snapshot => {


<<<<<<< HEAD
			//if doesn't exist, send back data with empty strings
=======
			//if doesn't exist, send back data with empty strings
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
			if (snapshot.val() === null) { dispatch({
				type: FETCH_INVITE_NOTIFICATIONS,
				payload: [{bet: '', invitername: '', betid: '', inviterid: ''}]
				})
			}

			if (snapshot.val() !== null && snapshot.val().betsAddedTo !== undefined){

				var invitearr = Object.keys(snapshot.val().betsAddedTo);
			}

			if (snapshot.val() && invitearr){

				var invites = [];
				//make an array of objects containing the inviter and bet id
				invitearr.forEach(function(bet){

					invites.push({bet: snapshot.val().betsAddedTo[bet].bet, inviter: snapshot.val().betsAddedTo[bet].inviter});
				})


				var names = [];
				var betname = '';
				var invitername = '';


				//for each of the bets find the firebase user and bet name to display
				invites.map(function(lol){
					Firebase.database().ref('/bets/' + lol.bet + '/title').on('value', snapshot =>{

						betname = snapshot.val();

						Firebase.database().ref('/users/' + lol.inviter + '/username').on('value', snap => {
						invitername = snap.val();

						names.push({bet: betname, inviter: invitername, betid: lol.bet, inviterid: lol.inviter});
<<<<<<< HEAD

					});

					});

=======

					});

					});

>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
				});
				//sending the notifications for that user to reducers
				dispatch({
					type: FETCH_INVITE_NOTIFICATIONS,
					payload: names
				});
			}
			else{


				dispatch({
					type: FETCH_INVITE_NOTIFICATIONS,
					payload: [{bet: '', invitername: '', betid: '', inviterid: ''}]
				});
			}

		});

		}
	}

//function to fetch accepted notifications from the database
export function fetchAcceptedNotifs(){

	return function(dispatch){
		//find the unique id of the current user
		const user = Firebase.auth().currentUser.uid;

		//search the database for notifications under that user unique id
		Firebase.database().ref('/notifications/' + user).on('value', snapshot => {

<<<<<<< HEAD
			//if doesn't exist, send back data with empty strings
=======
			//if doesn't exist, send back data with empty strings
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
			if (snapshot.val() === null) { dispatch({
				type: FETCH_ACCEPTED_NOTIFICATIONS,
				payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
				})
			}
<<<<<<< HEAD

			//if there are accepted bets in the notifications table
			if (snapshot.val() !== null && snapshot.val().acceptedBets !== undefined){
=======
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4

			//if there are accepted bets in the notifications table
			if (snapshot.val() !== null && snapshot.val().acceptedBets !== undefined){

				var acceptarr = Object.keys(snapshot.val().acceptedBets);
			}

			if (snapshot.val() && acceptarr){

				var accepted = [];

				//make an array of objects containing the inviter and bet id for every accepted notification
				acceptarr.forEach(function(bet){

					accepted.push({bet: snapshot.val().acceptedBets[bet].bet, invited: snapshot.val().acceptedBets[bet].invited});
				})


				var names = [];
				var betname = '';
				var invitedname = '';


				//for each of the bets find the firebase user and bet name
				accepted.map(function(lol){
					Firebase.database().ref('/bets/' + lol.bet + '/title').on('value', snapshot =>{

						betname = snapshot.val();

						Firebase.database().ref('/users/' + lol.invited + '/username').on('value', snap => {
						invitedname = snap.val();

						names.push({bet: betname, invited: invitedname, betid: lol.bet, invitedid: lol.invited});
						console.log("acceptednames", names);
					});

					});

				});
				//sending the notifications for that user to reducers
<<<<<<< HEAD
=======
					dispatch({
						type: FETCH_ACCEPTED_NOTIFICATIONS,
						payload: names
					});
			}

			else{

				dispatch({
					type: FETCH_ACCEPTED_NOTIFICATIONS,
					payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
				})
			}


		});

		}
	}

//fetching declined notification
export function fetchDeclinedNotifs(){

	return function(dispatch){
		//find the unique id of the current user
		const user = Firebase.auth().currentUser.uid;

		//search the database for notifications under that user unique id
		Firebase.database().ref('/notifications/' + user).on('value', snapshot => {

			//if doesn't exist, send back data with empty strings
			if (snapshot.val() === null) { dispatch({
				type: FETCH_DECLINED_NOTIFICATIONS,
				payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
				})
			}

			if (snapshot.val() !== null && snapshot.val().declinedBets !== undefined){

				var declinedarr = Object.keys(snapshot.val().declinedBets);
			}

			if (snapshot.val() && declinedarr){

				var declined = [];
				//make an array of objects containing the inviter and bet id
				declinedarr.forEach(function(bet){

					declined.push({bet: snapshot.val().declinedBets[bet].bet, invited: snapshot.val().declinedBets[bet].invited});
				})


				var names = [];
				var betname = '';
				var invitedname = '';


				//for each of the bets find the firebase user and bet name
				declined.map(function(lol){
					Firebase.database().ref('/bets/' + lol.bet + '/title').on('value', snapshot =>{

						betname = snapshot.val();

						Firebase.database().ref('/users/' + lol.invited + '/username').on('value', snap => {
						invitedname = snap.val();

						names.push({bet: betname, invited: invitedname, betid: lol.bet, invitedid: lol.invited});
						console.log("declinednames", names);
					});

					});


					//sending the notifications for that user to reducers
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
					dispatch({
						type: FETCH_DECLINED_NOTIFICATIONS,
						payload: names
					});
			}

			else{

				dispatch({
<<<<<<< HEAD
					type: FETCH_ACCEPTED_NOTIFICATIONS,
					payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
				})
			}


		});

		}
	}

//fetching declined notification
export function fetchDeclinedNotifs(){

	return function(dispatch){
		//find the unique id of the current user
		const user = Firebase.auth().currentUser.uid;

		//search the database for notifications under that user unique id
		Firebase.database().ref('/notifications/' + user).on('value', snapshot => {

			//if doesn't exist, send back data with empty strings
			if (snapshot.val() === null) { dispatch({
				type: FETCH_DECLINED_NOTIFICATIONS,
				payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
=======
					type: FETCH_DECLINED_NOTIFICATIONS,
					payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
				})
			}

			if (snapshot.val() !== null && snapshot.val().declinedBets !== undefined){

				var declinedarr = Object.keys(snapshot.val().declinedBets);
			}

			if (snapshot.val() && declinedarr){

				var declined = [];
				//make an array of objects containing the inviter and bet id
				declinedarr.forEach(function(bet){

					declined.push({bet: snapshot.val().declinedBets[bet].bet, invited: snapshot.val().declinedBets[bet].invited});
				})


				var names = [];
				var betname = '';
				var invitedname = '';


				//for each of the bets find the firebase user and bet name
				declined.map(function(lol){
					Firebase.database().ref('/bets/' + lol.bet + '/title').on('value', snapshot =>{

						betname = snapshot.val();

						Firebase.database().ref('/users/' + lol.invited + '/username').on('value', snap => {
						invitedname = snap.val();

						names.push({bet: betname, invited: invitedname, betid: lol.bet, invitedid: lol.invited});
						console.log("declinednames", names);
					});

					});


					//sending the notifications for that user to reducers
					dispatch({
						type: FETCH_DECLINED_NOTIFICATIONS,
						payload: names
					});
				});
			}

			else{

				dispatch({
					type: FETCH_DECLINED_NOTIFICATIONS,
					payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
				})
			}
		});

		}
	}

//declining the invitation, delete from notifications
export function declineInvite(notification){
	return function(dispatch){

		//find the unique id of the current user
		const user = Firebase.auth().currentUser.uid;


		//remove bet from betsAddedTo
		Firebase.database().ref('notifications').child(user).child('betsAddedTo').child(notification.notif.betid).remove()
			.then(() => {
				dispatch(declinedNotif(notification));
			})

	}
}

//accepting the invitation, delete from notifications
export function acceptInvite(notification){
	return function(dispatch){

		//find the unique id of the current user
		const user = Firebase.auth().currentUser.uid;


		//remove bet from betsAddedTo
		Firebase.database().ref('notifications').child(user).child('betsAddedTo').child(notification.notif.betid).remove()
			.then(() => {
				dispatch(acceptedNotif(notification));
			})

	}
}

//clearing the notification for accepted invitations
export function clearAccepted(notification){
	const user = Firebase.auth().currentUser.uid;

	Firebase.database().ref('notifications').child(user).child('acceptedBets').child(notification.notif.betid).remove();
}

//clearing the notification for declined invitations
export function clearDeclined(notification){
	const user = Firebase.auth().currentUser.uid;

	Firebase.database().ref('notifications').child(user).child('declinedBets').child(notification.notif.betid).remove();
}


//function to store into the firebase that someone has accepted notification
export function acceptedNotif(data){
		console.log(data);
		var user = Firebase.auth().currentUser.uid;

		//store in firebase notifications/inviter user id /accepted who accepted the bet
		Firebase.database().ref('/notifications/' + data.notif.inviterid + '/acceptedBets/' + data.notif.betid).update({
			bet : data.notif.betid,
			invited: user
		})
}

//function to store into firebase that someone has declined the notification, also changes the bet's details
export function declinedNotif(data){
	var user = Firebase.auth().currentUser.uid;

	//store in firebase notifications/inviter user id /accepted who accepted the bet
	Firebase.database().ref('/notifications/' + data.notif.inviterid + '/declinedBets/' + data.notif.betid).update({
		bet : data.notif.betid,
		invited: user
	})

	Firebase.database().ref('/bets/' + data.notif.betid).update({
		addUser: "Add a user"
	})
}
