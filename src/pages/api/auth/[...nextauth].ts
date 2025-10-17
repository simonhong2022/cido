import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  // ...add callbacks, pages, etc. as needed
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;
      // Step 1: Send verification code to email
      try {
        const res = await fetch(
          "https://cidobackend-gaf0dte7ajbnfqb5.koreacentral-01.azurewebsites.net/api/users/send-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.CIDO_API_KEY || "YOUR_API_KEY_HERE",
            },
            body: JSON.stringify({ email: user.email }),
          }
        );
        if (!res.ok) {
          const error = await res.json();
          console.error(error.message || "인증 코드 전송에 실패했습니다.");
          return false;
        }
      } catch (err) {
        console.error("네트워크 오류가 발생했습니다.");
        return false;
      }
      // Step 2: Verify code and register
      try {
        const res = await fetch(
          "https://cidobackend-gaf0dte7ajbnfqb5.koreacentral-01.azurewebsites.net/api/users/verify-and-register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.CIDO_API_KEY || "YOUR_API_KEY_HERE",
            },
            body: JSON.stringify({
              email: user.email,
              username: user.name, // Use name as username
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              // add more fields as needed
            }),
          }
        );
        if (!res.ok) {
          const error = await res.json();
          console.error(error.message || "회원가입에 실패했습니다.");
          return false;
        }
      } catch (err) {
        console.error("네트워크 오류가 발생했습니다.");
        return false;
      }
      return true; // Continue sign in
    },
  },
});
