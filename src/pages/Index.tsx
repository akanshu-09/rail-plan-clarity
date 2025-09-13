import { useState, useEffect } from "react";
import { FileUpload, TrainData } from "@/components/FileUpload";
import { Dashboard } from "@/components/Dashboard";
import { RailOptimizationEngine, OptimizationResult } from "@/components/OptimizationEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, RotateCcw, Brain, Zap, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [trainData, setTrainData] = useState<TrainData[]>([]);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();
  
  const optimizationEngine = new RailOptimizationEngine();

  // Auto-load sample data and run optimization on component mount
  useEffect(() => {
    const autoLoadData = async () => {
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
        },
        {
          TrainID: "TRN-007",
          KilometerRun: 320000,
          HVAC: "Working",
          MaintenanceStatus: "Fair",
          JobCardStatus: "Closed",
          BrandValue: 2300000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-008",
          KilometerRun: 750000,
          HVAC: "Faulty",
          MaintenanceStatus: "Poor",
          JobCardStatus: "Open",
          BrandValue: 1500000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-009",
          KilometerRun: 180000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 2900000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-010",
          KilometerRun: 680000,
          HVAC: "Working",
          MaintenanceStatus: "Fair",
          JobCardStatus: "Open",
          BrandValue: 1700000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-011",
          KilometerRun: 95000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 3100000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-012",
          KilometerRun: 520000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 2200000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-013",
          KilometerRun: 840000,
          HVAC: "Faulty",
          MaintenanceStatus: "Poor",
          JobCardStatus: "Open",
          BrandValue: 1300000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-014",
          KilometerRun: 210000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 2700000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-015",
          KilometerRun: 390000,
          HVAC: "Working",
          MaintenanceStatus: "Fair",
          JobCardStatus: "Closed",
          BrandValue: 2000000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-016",
          KilometerRun: 150000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 3000000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-017",
          KilometerRun: 620000,
          HVAC: "Working",
          MaintenanceStatus: "Fair",
          JobCardStatus: "Open",
          BrandValue: 1900000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-018",
          KilometerRun: 280000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 2400000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-019",
          KilometerRun: 790000,
          HVAC: "Faulty",
          MaintenanceStatus: "Poor",
          JobCardStatus: "Open",
          BrandValue: 1400000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-020",
          KilometerRun: 110000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 2800000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-021",
          KilometerRun: 470000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 2100000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-022",
          KilometerRun: 350000,
          HVAC: "Working",
          MaintenanceStatus: "Fair",
          JobCardStatus: "Closed",
          BrandValue: 2200000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-023",
          KilometerRun: 920000,
          HVAC: "Faulty",
          MaintenanceStatus: "Poor",
          JobCardStatus: "Open",
          BrandValue: 1100000,
          AdContract: "Inactive"
        },
        {
          TrainID: "TRN-024",
          KilometerRun: 190000,
          HVAC: "Working",
          MaintenanceStatus: "Good",
          JobCardStatus: "Closed",
          BrandValue: 2600000,
          AdContract: "Active"
        },
        {
          TrainID: "TRN-025",
          KilometerRun: 430000,
          HVAC: "Working",
          MaintenanceStatus: "Fair",
          JobCardStatus: "Closed",
          BrandValue: 2000000,
          AdContract: "Active"
        }
      ];
      
      setTrainData(sampleTrains);
      
      // Auto-run optimization after a brief delay
      setTimeout(() => {
        const result = optimizationEngine.optimize(sampleTrains);
        setOptimizationResult(result);
      }, 1000);
    };
    
    autoLoadData();
  }, []);

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

  const handleBreakdown = () => {
    toast({
      title: "System Breakdown Initiated",
      description: "Emergency maintenance protocol activated",
      variant: "destructive",
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
                <>
                  <Button
                    variant="outline"
                    onClick={handleBreakdown}
                    className="flex items-center space-x-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <span>Breakdown</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetSystem}
                    className="flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Dashboard optimizationResult={optimizationResult} />
      </main>
    </div>
  );
};

export default Index;