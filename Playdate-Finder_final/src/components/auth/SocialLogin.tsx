import React from 'react';
import { Button } from '../common/Button';

interface SocialLoginProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
}

export function SocialLogin({ onGoogleLogin, onFacebookLogin }: SocialLoginProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onGoogleLogin}
          className="flex items-center justify-center"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Google
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onFacebookLogin}
          className="flex items-center justify-center"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
            alt="Facebook"
            className="w-5 h-5 mr-2"
          />
          Facebook
        </Button>
      </div>
    </div>
  );
}