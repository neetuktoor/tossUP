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
export const SELECT_BET = 'SELECT_BET';
export const FETCH_SELECTED_DETAILS = 'FETCH_SELECTED_DETAILS';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';


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

export function makedefaultProfile(){
    const userUid = Firebase.auth().currentUser.uid;
        Firebase.database().ref('users/' + userUid).update({
            id: userUid,
            username: 'No namer',
            profile_picture: '../style/images/Nopic.png',
            email: Firebase.auth().currentUser.email
        });
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
            console.log("snapshot: ", snapshot.val());
            if (snapshot.val() === null){
                dispatch(makedefaultProfile());
            } else {
            dispatch({
                type: FETCH_USER_INFO,
                payload: snapshot.val()
            })
            }
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
            description: bets.description,
            winner: '',
			addUser: bets.addUser,
			inviter: inviter
		};

		console.log("key just made", key);

		betRef.update(betData, function(error){
			console.log(betData);
			betAddedNotif(betData);
		});

	Firebase.database().ref('/users/' + inviter).on('value', snapshot => {
		var profile = snapshot.val().profile_picture;
		var username = snapshot.val().username;

		Firebase.database().ref('/bets/' + key).update({
    	inviterpic: profile,
        invitername : username,
        inviteduser: 'Add a user',
        invitedpic: 'http://vignette3.wikia.nocookie.net/glee-new-beginnings/images/f/fd/Unknown.gif/revision/latest?cb=20130205144914'
    });
	});

    Firebase.database().ref('/users/' + inviter + '/bets/' + key).update({
        bets: key,
        inviter: inviter
     });

    };
}

//function to store notifications to user just added to new bet in firebase
export function betAddedNotif(betadded){

	//find the unique id of the bet just added
	var betID = betadded.id;
	var inviter = betadded.inviter;


	//find the unique id of the user email added to bet
	Firebase.database().ref().child('users').orderByChild('email').equalTo(betadded.addUser).on('value', function(snapshot){
		console.log("bet added this", snapshot.val());
		var keys = Object.keys(snapshot.val());

		//this the user unique id
		var userID = keys[0];

		//ref notifications/useruniqueid and set to a uniqueid just added
		Firebase.database().ref('/notifications/' + userID + '/betsAddedTo/'+ betID).update({
			bet: betID,
			inviter: inviter,

		});

		//update bets with the invited
		Firebase.database().ref('/bets/' + betID).update({
			inviteduser: snapshot.val()[userID].username,
			invitedpic: snapshot.val()[userID].profile_picture
		});
	});
}


//function to fetch all the bets for that user in the database
export function fetchBetInfo(){

return function(dispatch){

	//get all the bet ids from the current user in the database
	const currentuser = Firebase.auth().currentUser.uid;
	var partialInfo = [];
	Firebase.database().ref('/users/' + currentuser).on('value', snapshot => {
        console.log("fetching bets", snapshot.val());
        if (snapshot.val() === null || snapshot.val().bets === undefined){
            dispatch({
                type: FETCH_BETS,
                payload:[{
                    id: '',
                    title: '',
                    date: '',
                    prize: '',
                    p1: '',
                    p1pic: '',
                    p2: '',
                    p2pic: ''
                }]
            });
        }
		//if bets in the users table is not null
		 else if (snapshot.val().bets !== null){

			var allBetArr = Object.keys(snapshot.val().bets);


			//for each of the bets, return back current user username, profile pic, and betid, and inviter
			partialInfo = allBetArr.map(function(bet){

				return {
					betid: bet,
					currentname: snapshot.val().username,
					currentuserid: snapshot.val().id,
					currentpic: snapshot.val().profile_picture,
					inviterid: snapshot.val().bets[bet].inviter
				}
			})
			dispatch(fetchFullInfo(partialInfo));
		}
		else{

			dispatch({
				type: FETCH_BETS,
				payload:[{
					id: '',
					title: '',
					date: '',
					prize: '',
					p1: '',
					p1pic: '',
					p2: '',
					p2pic: ''
				}]
			});
		}

	})
	}

}

