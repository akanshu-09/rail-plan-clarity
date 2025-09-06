import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Train, Info, Zap, Wrench, FileCheck, DollarSign, Star } from "lucide-react";
import { TrainData } from "./FileUpload";

export type TrainStatus = "in-service" | "in-maintenance" | "in-standby";

interface TrainCardProps {
  train: TrainData;
  status: TrainStatus;
  explanation: string;
}

const statusConfig = {
  "in-service": {
    color: "bg-gradient-success",
    textColor: "text-success-foreground",
    borderColor: "border-success",
    icon: Train,
    label: "In Service"
  },
  "in-maintenance": {
    color: "bg-gradient-warning",
    textColor: "text-warning-foreground", 
    borderColor: "border-warning",
    icon: Wrench,
    label: "In Maintenance"
  },
  "in-standby": {
    color: "bg-gradient-maintenance",
    textColor: "text-maintenance-foreground",
    borderColor: "border-maintenance", 
    icon: Zap,
    label: "In Standby"
  }
};

export const TrainCard = ({ train, status, explanation }: TrainCardProps) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const getMaintenanceStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good': return 'bg-success text-success-foreground';
      case 'fair': return 'bg-warning text-warning-foreground';
      default: return 'bg-destructive text-destructive-foreground';
    }
  };

  const getJobCardStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'closed': return 'bg-success text-success-foreground';
      case 'open': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={`shadow-card hover:shadow-elevated transition-all duration-300 border-l-4 ${config.borderColor} group`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${config.color} ${config.textColor}`}>
              <StatusIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{train.TrainID}</h3>
              <Badge variant="outline" className="text-xs mt-1">
                {config.label}
              </Badge>
            </div>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-1 rounded-full hover:bg-muted transition-colors cursor-help">
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{explanation}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Train className="h-3 w-3" />
              <span>Kilometers</span>
            </div>
            <span className="font-medium">{train.KilometerRun.toLocaleString()} km</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>HVAC</span>
            </div>
            <span className="font-medium">{train.HVAC}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Wrench className="h-3 w-3" />
              <span>Maintenance</span>
            </div>
            <Badge className={`text-xs ${getMaintenanceStatusColor(train.MaintenanceStatus)}`}>
              {train.MaintenanceStatus}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <FileCheck className="h-3 w-3" />
              <span>Job Card</span>
            </div>
            <Badge className={`text-xs ${getJobCardStatusColor(train.JobCardStatus)}`}>
              {train.JobCardStatus}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>Brand Value</span>
            </div>
            <span className="font-medium">${train.BrandValue.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Star className="h-3 w-3" />
              <span>Ad Contract</span>
            </div>
            <Badge variant={train.AdContract.toLowerCase() === 'active' ? 'default' : 'secondary'} className="text-xs">
              {train.AdContract}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};