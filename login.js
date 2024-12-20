// Fake API - Array of users (email and password)
let users = [
    { email: "user1@example.com", password: "password123" },
    { email: "user2@example.com", password: "password456" },
    { email: "user3@example.com", password: "password789" },
    { email: "admin@admin.com", password: "adminpass" },
    { email: "guest@guest.com", password: "guest123" }
];

// Simulating an API call with a delay using Promise
function fakeApiCall(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if user exists with the correct email and password
            const user = users.find(user => user.email === email);
            if (user) {
                // If user exists, check if the password matches
                if (user.password === password) {
                    resolve({ message: "Login successful!", isNewUser: false });
                } else {
                    reject("Invalid password. Please try again.");
                }
            } else {
                // If user does not exist, create a new one (register)
                users.push({ email, password });
                resolve({ message: "User registered and logged in successfully!", isNewUser: true });
            }
        }, 1000); // Simulated delay (1 second)
    });
}

// Handle the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the email and password entered by the user
    const email = document.getElementById("email").value.trim(); // Trim to remove extra spaces
    const password = document.getElementById("password").value.trim(); // Trim to remove extra spaces

    // Basic validation (if both fields are not empty)
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // Call the fake API and handle the response
    fakeApiCall(email, password)
        .then(response => {
            // If login is successful or user is registered, show success message
            alert(response.message);
            if (response.isNewUser) {
                console.log("New user added:", { email, password });
            } else {
                console.log("Existing user logged in:", { email });
            }

            // Redirect to the home page
            window.location.href = "home.html"; // Replace "home.html" with the actual path to your home page
        })
        .catch(errorMessage => {
            // If login fails, show error message
            alert(errorMessage);
        });
});

// Redirect back to login page
function goToLoginPage() {
    window.location.href = "login.html"; // Replace "login.html" with the actual path to your login page
}
