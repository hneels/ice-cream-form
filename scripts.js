/* 
CS601 Assignment 4
Author: Hope Neels
*/

// HTML elements repeatedly used within functions below
const submitButton = document.querySelector("#submit");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const facilitator = document.querySelector("#facilitator");
const warning = document.querySelector("#warning");

// disable submit button until input validated
submitButton.disabled = true;

// check for valid first name to enable submit button
firstName.addEventListener("keyup", enableButton);

// check for valid last name to enable submit button
lastName.addEventListener("keyup", enableButton);

// check for valid facilitator after field loses focus
facilitator.addEventListener("blur", validFacil);

// clear warning box when user goes back to facilitator input to try again
facilitator.addEventListener("focus", () => {
    warning.innerHTML = "";
});


// validate all inputs before submitting form
// assignment note: all fields are re-checked here in case user bypasses the submit button or ignores warnings
document.querySelector("form").addEventListener("submit", (event) => {

    // check if all three inputs are valid, using helper functions below
    if (!(validFacil() && validName(firstName) && validName(lastName))) {

        // if not valid, show warning alert and prevent form submission
        warning.innerHTML = "&#9888; Invalid input";
        event.preventDefault();
    }
});


// helper function to only enable submit button if first and last name are valid
function enableButton() {

    // testing both conditions before the if-statement so they both evaluate
    // otherwise the lastName condition is short-circuited and className not properly changed sometimes
    const firstValid = validName(firstName);
    const lastValid = validName(lastName);

    // enable the submit button if both name inputs are valid
    if (firstValid && lastValid) {
        submitButton.disabled = false;
    }
    // re-disable it (in case user deletes input)
    else {
        submitButton.disabled = true;
    }
}

// helper function to check length and characters of a name input field
function validName(name) {

    // match regex: two or more instances of only a-z or A-Z (no spaces)
    const regex = /^[a-zA-Z]{2,}$/;
    const validMatch = regex.test(name.value);

    // return true only if length and characters are proper
    if (validMatch) {
        name.className = "";
        return true;
    } else {
        // change input class to show invalid input
        name.className = "invalid";
        return false;
    }
}

// helper function to check if facilitator is in list of approved facilitators
function validFacil() {
    const facilOptions = ["Chris", "Christian", "Josh", "Fazil"];

    // if the value typed in facilitator field matches a name in the facilitator array
    if (facilOptions.includes(facilitator.value)) {
        facilitator.className = "";
        return true;
    } else {
        // display warning icon and message below facilitator input
        warning.innerHTML = "&#9888; invalid facilitator";
        // highlight invalid input with colored border
        facilitator.className = "invalid";
        return false;
    }
}
