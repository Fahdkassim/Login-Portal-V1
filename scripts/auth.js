const myModal = document.querySelectorAll('.modal')

async function signup(e) {
  e.preventDefault();
  const email = document.querySelector('#signupEmail')
  const password = document.querySelector('#signupPassword')
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    M.toast({ html: `Welcome ${result.user.email}`, classes: 'green' })
    console.log(result)

  }
  catch (err) {
    M.toast({ html: err.message, classes: 'red' })
  }
  email.value = "";
  password.value = "";
  M.Modal.getInstance(myModal[0]).close()
}

async function login(e) {
  e.preventDefault();
  const email = document.querySelector('#loginEmail')
  const password = document.querySelector('#loginPassword')
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    M.toast({ html: `Welcome ${result.user.email}`, classes: 'green' })
    console.log(result)
  }
  catch (err) {
    M.toast({ html: err.message, classes: 'red' })
  }
  email.value = "";
  password.value = "";
  M.Modal.getInstance(myModal[1]).close()
}

function logout() {
  firebase.auth().signOut();

  // unsubscribe if needed
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
    } else {
      console.log('Signed out successfully')
      M.toast({ html: "Signed out successfully", classes: 'green' })
    }
  });
}

function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      M.toast({ html: error.message, classes: 'red' })
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });


}
// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });