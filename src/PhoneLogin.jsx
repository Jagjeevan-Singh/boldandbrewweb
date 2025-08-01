// // src/components/PhoneLogin.jsx
// import { useState } from 'react';
// import { auth, RecaptchaVerifier } from '../firebase';
// import { signInWithPhoneNumber } from 'firebase/auth';

// const PhoneLogin = () => {
//   const [number, setNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [confirmation, setConfirmation] = useState(null);

//   const setUpRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
//       'size': 'invisible',
//       'callback': () => {
//         // reCAPTCHA solved
//       },
//     });
//   };

//   const sendOtp = async () => {
//     setUpRecaptcha();
//     try {
//       const confirmationResult = await signInWithPhoneNumber(auth, number, window.recaptchaVerifier);
//       setConfirmation(confirmationResult);
//       alert('OTP sent!');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const result = await confirmation.confirm(otp);
//       alert(`Welcome ${result.user.phoneNumber}`);
//     } catch (error) {
//       console.error('OTP verification failed', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         value={number}
//         onChange={(e) => setNumber(e.target.value)}
//         placeholder="+91XXXXXXXXXX"
//       />
//       <button onClick={sendOtp}>Send OTP</button>

//       <input
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="Enter OTP"
//       />
//       <button onClick={verifyOtp}>Verify OTP</button>

//       <div id="recaptcha"></div>
//     </div>
//   );
// };

// export default PhoneLogin;