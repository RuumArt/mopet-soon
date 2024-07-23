import { Home } from 'pages/Home';

export const metadata = {
  title: 'About',
  description: '',
  keywords: [''],
  openGraph: {
    title: 'About',
    description: '',
    images: '/og-image.png',
  },
};

export default function Page() {
  return <Home />;
}
