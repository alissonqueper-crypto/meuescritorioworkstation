import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Index from "./pages/Index";

import Estrutura from "./pages/Estrutura";
import Contato from "./pages/Contato";
import CorridaDeBarEmBar from "./pages/CorridaDeBarEmBar";
import CorridaSuccess from "./pages/CorridaSuccess";
import CorridaInscricao from "./pages/CorridaInscricao";
import MeuIngresso from "./pages/MeuIngresso";
import NotFound from "./pages/NotFound";

import CampeonatoHome from "./pages/campeonato/Home";
import CampeonatoInscricao from "./pages/campeonato/Inscricao";
import CampeonatoChaveamento from "./pages/campeonato/Chaveamento";
import CampeonatoEquipes from "./pages/campeonato/Equipes";
import CampeonatoAdmin from "./pages/campeonato/Admin";
import CampeonatoContato from "./pages/campeonato/Contato";
import InscricaoCS from "./pages/InscricaoCS";

const queryClient = new QueryClient();

const ConditionalChrome = ({ children }: { children: React.ReactNode }) => {
  const loc = useLocation();
  const isCampeonato = loc.pathname.startsWith("/campeonato");
  return (
    <>
      {!isCampeonato && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isCampeonato && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ConditionalChrome>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/estrutura" element={<Estrutura />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/eventos/corrida-de-bar-em-bar" element={<CorridaDeBarEmBar />} />
            <Route path="/eventos/corrida-de-bar-em-bar/sucesso" element={<CorridaSuccess />} />
            <Route path="/eventos/corrida-de-bar-em-bar/inscricao" element={<CorridaInscricao />} />
            <Route path="/meu-ingresso" element={<MeuIngresso />} />

            {/* === Campeonato CS Regional === */}
            <Route path="/campeonato" element={<CampeonatoHome />} />
            <Route path="/campeonato/inscricao" element={<CampeonatoInscricao />} />
            <Route path="/campeonato/chaveamento" element={<CampeonatoChaveamento />} />
            <Route path="/campeonato/equipes" element={<CampeonatoEquipes />} />
            <Route path="/campeonato/admin" element={<CampeonatoAdmin />} />
            <Route path="/campeonato/contato" element={<CampeonatoContato />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConditionalChrome>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
