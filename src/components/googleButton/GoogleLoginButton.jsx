import { useGoogleLogin } from '@react-oauth/google';
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

    const handleGoogleError = (err) => {
        console.log('Login Failed', err);
        const error = err instanceof Error ? err : new Error('Google login failed');
        if (onLoginError) {
            onLoginError(error);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
        flow: 'implicit'
    });

    return (
        <div className="flex justify-center w-full my-4">
            <div className="w-full max-w-[520px]">
                <button
                    type="button"
                    onClick={() => googleLogin()}
                    aria-label="Iniciar sesión con Google"
                    className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-md border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/6"
                >
                    <span className="flex items-center justify-center w-5 h-5">
                        {/* Official Google G multicolor svg */}
                        <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M533.5 278.4c0-18.8-1.6-37-4.6-54.6H272v103.3h146.9c-6.4 34.6-25.6 63.9-54.6 83.6v69.6h88.2c51.6-47.5 81-117.6 81-201.9z"/>
                            <path fill="#34A853" d="M272 544.3c73.8 0 135.7-24.4 180.9-66.3l-88.2-69.6c-24.6 16.5-56 26.3-92.7 26.3-71 0-131-47.9-152.3-112.2H28.8v70.5C74 494.1 167.2 544.3 272 544.3z"/>
                            <path fill="#FBBC05" d="M119.7 323.1c-10.9-32.6-10.9-67.6 0-100.2V152.4H28.8c-39.6 77-39.6 171.1 0 248.1l90.9-77.4z"/>
                            <path fill="#EA4335" d="M272 109.7c39.8 0 75.6 13.7 103.8 40.6l77.8-77.8C407.4 24 345.5 0 272 0 167.2 0 74 50.2 28.8 152.4l90.9 70.5C141 157.6 201 109.7 272 109.7z"/>
                        </svg>
                    </span>
                    <span className="text-sm">Iniciar sesión con Google</span>
                </button>
            </div>
        </div>
    );
};

export default GoogleLoginButton;