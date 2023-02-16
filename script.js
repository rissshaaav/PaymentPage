// variable declarations............
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
const cardExp_value = document.getElementById("cardExp");
const cardNumber_value = document.getElementById("cardNumber");
let paymentMethod = "creditCard"; //by default credit card is selected


// validating date of birth to ensure user is not a minor
dobInput.addEventListener("change", () => {
    const now = new Date();
    let dob = new Date(dobInput.value);
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


// below script is form changing the color of gender on click
maleButton.addEventListener("click", () => {
    maleButton.classList.add("selected");
    femaleButton.classList.remove("selected");
});

femaleButton.addEventListener("click", () => {
    femaleButton.classList.add("selected");
    maleButton.classList.remove("selected");
});


// displaying credit card items on selecting credit card payment method
// and hiding paypal items
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
    paypalId.removeAttribute("required"); //required in case payment method is toggled
});

// displaying paypal items on selecting paypal payment method
// and hiding credit card items
paypal.addEventListener("click", () => {
    paypal.classList.add("selected");
    creditCard.classList.remove("selected");

    paymentMethod = "paypal";
    paypalId.parentElement.classList.remove("hide");
    paypalId.setAttribute("required","");

    cardNumber.parentElement.classList.add("hide");
    cardNumber.removeAttribute("required"); //required in case payment method is toggled
    cardCVC.parentElement.classList.add("hide");
    cardCVC.removeAttribute("required"); //required in case payment method is toggled
    cardExp.parentElement.classList.add("hide");
    cardExp.removeAttribute("required"); //required in case payment method is toggled
});

// validating credit card number to be of either 15 digits or 16 digits
cardNumber.addEventListener("input", () => {
    let cardNumberValue = cardNumber.value;
    if (/^\d{15,16}$/.test(cardNumberValue)) {
      cardNumber.setCustomValidity('');
    } else {
      cardNumber.setCustomValidity('Please enter a valid card number (15 or 16 digits).');
    }
});

// validating card CVC to ensure a 3 digit entry
cardCVC_value.addEventListener("input", () => {
    const value = cardCVC.value.trim();
    const valid = /^\d{3}$/.test(value);
    if (valid) {
        cardCVC.setCustomValidity("");
    } else {
        cardCVC.setCustomValidity("Please enter a valid CVC with exactly 3 digits.");
    }
});

// validating card Expiry to ensure input date is not older than today
cardExp_value.addEventListener("input", ()=>{
    const today = new Date();
    let inputDate = new Date(cardExp_value.value);
    if (inputDate < today) {
        cardExp.setCustomValidity('Card has already expired. Please renew or use another card.');
    } else {
        cardExp.setCustomValidity('');
    }
});

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
//  since their is no specific destination to send form data,
//  so for now, it'll be console logged after submission
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
//  since default form action is prevented forcefully at line 118,
//  below line is required to reset form after submission
    document.getElementById("paymentForm").reset()
});