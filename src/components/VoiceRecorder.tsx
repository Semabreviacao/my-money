
import { useState } from "react";
import { Mic, MicOff, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Simulated recording timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Auto stop after 60 seconds (demo)
    setTimeout(() => {
      setIsRecording(false);
      clearInterval(timer);
    }, 60000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    // Here we would process the audio and add to transactions
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-orange-800">
            Grave sua transação
          </h3>
          <p className="text-orange-600 text-sm">
            "Paguei R$ 25 no Pix pro mercado" ou "Meta: economizar R$ 500 esse mês"
          </p>
          
          <div className="relative">
            <Button
              size="lg"
              className={`w-24 h-24 rounded-full transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-gradient-orange hover:shadow-lg hover:scale-105'
              }`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <Square className="h-8 w-8 text-white" />
              ) : (
                <Mic className="h-8 w-8 text-white" />
              )}
            </Button>
            
            {isRecording && (
              <>
                <div className="pulse-ring"></div>
                <div className="pulse-ring" style={{ animationDelay: '0.5s' }}></div>
              </>
            )}
          </div>
          
          {isRecording && (
            <div className="text-red-600 font-mono text-lg">
              {formatTime(recordingTime)}
            </div>
          )}
          
          <p className="text-xs text-orange-500">
            {isRecording ? 'Toque para parar' : 'Toque para gravar'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
