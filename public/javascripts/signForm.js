// getting the form + clearing all the inputs
let form = document.querySelector("#petitionForm");
form.reset();

// iterating through and making sure all the suboptions are hidden if change happens
document.querySelector("#typeUserSelect").addEventListener("change", function () {

    document.querySelectorAll(".subOptions").forEach(elem => elem.classList.add("hidden"));
    const target = document.querySelector("#" + this.value.toLowerCase() + "Suboptions");
    if (target) {
        target.classList.remove("hidden");
    }
});                      

// list of signatures to append to in order to display in modal
const signatures = [
    { name: "Alice Johnson", email: "alice@email.com", city: "Seattle", state: "WA", signerType: "Student", conditionalInformation: "Academic Level: Senior", comment: "" },
    { name: "Bob Smith", email: "bob@email.com", city: "Portland", state: "OR", signerType: "Faculty", conditionalInformation: "Role: Professor", comment: "" }
];

document.querySelectorAll(".error-msg").forEach(elem => elem.classList.add("hidden"));

// event listener to be able to provide error messages + add rows 
form.addEventListener("submit", function(event) {

    document.querySelectorAll(".error-msg").forEach(elem => elem.classList.add("hidden"));
    event.preventDefault();
    let isValid = true;

    // gathering all the selection variables 
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const city = document.querySelector("#city").value.trim();
    const state = document.querySelector("#state").value.trim();
    const signerType = document.querySelector("#typeUserSelect");
    const academicLevel = document.querySelector("#academicLevel");
    const facultyRole = document.querySelector("#facultyRole");
    const militaryBranch = document.querySelector("#militaryBranch");
    const militaryStatus = document.querySelector("#militaryStatus");
    const professionalSector = document.querySelector("#professionalSector")

    // gathering all the associated error messages
    const nameError = document.querySelector("#nameError");
    const emailError = document.querySelector("#emailError");
    const cityError = document.querySelector("#cityError");
    const stateError = document.querySelector("#stateError");
    const signerTypeError = document.querySelector("#signerTypeError");
    const academicLevelError = document.querySelector("#academicLevelError");
    const facultyRoleError = document.querySelector("#facultyRoleError");
    const militaryBranchError = document.querySelector("#branchError");
    const militaryStatusError = document.querySelector("#statusError");
    const professionalError = document.querySelector("#industryError");
    const defaultError = document.querySelector("#defaultError");

    // initializing error message that's going to be displayed
    let displayedMsg;

    if (signerType.value === "Professional" && professionalSector.value === ""){
        displayedMsg = professionalError;
    }

    if (signerType.value === "Military" && militaryStatus.value === ""){
        displayedMsg = militaryStatusError;
    }

    if (signerType.value === "Military" && militaryBranch.value === "") {
        displayedMsg = militaryBranchError;
    }

    if (signerType.value === "Faculty" && facultyRole.value === "") {
        displayedMsg = facultyRoleError;
    }

    if (signerType.value === "Student" && academicLevel.value === "") {
        displayedMsg = academicLevelError;
    }

    if (signerType.value === "") {
        displayedMsg = signerTypeError;
    }

    if (state === "" || state === " " || state.length != 2) {
        displayedMsg = stateError;
    }

    if (city === "" || city === " ") {
        displayedMsg = cityError;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayedMsg = emailError;
    }

    if (name.length < 5) {
        displayedMsg = nameError;
    }

    // if we make it all the way here without another error it means nothing is filled out/selected
    if (name === "") {
        displayedMsg = defaultError;
    }

    if (displayedMsg)
    {
        displayedMsg.classList.remove("hidden");
        isValid = false
    }

    if (isValid) {

        // if statements to determine what the extra info is going to be
        let conditionalInformation = "";
        if (signerType.value === "Student") {
            conditionalInformation = `Academic Level: ${academicLevel.value}`;
        } 
        else if (signerType.value === "Faculty") {
            conditionalInformation = `Role: ${facultyRole.value}`;
        }
        else if (signerType.value === "Military") {
            conditionalInformation = `Branch: ${militaryBranch.value}, Status: ${militaryStatus.value}`;
        }
        else if (signerType.value === "Professional") {
            conditionalInformation = `Sector: ${professionalSector.value}`;
        }

        const comment = document.querySelector("#leaveComment").value.trim();

        // adding to the list of signatures 
        signatures.push({ name, email, city, state, signerType: signerType.value, conditionalInformation: conditionalInformation, comment });

        // const tbody = document.querySelector(".signature-table tbody");
        // const row = document.createElement("tr");
        // row.innerHTML = `
        //     <td>${name}</td>
        //     <td>${city}</td>
        //     <td>${state}</td>
        //     <td><a href="#" class="more-link" data-index="${signatures.length - 1}">More</a></td>
        // `;
        // tbody.appendChild(row);
        form.reset();
        document.querySelectorAll(".subOptions").forEach(elem => elem.classList.add("hidden"));
    }
})

form.addEventListener("input", function () {
    document.querySelectorAll(".error-msg").forEach(elem => elem.classList.add("hidden"));
})

document.querySelector(".signature-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("more-link")) {
        event.preventDefault();
        // fetching info anew every click of the more link to avoid one bumping into the other
        const data = signatures[event.target.getAttribute("data-index")];
        document.querySelector("#signatureModalLabel").innerHTML = `<h2>Details: ${data.name}</h2>`
        document.querySelector("#modalBody").innerHTML =`
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>City:</strong> ${data.city}</p>
            <p><strong>State:</strong> ${data.state}</p>
            <p><strong>Signer Type:</strong> ${data.signerType}</p>
            ${data.conditionalInformation ? `<p><strong>Signer Sub-details:</strong> ${data.conditionalInformation}</p>`: ""}
            ${data.comment ? `<p><strong>Comment:</strong> ${data.comment}</p>`: ""}
        `;
        new bootstrap.Modal(document.querySelector("#signatureModal")).show();
    }
});