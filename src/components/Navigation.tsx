import { useState } from "react";
import { Menu, X, Leaf, Trash2, BarChart3, MapPin, User, LogOut, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-eco-gradient bg-clip-text text-transparent">
              WasteWise Connect
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
            <a href="#report" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <Trash2 className="h-4 w-4" />
              <span>Report Issue</span>
            </a>
            <Link to="/marketplace" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <Recycle className="h-4 w-4" />
              <span>Plastic Marketplace</span>
            </Link>
            <a href="#route" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4" />
              <span>Route Optimization</span>
            </a>
            <a href="#analytics" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-foreground/80">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button variant="outline" onClick={signOut} className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button>Sign In / Sign Up</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="py-4 space-y-4">
              <a href="#dashboard" className="flex items-center space-x-3 text-foreground py-2 px-4 rounded-lg hover:bg-accent">
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
              <a href="#report" className="flex items-center space-x-3 text-foreground py-2 px-4 rounded-lg hover:bg-accent">
                <Trash2 className="h-5 w-5" />
                <span>Report Issue</span>
              </a>
              <Link to="/marketplace" className="flex items-center space-x-3 text-foreground py-2 px-4 rounded-lg hover:bg-accent">
                <Recycle className="h-5 w-5" />
                <span>Plastic Marketplace</span>
              </Link>
              <a href="#route" className="flex items-center space-x-3 text-foreground py-2 px-4 rounded-lg hover:bg-accent">
                <MapPin className="h-5 w-5" />
                <span>Route Optimization</span>
              </a>
              <a href="#analytics" className="flex items-center space-x-3 text-foreground py-2 px-4 rounded-lg hover:bg-accent">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </a>
              
              {user ? (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center space-x-2 text-foreground/80 px-4">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button variant="outline" onClick={signOut} className="w-full flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="block mt-4">
                  <Button className="w-full">Sign In / Sign Up</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;