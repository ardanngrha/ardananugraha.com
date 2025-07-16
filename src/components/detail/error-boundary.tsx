'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { FaExclamationTriangle, FaSync, FaHome, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: string) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorString = errorInfo.componentStack || error.stack || 'Unknown error';

    this.setState({
      errorInfo: errorString,
    });

    // Call the onError callback if provided
    this.props.onError?.(error, errorString);

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8" role="alert" aria-live="assertive">
          <div className="max-w-md mx-auto text-center space-y-6">
            {/* Error Icon */}
            <div className="flex justify-center" role="img" aria-label="Error occurred">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="w-8 h-8 text-destructive" aria-hidden="true" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Something went wrong</h3>
              <p className="text-muted-foreground">
                We encountered an error while loading this content. This might be a temporary issue.
              </p>
            </div>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-muted p-4 rounded-lg text-sm">
                <summary className="cursor-pointer font-medium mb-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  Error Details (Development)
                </summary>
                <pre className="whitespace-pre-wrap text-xs text-muted-foreground" role="log">
                  {this.state.error.message}
                  {this.state.errorInfo && `\n\n${this.state.errorInfo}`}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <nav className="flex flex-col sm:flex-row gap-3 justify-center" aria-label="Error recovery options">
              <Button
                onClick={this.handleRetry}
                className="flex items-center gap-2 min-h-[44px] touch-manipulation"
                aria-label="Try to reload the content"
              >
                <FaSync className="w-4 h-4" aria-hidden="true" />
                Try Again
              </Button>

              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 min-h-[44px] touch-manipulation"
              >
                <Link href="/" aria-label="Go to homepage">
                  <FaHome className="w-4 h-4" aria-hidden="true" />
                  Go Home
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specialized error boundary for MDX content
interface MDXErrorBoundaryProps {
  children: ReactNode;
  contentType?: 'project' | 'writing';
  contentTitle?: string;
}

export function MDXErrorBoundary({
  children,
  contentType = 'project',
  contentTitle
}: MDXErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: string) => {
    // Log MDX-specific errors
    console.error(`MDX rendering error in ${contentType}:`, {
      title: contentTitle,
      error: error.message,
      stack: errorInfo,
    });
  };

  const fallback = (
    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6 my-8" role="alert" aria-live="polite">
      <div className="flex items-start gap-3">
        <FaExclamationTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-destructive">Content Rendering Error</h4>
            <p className="text-sm text-muted-foreground mt-1">
              There was an issue rendering the content for this {contentType}.
              The content might contain invalid formatting or syntax.
            </p>
          </div>

          <nav className="flex flex-col sm:flex-row gap-2" aria-label="Error recovery options">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center gap-1 min-h-[44px] touch-manipulation"
              aria-label="Reload the page to try again"
            >
              <FaSync className="w-3 h-3" aria-hidden="true" />
              Reload Page
            </Button>

            <Button
              asChild
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 min-h-[44px] touch-manipulation"
            >
              <Link
                href={contentType === 'project' ? '/projects' : '/writings'}
                aria-label={`Back to ${contentType === 'project' ? 'Projects' : 'Writings'} listing`}
              >
                <FaArrowLeft className="w-3 h-3" aria-hidden="true" />
                Back to {contentType === 'project' ? 'Projects' : 'Writings'}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={fallback} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
}

// Hook for handling async errors in components
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);

    // In a real app, you might want to send this to an error reporting service
    // like Sentry, LogRocket, etc.

    // For now, we'll just log it
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service
      // errorReportingService.captureException(error, { context });
    }
  };

  return { handleError };
}