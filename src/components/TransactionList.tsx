
import { Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TransactionList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-orange-500" />
          Histórico de Áudios
        </CardTitle>
      </CardHeader>
      <CardContent className="py-8">
        <div className="text-center text-gray-500">
          <Volume2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Nenhum áudio gravado ainda</p>
          <p className="text-sm">Comece gravando sua primeira transação acima</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
