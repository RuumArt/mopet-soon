import { siteUrlEnv } from "constants/vars";

export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/private/',
		},
		sitemap: `${siteUrlEnv}/sitemap.xml`,
	};
}