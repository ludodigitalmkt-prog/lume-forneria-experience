import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Baby, CalendarDays, Check, ChefHat, ChevronDown, ChevronLeft,
  ChevronRight, Clock3, Flame, Headphones, Heart,  MapPin, Menu,
  Minus, Music2, Pause, Phone, Play, Plus, ShoppingBag, Sparkles, Star, Truck,
  Wine, X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "./index.css";

const flavors = [
  { id: "margherita", name: "Margherita Lumé", tag: "A mais pedida", price: 64, description: "Molho artesanal, mozzarella fior di latte, tomate confit e manjericão fresco.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=90" },
  { id: "tartufo", name: "Tartufo Nero", tag: "Assinatura da casa", price: 82, description: "Creme de parmesão, cogumelos, mozzarella, azeite trufado e rúcula.", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=90" },
  { id: "pepperoni", name: "Pepperoni di Casa", tag: "Picante equilibrado", price: 72, description: "Molho rústico, mozzarella, pepperoni artesanal e toque de mel picante.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=90" },
  { id: "burrata", name: "Burrata & Parma", tag: "Experiência premium", price: 88, description: "Molho de tomate, presunto parma, burrata cremosa, pesto e tomate-cereja.", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=90" }
];

const chefs = [
  { name: "Enzo Bellini", role: "Pizzaiolo-chefe", text: "Especialista em fermentação natural e forno de alta temperatura.", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=85" },
  { name: "Marina Alves", role: "Chef de cozinha", text: "Cria entradas autorais, massas frescas e sobremesas da casa.", image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=900&q=85" },
  { name: "Rafael Conti", role: "Pizzaiolo", text: "Responsável pelo forno, finalização e combinações sazonais.", image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=900&q=85" }
];

const events = [
  ["QUI", "06", "Jazz & Vinho", "Quarteto Aurora · 20h30"],
  ["SEX", "07", "DJ Sunset", "DJ Mavi · 19h"],
  ["SÁB", "08", "Noite Italiana", "Voz e violão · 20h"]
];

const nav = [["cardapio", "Cardápio"], ["experiencia", "Experiência"], ["eventos", "Eventos"], ["ambientes", "Ambientes"], ["contato", "Contato"]];
const money = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

function App() {
  const [loaded, setLoaded] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [flavor, setFlavor] = useState(flavors[0]);
  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState("Grande");
  const [crust, setCrust] = useState("Napolitana");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [music, setMusic] = useState(false);
  const [reservationStep, setReservationStep] = useState(1);
  const [toast, setToast] = useState("");
  const [chefIndex, setChefIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [orderStage, setOrderStage] = useState(0);
  const [countdown, setCountdown] = useState({ h: 2, m: 34, s: 18 });

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => {
      let { h, m, s } = c;
      if (s > 0) s--;
      else if (m > 0) { m--; s = 59; }
      else if (h > 0) { h--; m = 59; s = 59; }
      return { h, m, s };
    }), 1000);
    return () => clearInterval(t);
  }, []);

  const total = useMemo(() => {
    const sizeAdd = size === "Família" ? 18 : size === "Média" ? -10 : 0;
    const crustAdd = crust === "Borda recheada" ? 12 : 0;
    return (flavor.price + sizeAdd + crustAdd) * qty;
  }, [flavor, size, crust, qty]);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenu(false); };
  const notify = (message) => { setToast(message); setTimeout(() => setToast(""), 2500); };
  const chooseFlavor = (item) => { setFlavor(item); setRotation((r) => r + 360); };

  return (
    <div className="site-shell">
      <AnimatePresence>{!loaded && <motion.div className="loader" exit={{ opacity: 0 }}><motion.div className="loader-mark" animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }} transition={{ duration: 1, repeat: Infinity }}><Flame /></motion.div><strong>LUMÉ</strong><span>acendendo o forno...</span></motion.div>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ y: -25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}><Check size={18} />{toast}</motion.div>}</AnimatePresence>

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("inicio")}><span className="brand-icon"><Flame size={22} /></span><span><strong>LUMÉ</strong><small>FORNERIA</small></span></button>
        <nav className="desktop-menu">{nav.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</nav>
        <div className="header-actions">
          <button className="icon-action" onClick={() => setCart(true)} aria-label="Abrir pedido"><ShoppingBag size={19} /><span>1</span></button>
          <button className="reserve-header" onClick={() => { setReservationStep(1); setReservation(true); }}>Reservar mesa <ArrowRight size={17} /></button>
          <button className="mobile-toggle" onClick={() => setMobileMenu(true)}><Menu /></button>
        </div>
      </header>

      <AnimatePresence>{mobileMenu && <motion.aside className="mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
        <button className="close-button" onClick={() => setMobileMenu(false)}><X /></button><span className="mobile-overline">LUMÉ FORNERIA</span>
        {nav.map(([id, label], i) => <motion.button key={id} onClick={() => scrollTo(id)} initial={{ x: 25, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * .06 }}>{label}<ArrowRight /></motion.button>)}
        <button className="mobile-reserve" onClick={() => setReservation(true)}>Reservar uma mesa</button>
      </motion.aside>}</AnimatePresence>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-text">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 15 }} animate={loaded ? { opacity: 1, y: 0 } : {}}><span />Fogo, sabor e bons encontros</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: .15 }}>A pizza vira<em> experiência.</em></motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: .3 }}>Fermentação lenta, ingredientes selecionados, música e uma atmosfera criada para transformar cada encontro em memória.</motion.p>
            <motion.div className="hero-buttons" initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ delay: .45 }}>
              <button className="primary-cta" onClick={() => scrollTo("cardapio")}>Explorar cardápio <ArrowRight size={18} /></button>
              <button className="secondary-cta" onClick={() => setReservation(true)}><CalendarDays size={18} />Reservar mesa</button>
            </motion.div>
            <div className="hero-proof"><div className="avatar-stack"><img src="https://i.pravatar.cc/100?img=12" alt=""/><img src="https://i.pravatar.cc/100?img=32" alt=""/><img src="https://i.pravatar.cc/100?img=47" alt=""/></div><div><div className="stars">{[1,2,3,4,5].map(i => <Star key={i} size={13} fill="currentColor" />)}</div><span>4,9 por mais de 2.800 clientes</span></div></div>
          </div>
          <div className="hero-pizza-wrap">
            <motion.div className="pizza-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
            <motion.div className="pizza-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 31, repeat: Infinity, ease: "linear" }} />
            <motion.div className="hero-pizza" initial={{ scale: .75, opacity: 0, rotate: -14 }} animate={loaded ? { scale: 1, opacity: 1, rotate: 0 } : {}}><img src={flavor.image} alt={flavor.name}/><button className="pizza-center-button" onClick={() => scrollTo("cardapio")}>Monte a sua <ArrowRight size={16}/></button></motion.div>
            <motion.div className="floating-ingredient tomato" animate={{ y: [0,-12,0], rotate: [0,8,0] }} transition={{ duration: 4, repeat: Infinity }}>🍅</motion.div>
            <motion.div className="floating-ingredient basil" animate={{ y: [0,14,0], rotate: [0,-12,0] }} transition={{ duration: 5, repeat: Infinity }}>🌿</motion.div>
            <motion.div className="floating-ingredient pepper" animate={{ y: [0,-10,0], rotate: [0,15,0] }} transition={{ duration: 4.6, repeat: Infinity }}>🌶️</motion.div>
            <div className="hero-floating-card card-open"><span className="live-dot"/><div><small>Forno aceso agora</small><strong>Tempo médio: 28 min</strong></div></div>
            <div className="hero-floating-card card-event"><Music2 size={18}/><div><small>Hoje, 20h30</small><strong>Jazz ao vivo</strong></div></div>
          </div>
          <div className="hero-bottom"><button onClick={() => setMusic(true)}><Headphones size={18}/>Pedir uma música</button><span>Rua das Oliveiras, 128 · Centro</span><button onClick={() => setCart(true)}><Truck size={18}/>Delivery aberto</button></div>
        </section>

        <section className="experience-strip">
          <div><ChefHat/><span><strong>Fermentação natural</strong>48 horas de maturação</span></div>
          <div><Flame/><span><strong>Forno a 450°C</strong>Massa leve e borda aerada</span></div>
          <div><Wine/><span><strong>Carta selecionada</strong>Vinhos e drinks autorais</span></div>
          <div><Baby/><span><strong>Espaço kids</strong>Monitoria em horários especiais</span></div>
        </section>

        <section className="builder-section" id="cardapio">
          <div className="section-intro"><span>Cardápio interativo</span><h2>Escolha. Gire. Prove com os olhos.</h2><p>Selecione um sabor e veja sua pizza mudar em tempo real. Uma prévia deliciosa antes mesmo do primeiro pedaço.</p></div>
          <div className="builder-grid">
            <div className="builder-pizza-panel"><motion.div className="builder-pizza" animate={{ rotate: rotation }} transition={{ duration: .85, ease: [.2,.8,.2,1] }}><img src={flavor.image} alt={flavor.name}/></motion.div><span className="pizza-shadow"/><div className="builder-badges"><span><Flame size={15}/>forno artesanal</span><span><Sparkles size={15}/>ingredientes premium</span></div></div>
            <div className="builder-controls">
              <div className="builder-heading"><span>{flavor.tag}</span><h3>{flavor.name}</h3><p>{flavor.description}</p></div>
              <div className="flavor-selector"><label>Escolha o sabor</label><div className="flavor-list">{flavors.map(item => <button key={item.id} className={flavor.id === item.id ? "active" : ""} onClick={() => chooseFlavor(item)}><img src={item.image} alt=""/><span><strong>{item.name}</strong><small>{money(item.price)}</small></span>{flavor.id === item.id && <Check size={16}/>}</button>)}</div></div>
              <div className="option-row"><div><label>Tamanho</label><div className="segmented">{["Média","Grande","Família"].map(item => <button key={item} className={size === item ? "active" : ""} onClick={() => setSize(item)}>{item}</button>)}</div></div><div><label>Massa</label><div className="select-like"><select value={crust} onChange={e => setCrust(e.target.value)}><option>Napolitana</option><option>Fina crocante</option><option>Borda recheada</option></select><ChevronDown size={17}/></div></div></div>
              <div className="builder-total"><div><small>Total do pedido</small><strong>{money(total)}</strong></div><div className="quantity-control"><button onClick={() => setQty(Math.max(1, qty-1))}><Minus size={16}/></button><span>{qty}</span><button onClick={() => setQty(qty+1)}><Plus size={16}/></button></div><button className="add-cart" onClick={() => { setCart(true); notify(`${flavor.name} adicionada ao pedido.`); }}>Adicionar ao pedido <ShoppingBag size={18}/></button></div>
            </div>
          </div>
        </section>

        <section className="story-section" id="experiencia">
          <div className="story-collage"><motion.img whileHover={{ rotate: -2, scale: 1.02 }} src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=85" className="story-main" alt="Pizza sendo servida"/><motion.img whileHover={{ rotate: 2, scale: 1.02 }} src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=85" className="story-side" alt="Ambiente"/><div className="story-stamp"><Flame/><span>desde<br/>2018</span></div></div>
          <div className="story-content"><span className="section-kicker">Nossa essência</span><h2>Mais do que jantar. Um ritual à mesa.</h2><p>A LUMÉ nasceu do encontro entre a tradição italiana e a energia das noites contemporâneas. Massa leve, cozinha aberta, música e serviço que aproxima.</p><div className="story-numbers"><div><strong>48h</strong><span>de fermentação</span></div><div><strong>450°C</strong><span>no forno</span></div><div><strong>28</strong><span>rótulos de vinho</span></div></div><button className="outline-button" onClick={() => scrollTo("cozinha")}>Conhecer nossa cozinha <ArrowRight size={17}/></button></div>
        </section>

        <section className="happy-section"><div className="happy-copy"><span>De terça a sexta · 17h às 20h</span><h2>Happy Hour LUMÉ</h2><p>Drinks autorais, entradas para compartilhar e playlists que mudam o clima da noite.</p><button onClick={() => setReservation(true)}>Reservar para hoje <ArrowRight size={17}/></button></div><div className="happy-countdown"><span>Começa em</span>{[[countdown.h,"horas"],[countdown.m,"min"],[countdown.s,"seg"]].map(([v,l],i) => <div key={l}><strong>{String(v).padStart(2,"0")}</strong><small>{l}</small>{i < 2 && <b>:</b>}</div>)}</div><img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85" alt="Drinks"/></section>

        <section className="events-section" id="eventos">
          <div className="section-heading horizontal"><div><span>Agenda da casa</span><h2>A noite também tem trilha sonora.</h2></div><button className="outline-button" onClick={() => setMusic(true)}>Pedir uma música <Music2 size={17}/></button></div>
          <div className="events-layout"><div className="artist-card"><img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85" alt="Artista"/><div className="artist-overlay"><div><span>Hoje na LUMÉ</span><h3>Quarteto Aurora</h3><p>Jazz, soul e releituras brasileiras.</p></div><button onClick={() => setPlaying(!playing)}>{playing ? <Pause/> : <Play/>}</button></div></div><div className="event-list">{events.map(([day,date,title,sub]) => <article key={title}><div className="event-date"><span>{day}</span><strong>{date}</strong></div><div><h3>{title}</h3><p>{sub}</p></div><button onClick={() => { setReservation(true); notify(`Evento ${title} selecionado.`); }}><ArrowRight/></button></article>)}<button className="music-request" onClick={() => setMusic(true)}><Headphones/><span><strong>A música é sua</strong>Peça uma canção para o artista da noite</span><ArrowRight/></button></div></div>
        </section>

        <section className="spaces-section" id="ambientes"><div className="section-intro light"><span>Escolha seu clima</span><h2>Um ambiente para cada encontro.</h2></div><div className="spaces-grid"><article className="space-card wide"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85" alt="Salão"/><div><span>01</span><h3>Salão principal</h3><p>Luz baixa, cozinha aberta e vista para o forno.</p></div></article><article className="space-card"><img src="https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&w=1000&q=85" alt="Varanda"/><div><span>02</span><h3>Varanda</h3><p>Mesas ao ar livre e clima descontraído.</p></div></article><article className="space-card"><img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1000&q=85" alt="Espaço kids"/><div><span>03</span><h3>Espaço kids</h3><p>Brincadeiras, monitoria e segurança para os pequenos.</p></div></article></div></section>

        <section className="kitchen-section" id="cozinha"><div className="kitchen-copy"><span className="section-kicker">Cozinha aberta</span><h2>Veja onde tudo ganha vida.</h2><p>Da farinha ao forno: nossa cozinha faz parte da experiência. Você acompanha o preparo, sente o aroma e conhece quem está por trás de cada receita.</p><div className="chef-selector"><button onClick={() => setChefIndex((chefIndex-1+chefs.length)%chefs.length)}><ChevronLeft/></button><span>{String(chefIndex+1).padStart(2,"0")} / {String(chefs.length).padStart(2,"0")}</span><button onClick={() => setChefIndex((chefIndex+1)%chefs.length)}><ChevronRight/></button></div></div><AnimatePresence mode="wait"><motion.div key={chefs[chefIndex].name} className="chef-profile" initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -35 }}><img src={chefs[chefIndex].image} alt={chefs[chefIndex].name}/><div><small>{chefs[chefIndex].role}</small><h3>{chefs[chefIndex].name}</h3><p>{chefs[chefIndex].text}</p></div></motion.div></AnimatePresence></section>

        <section className="delivery-section"><div className="delivery-phone"><div className="phone-top"><span>9:41</span><strong>LUMÉ</strong></div><img src={flavor.image} alt=""/><div className="phone-content"><span>Seu pedido</span><h3>{flavor.name}</h3><div className="delivery-status">{["Recebido","No forno","Em rota"].map((item,i) => <div key={item} className={i <= orderStage ? "active" : ""}><i/><span>{item}</span></div>)}</div><button onClick={() => setOrderStage(Math.min(2, orderStage+1))}>Acompanhar pedido</button></div></div><div className="delivery-copy"><span className="section-kicker">LUMÉ em casa</span><h2>Do nosso forno para a sua mesa.</h2><p>Monte o pedido, acompanhe o preparo e receba tudo com a mesma qualidade da experiência no salão.</p><ul><li><Check/>Entrega acompanhada em tempo real</li><li><Check/>Embalagem térmica e sustentável</li><li><Check/>Programa de benefícios LUMÉ Club</li></ul><button className="primary-cta" onClick={() => setCart(true)}>Iniciar pedido <Truck size={18}/></button></div></section>

        <section className="testimonial-section"><div><span>“</span><blockquote>Uma pizzaria que entende que sabor, música e ambiente precisam conversar. Cada visita parece uma noite especial.</blockquote><strong>Camila & Renato</strong><small>Clientes LUMÉ Club</small></div><div className="testimonial-score"><strong>4,9</strong><div className="stars">{[1,2,3,4,5].map(i => <Star key={i} fill="currentColor"/>)}</div><span>2.800+ avaliações verificadas</span></div></section>

        <section className="contact-section" id="contato"><div className="contact-card"><span className="section-kicker">Sua próxima noite</span><h2>Já escolheu onde sentar?</h2><p>Reserve sua mesa e personalize a experiência: ambiente, ocasião e proximidade do palco ou do espaço kids.</p><div className="contact-actions"><button className="primary-cta" onClick={() => setReservation(true)}>Reservar mesa <CalendarDays size={18}/></button><button className="secondary-cta" onClick={() => setCart(true)}>Pedir delivery <ShoppingBag size={18}/></button></div></div><div className="contact-info"><div><MapPin/><span><strong>Centro</strong>Rua das Oliveiras, 128</span></div><div><Clock3/><span><strong>Terça a domingo</strong>18h às 00h</span></div><div><Phone/><span><strong>Reservas</strong>(41) 3333-2026</span></div></div></section>
      </main>

      <footer><button className="brand footer-brand" onClick={() => scrollTo("inicio")}><span className="brand-icon"><Flame size={22}/></span><span><strong>LUMÉ</strong><small>FORNERIA</small></span></button><div className="footer-links">{nav.map(([id,label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div><div className="footer-social"><button><span aria-hidden="true" style={{ fontWeight: 800, fontSize: "11px" }}>IG</span></button><button><Heart/></button></div><p>Projeto conceitual desenvolvido pela LUDO Digital. Marca, pessoas e informações fictícias.</p></footer>

      <AnimatePresence>{reservation && <Modal onClose={() => setReservation(false)}><div className="modal-heading"><span>Reserva de mesa</span><h2>Seu lugar na LUMÉ.</h2><p>Etapa {reservationStep} de 3</p></div><div className="steps">{[1,2,3].map(step => <i key={step} className={reservationStep >= step ? "active" : ""}/>)}</div>{reservationStep === 1 && <div className="modal-form"><label>Data<input type="date" defaultValue="2026-08-08"/></label><label>Número de pessoas<select defaultValue="4 pessoas"><option>2 pessoas</option><option>4 pessoas</option><option>6 pessoas</option><option>8 pessoas</option></select></label><label className="full">Ambiente<div className="choice-grid">{["Salão principal","Varanda","Próximo ao palco","Espaço família"].map((item,i) => <button key={item} className={i === 0 ? "selected" : ""}>{item}</button>)}</div></label></div>}{reservationStep === 2 && <div className="modal-form"><label className="full">Horário<div className="time-grid">{["18:30","19:00","19:30","20:30","21:00","21:30"].map((item,i) => <button key={item} className={i === 3 ? "selected" : ""}>{item}</button>)}</div></label><label>Nome<input placeholder="Seu nome"/></label><label>Telefone<input placeholder="(41) 99999-9999"/></label><label className="full">Ocasião<select><option>Jantar</option><option>Aniversário</option><option>Encontro</option><option>Confraternização</option></select></label></div>}{reservationStep === 3 && <div className="success-state"><div><Check/></div><h3>Reserva pré-confirmada!</h3><p>Mesa para 4 pessoas, sábado às 20h30, no salão principal.</p><span>Código: LUME-2084</span></div>}<div className="modal-actions">{reservationStep > 1 && reservationStep < 3 && <button onClick={() => setReservationStep(reservationStep-1)}>Voltar</button>}{reservationStep < 3 ? <button className="modal-primary" onClick={() => setReservationStep(reservationStep+1)}>Continuar <ArrowRight size={17}/></button> : <button className="modal-primary" onClick={() => setReservation(false)}>Concluir</button>}</div></Modal>}</AnimatePresence>

      <AnimatePresence>{music && <Modal onClose={() => setMusic(false)}><div className="modal-heading"><span>Música ao vivo</span><h2>Qual música combina com sua noite?</h2><p>O pedido entra na fila fictícia do artista.</p></div><div className="now-playing"><img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=85" alt=""/><div><small>Tocando agora</small><strong>Just the Two of Us</strong><span>Quarteto Aurora</span></div><button onClick={() => setPlaying(!playing)}>{playing ? <Pause/> : <Play/>}</button></div><div className="song-form"><input placeholder="Digite uma música ou artista"/><button onClick={() => { notify("Pedido musical enviado para o artista."); setMusic(false); }}>Enviar pedido <Music2 size={17}/></button></div><div className="song-queue"><span>Mais pedidas da noite</span>{[["Fly Me to the Moon",18],["Velha Infância",14],["Isn't She Lovely",11]].map(([song,votes]) => <div key={song}><span>{song}</span><button onClick={() => notify(`Voto registrado em ${song}.`)}>+ {votes}</button></div>)}</div></Modal>}</AnimatePresence>

      <AnimatePresence>{cart && <motion.aside className="cart-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><button className="close-button" onClick={() => setCart(false)}><X/></button><div className="cart-heading"><span>Seu pedido</span><h2>Quase no forno.</h2></div><div className="cart-item"><img src={flavor.image} alt={flavor.name}/><div><strong>{flavor.name}</strong><span>{size} · {crust}</span><small>Quantidade: {qty}</small></div><b>{money(total)}</b></div><div className="coupon"><input placeholder="Cupom de desconto"/><button onClick={() => notify("Cupom conceitual aplicado.")}>Aplicar</button></div><div className="cart-summary"><span>Subtotal <strong>{money(total)}</strong></span><span>Entrega <strong>Grátis</strong></span><span className="grand-total">Total <strong>{money(total)}</strong></span></div><button className="checkout-button" onClick={() => { setOrderStage(1); notify("Pedido fictício confirmado."); setCart(false); }}>Confirmar pedido <ArrowRight/></button><p>Demonstração interativa. Nenhum pedido ou pagamento será realizado.</p></motion.aside>}</AnimatePresence>
    </div>
  );
}

function Modal({ children, onClose }) {
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.div className="modal" initial={{ scale: .92, opacity: 0, y: 25 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: .95, opacity: 0, y: 20 }} onMouseDown={(e) => e.stopPropagation()}><button className="close-button modal-close" onClick={onClose}><X/></button>{children}</motion.div></motion.div>;
}

export default App;
