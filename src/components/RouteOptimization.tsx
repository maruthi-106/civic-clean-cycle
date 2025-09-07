import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Truck, 
  Clock, 
  Route, 
  Fuel, 
  CheckCircle,
  Play,
  Navigation
} from "lucide-react";

const RouteOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeGenerated, setRouteGenerated] = useState(false);

  const collectionPoints = [
    { id: "BIN001", location: "Sector 5 Market", priority: "high", distance: "2.1 km", fill: 95 },
    { id: "BIN002", location: "MG Road Metro", priority: "high", distance: "3.4 km", fill: 88 },
    { id: "BIN003", location: "Tech Park Gate", priority: "medium", distance: "5.2 km", fill: 75 },
    { id: "BIN004", location: "City Mall", priority: "medium", distance: "4.1 km", fill: 68 },
    { id: "BIN005", location: "University Campus", priority: "low", distance: "6.8 km", fill: 45 },
  ];

  const routeStats = {
    totalDistance: "18.6 km",
    estimatedTime: "2h 15m",
    fuelSaved: "25%",
    efficiency: "92%"
  };

  const optimizedRoute = [
    { step: 1, location: "Depot", time: "08:00 AM", status: "completed" },
    { step: 2, location: "Sector 5 Market", time: "08:20 AM", status: "completed" },
    { step: 3, location: "MG Road Metro", time: "08:45 AM", status: "current" },
    { step: 4, location: "City Mall", time: "09:15 AM", status: "pending" },
    { step: 5, location: "Tech Park Gate", time: "09:40 AM", status: "pending" },
    { step: 6, location: "University Campus", time: "10:05 AM", status: "pending" },
    { step: 7, location: "Return to Depot", time: "10:30 AM", status: "pending" },
  ];

  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setRouteGenerated(true);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "current": return "text-warning";
      case "pending": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "current": return Navigation;
      case "pending": return Clock;
      default: return Clock;
    }
  };

  return (
    <section id="routes" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Route Optimization
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered route planning for efficient waste collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Collection Points */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Collection Points
                </CardTitle>
                <CardDescription>
                  Bins requiring collection sorted by priority
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {collectionPoints.map((point) => (
                  <div key={point.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{point.id}</span>
                      <Badge className={getPriorityColor(point.priority)} variant="secondary">
                        {point.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{point.location}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{point.distance}</span>
                      <span className={point.fill >= 80 ? 'text-destructive font-medium' : ''}>
                        {point.fill}% full
                      </span>
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={handleOptimizeRoute}
                  disabled={isOptimizing}
                  className="w-full shadow-eco"
                >
                  {isOptimizing ? (
                    "Optimizing..."
                  ) : (
                    <>
                      <Route className="h-4 w-4 mr-2" />
                      Optimize Route
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Route Map & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Route className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-lg font-bold">{routeStats.totalDistance}</div>
                  <div className="text-xs text-muted-foreground">Total Distance</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-warning mx-auto mb-2" />
                  <div className="text-lg font-bold">{routeStats.estimatedTime}</div>
                  <div className="text-xs text-muted-foreground">Est. Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Fuel className="h-6 w-6 text-success mx-auto mb-2" />
                  <div className="text-lg font-bold">{routeStats.fuelSaved}</div>
                  <div className="text-xs text-muted-foreground">Fuel Saved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">{routeStats.efficiency}</div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </CardContent>
              </Card>
            </div>

            {/* Route Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Optimized Route Map</CardTitle>
                <CardDescription>
                  Real-time navigation for collection vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-eco-gradient opacity-10"></div>
                  {routeGenerated ? (
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                      <p className="font-medium">Route Optimized Successfully</p>
                      <p className="text-sm text-muted-foreground">25% more efficient than previous route</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        {isOptimizing ? "Calculating optimal route..." : "Click 'Optimize Route' to generate path"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Route Steps */}
            {routeGenerated && (
              <Card>
                <CardHeader>
                  <CardTitle>Route Timeline</CardTitle>
                  <CardDescription>
                    Step-by-step collection schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {optimizedRoute.map((step, index) => {
                      const StatusIcon = getStatusIcon(step.status);
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                          <div className="flex-shrink-0">
                            <StatusIcon className={`h-5 w-5 ${getStatusColor(step.status)}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">Step {step.step}</span>
                              <Badge variant="outline" className="text-xs">
                                {step.time}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{step.location}</p>
                          </div>
                          {step.status === "current" && (
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3 mr-1" />
                              Navigate
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteOptimization;