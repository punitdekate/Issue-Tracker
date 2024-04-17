//alert message for the otp sent

const forgetOtp = document.getElementById('forget-password');
const loader = document.getElementById('loader');
const userPasswordReset = document.getElementById('user-password-reset');

console.log(forgetOtp);
// forgetOtp.addEventListener('click', (event) => {
//     event.preventDefault();
//     loader.style.display = 'block';
//     const formData = new FormData(userPasswordReset);
//     const email = formData.get("email");
//     const postData = { email: email };
//     console.log(email);
//     // fetch('http://localhost:4700/forget-password', {
//     //     method: 'POST',
//     //     body: JSON.stringify(postData)
//     // }).then(response => {
//     //     loader.style.display = 'none';
//     // }).catch(error => {
//     //     loader.style.display = 'block';
//     // })
// });

// const timer = document.getElementById('timer');

// setInterval(()=>{

// },1000)