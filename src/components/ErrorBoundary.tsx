import * as React from "react";
import { I18nContext } from "@/contexts/I18nContext";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  static contextType = I18nContext;
  declare context: React.ContextType<typeof I18nContext>;
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{this.context?.t("errorBoundary.title") ?? "Something went wrong"}</h1>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                {this.context?.t("errorBoundary.reload") ?? "Reload Page"}
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

