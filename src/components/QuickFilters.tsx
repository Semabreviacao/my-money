
import { useState } from "react";
import { Filter, Calendar, Tag, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const QuickFilters = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: 'hoje', label: 'Hoje', icon: Calendar },
    { id: 'semana', label: 'Esta Semana', icon: Calendar },
    { id: 'pix', label: '#pix', icon: Tag },
    { id: 'alimentacao', label: '#alimentação', icon: Tag },
    { id: 'entrada', label: 'Entradas', icon: DollarSign },
    { id: 'saida', label: 'Saídas', icon: DollarSign },
    { id: 'meta', label: 'Metas', icon: DollarSign },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
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
