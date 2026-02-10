import { useState } from 'react';
import './Account.css'; // Import styles

function Account() {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const response = await fetch('http://localhost:8080/flower/SignIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: email, // Assuming ID is the email
                mblNo: mobile,
                pswrd: password
            }),
        });

        const data = await response.text(); // Using .text() to get plain text response
console.log(response + " ----------->>>>>>>>"+ data)
        if (response.status=='302' && data === "SUCCESS") { // Checking if the response is exactly "Success"
            alert('Login Successful!');
            console.log('User Signed In:', data);

            // Store user data in localStorage
            localStorage.setItem('userName', email.split('@')[0]); // Assuming username from email

            // Redirect to home page
            window.location.href = "/";
        } else {
          alert('Login UnSuccessful!');
            setError('Invalid credentials or error. Please try again.');
        }
    } catch (err) {
        setError('Something went wrong. Please try again.');
        console.error('Sign In Error:', err);
    }
};

const handleCreateAccountSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    const response = await fetch('http://localhost:8080/flower/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usrName: username,
        useEmail: email, // Assuming email is used as ID
        usrMbl: mobile,
        usrPwd: password
      }),
    });

    // Get the response as plain text
    const data = await response.text();

    if (response.ok && data === "SUCCESS") {
      
      alert('Account Created Successfully!');
      setIsSignIn(true); // Switch to Sign In form
    } else {
      setError('Account creation failed: ' + data); // Display error message
    }
  } catch (err) {
    setError('Something went wrong. Please try again.');
    console.error('Create Account Error:', err);
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isSignIn ? 'Sign In' : 'Create Account'}</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={isSignIn ? handleSignInSubmit : handleCreateAccountSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle" style={{ marginTop: '10px' }}>
          {isSignIn ? (
            <p>
              New to FlowerCart?{' '}
              <span className="auth-link" onClick={() => setIsSignIn(false)}>
                Create an account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span className="auth-link" onClick={() => setIsSignIn(true)}>
                Sign In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
