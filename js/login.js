const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

loginBtn?.addEventListener("click",async () => {
    const email = document.getElementById("loginEmail").ariaValueMax.trim();
    const password = document.getElementById("loginPassword").ariaValueMax.trim();

    if(!email || !password){
        loginMessage.textContent = "Please enter both email and password.";
        return;
    }
    try{
        const response = await fetch("http://localhost:3000/api/login",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password })
        });
        const data = await response.json
        window.location.href = "dashboard.html";
    } catch (error) {
        loginMessage.textContent = "Unable to sign in."
    }
});