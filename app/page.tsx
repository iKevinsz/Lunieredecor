"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  ZoomIn,
  ArrowUp,
  Sparkles
} from "lucide-react";

// --- DADOS DA GALERIA ---
const PORTFOLIO_ITEMS = [
  { id: 1, title: "Tema Cherry", image: "/deco1.jpeg" },
  { id: 2, title: "Tema Cherry", image: "/deco2.jpeg" },
  { id: 3, title: "Tema Cherry", image: "/deco3.jpeg" },
  { id: 4, title: "Tema Cherry", image: "/deco4.jpeg" },
];

// --- COMPONENTE DE ANIMAÇÃO AO ROLAR (REVEAL) ---
const RevealOnScroll = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LunierePortfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to Top Logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Carousel Logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (selectedImageIndex === null) { 
        setCurrentSlide((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
      }
    }, 5000); 
    return () => clearInterval(timer);
  }, [selectedImageIndex]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length);
  }, []);

  // Lightbox Logic
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
    <main className="min-h-screen bg-[#FAFAFA] text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900 scroll-smooth overflow-x-hidden relative isolate">
      
      {/* --- CSS GLOBAL CUSTOMIZADO --- */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        @keyframes floatIdle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .balloon-anim {
          position: absolute;
          border-radius: 50%;
          filter: blur(3px);
          animation: floatUp linear infinite;
        }
        .balloon-shape {
           border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
        }
        .float-idle {
          animation: floatIdle 6s ease-in-out infinite;
        }
        .custom-shape-divider-bottom-1 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            line-height: 0;
            transform: rotate(180deg);
        }
        .custom-shape-divider-bottom-1 svg {
            position: relative;
            display: block;
            width: calc(100% + 1.3px);
            height: 150px;
        }
        .custom-shape-divider-bottom-1 .shape-fill {
            fill: #FFFFFF;
        }
      `}</style>

      {/* --- BACKGROUND ANIMADO (Balloons) --- */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
         <div className="balloon-anim balloon-shape w-24 h-28 bg-rose-200/30 left-[10%]" style={{ animationDuration: '25s', animationDelay: '0s' }}></div>
         <div className="balloon-anim balloon-shape w-32 h-40 bg-stone-200/40 left-[80%]" style={{ animationDuration: '30s', animationDelay: '5s' }}></div>
         <div className="balloon-anim balloon-shape w-16 h-20 bg-rose-300/20 left-[30%]" style={{ animationDuration: '22s', animationDelay: '10s' }}></div>
         <div className="balloon-anim balloon-shape w-20 h-24 bg-amber-100/40 left-[60%]" style={{ animationDuration: '35s', animationDelay: '2s' }}></div>
         <div className="balloon-anim balloon-shape w-40 h-48 bg-white/60 left-[50%] blur-md" style={{ animationDuration: '45s', animationDelay: '15s' }}></div>
         <div className="balloon-anim balloon-shape w-28 h-36 bg-rose-100/30 left-[20%]" style={{ animationDuration: '28s', animationDelay: '8s' }}></div>
         <div className="balloon-anim balloon-shape w-14 h-18 bg-stone-100/50 left-[5%]" style={{ animationDuration: '20s', animationDelay: '12s' }}></div>
         <div className="balloon-anim balloon-shape w-36 h-44 bg-rose-200/20 left-[90%]" style={{ animationDuration: '38s', animationDelay: '3s' }}></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-stone-100/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex flex-col justify-center h-full group cursor-pointer" onClick={scrollToTop}>
            <span className="text-3xl font-serif font-bold text-stone-900 tracking-widest leading-none transition-transform duration-300 group-hover:scale-105 group-hover:text-rose-900">
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
              className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-rose-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-stone-900/20 hover:shadow-rose-600/30 hover:-translate-y-1 active:scale-95"
            >
              <MessageCircle size={18} />
              Solicitar Orçamento
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-stone-600 transition-transform duration-300 active:scale-90 hover:text-rose-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-6 flex flex-col gap-4 shadow-xl">
            {['Início', 'Sobre', 'Portfólio', 'Contato'].map((item, i) => (
               <Link 
                 key={item} 
                 href={`#${item.toLowerCase().replace('ú','u').replace('ó','o')}`}
                 onClick={() => setIsMobileMenuOpen(false)} 
                 className="text-stone-600 py-3 px-4 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors text-center font-medium"
               >
                 {item}
               </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="relative z-10 pt-40 pb-32 px-6 md:pt-52 md:pb-48 min-h-[90vh] flex items-center justify-center">
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <RevealOnScroll delay={100}>
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm text-rose-900 text-xs font-bold uppercase tracking-[0.2em] mb-4 border border-rose-100 shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-default">
              <Sparkles size={14} className="text-amber-500 animate-pulse" /> Arte em Balões
            </span>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <h1 className="text-5xl md:text-8xl font-serif font-medium text-stone-900 leading-tight md:leading-tight pb-2">
              Transformando ar em <br />
              <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-900 via-rose-500 to-amber-600 relative inline-block drop-shadow-sm pb-2">
                arte e memórias.
              </span>
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={500}>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light px-4 bg-white/30 backdrop-blur-sm rounded-xl py-4 border border-white/40">
              Especialista em balloon design para eventos corporativos e sociais. 
              Do bouquet minimalista às grandes instalações orgânicas, a Luniére eleva o nível da sua celebração.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10 px-4">
              <a 
                href="#galeria"
                className="group w-full sm:w-auto px-10 py-4 bg-stone-900 text-white rounded-full hover:bg-rose-900 transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-900/20 active:scale-95 text-lg flex items-center justify-center gap-2"
              >
                Ver Nossas Criações
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contato"
                className="w-full sm:w-auto px-10 py-4 bg-white/80 backdrop-blur-sm border border-stone-200 text-stone-700 rounded-full hover:bg-white hover:text-rose-600 hover:border-rose-200 transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-lg active:scale-95 text-lg"
              >
                Falar no WhatsApp
              </a>
            </div>
          </RevealOnScroll>
        </div>

        <div className="custom-shape-divider-bottom-1">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
      </section>

      {/* --- SEPARADOR VISUAL --- */}
      <div className="h-24 bg-white relative z-10"></div> 

      {/* --- GALERIA CAROUSEL --- */}
      <section id="galeria" className="py-20 px-6 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="text-center mb-20">
            <span className="text-rose-500 font-bold tracking-widest text-sm uppercase bg-rose-50 px-4 py-2 rounded-full mb-4 inline-block">Excelência Visual</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mt-4 mb-6">Nosso <span className="italic text-rose-900 relative">Portfólio</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-rose-400 to-amber-200 mx-auto rounded-full"></div>
            <p className="text-stone-500 mt-6 max-w-lg mx-auto text-lg">Instalações orgânicas e designs exclusivos, planejados para encantar em cada detalhe.</p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[700px] overflow-hidden rounded-3xl shadow-2xl group border-[8px] border-white bg-stone-100">
              <div 
                className="w-full h-full flex transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {PORTFOLIO_ITEMS.map((item, index) => (
                  <div key={item.id} className="w-full h-full flex-shrink-0 relative group/slide">
                    <div 
                      className="relative w-full h-full cursor-zoom-in overflow-hidden"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover/slide:scale-110"
                        priority={index === 0}
                      />
                      {/* Overlay no Hover */}
                      <div className="absolute inset-0 bg-rose-900/0 hover:bg-rose-900/20 transition-all duration-500 flex items-center justify-center opacity-0 hover:opacity-100">
                         <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl transform translate-y-4 hover:translate-y-0 transition-all duration-300 flex items-center gap-2 text-rose-900 font-medium">
                           <ZoomIn size={20} /> Ampliar
                         </div>
                      </div>
                    </div>
                    {/* Legenda Fixa */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-10 md:p-16 text-white pointer-events-none">
                        <h3 className="text-3xl md:text-5xl font-serif font-bold mb-3 drop-shadow-lg translate-y-4 opacity-0 group-hover/slide:opacity-100 group-hover/slide:translate-y-0 transition-all duration-500 delay-100">{item.title}</h3>
                        <p className="text-sm md:text-base text-white/90 uppercase tracking-widest font-medium flex items-center gap-2 opacity-0 group-hover/slide:opacity-100 transition-all duration-500 delay-200">
                            <span className="w-12 h-[2px] bg-rose-500"></span> Projeto Exclusivo
                        </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles do Carousel */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/90 backdrop-blur-md rounded-full text-white hover:text-rose-900 shadow-lg transition-all duration-300 flex items-center justify-center border border-white/30 z-20 group/btn"
              >
                <ChevronLeft size={32} className="group-hover/btn:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/90 backdrop-blur-md rounded-full text-white hover:text-rose-900 shadow-lg transition-all duration-300 flex items-center justify-center border border-white/30 z-20 group/btn"
              >
                <ChevronRight size={32} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Dots de Navegação */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {PORTFOLIO_ITEMS.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
                    className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${
                      currentSlide === index ? "bg-rose-500 w-12" : "bg-white/50 hover:bg-white w-2.5"
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- SOBRE A JUYLIANNE --- */}
      <section id="sobre" className="py-32 px-6 relative z-10 overflow-hidden">
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20 bg-white/70 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-rose-100/50 border border-white/60">
          
          {/* Coluna Imagem com Animação Float */}
          <div className="w-full md:w-1/2 relative group">
            <RevealOnScroll delay={0} className="float-idle">
              <div className="aspect-[3/4] relative rounded-t-[12rem] rounded-b-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-rose-900/20 border-4 border-white">
                <Image 
                  src="/Ju.png" 
                  alt="Juylianne Luniére - Balloon Designer"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Efeito de brilho na borda */}
                <div className="absolute inset-0 border-[1px] border-white/20 rounded-t-[12rem] rounded-b-3xl pointer-events-none"></div>
              </div>
            </RevealOnScroll>
            
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-200 rounded-full -z-10 opacity-40 blur-2xl animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 border-[3px] border-rose-200 rounded-full -z-10 animate-[spin_10s_linear_infinite]"></div>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <RevealOnScroll delay={200}>
              <h2 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">
                Olá, eu sou a <br/>
                <span className="italic text-rose-900 relative inline-block mt-2">
                  Juylianne Luniére
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-rose-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <h3 className="flex items-center gap-3 text-stone-500 text-sm font-bold uppercase tracking-[0.2em]">
                <span className="w-8 h-[2px] bg-rose-900"></span>
                Balloon Designer Profissional
              </h3>
            </RevealOnScroll>
            
            <RevealOnScroll delay={600}>
              <div className="space-y-6 text-stone-600 leading-relaxed font-light text-xl">
                <p>
                  Minha paixão é transformar ambientes através da arte com balões. A <strong className="text-rose-900 font-medium">Luniére Balões & Decoração</strong> nasceu para trazer cor, volume e sofisticação para os seus momentos especiais.
                </p>
                <p>
                  Especializei-me em <strong className="text-rose-900 font-medium">Arcos Orgânicos</strong> e estruturas complexas, utilizando técnicas modernas que garantem durabilidade e um acabamento impecável.
                </p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={800}>
              <div className="pt-8 flex flex-row items-center gap-6 md:gap-12">
                <div className="flex flex-col group cursor-default">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-stone-900 group-hover:text-rose-500 transition-colors duration-300">Design</span>
                  <span className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">Único</span>
                </div>
                
                {/* Separador agora visível em todas as telas */}
                <div className="w-px h-12 md:h-16 bg-stone-200"></div>
                
                <div className="flex flex-col group cursor-default">
                  <span className="text-3xl md:text-5xl font-serif font-bold text-stone-900 group-hover:text-rose-500 transition-colors duration-300">Material</span>
                  <span className="text-xs text-stone-500 uppercase tracking-wider font-bold mt-1">Premium</span>
                </div>
            </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contato" className="bg-stone-950 text-white pt-32 pb-16 px-6 relative z-10 overflow-hidden">
        {/* Balões escuros de fundo no footer */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
           <div className="balloon-anim balloon-shape w-40 h-48 bg-stone-700 top-10 left-10 delay-1000"></div>
           <div className="balloon-anim balloon-shape w-20 h-24 bg-rose-900 bottom-20 right-20 delay-500"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight">
              Vamos inflar essa ideia?
            </h2>
            <p className="text-stone-400 max-w-lg mx-auto font-light text-lg mt-6">
              Entre em contato para um orçamento personalizado de arco orgânico, escultura ou decoração corporativa.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="flex flex-wrap justify-center gap-6">
              <SocialLink 
                href="https://www.instagram.com/lunierebaloesdecor/?hl=pt-br" 
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
          </RevealOnScroll>

          <div className="pt-20 border-t border-stone-800 text-stone-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <span>© 2026 Luniére Balões & Decoração. Todos os direitos reservados.</span>
            <a 
              href="https://kevin-fiorelo.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs opacity-70 hover:opacity-100 transition-opacity hover:text-rose-300 cursor-pointer bg-white/5 px-4 py-2 rounded-full"
            >
              Design & Dev por Kevin Rodrigo <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
            </a>
          </div>
        </div>
      </footer>

      {/* --- BOTÃO VOLTAR AO TOPO --- */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-rose-900/90 backdrop-blur text-white rounded-full shadow-2xl transition-all duration-500 border border-white/20 ${
          showScrollTop ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-10 rotate-180 pointer-events-none'
        } hover:bg-rose-700 hover:-translate-y-1 active:scale-95`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={24} />
      </button>

      {/* --- MODAL DE IMAGEM (LIGHTBOX MELHORADO) --- */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button className="absolute top-6 right-6 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 z-50">
            <X size={28} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:scale-110 transition-all z-50 hover:bg-white/10 rounded-full"
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:scale-110 transition-all z-50 hover:bg-white/10 rounded-full"
          >
            <ChevronRight size={48} />
          </button>
          
          <div className="relative w-full max-w-6xl h-full max-h-[85vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
             <div className="relative w-full h-full shadow-2xl rounded-sm overflow-hidden ring-1 ring-white/10">
               <Image
                 src={PORTFOLIO_ITEMS[selectedImageIndex].image}
                 alt={PORTFOLIO_ITEMS[selectedImageIndex].title}
                 fill
                 className="object-contain"
                 priority
                 quality={100}
               />
             </div>
             <div className="mt-6 text-center">
                <h3 className="text-white text-3xl font-serif">{PORTFOLIO_ITEMS[selectedImageIndex].title}</h3>
                <p className="text-white/50 text-sm uppercase tracking-widest mt-2">Luniére Balões</p>
             </div>
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
      className="relative text-stone-600 hover:text-rose-900 transition-colors py-2 group font-medium"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-900 transition-all duration-300 group-hover:w-full opacity-50"></span>
    </Link>
  );
}

function SocialLink({ href, icon, label }: any) {
  return (
    <a 
      href={href} 
      target="_blank"
      className="flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full bg-white/5 hover:bg-white hover:text-stone-900 transition-all duration-300 group hover:-translate-y-2 hover:shadow-lg hover:shadow-rose-900/20 text-lg"
    >
      <span className="text-stone-400 group-hover:text-stone-900 transition-colors duration-300 group-hover:scale-110 block">{icon}</span>
      <span>{label}</span>
    </a>
  );
}