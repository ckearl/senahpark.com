import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Ensure proper API route handling on Amplify
	experimental: {
		serverActions: {
			bodySizeLimit: "2mb",
		},
	},

	// Make sure dynamic routes work properly
	trailingSlash: false,

	// Output configuration for Amplify
	output: "standalone",
};

export default nextConfig;
