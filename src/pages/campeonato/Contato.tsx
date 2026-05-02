import CampeonatoLayout from "./_layout";
import { Mail, MessageCircle, Instagram } from "lucide-react";

export default function CampeonatoContato() {
  return (
    <CampeonatoLayout>
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-cs-display uppercase text-4xl md:text-5xl text-cs-text-primary">
          Fale com a <span className="text-cs-orange">organização</span>
        </h1>
        <p className="text-cs-text-secondary mt-3">
          Dúvidas sobre regras, pagamento ou logística do campeonato.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { Icon: Mail, label: "E-mail", value: "contato@csregional.com" },
            { Icon: MessageCircle, label: "WhatsApp", value: "(49) 99999-0000" },
            { Icon: Instagram, label: "Instagram", value: "@csregional" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="cs-card p-5 text-center">
              <Icon className="w-6 h-6 text-cs-orange mx-auto" />
              <div className="text-[11px] uppercase tracking-[0.2em] text-cs-text-secondary mt-3">{label}</div>
              <div className="text-cs-text-primary mt-1 text-sm break-all">{value}</div>
            </div>
          ))}
        </div>
      </section>
    </CampeonatoLayout>
  );
}
