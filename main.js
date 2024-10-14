// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Register
document.getElementById("register-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Registration Successful!");
        window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    }
});

// Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Login Successful!");
        window.location.href = "view-recipes.html";
    } catch (error) {
        alert(error.message);
    }
});

// Google Sign-In
document.getElementById("google-signin")?.addEventListener("click", async () => {
    try {
        await auth.signInWithPopup(googleProvider);
        alert("Google Sign-In Successful!");
        window.location.href = "view-recipes.html";
    } catch (error) {
        alert(error.message);
    }
});

// Add Recipe
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
        window.location.href = "view-recipes.html";
    } catch (error) {
        alert(error.message);
    }
});

// View Recipes
window.onload = async () => {
    const recipeList = document.getElementById("recipe-list");
    const querySnapshot = await db.collection("recipes").get();
    
    querySnapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = `${doc.data().title}: ${doc.data().description}`;
        recipeList.appendChild(li);
    });
};

