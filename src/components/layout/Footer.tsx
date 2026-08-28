import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="https://i.postimg.cc/dtGvqWF1/images-(1).png" 
              alt="Dentalis" 
              className="h-10 w-auto object-contain grayscale opacity-70"
            />
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Um novo conceito em Odontologia. Especialistas em implantes e estética para transformar o seu sorriso.
            </p>
            <div className="pt-2">
              <a 
                href="https://instagram.com/dentalisodontologiaintegrada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-400 hover:text-turquoise-500 transition-colors"
              >
                <Instagram size={20} />
                <span className="ml-2 text-sm font-medium">@dentalisodontologiaintegrada</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#4a4a4a] font-semibold mb-6">Navegação</h4>
            <ul className="space-y-3">
              {[
                { name: 'Início', path: '/' },
                { name: 'A Clínica', path: '/clinica' },
                { name: 'Tratamentos', path: '/tratamentos' },
                { name: 'Agendamento', path: '/agendamento' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-turquoise-500 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#4a4a4a] font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-turquoise-500 flex-shrink-0 mt-0.5" />
                <span className="ml-3 text-sm text-gray-500">
                  R. Amábile César Vial, 894<br />
                  Jardim Eldorado<br />
                  Caxias do Sul - RS<br />
                  95059-040
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-turquoise-500 flex-shrink-0" />
                <span className="ml-3 text-sm text-gray-500">(54) 98161-0906</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-[#4a4a4a] font-semibold mb-6">Horários</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Clock size={20} className="text-turquoise-500 flex-shrink-0 mt-0.5" />
                <div className="ml-3 text-sm text-gray-500 space-y-1">
                  <p><span className="font-medium text-gray-700">Segunda a sexta:</span><br />08:00–12:00 e 13:30–19:00</p>
                  <p><span className="font-medium text-gray-700">Sábado:</span><br />08:00–12:00</p>
                  <p><span className="font-medium text-gray-700">Domingo:</span><br />Fechado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dentalis Odontologia Integrada. Todos os direitos reservados.</p>
          <p className="mt-4 md:mt-0">
            Produzido por <a href="https://bwwebdesign.vercel.app" target="_blank" rel="noopener noreferrer" className="text-turquoise-500 hover:text-turquoise-600 font-medium transition-colors">BW Bernardo Web design</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
