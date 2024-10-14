// Firebase Configuration
var firebaseConfig = {
  apiKey: "AIzaSyDm2JmyBAk-DCrzqhWLgcJDILIpCa2ErHo",
  authDomain: "recipe-sharing-platform-62d85.firebaseapp.com",
  projectId: "recipe-sharing-platform-62d85",
  storageBucket: "recipe-sharing-platform-62d85.appspot.com",
  messagingSenderId: "695326480119",
  appId: "1:695326480119:web:85bda9b47e93f9d374e5f2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();

// Handle Google Sign-In
document.getElementById('googleSignInBtn').addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
        console.log("User signed in:", result.user);
        alert("Google Sign-In successful!");
        window.location.href = 'homepage.html'; // Redirect to homepage or recipes page
    }).catch(function(error) {
        console.error("Error during Google Sign-In:", error);
        alert("Google Sign-In failed! " + error.message);
    });
});

// Handle Email Sign-In
document.getElementById('emailSignInBtn').addEventListener('click', function() {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    auth.signInWithEmailAndPassword(email, password).then(function(userCredential) {
        console.log("User signed in:", userCredential.user);
        alert("Sign-In successful!");
        window.location.href = 'homepage.html'; // Redirect to homepage or recipes page
    }).catch(function(error) {
        console.error("Error during sign-in:", error);
        alert("Sign-In failed! " + error.message);
    });
});
