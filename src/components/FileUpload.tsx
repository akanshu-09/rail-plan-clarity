import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface TrainData {
  TrainID: string;
  KilometerRun: number;
  HVAC: string;
  MaintenanceStatus: string;
  JobCardStatus: string;
  BrandValue: number;
  AdContract: string;
}

interface FileUploadProps {
  onDataUploaded: (data: TrainData[]) => void;
}

export const FileUpload = ({ onDataUploaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const parseCSV = (text: string): TrainData[] => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const train: any = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        if (header === 'KilometerRun' || header === 'BrandValue') {
          train[header] = parseFloat(value) || 0;
        } else {
          train[header] = value;
        }
      });
      
      return train as TrainData;
    });
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const text = await file.text();
      const data = parseCSV(text);
      
      if (data.length === 0) {
        throw new Error("No valid data found");
      }

      onDataUploaded(data);
      toast({
        title: "File uploaded successfully",
        description: `Processed ${data.length} train records`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please check your CSV format and try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <Card className={`shadow-card border-2 transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-dashed'}`}>
      <CardContent className="p-8">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="p-4 rounded-full bg-primary/10">
            {isProcessing ? (
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            ) : (
              <Upload className="h-8 w-8 text-primary" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Upload Train Data</h3>
            <p className="text-muted-foreground">
              Drag and drop your CSV file here, or click to browse
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>CSV format required</span>
          </div>

          <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/50 text-sm">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-muted-foreground">
              <strong>Required columns:</strong> TrainID, KilometerRun, HVAC, MaintenanceStatus, JobCardStatus, BrandValue, AdContract
            </div>
          </div>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            disabled={isProcessing}
          />
          
          <Button asChild disabled={isProcessing} className="bg-gradient-primary">
            <label htmlFor="file-upload" className="cursor-pointer">
              {isProcessing ? "Processing..." : "Select File"}
            </label>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};