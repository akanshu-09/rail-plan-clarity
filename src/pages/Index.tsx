import { useState } from "react";
import { FileUpload, TrainData } from "@/components/FileUpload";
import { Dashboard } from "@/components/Dashboard";
import { RailOptimizationEngine, OptimizationResult } from "@/components/OptimizationEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, RotateCcw, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [trainData, setTrainData] = useState<TrainData[]>([]);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();
  
  const optimizationEngine = new RailOptimizationEngine();

  const handleDataUploaded = (data: TrainData[]) => {
    setTrainData(data);
    setOptimizationResult(null);
  };

  const runOptimization = async () => {
    if (trainData.length === 0) {
      toast({
        title: "No data available",
        description: "Please upload train data first",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    
    // Simulate processing time for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const result = optimizationEngine.optimize(trainData);
      setOptimizationResult(result);
      
      toast({
        title: "Optimization Complete",
        description: `Generated optimal induction plan for ${trainData.length} trains`,
      });
    } catch (error) {
      toast({
        title: "Optimization Failed", 
        description: "Please try again or check your data",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const resetSystem = () => {
    setTrainData([]);
    setOptimizationResult(null);
    toast({
      title: "System Reset",
      description: "Ready for new train data upload",
    });
  };

  // Sample data for demonstration
  const loadSampleData = () => {
    const sampleTrains: TrainData[] = [
      {
        TrainID: "TRN-001",
        KilometerRun: 245000,
        HVAC: "Working",
        MaintenanceStatus: "Good", 
        JobCardStatus: "Closed",
        BrandValue: 2500000,
        AdContract: "Active"
      },
      {
        TrainID: "TRN-002", 
        KilometerRun: 890000,
        HVAC: "Working",
        MaintenanceStatus: "Fair",
        JobCardStatus: "Open",
        BrandValue: 1800000,
        AdContract: "Inactive"
      },
      {
        TrainID: "TRN-003",
        KilometerRun: 156000,
        HVAC: "Working", 
        MaintenanceStatus: "Good",
        JobCardStatus: "Closed",
        BrandValue: 3200000,
        AdContract: "Active"
      },
      {
        TrainID: "TRN-004",
        KilometerRun: 567000,
        HVAC: "Faulty",
        MaintenanceStatus: "Poor",
        JobCardStatus: "Open", 
        BrandValue: 1200000,
        AdContract: "Inactive"
      },
      {
        TrainID: "TRN-005",
        KilometerRun: 123000,
        HVAC: "Working",
        MaintenanceStatus: "Good",
        JobCardStatus: "Closed",
        BrandValue: 2800000,
        AdContract: "Active"
      },
      {
        TrainID: "TRN-006",
        KilometerRun: 445000,
        HVAC: "Working",
        MaintenanceStatus: "Good",
        JobCardStatus: "Closed", 
        BrandValue: 2100000,
        AdContract: "Inactive"
      }
    ];
    
    setTrainData(sampleTrains);
    toast({
      title: "Sample Data Loaded",
      description: `Loaded ${sampleTrains.length} sample train records`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Train className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Rail Induction Planner</h1>
                <p className="text-muted-foreground">AI-Powered Optimization Engine</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {trainData.length > 0 && (
                <Button
                  variant="outline"
                  onClick={resetSystem}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {!optimizationResult ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome Section */}
            <Card className="shadow-elevated bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Brain className="h-6 w-6" />
                  <span>Multi-Objective Optimization Engine</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Minimize total kilometers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Train className="h-4 w-4" />
                    <span>Prioritize ad contracts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Ensure operational readiness</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <FileUpload onDataUploaded={handleDataUploaded} />

            {/* Sample Data Option */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={loadSampleData}
                className="mx-auto"
              >
                Load Sample Data for Demo
              </Button>
            </div>

            {/* Optimization Button */}
            {trainData.length > 0 && (
              <Card className="shadow-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to Optimize
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {trainData.length} trains loaded and ready for optimization
                  </p>
                  <Button
                    onClick={runOptimization}
                    disabled={isOptimizing}
                    size="lg"
                    className="bg-gradient-primary px-8"
                  >
                    {isOptimizing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Run Optimization
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Dashboard optimizationResult={optimizationResult} />
        )}
      </main>
    </div>
  );
};

export default Index;