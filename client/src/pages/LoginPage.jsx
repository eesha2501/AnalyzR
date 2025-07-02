import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';
import { auth } from '../firebase';
import { useEffect } from 'react';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/home');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to AnalyzR</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
