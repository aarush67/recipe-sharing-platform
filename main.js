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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Register form submission
document.getElementById("register-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Registration Successful!");
        window.location.href = "login.html"; // Redirect to login page after successful registration
    } catch (error) {
        alert(error.message); // Show any errors
    }
});

// Login form submission
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Login Successful!");
        window.location.href = "view-recipes.html"; // Redirect to view recipes after successful login
    } catch (error) {
        alert(error.message); // Show any errors
    }
});

// Google Sign-In button click event
document.getElementById("google-signin")?.addEventListener("click", async () => {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        alert("Google Sign-In Successful!");
        window.location.href = "view-recipes.html"; // Redirect after successful Google sign-in
    } catch (error) {
        alert(error.message); // Show any errors
    }
});

// Google Sign-Up button click event
document.getElementById("google-register")?.addEventListener("click", async () => {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;

        // Save user data to Firestore
        await db.collection("users").doc(user.email).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        });

        alert("Google Registration Successful!");
        window.location.href = "view-recipes.html"; // Redirect after successful Google sign-up
    } catch (error) {
        alert(error.message); // Show any errors
    }
});

// Add Recipe form submission
document.getElementById("recipe-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("recipe-title").value;
    const description = document.getElementById("recipe-description").value;

    try {
        await db.collection("recipes").add({
            title,
            description,
            user: auth.currentUser.email
        });
        alert("Recipe added successfully!");
        window.location.href = "view-recipes.html"; // Redirect to view recipes after adding a recipe
    } catch (error) {
        alert(error.message); // Show any errors
    }
});

// Load Recipes on page load
window.onload = async () => {
    const recipeList = document.getElementById("recipe-list");
    const querySnapshot = await db.collection("recipes").get();
    
    querySnapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = `${doc.data().title}: ${doc.data().description}`;
        recipeList.appendChild(li); // Append each recipe to the list
    });
};
