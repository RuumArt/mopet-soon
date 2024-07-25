import { getDictionary } from 'utils/getDictionary';

import { TestPage } from 'pages/TestPage';
import { Wrapper } from '../../(components)/wrapper';

export default async function Page({ params: { lang } }) {
  return (
    <Wrapper>
      <TestPage />
    </Wrapper>
  );
}
