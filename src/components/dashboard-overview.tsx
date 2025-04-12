import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BedDouble,
  CalendarClock,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { BookingsList } from "@/components/bookings-list"
import { OccupancyChart } from "@/components/occupancy-chart"
import { RevenueChart } from "@/components/revenue-chart"

export function DashboardOverview() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Hotel performance overview and recent activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Occupancy Rate"
          value="78%"
          change="+5.2%"
          trend="up"
          icon={<BedDouble className="h-5 w-5" />}
        />
        <MetricCard
          title="Revenue"
          value="$12,580"
          change="+12.3%"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Bookings"
          value="156"
          change="-3.8%"
          trend="down"
          icon={<CalendarClock className="h-5 w-5" />}
        />
        <MetricCard title="Guests" value="243" change="+8.7%" trend="up" icon={<Users className="h-5 w-5" />} />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
                <CardDescription>Daily occupancy rate for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <OccupancyChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Room Status</CardTitle>
                <CardDescription>Current room occupancy status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-center rounded-full bg-green-100 p-2 text-green-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-xs text-muted-foreground">Occupied</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-center rounded-full bg-blue-100 p-2 text-blue-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Reserved</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-center rounded-full bg-amber-100 p-2 text-amber-600">
                      <BedDouble className="h-6 w-6" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-muted-foreground">Available</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-center rounded-full bg-red-100 p-2 text-red-600">
                      <XCircle className="h-6 w-6" />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Maintenance</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking activity</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <BookingsList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Content</CardTitle>
              <CardDescription>Detailed analytics will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Content</CardTitle>
              <CardDescription>Detailed reports will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Reports dashboard content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  // Convert dollar values to KSh if the value starts with $
  const displayValue = value.startsWith("$")
    ? `KSh ${Number.parseInt(value.replace("$", "").replace(",", "")) * 100}`
    : value

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{icon}</div>
          <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {change}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{displayValue}</div>
          <div className="text-xs text-muted-foreground">{title}</div>
        </div>
      </CardContent>
    </Card>
  )
}

