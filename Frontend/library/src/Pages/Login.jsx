import { useState } from 'react';
// import supabase from "../Pages/SupabaseClient";
// import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const navigate = useNavigate();

  const handleLogin = async () => {
    // e.preventDefault();

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // if (error) {
    //   alert(error.message);
    // } else {
    //   alert('Login successful!');
    //   navigate('/book');
    // }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>Do not have an account? <a href="/signup">Signup</a></p>
    </div>
  );
}

export default Login;
