
import { Volume2, Calendar, Tag, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTransactions } from "@/hooks/useTransactions";

const TransactionList = () => {
  const { transactions } = useTransactions();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'entrada':
        return 'text-green-600 bg-green-50';
      case 'saida':
        return 'text-red-600 bg-red-50';
      case 'meta':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'entrada':
        return '↗️';
      case 'saida':
        return '↘️';
      case 'meta':
        return '🎯';
      default:
        return '💰';
    }
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-orange-500" />
            Histórico de Transações
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="text-center text-gray-500">
            <Volume2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Nenhuma transação registrada</p>
            <p className="text-sm">Comece gravando sua primeira transação acima</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-orange-500" />
          Histórico de Transações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(transaction.type)}</span>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'entrada' ? 'text-green-600' : transaction.type === 'saida' ? 'text-red-600' : 'text-blue-600'}`}>
                    {transaction.type === 'saida' ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </p>
                  <Badge variant="secondary" className={`text-xs ${getTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </Badge>
                </div>
              </div>
              
              {transaction.category && (
                <div className="flex items-center gap-1 mb-2">
                  <Tag className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{transaction.category}</span>
                </div>
              )}
              
              {transaction.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {transaction.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {transaction.audioText && (
                <div className="mt-2 p-2 bg-orange-50 rounded text-xs text-orange-700">
                  <Volume2 className="h-3 w-3 inline mr-1" />
                  "{transaction.audioText}"
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
