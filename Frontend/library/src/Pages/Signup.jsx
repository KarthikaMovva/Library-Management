import { useState } from 'react';
// import supabase from "../Pages/SupabaseClient";
// import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const navigate = useNavigate();

  const handleSignup = async () => {
    // e.preventDefault();

    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });

    // if (error) {
    //   alert(error.message);
    // } else {
    //   alert('Signup successful! Please check your email to confirm.');
    //   navigate('/book');
    // }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}

export default Signup;
