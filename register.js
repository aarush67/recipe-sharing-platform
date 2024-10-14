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

// Handle Email Sign-Up
document.getElementById('emailSignUpBtn').addEventListener('click', function() {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;

    auth.createUserWithEmailAndPassword(email, password).then(function(userCredential) {
        console.log("User signed up:", userCredential.user);
        alert("Sign-Up successful! Redirecting to login...");
        window.location.href = 'login.html'; // Redirect to login page
    }).catch(function(error) {
        console.error("Error during sign-up:", error);
        alert("Sign-Up failed! " + error.message);
    });
});
