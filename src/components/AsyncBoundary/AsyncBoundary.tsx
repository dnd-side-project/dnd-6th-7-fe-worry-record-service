import React, { ComponentProps, Suspense } from 'react';
import ErrorBoundary from 'react-native-error-boundary';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface Props extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: ComponentProps<typeof Suspense>['fallback'];
  rejectedFallback: ErrorBoundaryProps['FallbackComponent'];
}

function AsyncBoundary({
  pendingFallback,
  rejectedFallback,
  children,
}: Props): any {
  return (
    <ErrorBoundary FallbackComponent={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
