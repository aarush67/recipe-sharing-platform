// Your web app's Firebase configuration
const firebaseConfig = {
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
        // Redirect or load recipes
    }).catch(function(error) {
        console.error("Error during Google Sign-In:", error);
    });
});

// Handle Email Sign-Up
document.getElementById('emailSignUpBtn').addEventListener('click', function() {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    auth.createUserWithEmailAndPassword(email, password).then(function(userCredential) {
        console.log("User signed up:", userCredential.user);
        // Redirect or load recipes
    }).catch(function(error) {
        console.error("Error during sign-up:", error);
    });
});

// Handle Email Sign-In
document.getElementById('emailSignInBtn').addEventListener('click', function() {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    auth.signInWithEmailAndPassword(email, password).then(function(userCredential) {
        console.log("User signed in:", userCredential.user);
        // Redirect or load recipes
    }).catch(function(error) {
        console.error("Error during sign-in:", error);
    });
});

// Handle Sign Out
document.getElementById('signOutBtn').addEventListener('click', function() {
    auth.signOut().then(function() {
        console.log("User signed out");
        // Redirect or clear user data
    });
});

// Track Auth State
auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log("User is signed in:", user);
        // Load recipes or redirect
    } else {
        console.log("No user is signed in.");
        // Show sign-in form
    }
});
