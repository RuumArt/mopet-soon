import fs from 'fs';
import path from 'path';
import { siteUrlEnv } from "constants/vars";

export default function sitemap() {
	const appDirectory = path.join(process.cwd(), 'src/app');
	const folders = fs
		.readdirSync(appDirectory, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.filter(folderName => !/^\(.*\)$/.test(folderName));

	const sitemapArray = [
		{
			url: `${siteUrlEnv}`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		...folders
			.filter(folder => {
				return fs.existsSync(path.join(appDirectory, folder, 'page.js'));
			})
			.map(folder => {
				return {
					url: `${siteUrlEnv}/${folder}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: 0.8,
				};
			}),
	];

	return sitemapArray;
}
