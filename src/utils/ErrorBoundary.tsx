import ErrorPage from "@/partials/ErrorPage";
import React, { ReactNode } from "react";

/**
 * `ErrorBoundary` is a React component that catches errors in its child components' render methods,
 * lifecycle methods, and constructors. It renders an `ErrorPage` component when an error is caught,
 * and provides a retry mechanism to reset the error state.
 */

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = initialErrorState;
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error: error,
        };
    }

    handleRetry = () => this.setState(initialErrorState);

    render() {
        if (this.state.hasError) {
            return <ErrorPage error={this.state.error} onRetry={this.handleRetry} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

const initialErrorState = { hasError: false, error: undefined };

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}
