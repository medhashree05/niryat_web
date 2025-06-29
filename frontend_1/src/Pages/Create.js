import React, { useState } from 'react';
import './Create.css';

function Create() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account created for ${form.name}`);
  };

  return (
    <div className="create-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button  className='button-1'type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/signin">Sign in</a></p>
    </div>
  );
}

export default Create;
