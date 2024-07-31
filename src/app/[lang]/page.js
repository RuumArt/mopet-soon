import { Home } from 'pages/Home';
import { getDictionary } from 'utils/getDictionary';
import { Wrapper } from '../(components)/wrapper';

export async function generateMetadata({ params: { lang } }) {
  const intl = await getDictionary(lang);
  const { meta } = intl;

  return {
    ...meta,
  }
}

export default async function Page({ params: { lang } }) {
  const intl = await getDictionary(lang);

  return (
    <Wrapper>
      <Home data={intl} />
    </Wrapper>
  );
}
