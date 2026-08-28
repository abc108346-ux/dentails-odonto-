import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Clock, Heart } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-gray-100">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Efeito degradê escurecendo levemente no meio, e clareando na base */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-white z-10"></div>
          <img 
            src="https://lh3.googleusercontent.com/grass-cs/ACvplmMyQAjQ_rxtVeHtY7fB6Nb4Tjkst8jrHRDCDCjtBzVC-Avoet2jClB-wJBXibEmYGiL_g-KYHGAbkMFDBLfdzI23WBCqDagvZlBm-3DStS9CEHGCHa0GBsacjYRvYavGD6qp0ML=s1624-w864-h1624-rw" 
            alt="Fachada Clínica Dentalis" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
          <motion.div 
            initial="initial" 
            animate="animate" 
            variants={fadeIn}
            className="flex flex-col items-center bg-black/40 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-light text-white leading-[1.1] mb-6 drop-shadow-md">
              Seu sorriso merece um <br/><span className="text-turquoise-400 font-semibold">cuidado completo.</span>
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl text-white/90 drop-shadow-md">
              Odontologia integrada, especializada e humanizada para cuidar do seu sorriso em todas as fases.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                to="/agendamento" 
                className="bg-turquoise-500 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-turquoise-500/30 hover:shadow-xl hover:bg-turquoise-400 transition-all text-center w-full sm:w-auto"
              >
                Agendar avaliação
              </Link>
              <a 
                href="https://wa.me/5554981610906?text=Olá! Gostaria de agendar uma avaliação na Dentalis."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/30 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 hover:border-white/50 text-center transition-all w-full sm:w-auto shadow-sm"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-6 md:h-[80px] bg-gray-50 flex flex-col md:flex-row items-center justify-around border-y border-gray-100 px-4 md:px-12 gap-4 md:gap-0 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex text-yellow-400 text-xl">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
          </div>
          <div className="text-sm"><strong className="text-[#4a4a4a]">4,9 estrelas</strong> <span className="mx-1">•</span> 339 avaliações no Google</div>
        </div>
        <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>
        <div className="flex items-center gap-3 uppercase tracking-widest text-xs font-bold text-gray-600">
          <span className="text-turquoise-500">●</span> Especialistas em Implantes
        </div>
        <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>
        <div className="flex items-center gap-3 uppercase tracking-widest text-xs font-bold text-gray-600">
          <span className="text-turquoise-500">●</span> Estética Avançada
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-turquoise-500" />,
                title: 'Especialistas em Implantes',
                desc: 'Recupere sua confiança com implantes de alta tecnologia e durabilidade.'
              },
              {
                icon: <Star className="w-8 h-8 text-turquoise-500" />,
                title: 'Estética Odontológica',
                desc: 'Lentes de contato e clareamento para um sorriso harmônico e natural.'
              },
              {
                icon: <Heart className="w-8 h-8 text-turquoise-500" />,
                title: 'Atendimento Integrado',
                desc: 'Todas as especialidades em um só lugar, com cuidado humanizado.'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-turquoise-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-3 font-medium">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Concept */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-[#4a4a4a] mb-6 leading-tight">
                Um novo conceito em <span className="text-turquoise-500">Odontologia</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                A Dentalis nasceu com o propósito de transformar a ida ao dentista em uma experiência confortável, acolhedora e altamente profissional.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Localizada em Caxias do Sul, nossa clínica possui estrutura premium e equipe especializada focada em implantes e estética, oferecendo resultados que unem saúde, função e beleza.
              </p>
              <Link 
                to="/clinica"
                className="inline-flex items-center text-turquoise-500 font-medium hover:text-turquoise-600 transition-colors group"
              >
                Conheça nossa estrutura
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
            <motion.div 
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://lh3.googleusercontent.com/grass-cs/ACvplmMax07YiR9idsG9IBaaIdY2-C0spVBM227dlVq2ErwRr9epCuXc8muDCGZXjMA7XaFl-0YyXc_r4b8qfydBluEx9RO-MTwTW5VCK9WfXBNQXetMjLLpVck8DxxUewG8dEJL8osH=s1624-w864-h1624-rw"
                alt="Consultório Dentalis"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatments Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#4a4a4a] mb-4">Nossas Especialidades</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg">
            Tratamentos modernos e seguros para cuidar da sua saúde bucal de forma integrada.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link to="/agendamento?tratamento=implantes" className="group relative overflow-hidden rounded-2xl bg-gray-100 min-h-[400px] text-left flex flex-col justify-end shadow-md hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/grass-cs/ACvplmMax07YiR9idsG9IBaaIdY2-C0spVBM227dlVq2ErwRr9epCuXc8muDCGZXjMA7XaFl-0YyXc_r4b8qfydBluEx9RO-MTwTW5VCK9WfXBNQXetMjLLpVck8DxxUewG8dEJL8osH=s1624-w864-h1624-rw')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white font-bold text-2xl mb-2 uppercase tracking-wider">Implantes</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6 max-w-md">
                  Substitua dentes perdidos com segurança e previsibilidade. Devolvemos a função mastigatória e a estética do seu sorriso com aspecto 100% natural.
                </p>
                <span className="inline-block text-turquoise-500 font-bold text-sm uppercase tracking-widest border-b-2 border-turquoise-500 pb-1 self-start group-hover:text-white group-hover:border-white transition-colors">Agendar avaliação →</span>
              </div>
            </Link>

            <Link to="/agendamento?tratamento=estetica" className="group relative overflow-hidden rounded-2xl bg-gray-100 min-h-[400px] text-left flex flex-col justify-end shadow-md hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/grass-cs/ACvplmNCIzyL9znDjPpdAVtYMBptCv4lnhOoQOh3ahhbh3_iE-cEXhb3NOO6Xd3dRLZ4LMP6g0ff7fXLvYvtgeruHc-U0smxa_B0Tsn-_A4fzQWOiiTApUQT6sAosWATaU2MoAzktDid=s1624-w864-h1624-rw')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white font-bold text-2xl mb-2 uppercase tracking-wider">Estética</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6 max-w-md">
                  Transforme seu sorriso com lentes de contato dental, clareamento e harmonização do sorriso. Planejamento digital para resultados perfeitos.
                </p>
                <span className="inline-block text-turquoise-500 font-bold text-sm uppercase tracking-widest border-b-2 border-turquoise-500 pb-1 self-start group-hover:text-white group-hover:border-white transition-colors">Agendar avaliação →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#4a4a4a] mb-6">Pronto para cuidar do seu sorriso?</h2>
          <p className="text-[#858688] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Ambiente planejado para seu total conforto e segurança em Caxias do Sul. Agende uma avaliação e descubra como podemos transformar sua qualidade de vida.
          </p>
          <Link 
            to="/agendamento" 
            className="inline-block text-turquoise-500 font-bold text-sm uppercase tracking-widest border-b-2 border-turquoise-500 pb-1 hover:text-turquoise-600 hover:border-turquoise-600 transition-colors"
          >
            Agendar minha avaliação →
          </Link>
        </div>
      </section>
    </div>
  );
}
