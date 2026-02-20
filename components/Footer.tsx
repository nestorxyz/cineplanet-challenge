import Link from 'next/link';
import { Book } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'CINES',
      links: ['Ubicaciones'],
    },
    {
      title: 'FORMATOS',
      links: ['Formatos', 'REAL 3D', 'SALA XD', 'D-BOX'],
    },
    {
      title: 'OTROS SERVICIOS',
      links: ['Eventos y Servicios Corporativos', 'Publicidad'],
    },
    {
      title: 'CONTACTO',
      links: ['Escríbenos', 'Trabaja con nosotros'],
    },
    {
      title: 'AYUDA',
      links: [
        'Formulario Devolución Compra en Línea',
        'Ver mi comprobante electrónico',
        'Preguntas frecuentes',
      ],
      special: (
        <Link
          href="#"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mt-2"
        >
          <Book className="h-4 w-4" />
          Libro de reclamaciones
        </Link>
      ),
    },
  ];

  const cartelera = [
    'Cartelera en Cineplanet Asia',
    'Cartelera en Cineplanet Gamarra',
    'Cartelera en Cineplanet Jockey Plaza',
    'Cartelera en Cineplanet Lambramani',
    'Cartelera en Cineplanet Mall Ave Pza Arequipa',
    'Cartelera en Cineplanet MallPlaza Angamos',
    'Cartelera en Cineplanet Mallplaza Bellavista',
    'Cartelera en Cineplanet Mallplaza Comas',
    'Cartelera en Cineplanet MallPlaza Huancayo',
    'Cartelera en Cineplanet MallPlaza Piura',
    'Cartelera en Cineplanet Mallplaza Trujillo',
    'Cartelera en Cineplanet Megaplaza',
    'Cartelera en Cineplanet Open Plaza Huánuco',
    'Cartelera en Cineplanet Plaza Lima Sur',
    'Cartelera en Cineplanet San Miguel',
  ];

  return (
    <footer className="footer bg-[#1a1a1a] text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        {/* Top Sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16 px-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-black tracking-widest text-white uppercase italic">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-zinc-400 hover:text-white transition-colors block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
                {section.special && <li>{section.special}</li>}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 my-12" />

        {/* Cartelera Section */}
        <div className="mb-16 px-4">
          <h3 className="text-sm font-black tracking-widest text-white uppercase italic mb-6">
            CARTELERA POR CINES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-8">
            {cartelera.map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[13px] text-zinc-400 hover:text-white transition-colors truncate"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800 my-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 px-4">
          <div className="space-y-4">
            <Link
              href="#"
              className="text-xs text-zinc-400 hover:text-white block transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="#"
              className="text-xs text-zinc-400 hover:text-white block transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>

          <div className="text-right space-y-1">
            <p className="text-sm text-zinc-300 font-medium">
              Copyright © {currentYear} Cineplanet
            </p>
            <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold">
              Razón Social: CINEPLANET DEL PERU S.R.L - RUC: 20337771085
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