export function fetchFullInfo(partialInfo){
	return  function(dispatch){
	console.log(partialInfo);
	var fullInfo = [];
	var databaseRef = Firebase.database().ref('bets').orderByChild("date");


	databaseRef.on('child_added', function(snapshot){

		//for each child sent back, if the id the same as the bet id, push new info into fullInfo
		partialInfo.forEach(function(data){
			if (data.betid === snapshot.val().id){

				if(data.currentuserid === snapshot.val().inviter){
					fullInfo.push({
						id: data.betid,
						title: snapshot.val().title,
						date: snapshot.val().date,
						prize: snapshot.val().prize,
						p1: data.currentname,
						p1pic: data.currentpic,
						p2: snapshot.val().inviteduser,
						p2pic: snapshot.val().invitedpic
					})
                    
				}
				//he is the invited
				else{
					fullInfo.push({
						id: data.betid,
						title: snapshot.val().title,
						date: snapshot.val().date,
						prize: snapshot.val().prize,
						p1: data.currentname,
						p1pic: data.currentpic,
						p2: snapshot.val().invitername,
						p2pic: snapshot.val().inviterpic
					})

				}
			}
		});
        console.log(fullInfo.length, partialInfo.length);
		//if info equals to partialInfo length, dispatch that shit
		if (fullInfo.length === partialInfo.length){
			dispatch({
				type: FETCH_BETS,
				payload: fullInfo
			})
		}
	})
}
}

//function to get all the notifications for that user to the database
export function fetchInviteNotifs(){
    return function(dispatch){
        //find the unique id of the current user
        const user = Firebase.auth().currentUser.uid;
        //search the database for notifications under that user unique id
        Firebase.database().ref('/notifications/' + user).on('value', snapshot => {
            //if doesn’t exist, send back data with empty strings
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

                    });
                    });
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
            //if doesn’t exist, send back data with empty strings
            if (snapshot.val() === null) { dispatch({
                type: FETCH_ACCEPTED_NOTIFICATIONS,
                payload: [{bet: '', invitedname: '', betid: '', invitedid: ''}]
                })
            }
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

            //if doesn’t exist, send back data with empty strings
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
//function to store into firebase that someone has declined the notification, also changes the bet’s details
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

/** functions for bet details.
**/


//function to change the state of the selected bet 
export function onSelectBet(betData){

	//get the id of the bet
	var betid = betData.bet.id;
	//change the state of the selected bet (send to reducers)
	return {
        type: SELECT_BET,
        payload: betid
    }

}

//function to fetch the details of selected bet and send to reducers
export function fetchSelectedBet(betid){
	return function(dispatch){
		//find details of the betid in the all bets table
		Firebase.database().ref('/bets/' + betid).on('value', snapshot => {
			console.log("details", snapshot.val());
			if (snapshot.val().addUser = "Add a user" ){
				dispatch({
					type: FETCH_SELECTED_DETAILS,
					payload: {
						title: snapshot.val().title,
						inviterpic: snapshot.val().invitedpic,
						invitername: snapshot.val().invitername,
						date: snapshot.val().date,
						prize: snapshot.val().prize,
						invitedpic: 'http://jonvilma.com/images/unknown-19.jpg',
						invitedname: 'Invite an opponent',
                        details: snapshot.val().description,
                        winner: snapshot.val().winner
					}
				})
			}
			dispatch({
				type: FETCH_SELECTED_DETAILS,
					payload: {
						title: snapshot.val().title,
						inviterpic: snapshot.val().invitedpic,
						invitername: snapshot.val().invitername,
						date: snapshot.val().date,
						prize: snapshot.val().prize,
						invitedpic: snapshot.val().invitedpic,
						invitedname: snapshot.val().inviteduser,
                        details: snapshot.val().description,
                        winner: snapshot.val().winner
					}

			})
		});
	}
}

/** functions for comments
**/

//function to store comments in the database 
export function storeComment(comment){
    console.log("comment", comment);
    
    //find the current user username and profilepicture
    const user = Firebase.auth().currentUser.uid;
    Firebase.database().ref('/users/' + user).on('value', snapshot =>{

        //store in the table comments under the bet: comments, username, and profilepicture 
        Firebase.database().ref('/comments/' + comment.betid).push({
            comment: comment.comment,
            username: snapshot.val().username,
            userpic: snapshot.val().profile_picture
        });
    });
}

//retrieving comments for the particular bet  
export function fetchComments(betid){
    return function(dispatch){
        
        Firebase.database().ref('/comments/' + betid).on ('value', snapshot =>{

            //if the comments for this is not null
            if (snapshot.val() !== null){
                var commentArr = Object.keys(snapshot.val());

                var datas = commentArr.map(function(data){

                    return {
                        comment: snapshot.val()[data].comment,
                        username: snapshot.val()[data].username,
                        userpic: snapshot.val()[data].userpic,
                        id: data
                    }
                });

                dispatch({
                    type: FETCH_COMMENTS,
                    payload: datas
                });
            }

            else{
                dispatch({
                    type: FETCH_COMMENTS,
                    payload: [{comment: '', username: '', userpic:'', id: ''}]
                });
            }
        });
    }
}




//adding winners to the bet
export function addWinner(winner){
    Firebase.database().ref('/bets/'+ winner.betid).update({ winner: winner.winner })

}
