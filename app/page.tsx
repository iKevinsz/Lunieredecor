"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  MessageCircle,
  Mail,
  Heart,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from "lucide-react";

// --- DADOS DA GALERIA ---
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Fachada Loja Conceito",
    image: "/deco1.jpeg", 
  },
  {
    id: 2,
    title: "Bouquet Personalizado 30 Anos",
    image: "/deco2.jpeg",
  },
  {
    id: 3,
    title: "Entrada Evento Empresarial",
    image: "/deco3.jpeg",
  },
  {
    id: 4,
    title: "Guirlanda Orgânica Pastel",
    image: "/deco4.jpeg",
  },
  // Fallbacks com Unsplash para preencher o carousel se não tiver as fotos locais
];

export default function LunierePortfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // --- Lógica do Carousel Automático ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length);
  };

  // --- Lógica de Navegação do Modal (Lightbox) ---
  const nextLightboxImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % PORTFOLIO_ITEMS.length);
    }
  }, [selectedImageIndex]);

  const prevLightboxImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length);
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, nextLightboxImage, prevLightboxImage]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-stone-800 font-sans selection:bg-rose-200 scroll-smooth overflow-x-hidden">
      
      {/* --- ESTILOS GLOBAIS E ANIMAÇÕES --- */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        .balloon-anim {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          animation: floatUp linear infinite;
          z-index: 0;
        }
        /* Formato de balão levemente oval */
        .balloon-shape {
           border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
        }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-stone-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex flex-col justify-center h-full group cursor-pointer">
            <span className="text-3xl font-serif font-bold text-stone-900 tracking-widest leading-none transition-transform duration-300 group-hover:scale-105">
              LUNIÉRE
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-rose-900/60 mt-1 font-medium group-hover:text-rose-500 transition-colors">
              Balões & Decoração
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <NavLink href="#inicio">Início</NavLink>
            <NavLink href="#sobre">A Balloon Designer</NavLink>
            <NavLink href="#galeria">Portfólio</NavLink>
            <NavLink href="#contato">Contato</NavLink>
            <a 
              href="https://wa.me/5512999999999" 
              className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-rose-900 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-rose-900/20 hover:-translate-y-1 active:scale-95"
            >
              <MessageCircle size={18} />
              Solicitar Orçamento
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-stone-600 transition-transform duration-300 active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`md:hidden bg-white border-t border-stone-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-6 flex flex-col gap-4 shadow-xl">
            <Link href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 py-2 hover:text-rose-500 transition-colors">Início</Link>
            <Link href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 py-2 hover:text-rose-500 transition-colors">Sobre</Link>
            <Link href="#galeria" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 py-2 hover:text-rose-500 transition-colors">Portfólio</Link>
            <Link href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 py-2 font-bold text-rose-500 hover:text-rose-600 transition-colors">Fale Conosco</Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION COM ANIMAÇÃO DE BALÕES --- */}
      <section id="inicio" className="pt-40 pb-20 px-6 md:pt-52 md:pb-32 bg-stone-50 overflow-hidden relative min-h-[90vh] flex items-center justify-center">
        
        {/* BALÕES FLUTUANTES (BACKGROUND) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Balão 1 */}
           <div className="balloon-anim balloon-shape w-24 h-28 bg-rose-200/40 left-[10%]" style={{ animationDuration: '15s', animationDelay: '0s' }}></div>
           {/* Balão 2 */}
           <div className="balloon-anim balloon-shape w-32 h-40 bg-stone-200/50 left-[80%]" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
           {/* Balão 3 */}
           <div className="balloon-anim balloon-shape w-16 h-20 bg-rose-300/30 left-[30%]" style={{ animationDuration: '12s', animationDelay: '5s' }}></div>
           {/* Balão 4 */}
           <div className="balloon-anim balloon-shape w-20 h-24 bg-amber-100/60 left-[60%]" style={{ animationDuration: '20s', animationDelay: '1s' }}></div>
           {/* Balão 5 (fundo) */}
           <div className="balloon-anim balloon-shape w-40 h-48 bg-white/80 left-[50%] blur-sm" style={{ animationDuration: '25s', animationDelay: '8s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
          <span className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm text-rose-900 text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-rose-100 shadow-sm hover:scale-105 transition-transform cursor-default">
            Arte em Balões
          </span>
          
          {/* Título Principal com destaque na fonte - Ajustado para mobile */}
          <h1 className="text-5xl md:text-8xl font-serif font-medium text-stone-900 leading-tight md:leading-tight pb-2">
            Transformando ar em <br />
            <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-900 via-rose-600 to-amber-700 relative inline-block drop-shadow-sm pb-1">
              arte e memórias.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Especialista em balloon design para eventos corporativos e sociais. 
            Do bouquet minimalista às grandes instalações orgânicas, a Luniére eleva o nível da sua celebração.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10 px-4">
            <a 
              href="#galeria"
              className="w-full sm:w-auto px-10 py-4 bg-stone-900 text-white rounded-full hover:bg-rose-900 transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-xl active:scale-95 text-lg"
            >
              Ver Nossas Criações
            </a>
            <a 
              href="#contato"
              className="w-full sm:w-auto px-10 py-4 bg-white border border-stone-200 text-stone-700 rounded-full hover:bg-rose-50 hover:border-rose-200 transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-lg active:scale-95 text-lg"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* --- GALERIA CAROUSEL --- */}
      <section id="galeria" className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-rose-500 font-bold tracking-widest text-sm uppercase">Excelência Visual</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mt-3 mb-6">Nosso <span className="italic text-rose-900">Portfólio</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-amber-200 mx-auto rounded-full"></div>
            <p className="text-stone-500 mt-6 max-w-lg mx-auto text-lg">Instalações orgânicas e designs exclusivos, planejados para encantar em cada detalhe.</p>
          </div>

          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[700px] overflow-hidden rounded-3xl shadow-2xl group border border-stone-100">
            <div 
                className="w-full h-full flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {PORTFOLIO_ITEMS.map((item, index) => (
                    <div key={item.id} className="w-full h-full flex-shrink-0 relative">
                        <div 
                          className="relative w-full h-full cursor-zoom-in"
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <Image 
                              src={item.image} 
                              alt={item.title} 
                              fill
                              className="object-cover"
                              priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 hover:opacity-100 group-hover/image:opacity-100">
                             <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 text-white transform scale-0 hover:scale-110 transition-transform duration-300">
                               <ZoomIn size={40} />
                             </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-10 md:p-16 text-white pointer-events-none">
                            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-3 drop-shadow-lg">{item.title}</h3>
                            <p className="text-sm md:text-base text-white/90 uppercase tracking-widest font-medium flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-white"></span> Clique para ampliar
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-white/20"
            >
                <ChevronLeft size={32} />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-white/20"
            >
                <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {PORTFOLIO_ITEMS.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            currentSlide === index ? "bg-white w-12" : "bg-white/40 hover:bg-white/80 w-2"
                        }`}
                    />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SOBRE A JUYLIANNE --- */}
      <section id="sobre" className="py-32 px-6 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
          
          <div className="w-full md:w-1/2 relative group">
            <div className="aspect-[3/4] relative rounded-t-[12rem] rounded-b-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-3">
              <Image 
                src="/Ju.png" 
                alt="Juylianne Luniére - Balloon Designer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-rose-100 rounded-full -z-10 opacity-60 animate-pulse duration-[3000ms]"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 border-2 border-stone-200 rounded-full -z-10"></div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">
              Olá, eu sou a <br/>
              <span className="italic text-rose-900 relative inline-block mt-2">
                Juylianne Luniére
                <span className="absolute bottom-2 left-0 w-full h-4 bg-rose-200/40 -z-10 transform -rotate-1 rounded-sm"></span>
              </span>
            </h2>
            <h3 className="text-stone-500 text-sm font-bold uppercase tracking-[0.2em] border-l-4 border-rose-900 pl-4">Balloon Designer Profissional</h3>
            
            <div className="space-y-6 text-stone-600 leading-relaxed font-light text-xl">
              <p>
                Minha paixão é transformar ambientes através da arte com balões. A <strong>Luniére Balões & Decoração</strong> nasceu para trazer cor, volume e sofisticação para os seus momentos especiais.
              </p>
              <p>
                Especializei-me em <strong>Arcos Orgânicos</strong> e estruturas complexas, utilizando técnicas modernas que garantem durabilidade e um acabamento impecável.
              </p>
            </div>
            
            <div className="pt-8 flex items-center gap-12">
              <div className="flex flex-col group cursor-default">
                <span className="text-4xl font-serif font-bold text-stone-900 group-hover:text-rose-500 transition-colors duration-300">+300</span>
                <span className="text-sm text-stone-500 uppercase tracking-wider font-medium">Eventos</span>
              </div>
              <div className="w-px h-16 bg-stone-200"></div>
              <div className="flex flex-col group cursor-default">
                <span className="text-4xl font-serif font-bold text-stone-900 group-hover:text-rose-500 transition-colors duration-300">100%</span>
                <span className="text-sm text-stone-500 uppercase tracking-wider font-medium">Dedicação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contato" className="bg-stone-950 text-white pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight">
            Vamos inflar essa ideia?
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto font-light text-lg">
            Entre em contato para um orçamento personalizado de arco orgânico, escultura ou decoração corporativa.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <SocialLink 
              href="https://instagram.com" 
              icon={<Instagram size={24} />} 
              label="@luniere.decor" 
            />
            <SocialLink 
              href="https://wa.me/5512999999999" 
              icon={<MessageCircle size={24} />} 
              label="WhatsApp" 
            />
            <SocialLink 
              href="mailto:contato@luniere.com" 
              icon={<Mail size={24} />} 
              label="Email" 
            />
          </div>

          <div className="pt-20 border-t border-stone-800 text-stone-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <span>© 2026 Luniére Balões & Decoração.</span>
            <span className="flex items-center gap-2 text-xs opacity-70 hover:opacity-100 transition-opacity">
              Design & Dev por Kevin Fiorelo <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
            </span>
          </div>
        </div>
      </footer>

      {/* --- MODAL DE IMAGEM (LIGHTBOX) --- */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all z-50">
            <X size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:scale-110 transition-all z-50 bg-black/20 hover:bg-black/40 rounded-full hidden md:block"
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:scale-110 transition-all z-50 bg-black/20 hover:bg-black/40 rounded-full hidden md:block"
          >
            <ChevronRight size={48} />
          </button>
          
          <div className="relative w-full max-w-7xl h-full max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
             <div className="relative w-full h-full shadow-2xl rounded-lg overflow-hidden">
               <Image
                  src={PORTFOLIO_ITEMS[selectedImageIndex].image}
                  alt={PORTFOLIO_ITEMS[selectedImageIndex].title}
                  fill
                  className="object-contain"
                  priority
               />
             </div>
             <h3 className="text-white text-2xl font-serif mt-6 text-center drop-shadow-md">
                {PORTFOLIO_ITEMS[selectedImageIndex].title}
             </h3>
          </div>
        </div>
      )}

    </main>
  );
}

// --- SUBCOMPONENTES ---

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative text-stone-600 hover:text-rose-900 transition-colors after:content-[''] after:absolute after:w-0 after:h-px after:bg-rose-900 after:left-0 after:-bottom-1 after:transition-all duration-300 hover:after:w-full font-medium"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, icon, label }: any) {
  return (
    <a 
      href={href} 
      target="_blank"
      className="flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full hover:bg-white hover:text-stone-900 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10 text-lg"
    >
      <span className="text-stone-400 group-hover:text-stone-900 transition-colors">{icon}</span>
      <span>{label}</span>
    </a>
  );
}