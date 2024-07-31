import fs from 'fs';
import path from 'path';

export default function sitemap() {
	const appDirectory = path.join(process.cwd(), 'src/app');
	const folders = fs
		.readdirSync(appDirectory, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)
		.filter(folderName => !/^\(.*\)$/.test(folderName));

	const sitemapArray = [
		{
			url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
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
					url: `${process.env.NEXT_PUBLIC_SITE_URL}/${folder}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: 0.8,
				};
			}),
	];

	return sitemapArray;
}
