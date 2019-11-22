var username = document.getElementById("adminRegisterUsername");
var password = document.getElementById("adminRegisterPassword");
var errElement = document.getElementById("errArea");
var form = document.getElementById("adminReg");

form.addEventListener("submit", (e)=>{
    //can we add an event listener for everytime you type a character to make it faster?
    var errMessages = [];

    if(password.value.length < 8)
        errMessages.push("Your password must be atleast 8 characters");

    if(password.value.length > 28)
        errMessages.push("Your password must be less than 28 characters");

    if(password.value == "password")
        errMessages.push("Your password can't be password son!");

    if(errMessages.length > 0){
        e.preventDefault();
        errElement.innerText = errMessages.join(", ")
    }    
        

})
