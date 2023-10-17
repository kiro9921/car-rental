const switchers = [...document.querySelectorAll('.switcher')];

switchers.forEach(item => {
	console.log("enabled switcher");
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'));
		this.parentElement.classList.add('is-active');
	})
});
function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
}
//
const strengthIndicator = document.querySelector(".indicator");
//
const emaiInput = document.getElementById("signup-email");
const firstNameInput = document.getElementById("signup-first-name");
const lastNameInput = document.getElementById("signup-last-name");
const phoneInput = document.getElementById("signup-phone");
const nationalIDInput = document.getElementById("signup-national-id");
const birthDate = document.getElementById("signup-birthdate");
const password = document.getElementById("signup-password");
const password_confirm = document.getElementById("signup-password-confirm");
//
let currentDate = new Date();
let minimumDate = (currentDate.getFullYear() - 18) + "-" + pad(currentDate.getMonth()+1, 2) + "-" + pad(currentDate.getDate(), 2);
document.getElementById("signup-birthdate").setAttribute('max', minimumDate);
//
var lastScore = 0;
//
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
//
const strength_txt = document.getElementById("password-strength");
const password_match_text = document.getElementById("password-match");
const signupButton = document.getElementById("signup-submit");
//

function isValidEmail(email){
	email = email ?? emaiInput.value;
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function checkPasswordStrength(){
	if(password.value !== ""){
		strengthIndicator.style.display = "block";
		strengthIndicator.style.display = "flex";
		var result = zxcvbn(password.value);
		//
		weak.classList.remove("active");
		medium.classList.remove("active");
		strong.classList.remove("active");
		//
		lastScore = result.score;
		if (result.score < 3){
			strength_txt.style.color = "#a12323";
			strength_txt.style.display = "block";
			strength_txt.textContent = result.feedback.warning + "\r\n";
			strength_txt.textContent += result.feedback.suggestions.join("\r\n");
		}else{
			strength_txt.style.color = "#00FF00";
			strength_txt.textContent = "Good password!";
		}
		if(result.score === 1 || result.score === 0){
			weak.classList.add("active");
		}else if(result.score === 2){
			weak.classList.add("active"); medium.classList.add("active");
		}else if(result.score === 3 || result.score === 4){
			weak.classList.add("active"); medium.classList.add("active"); strong.classList.add("active");
			return true;
		}
	}else{
		strengthIndicator.style.display = "none";
		strength_txt.style.display = "none";
	}
	return false;
}

function checkPasswordsMatch(){
	password_match_text.style.display = "none";
	if (password.value === "" && password_confirm.value === "") {return true;}
	if (password_confirm.value === ""){
		return false;
	}
	if (password_confirm.value !== password.value){
		password_match_text.style.display = "block";
		password_match_text.textContent = "Passwords do not match!";
		return false;
	}else{
		if (lastScore >= 3){
			return true;
		}
	}
	return false;
}

function validateRegisterInputs(){
	let errorMessage = "";
	if (firstNameInput.value === "" || lastNameInput.value === ""){
		errorMessage += "Please enter your first and last name.\n";
	}
	if (!isValidEmail(emaiInput.value)){
		errorMessage += "Please enter a valid email (abc@def.gh).\n";
	}
	if (phoneInput.value === ""){
		errorMessage += "Please enter your phone number.\n";
	}
	if (nationalIDInput.value === ""){
		errorMessage += "Please enter your national ID.\n";
	}else if (nationalIDInput.value.length < 10){
		//errorMessage += "National ID is a minimum of 10 characters.\n";
	}
	if (birthDate.value === ""){
		errorMessage += "Please enter your birthdate\n(you must be 18 years or older).\n";
	}
	if (!checkPasswordStrength()){
		errorMessage += "Your password isn't strong enough.\n";
	}
	if (!checkPasswordsMatch()){
		errorMessage += "Your passwords don't match.\n"
	}
	return errorMessage;
}
//
const loginEmaiInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
function validateLoginInputs(){
	var errorMessage = "";
	if (loginEmaiInput.value === "" || loginPasswordInput.value === ""){
		return "Email and password are required.\n";
	}
	if (!isValidEmail(loginEmaiInput.value)){
		errorMessage += "Please enter a valid email (abc@def.gh).\n";
	}
	return errorMessage;
}
//
 
$(document).ready(function() {

	verifyLoggedUser("../search", true);
	$("#signup-form").submit( async function(event) {
		event.preventDefault();
		var errorMessage = validateRegisterInputs();
		if (errorMessage !== ""){
			Swal.fire({
				icon: 'error',
				title: 'Failed',
				html: '<pre>' + errorMessage + '</pre>',
			});
			//alert(errorMessage);
			return false;
		}
		var email = $("#signup-email").val();
		var fName = $("#signup-first-name").val();
		var lName = $("#signup-last-name").val();
		var phone = $("#signup-phone").val();
		var birthdate = $("#signup-birthdate").val();
		var nationalID = $("#signup-national-id").val();
		var password = $("#signup-password").val();
		password = CryptoJS.MD5(password).toString();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "signup.php",
			data: {"email": email, "firstName": fName, "lastName": lName, "phone": phone, "birthdate": birthdate, "nationalID": nationalID, "password": password},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				if (!data["success"]){
					Swal.fire({
						icon: 'error',
						title: "Failed",
						text: data["error"][1],
					});
					return false;
				}
				Cookies.set('user', data["cookie"]);
				window.location.href = '../search/index.html';
			}
		});
		return false;
	});
	$("#login-form").submit(async function(event){
		event.preventDefault();
		var errorMessage = validateLoginInputs();
		if (errorMessage !== ""){
			Swal.fire({
				icon: 'error',
				title: 'Failed',
				html: '<pre>' + errorMessage + '</pre>',
			});
			return false;
		}
		var email = $("#login-email").val();
		var password = $("#login-password").val();
		password = CryptoJS.MD5(password).toString();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "login.php",
			data: {"email": email, "password": password},
			cache: false,
			success: function(data) {
				console.log(data);
				SlickLoader.disable();
				if (!data["success"]){
					Swal.fire({
						icon: 'error',
						title: 'Failed',
						text: data["error"][1],
					});
					return false;
				}
				console.log(data);
				if (data["isAdmin"] === "1"){
					Swal.fire({
						icon: 'question',
						title: 'Hi admin. 😅',
						html: '<pre>' + `Login as an admin or user?` + '</pre>',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#2fd2bb',
						confirmButtonText: "Admin",
						cancelButtonText: "User",
					}).then((result) => {
						if (result.dismiss === "backdrop") return false;
						Cookies.set('user', data["cookie"]);
						if (result.isConfirmed) {
							window.location.href = '../../admin/users';
						}else{
							window.location.href = '../search/index.html';
						}
					});
				}else{
					Cookies.set('user', data["cookie"]);
					window.location.href = '../search/index.html';
				}
			}
		});
	});
});