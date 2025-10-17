# Kakao Authentication Setup Guide

This guide explains how to set up Kakao authentication for the Cido frontend application.

## Prerequisites

1. Kakao Developer Account
2. Kakao App registered in Kakao Developers Console
3. Backend server running with Kakao authentication endpoints

## Environment Variables

Create a `.env.local` file in the `Cidofrontend` directory with the following variables:

```env
# Backend API URL
BACKEND_URL=http://localhost:5000

# Kakao OAuth (from Kakao Developers Console)
NEXT_PUBLIC_KAKAO_JS_KEY=your_kakao_js_key_here
```

## Kakao Developers Console Setup

1. Go to [Kakao Developers Console](https://developers.kakao.com/)
2. Create a new application or select an existing one
3. Go to "앱 설정" > "앱 키" and copy the "JavaScript 키"
4. Go to "제품 설정" > "카카오 로그인" and configure:
   - Redirect URI: `http://localhost:8080/api/auth/kakao/callback` (for development)
   - For production, add your production domain

## Backend Configuration

Make sure your backend has the following environment variables set:

```env
KAKAO_REST_API_KEY=your_kakao_rest_api_key
KAKAO_CLIENT_SECRET=your_kakao_client_secret
KAKAO_REDIRECT_URI=http://localhost:8080/api/auth/kakao/callback
```

## How It Works

### Authentication Flow

1. **User clicks Kakao login button** on the login page
2. **Kakao SDK opens popup** for user authentication
3. **User authorizes the app** on Kakao's website
4. **Kakao returns access token** to the frontend
5. **Frontend sends access token** to backend via `/api/auth/kakao`
6. **Backend verifies token** with Kakao and creates/updates user
7. **Backend returns user data** and sets authentication cookies
8. **Frontend updates auth state** and redirects user

### API Endpoints

The frontend provides these API routes that proxy to the backend:

- `POST /api/auth/login` - Regular username/password login
- `POST /api/auth/kakao` - Kakao authentication with access token
- `GET /api/auth/kakao/callback` - Kakao OAuth callback handler
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user information

### Components

- **AuthContext** (`src/contexts/AuthContext.tsx`) - Manages authentication state
- **Login Page** (`src/pages/login/index.tsx`) - Login form with Kakao integration
- **NavigationBar** (`src/components/NavigationBar/NavigationBar.tsx`) - Shows user info and logout

## Testing

1. Start the backend server: `cd Cidobackend && python app.py`
2. Start the frontend server: `cd Cidofrontend && npm run dev`
3. Navigate to `http://localhost:8080/login`
4. Click the Kakao login button to test the authentication flow

## Troubleshooting

### Common Issues

1. **"Kakao SDK not loaded" error**
   - Check if the Kakao JavaScript SDK is properly loaded in `_document.tsx`
   - Verify `NEXT_PUBLIC_KAKAO_JS_KEY` is set correctly

2. **"Access token is required" error**
   - Ensure Kakao login popup completed successfully
   - Check browser console for Kakao SDK errors

3. **Backend connection errors**
   - Verify `BACKEND_URL` environment variable
   - Ensure backend server is running and accessible
   - Check CORS settings on backend

4. **Redirect URI mismatch**
   - Verify redirect URI in Kakao Developers Console matches your setup
   - For development: `http://localhost:8080/api/auth/kakao/callback`

### Debug Mode

Enable debug logging by adding this to your browser console:
```javascript
localStorage.setItem('debug', 'kakao:*');
```

## Security Notes

- Never expose Kakao client secret in frontend code
- Use HTTPS in production
- Validate all tokens on the backend
- Implement proper CORS policies
- Use secure cookie settings for authentication tokens
