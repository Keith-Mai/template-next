import { ErrorPage } from '@/modules/system/ErrorPage';

export default function ErrorPageRoute() {
  return (
    <ErrorPage
      statusCode={500}
      message={'ErrorPage preview'}
      errorId={'xxxxx-xxxxx-xxxxx-xxxxx'}
      error={new Error('ErrorPage example error')}
    />
  );
}
