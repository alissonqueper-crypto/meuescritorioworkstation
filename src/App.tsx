import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";

import Estrutura from "./pages/Estrutura";
import Contato from "./pages/Contato";
import CorridaDeBarEmBar from "./pages/CorridaDeBarEmBar";
import CorridaSuccess from "./pages/CorridaSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/estrutura" element={<Estrutura />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/eventos/corrida-de-bar-em-bar" element={<CorridaDeBarEmBar />} />
            <Route path="/eventos/corrida-de-bar-em-bar/sucesso" element={<CorridaSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
