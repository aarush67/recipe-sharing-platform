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

// Function to handle email sign-up
function emailSignUp() {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            console.log("User signed up:", userCredential.user);
            alert("Sign-Up successful! Redirecting to login...");
            window.location.href = 'login.html'; // Redirect to login page
        })
        .catch(function(error) {
            console.error("Error during sign-up:", error);
            alert("Sign-Up failed! " + error.message);
        });
}

// Function to handle Google sign-up
function googleSignUp() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(function(result) {
            console.log("User signed up with Google:", result.user);
            alert("Google Sign-Up successful! Redirecting to homepage...");
            window.location.href = 'homepage.html'; // Redirect to homepage or recipes page
        })
        .catch(function(error) {
            console.error("Error during Google sign-up:", error);
            alert("Google Sign-Up failed! " + error.message);
        });
}

// Function to bind event listeners based on the current page
function initializePage() {
    if (document.getElementById('emailSignUpBtn')) {
        document.getElementById('emailSignUpBtn').addEventListener('click', emailSignUp);
    }
    if (document.getElementById('googleSignUpBtn')) {
        document.getElementById('googleSignUpBtn').addEventListener('click', googleSignUp);
    }
}

// Call initializePage when the window loads
window.onload = initializePage;
