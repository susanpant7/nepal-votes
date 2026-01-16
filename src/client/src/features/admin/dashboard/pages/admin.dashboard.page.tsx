import {showNotification} from "@/components/toaster/toaster.utils.ts";
import {AdminStatCard} from "@/features/admin/dashboard/components/admin-dashboard-stat-card.tsx";
import {CheckCircle2, TrendingUp, Map, Users} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export const AdminDashboardPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Nepal Votes Overview</h1>
                <button
                    onClick={() => showNotification.success("Data Refreshed")}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
                >
                    Download Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AdminStatCard title="Total Voters" value="17,984,210" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <AdminStatCard title="Ballots Cast" value="12,102,440" icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />} />
                <AdminStatCard title="Total Seats" value="275" icon={<Map className="h-4 w-4 text-muted-foreground" />} />
                <AdminStatCard title="Live Centers" value="10,892" icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader><CardTitle>Provincial Representation</CardTitle></CardHeader>
                    <CardContent className="h-75 flex items-center justify-center border-2 border-dashed rounded-md">
                        {/*  */}
                        <span className="text-muted-foreground text-sm">Province-wise Chart Placeholder</span>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader><CardTitle>Recent Verified Results</CardTitle></CardHeader>
                    <CardContent>
                        {/* List of recent updates */}
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Kathmandu District - Verified 10m ago</p>
                            <p className="text-sm text-muted-foreground">Lalitpur District - Verified 22m ago</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
