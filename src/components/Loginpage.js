import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import getAuth, createUserWithEmailAndPassword, and signInWithEmailAndPassword from Firebase Auth
import { auth, firestore, database } from '../firebase'; // Import firestore and database objects from Firebase
import "../styles/login.css";

function Loginpage() {
  const [bounceDirection, setBounceDirection] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [barangay, setBarangay] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpClick = () => {
    setBounceDirection('left');
  };

  const handleLoginClick = () => {
    setBounceDirection('right');
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleBarangayChange = (e) => {
    setBarangay(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        firestore.collection('users').doc(user.uid).set({
          fullName: fullName,
          email: email,
          mobile: mobile,
          barangay: barangay,
          approved: false // Default to false until admin approval
        })
        .then(() => {
          console.log('User data saved to Firestore');
        })
        .catch((error) => {
          console.error('Error saving user data to Firestore:', error);
        });
        database.ref('users/' + user.uid).set({
          email: email,
          fullName: fullName,
          approved: false // Default to false until admin approval
        });
        console.log('User signed up:', user);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error('Error signing up:', error);
      });
  };
  

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password) // Use signInWithEmailAndPassword function
      .then((userCredential) => {
        // Handle successful login
        const user = userCredential.user;
        console.log('User logged in:', user);
      })
      .catch((error) => {
        // Handle login error
        setErrorMessage(error.message);
        console.error('Error logging in:', error);
      });
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
            <button className="user_unregistered-signup" onClick={handleSignUpClick}>Sign up</button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
            <button className="user_registered-login" onClick={handleLoginClick}>Login</button>
          </div>
        </div>

        <div className={`user_options-forms ${bounceDirection === 'left' ? 'bounceLeft' : ''} ${bounceDirection === 'right' ? 'bounceRight' : ''}`}>
          <div className="user_forms-signup">
            <h2 className="forms_title">Sign Up</h2>
            <form className="forms_form" onSubmit={handleSignUpSubmit}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input type="text" placeholder="Full Name" className="forms_field-input" value={fullName} onChange={handleFullNameChange} required />
                </div>
                <div className="forms_field">
                  <input type="email" placeholder="Email" className="forms_field-input" value={email} onChange={handleEmailChange} required />
                </div>
                <div className="forms_field">
                  <input type="tel" placeholder="Mobile Number" className="forms_field-input" pattern="[0-9]{11}" title="Please enter 11 digit Philippine mobile number" value={mobile} onChange={handleMobileChange} required />
                </div>
                <div className="forms_field">
                  <select className="forms_field-input" value={barangay} onChange={handleBarangayChange} required>
                  <option value="">Select Barangay</option>
  <option value="Anoling 1st">Anoling 1st</option>
  <option value="Anoling 2nd">Anoling 2nd</option>
  <option value="Anoling 3rd">Anoling 3rd</option>
  <option value="Bacabac">Bacabac</option>
  <option value="Bacsay">Bacsay</option>
  <option value="Bancay 1st">Bancay 1st</option>
  <option value="Bilad">Bilad</option>
  <option value="Birbira">Birbira</option>
  <option value="Bobon 1st Casarratan">Bobon 1st Casarratan</option>
  <option value="Bobon 2nd">Bobon 2nd</option>
  <option value="Bobon Caarosipan">Bobon Caarosipan</option>
  <option value="Cabanabaan">Cabanabaan</option>
  <option value="Cacamilingan Norte (with Kipping village)">Cacamilingan Norte (with Kipping village)</option>
  <option value="Cacamilingan Sur">Cacamilingan Sur</option>
  <option value="Caniag">Caniag</option>
  <option value="Carael">Carael</option>
  <option value="Cayaoan">Cayaoan</option>
  <option value="Cayasan">Cayasan</option>
  <option value="Florida">Florida</option>
  <option value="Lasong">Lasong</option>
  <option value="Libueg (with sitio Pugo)">Libueg (with sitio Pugo)</option>
  <option value="Malacampa (With sitio Cacelestinuan and Sitio Camartinisan)">Malacampa (With sitio Cacelestinuan and Sitio Camartinisan)</option>
  <option value="Manaquem">Manaquem</option>
  <option value="Manupeg">Manupeg</option>
  <option value="Marawi">Marawi</option>
  <option value="Matubog">Matubog</option>
  <option value="Nagrambacan">Nagrambacan</option>
  <option value="Nagserialan">Nagserialan</option>
  <option value="Palimbo Proper">Palimbo Proper</option>
  <option value="Palimbo Caarosipan">Palimbo Caarosipan</option>
  <option value="Pao 1st">Pao 1st</option>
  <option value="Pao 2nd">Pao 2nd</option>
  <option value="Pao 3rd">Pao 3rd</option>
  <option value="Papaac">Papaac</option>
  <option value="Pindangan 1st">Pindangan 1st</option>
  <option value="Pindangan 2nd">Pindangan 2nd</option>
  <option value="Poblacion A">Poblacion A</option>
  <option value="Poblacion B">Poblacion B</option>
  <option value="Poblacion C">Poblacion C</option>
  <option value="Poblacion D">Poblacion D</option>
  <option value="Poblacion E">Poblacion E</option>
  <option value="Poblacion F">Poblacion F</option>
  <option value="Poblacion G">Poblacion G</option>
  <option value="Poblacion H">Poblacion H</option>
  <option value="Poblacion I">Poblacion I</option>
  <option value="Poblacion J">Poblacion J</option>
  <option value="San Isidro (Bancay 2nd)">San Isidro (Bancay 2nd)</option>
  <option value="Santa Maria">Santa Maria</option>
  <option value="Sawat">Sawat</option>
  <option value="Sinilian 1st (with Sitio Cabalaongan and Nangalisan)">Sinilian 1st (with Sitio Cabalaongan and Nangalisan)</option>
  <option value="Sinilian 2nd (with Sitio Barikir)">Sinilian 2nd (with Sitio Barikir)</option>
  <option value="Sinilian 3rd (Northern, Bitawa, Centro)">Sinilian 3rd (Northern, Bitawa, Centro)</option>
  <option value="Sinilian Cacalibosuan">Sinilian Cacalibosuan</option>
  <option value="Sinulatan 1st">Sinulatan 1st</option>
  <option value="Sinulatan 2nd">Sinulatan 2nd</option>
  <option value="Surgui 1st">Surgui 1st</option>
  <option value="Surgui 2nd">Surgui 2nd</option>
  <option value="Surgui 3rd">Surgui 3rd</option>
  <option value="Tambugan">Tambugan</option>
  <option value="Telbang">Telbang</option>
  <option value="Tuec">Tuec</option>
</select>
                </div>
                <div className="forms_field">
                  <input type="password" placeholder="Password" className="forms_field-input" value={password} onChange={handlePasswordChange} required />
                </div>
                <div className="forms_field">
                  <input type="password" placeholder="Confirm Password" className="forms_field-input" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input type="submit" value="Sign up" className="forms_buttons-action" />
              </div>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>

          <div className="user_forms-login">
            <h2 className="forms_title">Login</h2>
            <form className="forms_form" onSubmit={handleLoginSubmit}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input type="email" placeholder="Email" className="forms_field-input" value={email} onChange={handleEmailChange} required />
                </div>
                <div className="forms_field">
                  <input type="password" placeholder="Password" className="forms_field-input" value={password} onChange={handlePasswordChange} required />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input type="submit" value="Login" className="forms_buttons-action" />
              </div>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loginpage;
