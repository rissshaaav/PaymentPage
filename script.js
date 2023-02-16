const dobInput = document.getElementById("dob");
const maleButton = document.querySelector("#male");
const femaleButton = document.querySelector("#female");
const creditCard = document.querySelector(".creditCard");
const paypal = document.querySelector(".paypal");
const cardNumber = document.querySelector("#cardNumber");
const cardCVC = document.querySelector("#cardCVC");
const cardExp = document.querySelector("#cardExp");
const paypalId = document.querySelector("#paypalId");
const cardCVC_value = document.getElementById("cardCVC");

let paymentMethod = "creditCard"; //by default credit card is selected

dobInput.addEventListener("change", () => {
    let dob = new Date(dobInput.value);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
  
    // subtract 1 from age if current date is before birthday
    if (now.getMonth() < dob.getMonth() || 
        (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
      age--;
    }
  
    if (age < 18) {
      dobInput.setCustomValidity("You must be at least 18 years old.");
    } else {
      dobInput.setCustomValidity("");
    }
});

maleButton.addEventListener("click", () => {
    maleButton.classList.add("selected");
    femaleButton.classList.remove("selected");
});

femaleButton.addEventListener("click", () => {
    femaleButton.classList.add("selected");
    maleButton.classList.remove("selected");
});

creditCard.addEventListener("click", () => {
    creditCard.classList.add("selected");
    paypal.classList.remove("selected");

    paymentMethod = "creditCard";
    cardNumber.parentElement.classList.remove("hide");
    cardNumber.setAttribute("required","");
    cardCVC.parentElement.classList.remove("hide");
    cardCVC.setAttribute("required","");
    cardExp.parentElement.classList.remove("hide");
    cardExp.setAttribute("required","");
    
    paypalId.parentElement.classList.add("hide");
    paypalId.removeAttribute("required");
});

paypal.addEventListener("click", () => {
    paypal.classList.add("selected");
    creditCard.classList.remove("selected");
    paymentMethod = "paypal";

    paypalId.parentElement.classList.remove("hide");
    paypalId.setAttribute("required","");

    cardNumber.parentElement.classList.add("hide");
    cardNumber.removeAttribute("required");
    cardCVC.parentElement.classList.add("hide");
    cardCVC.removeAttribute("required");
    cardExp.parentElement.classList.add("hide");
    cardExp.removeAttribute("required");
});

cardCVC_value.addEventListener("input", () => {
    const value = cardCVC.value.trim();
    const valid = /^\d{3}$/.test(value);
    if (valid) {
        cardCVC.setCustomValidity("");
    } else {
        cardCVC.setCustomValidity("Please enter a valid CVC with exactly 3 digits.");
    }
});

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Full Name:", event.target.fullname.value);
    console.log("Nickname:", event.target.nickname.value);
    console.log("Email:", event.target.email.value);
    console.log("Date of Birth:", event.target.dob.value);
    console.log("Gender:", document.querySelector(".gender .selected").textContent);
    console.log("Payment Method:", paymentMethod);
    if (paymentMethod === "creditCard") {
        console.log("Card Number:", event.target.cardNumber.value);
        console.log("Card CVC:", event.target.cardCVC.value);
        console.log("Card Expiration:", event.target.cardExp.value);
    }
    else if (paymentMethod === "paypal") {
        console.log("Paypal ID:", event.target.paypalId.value);
    }

    document.getElementById("paymentForm").reset()
});