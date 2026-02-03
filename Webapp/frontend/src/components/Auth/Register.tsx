import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      navigate('/dashboard');
    },
    onError: (err: Error) => {
      setError(err.message || 'Registration failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    registerMutation.mutate({ email, password, firstName, lastName });
  };

  return (
    <div className="auth-container" data-testid="register-container-id">
      <div className="auth-card">
        <h1 className="auth-title">{t('auth.register')}</h1>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-field">
              <label>{t('auth.firstName')}</label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.value || '')}
                data-testid="register-firstname-input-id"
              />
            </div>
            <div className="form-field">
              <label>{t('auth.lastName')}</label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.value || '')}
                data-testid="register-lastname-input-id"
              />
            </div>
          </div>

          <div className="form-field">
            <label>{t('auth.email')}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.value || '')}
              required
              data-testid="register-email-input-id"
            />
          </div>
          
          <div className="form-field">
            <label>{t('auth.password')}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.value || '')}
              required
              minLength={8}
              data-testid="register-password-input-id"
            />
          </div>

          <Button
            type="submit"
            themeColor="primary"
            disabled={registerMutation.isPending}
            className="auth-submit"
            data-testid="register-submit-button-id"
          >
            {registerMutation.isPending ? t('common.loading') : t('auth.registerButton')}
          </Button>
        </form>

        <p className="auth-switch">
          {t('auth.hasAccount')}{' '}
          <Link to="/login">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
