import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Sparkles, Smile, Stethoscope } from 'lucide-react';

export default function Treatments() {
  const treatments = [
    {
      id: 'implantes',
      title: 'Implantes Dentários',
      desc: 'Solução definitiva e segura para reposição de dentes perdidos. Devolvemos a estética do seu sorriso e a função mastigatória com conforto e previsibilidade.',
      icon: <ShieldCheck className="w-8 h-8 text-turquoise-500" />
    },
    {
      id: 'protese',
      title: 'Prótese Dentária',
      desc: 'Reabilitação oral para restaurar a integridade, função e estética dos dentes, garantindo um sorriso perfeito e natural.',
      icon: <Smile className="w-8 h-8 text-turquoise-500" />
    },
    {
      id: 'clareamento',
      title: 'Clareamento e Resina',
      desc: 'Clareamento dental seguro e facetas em resina para corrigir pequenas imperfeições e devolver o brilho do seu sorriso.',
      icon: <Sparkles className="w-8 h-8 text-turquoise-500" />
    },
    {
      id: 'porcelana',
      title: 'Lentes em Porcelana',
      desc: 'Lentes de contato dental em porcelana ultrafina para uma transformação completa e duradoura da estética do seu sorriso.',
      icon: <Star className="w-8 h-8 text-turquoise-500" />
    },
    {
      id: 'geral',
      title: 'Avaliação Geral',
      desc: 'Check-up odontológico completo, profilaxia e cuidados preventivos para manter a sua saúde bucal sempre em dia.',
      icon: <Stethoscope className="w-8 h-8 text-turquoise-500" />
    }
  ];

  return (
    <div className="w-full bg-white">
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-12 h-[1px] bg-turquoise-500"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-turquoise-500">Especialidades</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#4a4a4a] mb-6">Tratamentos</h1>
          <p className="text-xl text-[#858688] leading-relaxed max-w-2xl">
            Soluções completas e personalizadas para a sua saúde bucal e estética do sorriso.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, idx) => (
              <motion.div 
                key={treatment.id}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="bg-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {treatment.icon}
                </div>
                <h2 className="text-xl font-semibold text-[#4a4a4a] mb-3">{treatment.title}</h2>
                <p className="text-[#858688] leading-relaxed mb-8 flex-grow">{treatment.desc}</p>
                <Link
                  to={`/agendamento?tratamento=${treatment.id}`}
                  className="inline-block text-turquoise-500 font-bold text-sm uppercase tracking-widest border-b-2 border-turquoise-500 pb-1 hover:text-turquoise-600 hover:border-turquoise-600 transition-colors self-start"
                >
                  Tenho interesse →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
