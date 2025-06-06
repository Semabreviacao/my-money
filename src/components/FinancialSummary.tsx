
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialSummary = () => {
  const summaryData = [
    {
      title: "Entradas",
      value: "R$ 0,00",
      change: "0%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Saídas",
      value: "R$ 0,00",
      change: "0%",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Saldo",
      value: "R$ 0,00",
      change: "0%",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Metas",
      value: "0 ativas",
      change: "Nenhuma criada",
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
