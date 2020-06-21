const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('confirmation');
const countrySelect = document.getElementById('country');
const url = `https://restcountries.eu/rest/v2/all`




const showError = (input, message) =>{
    const formField = input.parentElement;
    const small = formField.querySelector('small');
    small.innerText = message;
    formField.classList.add('error');
    formField.classList.remove('success');
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.add('success');
    formField.classList.remove('error');
};

const validateEmail = (email) => {
    const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validation.test(String(email).toLowerCase());
};

const firstLetter = (item =>item.id.charAt(0).toUpperCase() + item.id.slice(1))

const checkInput = (input) =>{
    input.forEach((item)=>{
        if(item.value.trim()===''){
            showError(item, `${firstLetter(item)} is required`)
        } else{
            showSuccess(item);
        }
    })
}

const checkPass = (item1, item2) => {
    if(item2.value !== item1.value){
        showError(item2, `${firstLetter(item2)} doesn't match`)
    } 
}

const checkMail = (item =>{
    if (validateEmail(item.value) !== true){
        showError(item, `Please insert a valid Email`)
    }
})

const checkLength = ((input,length) => {
    input.forEach((item)=>{
        if(item.value.length < length){
            showError (item, `${firstLetter(item)} is too short`)
        }})
})


form.addEventListener('submit', (event) =>{
    event.preventDefault();
   
    checkInput([username, email, password, passwordConfirm, countrySelect]);
    checkPass(password, passwordConfirm);
    checkMail(email);
    checkLength([password],8)
    checkLength([username],6)
})



async function fetchCountries(){
    const response = await fetch(url)
    const data = await response.json()
    const finalDisplay = data.map(country =>{
        let countryName = country.name;
        let countryCode = country.alpha2code;
        let option = document.createElement("option");
        option.textContent = countryName;
        option.value = countryCode;
        countrySelect.appendChild(option)
    })
    return finalDisplay; 
}

fetchCountries()







