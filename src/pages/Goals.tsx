
import { ArrowLeft, Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Goals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <header className="bg-gradient-orange shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-white font-bold text-xl">Metas</h1>
              <p className="text-orange-100 text-sm">Defina e acompanhe suas metas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Suas Metas
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8">
            <div className="text-center text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Nenhuma meta criada</p>
              <p className="text-sm">Grave um áudio falando sobre suas metas financeiras</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Goals;
