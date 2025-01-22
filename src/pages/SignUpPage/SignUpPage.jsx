import React from 'react';
import styleSignUp from './signUp.module.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export function SignUpPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      {/* Sign Up Container */}
      <div className="row border rounded-5 p-3 bg-blue shadow box-area">
        
        {/* Right Box (Now on the Left) */}
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Sign Up</h2>
              <p>Create a new account to get started.</p>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Full Name" />
            </div>
            <div className="input-group mb-3">
              <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" />
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Confirm Password" />
            </div>
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-primary w-100 fs-6">Sign Up</button>
            </div>
            <div className="row">
              <small>Already have an account? <a href="#">Login</a></small>
            </div>
          </div>
        </div>

        {/* Left Box (Now on the Right) */}
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#103cbe' }}>
          <div className="featured-image mb-3">
            <img src="images/logo(2).png" className="img-fluid" style={{ width: '250px' }} alt="Logo" />
          </div>
          <p className="text-white fs-2" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 600 }}>
            Secure Sign Up
          </p>
          <small className="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: "'Courier New', Courier, monospace'" }}>
            Join innovators and technologists on this platform.
          </small>
        </div>
        
      </div>
    </div>
  );
};
