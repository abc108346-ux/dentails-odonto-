import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function Clinic() {
  const images = [
    {
      src: "https://lh3.googleusercontent.com/grass-cs/ACvplmMyQAjQ_rxtVeHtY7fB6Nb4Tjkst8jrHRDCDCjtBzVC-Avoet2jClB-wJBXibEmYGiL_g-KYHGAbkMFDBLfdzI23WBCqDagvZlBm-3DStS9CEHGCHa0GBsacjYRvYavGD6qp0ML=s1624-w864-h1624-rw",
      alt: "Fachada Dentalis"
    },
    {
      src: "https://lh3.googleusercontent.com/grass-cs/ACvplmMax07YiR9idsG9IBaaIdY2-C0spVBM227dlVq2ErwRr9epCuXc8muDCGZXjMA7XaFl-0YyXc_r4b8qfydBluEx9RO-MTwTW5VCK9WfXBNQXetMjLLpVck8DxxUewG8dEJL8osH=s1624-w864-h1624-rw",
      alt: "Consultório"
    },
    {
      src: "https://lh3.googleusercontent.com/grass-cs/ACvplmNCIzyL9znDjPpdAVtYMBptCv4lnhOoQOh3ahhbh3_iE-cEXhb3NOO6Xd3dRLZ4LMP6g0ff7fXLvYvtgeruHc-U0smxa_B0Tsn-_A4fzQWOiiTApUQT6sAosWATaU2MoAzktDid=s1624-w864-h1624-rw",
      alt: "Ambiente"
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-12 h-[1px] bg-turquoise-500"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-turquoise-500">Conheça a Dentalis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#4a4a4a] mb-6">A Clínica</h1>
          <p className="text-xl text-[#858688] leading-relaxed max-w-2xl">
            Na Dentalis Odontologia Integrada, unimos experiência, tecnologia e cuidado humanizado para oferecer uma experiência odontológica completa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {images.map((img, idx) => (
              <motion.div 
                key={idx}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[400px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-[#4a4a4a] mb-12 text-center">Um novo conceito em Odontologia.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Estrutura',
                  desc: 'Ambiente sofisticado e acolhedor, projetado para transmitir conforto desde o primeiro momento. Localização privilegiada em Caxias do Sul com instalações modernas.'
                },
                {
                  title: 'Atendimento Humanizado',
                  desc: 'Cada paciente é único. Ouvimos suas necessidades e planejamos cada etapa do tratamento para garantir total conforto, clareza e previsibilidade.'
                },
                {
                  title: 'Odontologia Integrada',
                  desc: 'Trabalhamos com uma visão global da sua saúde bucal. Da prevenção à reabilitação estética e funcional, tudo é planejado de forma unificada.'
                },
                {
                  title: 'Tecnologia e Segurança',
                  desc: 'Protocolos rigorosos de biossegurança e materiais premium asseguram tratamentos duradouros e seguros para o seu sorriso.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-turquoise-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-[#4a4a4a] mb-2">{item.title}</h3>
                    <p className="text-[#858688] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
