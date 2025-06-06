
import { useState } from "react";
import { Calendar, Tag, Volume2, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  text: string;
  amount: number;
  type: 'entrada' | 'saida' | 'transferencia' | 'meta';
  category: string;
  tags: string[];
  date: string;
  audioUrl?: string;
}

const TransactionList = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      text: 'Paguei R$ 25 no Pix pro mercado da esquina',
      amount: -25,
      type: 'saida',
      category: 'Alimentação',
      tags: ['pix', 'mercado', 'alimentação'],
      date: '2024-06-06T10:30:00',
    },
    {
      id: '2',
      text: 'Recebi R$ 1200 do freelance de design',
      amount: 1200,
      type: 'entrada',
      category: 'Trabalho',
      tags: ['freelance', 'design', 'entrada'],
      date: '2024-06-05T14:20:00',
    },
    {
      id: '3',
      text: 'Meta: economizar R$ 500 esse mês para viagem',
      amount: 500,
      type: 'meta',
      category: 'Poupança',
      tags: ['meta', 'viagem', 'economia'],
      date: '2024-06-05T09:15:00',
    },
    {
      id: '4',
      text: 'Transferi R$ 150 da poupança para conta corrente',
      amount: 150,
      type: 'transferencia',
      category: 'Transferência',
      tags: ['transferencia', 'poupança'],
      date: '2024-06-04T16:45:00',
    },
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'entrada': return 'bg-green-100 text-green-800';
      case 'saida': return 'bg-red-100 text-red-800';
      case 'transferencia': return 'bg-blue-100 text-blue-800';
      case 'meta': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number, type: string) => {
    if (type === 'meta') return `Meta: R$ ${Math.abs(amount).toFixed(2)}`;
    const prefix = amount >= 0 ? '+' : '';
    return `${prefix}R$ ${amount.toFixed(2)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-orange-500" />
          Histórico de Áudios
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-2">{transaction.text}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  {formatDate(transaction.date)}
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                } ${transaction.type === 'meta' ? 'text-orange-600' : ''}`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </p>
                <Badge className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {transaction.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Volume2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
