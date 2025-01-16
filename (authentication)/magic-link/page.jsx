"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie"; // Install via: npm install js-cookie
import { jwtDecode } from "jwt-decode";

const MagicLinkPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleMagicLink = async () => {
      const token = searchParams.get("token"); // Get token from query params

      if (!token) {
        console.error("No token found in the URL");
        router.push("/sign-in"); // Redirect to login if no token
        return;
      }

      try {
        // Decode the token to extract user information
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        // Set expiration time for the cookie (e.g., 1 hour from now)
        const expirationDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour in milliseconds

        // Save user data to cookies
        Cookies.set("username", decoded.email, {
          secure: true,
          expires: expirationDate,
        });
        Cookies.set("authToken", token, {
          secure: true,
          expires: expirationDate,
          httpOnly: false,
        });

        // Redirect to the dashboard
        router.push("/");
      } catch (error) {
        console.error("Error processing the magic link:", error.message);
        router.push("/sign-in"); // Redirect to login on error
      }
    };

    handleMagicLink();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium text-gray-700">
        Processing your login...
      </p>
    </div>
  );
};

export default MagicLinkPage;
