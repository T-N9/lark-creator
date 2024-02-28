// Import required modules and functions
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Configure and export the authentication middleware
export default authMiddleware({
  // Define routes that are publicly accessible without authentication
  publicRoutes: ["/site", "/api/uploadthing"],
  // Define routes that are always accessible and do not require authentication information
  ignoredRoutes: ["/no-auth-in-this-route"],
  // Function to execute before the authentication process
  // Currently, it does nothing but can be customized for pre-auth actions
  async beforeAuth(auth, req) {},
  // Function to execute after the authentication process
  async afterAuth(auth, req) {
    // Extract the URL and search parameters from the request
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    let hostname = req.headers;

    // Construct the path including any search parameters
    const pathWithSearchParams = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

    // Check for a custom subdomain in the request and rewrite the URL if present
    const customSubDomain = hostname
      .get("host")
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];

    if (customSubDomain) {
      // Rewrite the URL to include the custom subdomain path
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      );
    }

    // Special handling for sign-in and sign-up routes
    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      // Rewrite to use a specific path for agency sign-in
      return NextResponse.rewrite(new URL(`/agency/sign-in`, req.url));
    }

    // Default handling for the root path and a specific site path
    if (
      url.pathname === "/" ||
      (url.pathname === "site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
      // Rewrite to direct users to the site path
      return NextResponse.rewrite(new URL("/site", req.url));
    }

    // Handling for paths starting with "/agency" or "/subaccount"
    if (
      url.pathname.startsWith("/agency") ||
      url.pathname.startsWith("/subaccount")
    ) {
      // Rewrite to include the original path with search parameters
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }
  },
});

// Middleware configuration
export const config = {
  // Configuration to protect all routes, including API and TRPC routes, using a regex matcher
  // Refer to the Clerk documentation for more information on configuring this middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
