const patientCards = document.querySelectorAll(".patient-card");
const selectedPatientName = document.getElementById("selectedPatientName");
const selectedPatientEmail = document.getElementById("selectedPatientEmail");
const logoutBtn = document.getElementById("logoutBtn");

patientCards.forEach((card) => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".patient-card").forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        selectedPatientName.textContent = card.dataset.name;
        selectedPatientEmail.textContent = card.dataset.email;
        // fetch biomarker data once implemented
    });
});
logoutBtn?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href="index.html";
});