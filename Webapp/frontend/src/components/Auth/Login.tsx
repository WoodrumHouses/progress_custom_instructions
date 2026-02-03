import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      navigate('/dashboard');
    },
    onError: () => {
      setError('Invalid credentials');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="auth-container" data-testid="login-container-id">
      <div className="auth-card">
        <h1 className="auth-title">{t('auth.login')}</h1>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label>{t('auth.email')}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.value || '')}
              required
              data-testid="login-email-input-id"
            />
          </div>
          
          <div className="form-field">
            <label>{t('auth.password')}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.value || '')}
              required
              data-testid="login-password-input-id"
            />
          </div>

          <Button
            type="submit"
            themeColor="primary"
            disabled={loginMutation.isPending}
            className="auth-submit"
            data-testid="login-submit-button-id"
          >
            {loginMutation.isPending ? t('common.loading') : t('auth.loginButton')}
          </Button>
        </form>

        <p className="auth-switch">
          {t('auth.noAccount')}{' '}
          <Link to="/register">{t('auth.register')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
