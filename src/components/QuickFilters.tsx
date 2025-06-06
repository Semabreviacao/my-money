
import { useState } from "react";
import { Filter, Calendar, Tag, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTransactions } from "@/hooks/useTransactions";

const QuickFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { filterTransactions } = useTransactions();

  const filterOptions = [
    { id: 'hoje', label: 'Hoje', icon: Calendar, type: 'period' },
    { id: 'semana', label: 'Esta Semana', icon: Calendar, type: 'period' },
    { id: 'pix', label: '#pix', icon: Tag, type: 'tag' },
    { id: 'mercado', label: '#mercado', icon: Tag, type: 'tag' },
    { id: 'entrada', label: 'Entradas', icon: DollarSign, type: 'type' },
    { id: 'saida', label: 'Saídas', icon: DollarSign, type: 'type' },
    { id: 'meta', label: 'Metas', icon: DollarSign, type: 'type' },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId) 
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    
    // Aplicar filtros (em uma implementação completa, isso passaria para o componente pai)
    const filterConfig = {
      type: newFilters.find(f => ['entrada', 'saida', 'meta'].includes(f)),
      period: newFilters.find(f => ['hoje', 'semana'].includes(f)),
      tags: newFilters.filter(f => ['pix', 'mercado'].includes(f)),
    };
    
    const filtered = filterTransactions(filterConfig);
    console.log('Transações filtradas:', filtered);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-medium text-gray-700">Filtros Rápidos</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const isActive = activeFilters.includes(option.id);
          return (
            <Button
              key={option.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(option.id)}
              className={`text-xs ${
                isActive 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300'
              }`}
            >
              <option.icon className="h-3 w-3 mr-1" />
              {option.label}
            </Button>
          );
        })}
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Filtros ativos:</span>
          {activeFilters.map((filterId) => {
            const filter = filterOptions.find(opt => opt.id === filterId);
            return (
              <Badge key={filterId} variant="secondary" className="text-xs">
                {filter?.label}
                <button
                  onClick={() => toggleFilter(filterId)}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuickFilters;
