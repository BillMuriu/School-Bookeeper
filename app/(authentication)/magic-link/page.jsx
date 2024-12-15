"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; // Install via: npm install js-cookie

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

        const isValid = decoded && decoded.exp * 1000 > Date.now();
        if (!isValid) {
          throw new Error("Invalid or expired token");
        }

        // Save user data to cookies (or localStorage as needed)
        Cookies.set("username", decoded.email, { secure: true });
        console.log(decoded.email);
        Cookies.set("authToken", token, { secure: true, httpOnly: false });

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
