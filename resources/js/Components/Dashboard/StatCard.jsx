import {
    Card,
    CardContent,
    CardHeader,
} from "@/Components/ui/card";

export default function StatCard({ title, value, icon: Icon, formatter }) {
    const displayValue = formatter ? formatter(value) : value;
    
    return (
        <Card>
            <CardHeader className="flex flex-row gap-2">
                {title}
                <Icon />
            </CardHeader>
            <CardContent className="text-4xl">
                {displayValue}
            </CardContent>
        </Card>
    );
}