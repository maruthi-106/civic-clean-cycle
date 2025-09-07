import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  TrendingUp, 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Recycle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Waste Collected",
      value: "2,847 kg",
      change: "+12%",
      icon: Trash2,
      color: "text-primary"
    },
    {
      title: "Active Reports",
      value: "23",
      change: "-8%",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Routes Optimized",
      value: "156",
      change: "+25%",
      icon: MapPin,
      color: "text-success"
    },
    {
      title: "Citizens Engaged",
      value: "1,234",
      change: "+18%",
      icon: Users,
      color: "text-blue-500"
    }
  ];

  const recentReports = [
    {
      id: "R001",
      type: "Overflowing Bin",
      location: "Sector 5, Hyderabad",
      status: "pending",
      time: "2 mins ago",
      priority: "high"
    },
    {
      id: "R002", 
      type: "Illegal Dumping",
      location: "MG Road, Bangalore",
      status: "assigned",
      time: "15 mins ago",
      priority: "medium"
    },
    {
      id: "R003",
      type: "Broken Bin",
      location: "Connaught Place, Delhi",
      status: "resolved",
      time: "1 hour ago",
      priority: "low"
    }
  ];

  const binStatus = [
    { id: "BIN001", location: "Sector 5", fill: 85, status: "critical" },
    { id: "BIN002", location: "MG Road", fill: 60, status: "moderate" },
    { id: "BIN003", location: "CP Metro", fill: 30, status: "low" },
    { id: "BIN004", location: "Tech Park", fill: 90, status: "critical" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning text-warning-foreground";
      case "assigned": return "bg-blue-500 text-white";
      case "resolved": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFillColor = (fill: number) => {
    if (fill >= 80) return "text-destructive";
    if (fill >= 60) return "text-warning";
    return "text-success";
  };

  return (
    <section id="dashboard" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Real-Time Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor waste collection, track reports, and optimize routes in real-time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>
                  {" "}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                Recent Reports
              </CardTitle>
              <CardDescription>
                Latest citizen reports and their status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{report.type}</span>
                      <Badge variant="outline" className="text-xs">
                        {report.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.location}</p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {report.time}
                    </p>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Reports
              </Button>
            </CardContent>
          </Card>

          {/* Bin Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="h-5 w-5 mr-2 text-primary" />
                Bin Status Monitor
              </CardTitle>
              <CardDescription>
                Real-time fill levels of smart bins
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {binStatus.map((bin) => (
                <div key={bin.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{bin.id}</span>
                      <p className="text-sm text-muted-foreground">{bin.location}</p>
                    </div>
                    <span className={`font-bold ${getFillColor(bin.fill)}`}>
                      {bin.fill}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        bin.fill >= 80 ? 'bg-destructive' : 
                        bin.fill >= 60 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${bin.fill}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Schedule Collection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;