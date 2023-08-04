import type { FC } from 'react';
import Container from '@/components/layouts/Container';

type Props = {
  statusCode?: number | null;
  error?: Error;
  message?: string;
  errorId?: string;
  children?: never;
};

export const ErrorPage: FC<Props> = (props) => {
  const { error, errorId, message, statusCode } = props;

  return (
    <Container title="Woops! Something went wrong">
      <main className="mx-auto flex w-full max-w-7xl grow flex-col px-4 sm:px-6 lg:px-8">
        <div className="my-auto shrink-0 py-16 sm:py-32">
          <p className="text-primary-50 text-base font-semibold">
            {statusCode}
          </p>
          <h1
            data-testid="error-title"
            className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl sm:tracking-tight"
          >
            Woops!
          </h1>
          <p className="mt-2 text-base text-neutral-50">
            Something went wrong. Please try again later
          </p>
          <div className="mt-6 max-w-lg text-base text-neutral-50">
            {statusCode && (
              <p data-testid="error-status-code">
                Code: <code>{statusCode}</code>
              </p>
            )}
            {message && (
              <p>
                Message: <code>{message}</code>
              </p>
            )}
            {errorId && (
              <p>
                Error id: <code>{errorId}</code>
              </p>
            )}
            {error?.message && (
              <p>
                Error message: <code>{error?.message}</code>
              </p>
            )}
          </div>
        </div>
      </main>
    </Container>
  );
};
