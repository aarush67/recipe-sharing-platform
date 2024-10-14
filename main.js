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
var db = firebase.firestore();
var auth = firebase.auth();

// Handle Google Sign-In
document.getElementById('googleSignInBtn').addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result) {
        console.log("User signed in:", result.user);
        loadRecipes(); // Load recipes after sign-in
    }).catch(function(error) {
        console.error("Error during Google Sign-In:", error);
    });
});

// Handle Email Sign-Up
document.getElementById('emailSignUpBtn').addEventListener('click', function() {
    var email = prompt("Enter your email:");
    var password = prompt("Enter your password:");

    auth.createUserWithEmailAndPassword(email, password).then(function(userCredential) {
        console.log("User signed up:", userCredential.user);
        loadRecipes(); // Load recipes after sign-up
    }).catch(function(error) {
        console.error("Error during sign-up:", error);
    });
});

// Handle Email Sign-In
document.getElementById('emailSignInBtn').addEventListener('click', function() {
    var email = prompt("Enter your email:");
    var password = prompt("Enter your password:");

    auth.signInWithEmailAndPassword(email, password).then(function(userCredential) {
        console.log("User signed in:", userCredential.user);
        loadRecipes(); // Load recipes after sign-in
    }).catch(function(error) {
        console.error("Error during sign-in:", error);
    });
});

// Handle Sign Out
document.getElementById('signOutBtn').addEventListener('click', function() {
    auth.signOut().then(function() {
        console.log("User signed out");
        document.getElementById('recipeList').innerHTML = ''; // Clear recipe list
    });
});

// Load recipes from Firestore
function loadRecipes() {
    db.collection('recipes').get().then(function(querySnapshot) {
        document.getElementById('recipeList').innerHTML = ''; // Clear existing recipes
        querySnapshot.forEach(function(doc) {
            const recipe = doc.data();
            const recipeItem = `<div class="recipe-item" data-id="${doc.id}">
                                  <h3>${recipe.title}</h3>
                                  <button class="viewRecipeBtn">View Recipe</button>
                              </div>`;
            document.getElementById('recipeList').insertAdjacentHTML('beforeend', recipeItem);
        });

        // Add event listeners to view buttons
        document.querySelectorAll('.viewRecipeBtn').forEach(function(button) {
            button.addEventListener('click', function() {
                const recipeId = this.parentElement.getAttribute('data-id');
                window.location.href = `viewRecipe.html?id=${recipeId}`; // Redirect to viewRecipe page
            });
        });
    }).catch(function(error) {
        console.error("Error loading recipes:", error);
    });
}

// Load recipes on page load
document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            loadRecipes(); // Load recipes if user is signed in
        }
    });
});

// Load recipe data when navigating to the viewRecipe page
function loadRecipe(recipeId) {
    db.collection('recipes').doc(recipeId).get().then(function(doc) {
        if (doc.exists) {
            const recipeData = doc.data();
            displayRecipe(recipeData); // Display recipe details
        } else {
            document.getElementById('recipeDetails').innerHTML = '<p>Recipe not found!</p>';
        }
    }).catch(function(error) {
        console.error("Error fetching recipe data:", error);
    });
}

// Display recipe details
function displayRecipe(recipeData) {
    const recipeDetails = document.getElementById('recipeDetails');
    recipeDetails.innerHTML = `
        <h2>${recipeData.title}</h2>
        <p><strong>Ingredients:</strong></p>
        <ul>${recipeData.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        <p><strong>Instructions:</strong></p>
        <p>${recipeData.instructions}</p>
    `;
}

// Attach event listener to view recipe button in viewRecipe.html
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        loadRecipe(recipeId); // Load recipe if there is an ID in the URL
    }
});
