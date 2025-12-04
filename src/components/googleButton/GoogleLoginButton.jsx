import { GoogleLogin } from '@react-oauth/google';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const GoogleLoginButton = ({ onLoginSuccess, onLoginError }) => {
    const { login } = useAuth();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await authService.loginWithGoogle(credentialResponse.credential);

            login(response);

            if (onLoginSuccess) {
                onLoginSuccess(response);
            }
        } catch (error) {
            console.error('Error al autenticar con Google:', error);
            if (onLoginError) {
                onLoginError(error);
            }
        }
    };

    const handleGoogleError = () => {
        console.log('Login Failed');
        const error = new Error('Google login failed');
        if (onLoginError) {
            onLoginError(error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                theme="outline"
                size="large"
                width={300}
            />
        </div>
    );
};

export default GoogleLoginButton;