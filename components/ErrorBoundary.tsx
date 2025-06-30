import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)

    // Log to external service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      // You can add error reporting service here
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="min-h-screen dark-gradient-bg starry-bg shooting-stars flex items-center justify-center p-4">
      <div className="text-center glass-card rounded-2xl p-8 border border-white/20 relative z-10 max-w-md">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
        <p className="text-white/80 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left bg-black/20 rounded-lg p-4 mb-4">
            <summary className="text-yellow-400 cursor-pointer font-medium">Error Details</summary>
            <pre className="text-xs text-red-400 mt-2 whitespace-pre-wrap">{error.message}</pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105"
          >
            🔄 Refresh Page
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
