import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import ReportIssue from "@/components/ReportIssue";
import RouteOptimization from "@/components/RouteOptimization";
import Analytics from "@/components/Analytics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Dashboard />
      <ReportIssue />
      <RouteOptimization />
      <Analytics />
    </div>
  );
};

export default Index;
