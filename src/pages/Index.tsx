
import Header from "@/components/Header";
import VoiceRecorder from "@/components/VoiceRecorder";
import FinancialSummary from "@/components/FinancialSummary";
import QuickFilters from "@/components/QuickFilters";
import TransactionList from "@/components/TransactionList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Voice Recorder Section */}
        <section className="animate-fade-in">
          <VoiceRecorder />
        </section>

        {/* Financial Summary */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <FinancialSummary />
        </section>

        {/* Filters and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Filters */}
          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <QuickFilters />
            </div>
          </div>

          {/* Transaction List */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <TransactionList />
          </div>
        </div>

        {/* Quick Actions */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors group">
                <div className="text-orange-600 font-medium text-sm group-hover:text-orange-700">
                  📊 Relatório
                </div>
              </button>
              <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors group">
                <div className="text-orange-600 font-medium text-sm group-hover:text-orange-700">
                  📁 Exportar
                </div>
              </button>
              <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors group">
                <div className="text-orange-600 font-medium text-sm group-hover:text-orange-700">
                  🎯 Nova Meta
                </div>
              </button>
              <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors group">
                <div className="text-orange-600 font-medium text-sm group-hover:text-orange-700">
                  🔔 Lembretes
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
