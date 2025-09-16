import { Component } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { AlertTriangle } from "lucide-react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Dashboard Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Card className="border-red-200">
                    <CardHeader className="flex flex-row items-center gap-2 text-red-600">
                        <AlertTriangle size={20} />
                        <span>Chart Error</span>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">
                            Unable to load chart data. Please refresh the page or contact support.
                        </p>
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
