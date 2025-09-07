import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, BarChart3, MapPin, Users } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "#dashboard", icon: BarChart3 },
    { name: "Report Issue", href: "#report", icon: MapPin },
    { name: "Routes", href: "#routes", icon: MapPin },
    { name: "Analytics", href: "#analytics", icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold bg-eco-gradient bg-clip-text text-transparent">
                WasteWise Connect
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button variant="default" className="shadow-eco">
              Get Started
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </a>
            ))}
            <div className="px-3 py-2">
              <Button variant="default" className="w-full shadow-eco">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;