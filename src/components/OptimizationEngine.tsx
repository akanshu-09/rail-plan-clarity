import { TrainData } from "./FileUpload";
import { TrainStatus } from "./TrainCard";

export interface OptimizedTrain extends TrainData {
  status: TrainStatus;
  explanation: string;
  score: number;
}

export interface OptimizationResult {
  trains: OptimizedTrain[];
  summary: {
    totalInService: number;
    totalKilometers: number;
    activeAdContracts: number;
    averageScore: number;
  };
}

export class RailOptimizationEngine {
  private calculateTrainScore(train: TrainData): number {
    let score = 100;
    
    // Lower kilometers is better (subtract normalized km)
    const kmPenalty = Math.min(train.KilometerRun / 1000000 * 50, 50);
    score -= kmPenalty;
    
    // Active ad contracts add value
    if (train.AdContract.toLowerCase() === 'active') {
      score += 30;
    }
    
    // Good maintenance status is crucial
    if (train.MaintenanceStatus.toLowerCase() === 'good') {
      score += 20;
    } else if (train.MaintenanceStatus.toLowerCase() === 'fair') {
      score += 10;
    } else {
      score -= 30;
    }
    
    // Closed job cards are preferred
    if (train.JobCardStatus.toLowerCase() === 'closed') {
      score += 15;
    } else {
      score -= 25;
    }
    
    // Brand value consideration (higher is better)
    score += Math.min(train.BrandValue / 1000000 * 10, 10);
    
    // HVAC status
    if (train.HVAC.toLowerCase() === 'working') {
      score += 10;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  private determineStatus(train: TrainData, score: number): { status: TrainStatus; explanation: string } {
    // Critical issues force maintenance or standby
    if (train.MaintenanceStatus.toLowerCase() === 'poor' || train.MaintenanceStatus.toLowerCase() === 'bad') {
      return {
        status: "in-maintenance",
        explanation: `Critical maintenance required. Status: ${train.MaintenanceStatus}`
      };
    }
    
    if (train.JobCardStatus.toLowerCase() === 'open') {
      return {
        status: "in-maintenance", 
        explanation: `Open job card requires attention before service deployment`
      };
    }
    
    if (train.HVAC.toLowerCase() === 'broken' || train.HVAC.toLowerCase() === 'faulty') {
      return {
        status: "in-maintenance",
        explanation: `HVAC system needs repair before passenger service`
      };
    }

    // High scoring trains go into service
    if (score >= 70) {
      const reasons = [];
      if (train.KilometerRun < 500000) reasons.push("low kilometer run");
      if (train.AdContract.toLowerCase() === 'active') reasons.push("active ad contract");
      if (train.MaintenanceStatus.toLowerCase() === 'good') reasons.push("excellent condition");
      
      return {
        status: "in-service",
        explanation: `Selected for service: ${reasons.join(', ')}`
      };
    }
    
    // Medium scoring trains on standby
    if (score >= 40) {
      return {
        status: "in-standby",
        explanation: `Standby reserve: ready for deployment if needed`
      };
    }
    
    // Low scoring trains need attention
    return {
      status: "in-maintenance",
      explanation: `Preventive maintenance scheduled to improve service readiness`
    };
  }

  public optimize(trains: TrainData[], maxInService: number = Math.ceil(trains.length * 0.4)): OptimizationResult {
    // Calculate scores for all trains
    const scoredTrains = trains.map(train => ({
      ...train,
      score: this.calculateTrainScore(train)
    }));

    // Sort by score (highest first)
    scoredTrains.sort((a, b) => b.score - a.score);

    // Apply multi-objective optimization
    const optimizedTrains: OptimizedTrain[] = [];
    let inServiceCount = 0;
    
    for (const train of scoredTrains) {
      const { status, explanation } = this.determineStatus(train, train.score);
      
      // Limit in-service trains
      let finalStatus = status;
      let finalExplanation = explanation;
      
      if (status === "in-service" && inServiceCount >= maxInService) {
        finalStatus = "in-standby";
        finalExplanation = `Standby reserve: service capacity reached, high priority for next deployment`;
      }
      
      if (finalStatus === "in-service") {
        inServiceCount++;
      }
      
      optimizedTrains.push({
        ...train,
        status: finalStatus,
        explanation: finalExplanation
      });
    }

    // Calculate summary metrics
    const inServiceTrains = optimizedTrains.filter(t => t.status === "in-service");
    const totalKilometers = inServiceTrains.reduce((sum, t) => sum + t.KilometerRun, 0);
    const activeAdContracts = inServiceTrains.filter(t => t.AdContract.toLowerCase() === 'active').length;
    const averageScore = optimizedTrains.reduce((sum, t) => sum + t.score, 0) / optimizedTrains.length;

    return {
      trains: optimizedTrains,
      summary: {
        totalInService: inServiceCount,
        totalKilometers,
        activeAdContracts,
        averageScore: Math.round(averageScore * 10) / 10
      }
    };
  }
}