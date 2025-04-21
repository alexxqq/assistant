'use client'

import React from 'react'
import { Button } from '@/src/shared/ui/button';
import { FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const handleGoogleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=openid%20profile%20email&response_type=code`;
    
    window.location.href = authUrl;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">Login / Signup</h1>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <FaGoogle size={20} />
        Continue with Google
      </Button>
    </div>
  )
}
