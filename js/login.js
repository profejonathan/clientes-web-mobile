
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Cambio de estado Sesion');
      console.log(user.email)
      window.location ='index.html';

    }
});

function login() {

    let email = document.getElementById('txt-email').value;
    let pass = document.getElementById('txt-password').value;

    console.info(email, pass);
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log(user)
        window.location = 'index.html';
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}
