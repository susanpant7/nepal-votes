import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";

export interface DashboardCardProps {
    title: string;
    description: string;
    linkName: string;
    linkToUrl: string;
}
const DashboardCard = (props:DashboardCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                    {props.description}
                </p>
                <div className="flex gap-2">
                    <Link to={props.linkToUrl}>
                        <Button size="sm" variant="outline">
                            {props.linkName}
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;