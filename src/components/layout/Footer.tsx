import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DeliveryApp</h3>
            <p className="text-gray-300">
              Sistema completo de delivery para restaurantes e clientes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <span className="text-gray-300">contato@deliveryapp.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <span className="text-gray-300">(11) 98765-4321</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; 2024 DeliveryApp. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
