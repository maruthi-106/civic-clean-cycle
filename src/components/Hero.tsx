import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, MapPin, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-eco-gradient opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Smart Solutions for{" "}
              <span className="bg-eco-gradient bg-clip-text text-transparent">
                Waste Management
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Revolutionizing waste collection with AI-powered classification, 
              route optimization, and real-time analytics. Join the movement 
              towards a cleaner, smarter future.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="shadow-eco">
                Start Reporting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                View Dashboard
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Recycle className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">85%</div>
                <div className="text-sm text-muted-foreground">Recycling Rate</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">40%</div>
                <div className="text-sm text-muted-foreground">Route Efficiency</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">12K+</div>
                <div className="text-sm text-muted-foreground">Reports Filed</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Modern waste management technology"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-eco-gradient opacity-20"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Monitoring Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;