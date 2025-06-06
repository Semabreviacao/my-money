
import { useState } from "react";
import { Mic, MicOff, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";
import { useToast } from "@/hooks/use-toast";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [simulatedText, setSimulatedText] = useState("");
  const { addTransaction } = useTransactions();
  const { toast } = useToast();

  const processAudioText = (text: string) => {
    // Simulação de processamento de IA para extrair informações
    const lowerText = text.toLowerCase();
    let type: 'entrada' | 'saida' | 'meta' = 'saida';
    let amount = 0;
    let category = '';
    let tags: string[] = [];

    // Detectar tipo
    if (lowerText.includes('recebi') || lowerText.includes('ganhei') || lowerText.includes('entrada') || lowerText.includes('salário')) {
      type = 'entrada';
    } else if (lowerText.includes('meta') || lowerText.includes('economizar') || lowerText.includes('objetivo')) {
      type = 'meta';
    }

    // Extrair valor (procura por R$, real, reais)
    const moneyRegex = /(?:r\$\s*)?(\d+(?:[.,]\d{2})?)/i;
    const moneyMatch = text.match(moneyRegex);
    if (moneyMatch) {
      amount = parseFloat(moneyMatch[1].replace(',', '.'));
    }

    // Extrair categorias e tags comuns
    if (lowerText.includes('pix')) tags.push('pix');
    if (lowerText.includes('mercado') || lowerText.includes('supermercado')) {
      category = 'Alimentação';
      tags.push('mercado');
    }
    if (lowerText.includes('gasolina') || lowerText.includes('combustível')) {
      category = 'Transporte';
      tags.push('combustível');
    }
    if (lowerText.includes('aluguel')) {
      category = 'Moradia';
      tags.push('aluguel');
    }
    if (lowerText.includes('farmácia') || lowerText.includes('remédio')) {
      category = 'Saúde';
      tags.push('farmácia');
    }

    return {
      type,
      amount,
      description: text,
      category: category || 'Outros',
      tags,
      date: new Date().toISOString(),
      audioText: text,
    };
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setSimulatedText("");
    
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
    
    // Simulação de transcrição - em produção seria a API de transcrição
    const sampleTexts = [
      "Paguei R$ 45,50 no Pix pro mercado",
      "Recebi R$ 150 do freelance",
      "Gasolina R$ 80 no cartão",
      "Meta: economizar R$ 500 esse mês",
      "Aluguel R$ 1200 vence dia 10",
      "Farmácia R$ 32 remédios",
    ];
    
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setSimulatedText(randomText);
    
    // Processar e salvar transação
    const transactionData = processAudioText(randomText);
    addTransaction(transactionData);
    
    toast({
      title: "Áudio processado!",
      description: `Transação de ${transactionData.type} registrada: ${transactionData.description}`,
    });
    
    setRecordingTime(0);
    
    // Limpar texto simulado após 3 segundos
    setTimeout(() => {
      setSimulatedText("");
    }, 3000);
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
          
          {simulatedText && (
            <div className="mt-4 p-3 bg-white rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Transcrição:</p>
              <p className="text-green-700 font-medium">"{simulatedText}"</p>
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
