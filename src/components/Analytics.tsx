import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Target,
  Recycle,
  Truck
} from "lucide-react";

const Analytics = () => {
  const wasteComposition = [
    { type: "Organic", percentage: 45, color: "bg-success", trend: "+3%" },
    { type: "Plastic", percentage: 25, color: "bg-blue-500", trend: "-5%" },
    { type: "Paper", percentage: 15, color: "bg-warning", trend: "+2%" },
    { type: "Metal", percentage: 8, color: "bg-purple-500", trend: "+1%" },
    { type: "Glass", percentage: 7, color: "bg-cyan-500", trend: "-1%" }
  ];

  const monthlyTrends = [
    { month: "Jan", collected: 2400, recycled: 1800 },
    { month: "Feb", collected: 2800, recycled: 2100 },
    { month: "Mar", collected: 3200, recycled: 2500 },
    { month: "Apr", collected: 2900, recycled: 2300 },
    { month: "May", collected: 3400, recycled: 2700 },
    { month: "Jun", collected: 3100, recycled: 2600 }
  ];

  const kpis = [
    {
      title: "Recycling Rate",
      value: "84%",
      target: "85%",
      trend: "+2.1%",
      icon: Recycle,
      color: "text-success"
    },
    {
      title: "Collection Efficiency",
      value: "92%",
      target: "90%",
      trend: "+5.3%",
      icon: Truck,
      color: "text-blue-500"
    },
    {
      title: "Citizen Participation",
      value: "78%",
      target: "80%",
      trend: "+1.8%",
      icon: Target,
      color: "text-warning"
    }
  ];

  const topPerformingAreas = [
    { area: "Tech Park", score: 96, reports: 45, collections: 12 },
    { area: "MG Road", score: 94, reports: 38, collections: 15 },
    { area: "Sector 5", score: 89, reports: 52, collections: 18 },
    { area: "University", score: 87, reports: 28, collections: 8 },
    { area: "City Mall", score: 85, reports: 31, collections: 11 }
  ];

  return (
    <section id="analytics" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Analytics & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data-driven insights to optimize waste management operations
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2 mb-2">
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="text-sm text-muted-foreground">/ {kpi.target}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">{kpi.trend}</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Waste Composition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-primary" />
                Waste Composition
              </CardTitle>
              <CardDescription>
                Breakdown of waste types collected this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wasteComposition.map((waste, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${waste.color}`}></div>
                        <span className="text-sm font-medium">{waste.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{waste.percentage}%</span>
                        <Badge 
                          variant={waste.trend.startsWith('+') ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {waste.trend}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${waste.color}`}
                        style={{ width: `${waste.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Collection Trends
              </CardTitle>
              <CardDescription>
                Monthly waste collection and recycling data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex space-x-4">
                        <span className="text-muted-foreground">
                          Collected: {month.collected}kg
                        </span>
                        <span className="text-success">
                          Recycled: {month.recycled}kg
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-primary rounded-full"
                          style={{ width: `${(month.collected / 3500) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-success rounded-full"
                          style={{ width: `${(month.recycled / 3500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Areas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Performing Areas</CardTitle>
              <CardDescription>
                Areas with highest efficiency scores and citizen participation
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topPerformingAreas.map((area, index) => (
                <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="text-lg font-bold text-primary mb-1">#{index + 1}</div>
                  <div className="font-medium mb-2">{area.area}</div>
                  <div className="text-2xl font-bold mb-2">{area.score}</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>{area.reports} reports</div>
                    <div>{area.collections} collections</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-eco">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Report
            </Button>
            <Button variant="outline" size="lg">
              <Download className="h-5 w-5 mr-2" />
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;