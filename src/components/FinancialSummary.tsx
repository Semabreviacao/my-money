
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";

const FinancialSummary = () => {
  const { getSummary } = useTransactions();
  const summary = getSummary();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const summaryData = [
    {
      title: "Entradas",
      value: formatCurrency(summary.totalIncome),
      change: summary.totalIncome > 0 ? `+${formatCurrency(summary.totalIncome)}` : "0%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Saídas",
      value: formatCurrency(summary.totalExpenses),
      change: summary.totalExpenses > 0 ? `-${formatCurrency(summary.totalExpenses)}` : "0%",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Saldo",
      value: formatCurrency(summary.balance),
      change: summary.balance >= 0 ? "Positivo" : "Negativo",
      icon: DollarSign,
      color: summary.balance >= 0 ? "text-green-600" : "text-red-600",
      bgColor: summary.balance >= 0 ? "bg-green-50" : "bg-red-50",
    },
    {
      title: "Metas",
      value: `${summary.activeGoals} ativas`,
      change: summary.activeGoals > 0 ? `${summary.activeGoals} criadas` : "Nenhuma criada",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, index) => (
        <Card key={index} className="hover-scale cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className={`text-xs ${item.color}`}>
              {item.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FinancialSummary;
