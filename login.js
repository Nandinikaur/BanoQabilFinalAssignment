// User data for verification
const users = [
    { username: "testuser", password: "123456" },
    { username: "john", password: "doe123" },
  ];
  
  // DOM Elements
  const popupForm = document.getElementById("popupForm");
  const userForm = document.getElementById("userForm");
  const message = document.getElementById("message");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const mainContent = document.getElementById("mainContent");
  
  // Show login popup when page loads
  window.addEventListener("load", () => {
    popupForm.classList.remove("hidden");
    mainContent.classList.add("hidden");
  });
  
  // Form submission handler
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log(Checking login for username: ${username}, password: ${password});

    const userExists = users.some(
      (user) => user.username === username && user.password === password
    );
  
    if (userExists) {
      // Successful login: Hide popup and show main content
      console.log("Login successful, displaying main content");
      popupForm.classList.add("hidden");
      mainContent.classList.remove("hidden");
    } else {
      // Invalid login: Show error message
      console.log("Invalid login credentials");
      showMessage("Invalid username or password!");
    }
  });
  
  // Helper function to show error message
  function showMessage(msg) {
    message.textContent = msg;
    message.classList.remove("hidden");
  }
