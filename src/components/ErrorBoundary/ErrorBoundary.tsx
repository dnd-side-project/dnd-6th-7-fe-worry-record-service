import { Component, ErrorInfo } from 'react';
import CustomError from '~/lib/util/CustomError';

export default class ErrorBoundary extends Component<any, any> {
  state: any = {
    hasError: false,
  };

  static getDerivedStateFromError(): any {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Error Boundary:', error, errorInfo);

    if (error instanceof CustomError) {
      error.executeErrorHandler();
    }
  }

  resetErrorBoundary = () => {
    // ErrorBoundary state를 초기화
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return this.props.fallback({
        hasError,
        reset: this.resetErrorBoundary,
      });
    }

    return this.props.children;
  }
}
