import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrainCard } from "./TrainCard";
import { OptimizedTrain, OptimizationResult } from "./OptimizationEngine";
import { Train, Wrench, Zap, BarChart3, Target, Clock, TrendingUp } from "lucide-react";

interface DashboardProps {
  optimizationResult: OptimizationResult | null;
}

export const Dashboard = ({ optimizationResult }: DashboardProps) => {
  if (!optimizationResult) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Train className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-lg text-muted-foreground">Loading optimization results...</p>
        </div>
      </div>
    );
  }

  const { trains, summary } = optimizationResult;
  
  const inServiceTrains = trains.filter(t => t.status === "in-service");
  const maintenanceTrains = trains.filter(t => t.status === "in-maintenance");
  const standbyTrains = trains.filter(t => t.status === "in-standby");

  const StatCard = ({ title, value, icon: Icon, color, description }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    description?: string;
  }) => (
    <Card className="shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Trains in Service"
          value={summary.totalInService}
          icon={Train}
          color="bg-gradient-success"
          description="Active passenger service"
        />
        <StatCard
          title="Total Kilometers"
          value={`${(summary.totalKilometers / 1000).toFixed(0)}k km`}
          icon={BarChart3}
          color="bg-gradient-primary"
          description="Combined service mileage"
        />
        <StatCard
          title="Active Ad Contracts"
          value={summary.activeAdContracts}
          icon={Target}
          color="bg-gradient-warning"
          description="Revenue generating trains"
        />
        <StatCard
          title="Optimization Score"
          value={`${summary.averageScore}%`}
          icon={TrendingUp}
          color="bg-gradient-maintenance"
          description="Overall efficiency rating"
        />
      </div>

      {/* Optimization Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* In Service Section */}
        <Card className="shadow-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-success">
                <Train className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <span>In Service</span>
                <Badge className="ml-2 bg-success text-success-foreground">
                  {inServiceTrains.length}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {inServiceTrains.length > 0 ? (
              inServiceTrains.map((train) => (
                <TrainCard
                  key={train.TrainID}
                  train={train}
                  status={train.status}
                  explanation={train.explanation}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Train className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No trains currently in service</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* In Maintenance Section */}
        <Card className="shadow-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-warning">
                <Wrench className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <span>In Maintenance</span>
                <Badge className="ml-2 bg-warning text-warning-foreground">
                  {maintenanceTrains.length}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {maintenanceTrains.length > 0 ? (
              maintenanceTrains.map((train) => (
                <TrainCard
                  key={train.TrainID}
                  train={train}
                  status={train.status}
                  explanation={train.explanation}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Wrench className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No trains in maintenance</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* In Standby Section */}
        <Card className="shadow-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-maintenance">
                <Zap className="h-5 w-5 text-maintenance-foreground" />
              </div>
              <div>
                <span>In Standby</span>
                <Badge className="ml-2 bg-maintenance text-maintenance-foreground">
                  {standbyTrains.length}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {standbyTrains.length > 0 ? (
              standbyTrains.map((train) => (
                <TrainCard
                  key={train.TrainID}
                  train={train}
                  status={train.status}
                  explanation={train.explanation}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No trains in standby</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};