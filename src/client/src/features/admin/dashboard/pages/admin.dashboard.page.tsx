import { showNotification } from "@/components/toaster/toaster.utils.ts";
import { AdminStatCard } from "@/features/admin/dashboard/components/admin-dashboard-stat-card.tsx";
import { CheckCircle2, TrendingUp, Map, Users, LayoutDashboard, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { AdminPage, AdminPageContent, AdminPageHeader } from "@/features/admin/layout/components/admin-page-layout.tsx";
import { Button } from "@/components/ui/button.tsx";

export const AdminDashboardPage = () => {
    return (
        <AdminPage>
            <AdminPageHeader
                title="Nepal Votes Overview"
                description="Live statistical summary and provincial representation."
                icon={<LayoutDashboard className="h-8 w-8" />}
                actions={
                    <Button
                        onClick={() => showNotification.success("Data Refreshed")}
                        size="sm"
                        className="shadow-sm"
                    >
                        <Download className="mr-2 h-4 w-4" /> Download Report
                    </Button>
                }
            />

            <AdminPageContent>
                <div className="space-y-6 pb-6">
                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <AdminStatCard title="Total Voters" value="17,984,210" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                        <AdminStatCard title="Ballots Cast" value="12,102,440" icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />} />
                        <AdminStatCard title="Total Seats" value="275" icon={<Map className="h-4 w-4 text-muted-foreground" />} />
                        <AdminStatCard title="Live Centers" value="10,892" icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4 shadow-sm">
                            <CardHeader><CardTitle>Provincial Representation</CardTitle></CardHeader>
                            <CardContent className="h-75 flex items-center justify-center border-2 border-dashed rounded-md bg-muted/20">
                                <span className="text-muted-foreground text-sm">Province-wise Chart Placeholder</span>
                            </CardContent>
                        </Card>

                        <Card className="col-span-3 shadow-sm">
                            <CardHeader><CardTitle>Recent Verified Results</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">Kathmandu District - Verified 10m ago</p>
                                    <p className="text-sm text-muted-foreground">Lalitpur District - Verified 22m ago</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AdminPageContent>
        </AdminPage>
    )
}
