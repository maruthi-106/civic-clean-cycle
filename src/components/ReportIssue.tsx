import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  MapPin, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  Trash2,
  Recycle,
  Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [classification, setClassification] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueTypes = [
    { value: "overflowing", label: "Overflowing Bin", icon: Trash2, color: "bg-destructive" },
    { value: "illegal", label: "Illegal Dumping", icon: AlertTriangle, color: "bg-warning" },
    { value: "broken", label: "Broken Bin", icon: Zap, color: "bg-blue-500" },
    { value: "missing", label: "Missing Bin", icon: MapPin, color: "bg-purple-500" },
  ];

  const wasteTypes = [
    { type: "Organic", confidence: 85, color: "bg-green-500" },
    { type: "Plastic", confidence: 12, color: "bg-blue-500" },
    { type: "Paper", confidence: 3, color: "bg-yellow-500" },
  ];

  const handleImageUpload = () => {
    // Simulate AI classification
    setTimeout(() => {
      setClassification("organic");
      toast({
        title: "Image Analyzed",
        description: "Waste type classified successfully using AI",
      });
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully. Tracking ID: R" + Math.random().toString().slice(2, 8),
      });
    }, 2000);
  };

  return (
    <section id="report" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Report Waste Issue
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help keep your community clean by reporting waste management issues
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit New Report</CardTitle>
              <CardDescription>
                Fill out the details to report a waste management issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <Select value={selectedIssue} onValueChange={setSelectedIssue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((issue) => (
                        <SelectItem key={issue.value} value={issue.value}>
                          <div className="flex items-center">
                            <issue.icon className="h-4 w-4 mr-2" />
                            {issue.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <Input 
                      id="location" 
                      placeholder="Enter or select location"
                      className="pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Provide additional details about the issue"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Photo</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={handleImageUpload}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full shadow-eco" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* AI Classification & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Recycle className="h-5 w-5 mr-2 text-primary" />
                  AI Waste Classification
                </CardTitle>
                <CardDescription>
                  Upload an image to classify waste type automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                {classification ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                      <p className="font-medium">Classification Complete</p>
                    </div>
                    <div className="space-y-2">
                      {wasteTypes.map((waste, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${waste.color}`}></div>
                            <span className="text-sm">{waste.type}</span>
                          </div>
                          <Badge variant="outline">{waste.confidence}%</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-sm text-success-foreground">
                        <strong>Recommendation:</strong> This appears to be organic waste. 
                        Please dispose in the green bin for composting.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Upload an image to see AI classification results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Nearest Recycling Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Check Collection Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Track My Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportIssue;