import React, { Component, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error,
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error 
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI 
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children;
  }
}

export default ErrorBoundary;