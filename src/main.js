import './style.css'
import otoImg from './assets/Oto_sex.jpg'
import { audioEngine } from './audio.js'
import { ParticleEngine } from './particles.js'

// Initial state
let sexometerValue = 85;
let sighsCount = 284192;
let isOverdrive = false;

// Piropos database
const piroposList = [
  "Abner, ¿de qué juguetería te escapaste, semejante muñecazo?",
  "Si la sensualidad pagara impuestos, Abner Otoniel tendría una deuda multimillonaria con el planeta.",
  "Dicen que la perfección no existe, pero claramente los científicos todavía no conocen a Abner.",
  "Abner, ¿no te duelen las piernas? De tanto pasearte por mis pensamientos en cámara lenta.",
  "Otoniel, no eres Google pero tienes absolutamente todo lo que ando buscando.",
  "Con esa mirada, Abner, hasta el café se endulza solo y sin azúcar.",
  "Policía, arresten a Abner Otoniel: robarse todos los suspiros del mundo es completamente ilegal.",
  "Si mirarte fijamente causara ceguera, con gusto me quedaría sin vista para siempre.",
  "Abner, ¿tienes mapa? Porque en el laberinto de tus ojos me pierdo con gusto.",
  "El sol sale de día, la luna de noche, pero la sensualidad de Oto brilla las 24 horas continuas.",
  "No es que haga calor en la habitación, es que Abner acaba de parpadear en nuestra dirección.",
  "Abner Otoniel es como el vino fino: mientras más lo miras, más ganas te dan de celebrar la vida.",
  "¿Acaso eres chef, Oto? Porque semejante sazón y porte no lo tiene cualquiera en este mundo."
];

let currentPiropoIndex = 0;

// Quiz questions
const quizQuestions = [
  {
    question: "1. ¿Qué te sucede cuando Abner Otoniel te mira fijamente a los ojos?",
    options: [
      { text: "Me da un salto el corazón y pierdo la compostura.", points: 25 },
      { text: "Se me olvida mi propio nombre y fecha de nacimiento.", points: 30 },
      { text: "Me derrito instantáneamente como chocolate bajo el sol.", points: 35 }
    ]
  },
  {
    question: "2. Si Abner te invita un café y te sonríe con misterio, ¿qué haces?",
    options: [
      { text: "Acepto antes de que termine de formular la invitación.", points: 25 },
      { text: "Le pido al mesero que traiga dos desfibriladores por si acaso.", points: 30 },
      { text: "Cancelo todos mis planes de aquí a los próximos 10 años.", points: 35 }
    ]
  },
  {
    question: "3. ¿En qué nivel calificarías el porte y elegancia de Oto?",
    options: [
      { text: "10 de 10: Nivel Galán de Cine Internacional.", points: 25 },
      { text: "100 de 10: Obra maestra de la escultura clásica.", points: 30 },
      { text: "Infinito: Rompió la escala de medición de la NASA.", points: 35 }
    ]
  },
  {
    question: "4. ¿Cuál consideras que es el arma más letal de Abner?",
    options: [
      { text: "Su mirada penetrante y calculadora.", points: 25 },
      { text: "La media sonrisa pícara que desarma a cualquiera.", points: 30 },
      { text: "El conjunto completo: Es un paquete de seducción indivisible.", points: 35 }
    ]
  }
];

let currentQuizStep = 0;
let userQuizScore = 0;

// Initial Fan Comments
const fanComments = [
  {
    author: "Valentina R. 💋",
    stars: "★★★★★ (5/5)",
    body: "Llevo tres días admirando la foto de Abner y mi cardiólogo me recomendó dosificar mis visitas a esta página. ¡Demasiado fuego!"
  },
  {
    author: "Carlos 'El Envidioso' M.",
    stars: "★★★★★ (6/5)",
    body: "Vine a criticar pero la verdad es que Abner Otoniel tiene un porte innegable. Mis respetos al galán supremo."
  },
  {
    author: "Camila Seducción 🌹",
    stars: "★★★★★ (10/5)",
    body: "Esa mirada no es de este planeta. Abner debería venir con manual de primeros auxilios y advertencia médica."
  }
];

// Render HTML
const app = document.querySelector('#app');
app.innerHTML = `
  <!-- Canvas for dynamic embers and fireworks -->
  <canvas id="particle-canvas"></canvas>

  <!-- Ambient glowing spots -->
  <div class="ambient-glow ambient-glow-1"></div>
  <div class="ambient-glow ambient-glow-2"></div>
  <div class="ambient-glow ambient-glow-3"></div>

  <!-- Header -->
  <header class="sexy-header">
    <div class="header-container">
      <a href="#monumento" class="logo-badge">
        <span class="logo-flame">🔥</span>
        <span class="logo-text">OTONIEL • SEDUCTION</span>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="#monumento">El Monumento</a></li>
          <li><a href="#sexometro">Sexómetro 3000</a></li>
          <li><a href="#galeria">Portadas GQ</a></li>
          <li><a href="#atributos">8 Atributos</a></li>
          <li><a href="#piropos">Piropos</a></li>
          <li><a href="#quiz">Test Sexy</a></li>
          <li><a href="#fanclub">Club VIP</a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <button id="toggle-music-btn" class="btn-icon-sound" title="Alternar Música Sexy">
          <span id="music-icon">🎷</span>
          <span id="music-label">Música Sexy</span>
        </button>
        <button id="toggle-overdrive-btn" class="btn-overdrive-toggle" title="Activar Modo Infierno">
          🔥 Modo Infierno
        </button>
      </div>
    </div>
  </header>

  <main class="page-container">
    <!-- HERO SECTION -->
    <section id="monumento" class="hero-section">
      <div class="danger-tag">
        <span class="pulsing-dot"></span>
        ALERTA: NIVELES EXTREMOS DE SENSUALIDAD DETECTADOS
      </div>

      <h1 class="hero-title">Abner Otoniel<br>González Álvarez</h1>
      <p class="hero-subtitle">"Peligrosamente irresistible. Patrimonio de la sensualidad humana."</p>
      
      <p class="hero-lead">
        La ciencia todavía no ha logrado explicar cómo una sola persona puede concentrar 
        <strong>tanto porte, tanta mirada ardiente y tanto sex appeal</strong> sin hacer colapsar 
        el termostato del planeta. Bienvenido al templo oficial del hombre más codiciado.
      </p>

      <!-- Centerpiece Portrait Frame -->
      <div class="hero-stage">
        <div class="portrait-glow-halo"></div>
        <div class="portrait-container" id="main-portrait" title="¡Haz clic en Abner para enviarle amor!">
          <img src="${otoImg}" alt="Abner Otoniel González Álvarez - El Más Sexy" class="portrait-image" id="oto-hero-img" />
          <div class="portrait-overlay-gradient"></div>
          
          <div class="floating-badge badge-top-left">
            <span>🏆</span> El Más Deseado 2026
          </div>
          <div class="floating-badge badge-top-right">
            <span>🔥</span> 100% Caliente & Letal
          </div>
          <div class="floating-badge badge-bottom-right">
            <span>💋</span> Peligro: Mirada de Alto Voltaje
          </div>

          <div class="portrait-click-hint">
            <span>💋</span> Toca la foto de Oto para mandarle besos y fuego
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">Temperatura Corporal</span>
            <span class="metric-icon">🌡️</span>
          </div>
          <div class="metric-value">9,999° C</div>
          <div class="metric-sub">Causa directa del cambio climático</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">Letalidad de Mirada</span>
            <span class="metric-icon">👁️</span>
          </div>
          <div class="metric-value">100% Mortal</div>
          <div class="metric-sub">Derrite miradas en 0.2 segundos</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">Porte y Galanura</span>
            <span class="metric-icon">👔</span>
          </div>
          <div class="metric-value">Insuperable</div>
          <div class="metric-sub">Aprobado por el sindicato de galanes</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-label">Estatus de Seducción</span>
            <span class="metric-icon">💥</span>
          </div>
          <div class="metric-value">Ilegal</div>
          <div class="metric-sub">Buscado en 140 países por guapo</div>
        </div>
      </div>

      <!-- Hero Actions -->
      <div class="hero-cta-group">
        <a href="#sexometro" class="btn-sexy-primary" id="btn-hero-hot">
          🔥 Medir Nivel de Fuego
        </a>
        <button class="btn-sexy-secondary" id="btn-hero-kiss">
          💋 Enviar Beso Virtual a Oto
        </button>
        <button class="btn-sexy-secondary" id="btn-open-vip-modal">
          👑 Carnet de Fan VIP
        </button>
      </div>
    </section>

    <!-- SECTION 2: EL SEXÓMETRO 3000 -->
    <section id="sexometro" class="content-section">
      <div class="section-header">
        <span class="section-tag">Herramienta de Diagnóstico Térmico</span>
        <h2 class="section-title">El Sexómetro 3000™</h2>
        <p class="section-desc">
          Monitorea en tiempo real la radiación de sensualidad que emite Abner Otoniel. 
          Cuidado con forzar los botones: el sistema no se hace responsable por pantallas derretidas.
        </p>
      </div>

      <div class="sexometer-panel" id="sexometer-box">
        <div class="sexometer-display">
          <div class="gauge-bar-outer">
            <div class="gauge-bar-fill" id="gauge-fill" style="width: ${sexometerValue}%;"></div>
          </div>
          <div class="gauge-readout">
            <span class="gauge-status-label" id="gauge-status">🔥 Estado: ARDIENDO EN LLAMAS</span>
            <span class="gauge-percentage" id="gauge-pct">${sexometerValue}%</span>
          </div>
          <div class="gauge-warning-banner" id="gauge-warning">
            ⚠️ Nivel de testosterona y atractivo dentro de la zona de riesgo máximo.
          </div>
        </div>

        <h3 style="text-align: center; margin-bottom: 1.2rem; font-family: var(--font-display); font-size: 1.15rem; color: #fff;">
          Acciones para elevar el Sex Appeal de Abner:
        </h3>

        <div class="sexometer-controls">
          <button class="btn-gauge-action" data-boost="10" data-label="Sonrisa Pícara">
            <span class="action-icon">😏</span>
            <span>Media Sonrisa Cómplice</span>
            <span class="action-boost">+10% Caliente</span>
          </button>

          <button class="btn-gauge-action" data-boost="20" data-label="Acomodar Cabello">
            <span class="action-icon">💇‍♂️</span>
            <span>Pasarse la Mano por el Pelo</span>
            <span class="action-boost">+20% Caliente</span>
          </button>

          <button class="btn-gauge-action" data-boost="30" data-label="Mirada Letal">
            <span class="action-icon">👁️</span>
            <span>Contacto Visual de 3 Segundos</span>
            <span class="action-boost">+30% Caliente</span>
          </button>

          <button class="btn-gauge-action" data-boost="50" data-label="Modo Galán Supremo">
            <span class="action-icon">🕶️</span>
            <span>Quitarse los Lentes en Cámara Lenta</span>
            <span class="action-boost">+50% Peligro</span>
          </button>

          <button class="btn-gauge-action btn-cooldown" id="btn-cooldown" data-boost="-30" data-label="Bajar Temperatura">
            <span class="action-icon">🚒</span>
            <span>Echarle Manguera de Agua Fría</span>
            <span class="action-boost" style="color: #64d2ff;">-30% Enfriar</span>
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 3: PORTADAS DE REVISTA & GALERÍA -->
    <section id="galeria" class="content-section">
      <div class="section-header">
        <span class="section-tag">Colección de Alta Costura y Editorial</span>
        <h2 class="section-title">The Oto Collection: Portadas de Revista</h2>
        <p class="section-desc">
          Las revistas más prestigiosas del planeta no dudan en poner a Abner Otoniel en su primera plana. 
          Cambia los filtros para apreciar su versatilidad estética.
        </p>
      </div>

      <div class="filters-bar">
        <button class="filter-btn active" data-filter="all">Todas las Ediciones</button>
        <button class="filter-btn" data-filter="fire">Fuego Pasional 🔥</button>
        <button class="filter-btn" data-filter="noir">Noir Terciopelo 🍷</button>
        <button class="filter-btn" data-filter="gold">Golden Hour ✨</button>
        <button class="filter-btn" data-filter="vogue">Alta Costura 👑</button>
      </div>

      <div class="magazine-grid">
        <!-- Magazine 1: GQ -->
        <article class="magazine-card" data-style="fire">
          <div class="magazine-photo-wrapper">
            <img src="${otoImg}" alt="Abner Otoniel GQ Man of the Century" class="magazine-photo">
          </div>
          <div class="magazine-overlay">
            <div class="magazine-masthead">
              <div class="magazine-title">GQ</div>
              <div class="magazine-tagline">HOMBRE DEL SIGLO • EDICIÓN ESPECIAL</div>
            </div>
            <div class="magazine-headlines">
              <span class="mag-pill">EXCLUSIVA MUNDIAL</span>
              <h3 class="mag-main-headline">Abner Otoniel: "¿Cómo hago para ser tan irresistible?"</h3>
              <p class="mag-sub-headline">Entrevistamos al fenómeno que paraliza las calles con solo mirar al horizonte.</p>
              <div class="mag-footer">
                <span class="mag-barcode">|||||| ||| ||||||| 2026</span>
                <span class="mag-price">$99.99 USD</span>
              </div>
            </div>
          </div>
        </article>

        <!-- Magazine 2: VOGUE -->
        <article class="magazine-card" data-style="vogue">
          <div class="magazine-photo-wrapper">
            <img src="${otoImg}" alt="Abner Otoniel Vogue Haute Couture" class="magazine-photo">
          </div>
          <div class="magazine-overlay">
            <div class="magazine-masthead">
              <div class="magazine-title">VOGUE</div>
              <div class="magazine-tagline">PASSION & DESIRE • SPECIAL ISSUE</div>
            </div>
            <div class="magazine-headlines">
              <span class="mag-pill" style="background: #b7094c;">ALTA COSTURA</span>
              <h3 class="mag-main-headline">El Porte Esculpido de un Ícono Moderno</h3>
              <p class="mag-sub-headline">Los diseñadores de París y Milán rinden tributo a la percha inigualable de González Álvarez.</p>
              <div class="mag-footer">
                <span class="mag-barcode">||| |||||| ||||| 007</span>
                <span class="mag-price">PRICELESS</span>
              </div>
            </div>
          </div>
        </article>

        <!-- Magazine 3: ROLLING STONE -->
        <article class="magazine-card" data-style="noir">
          <div class="magazine-photo-wrapper">
            <img src="${otoImg}" alt="Abner Otoniel Rock & Passion" class="magazine-photo">
          </div>
          <div class="magazine-overlay">
            <div class="magazine-masthead">
              <div class="magazine-title" style="font-family: var(--font-impact); font-size: 2.8rem; letter-spacing: 2px;">ROLLING OTO</div>
              <div class="magazine-tagline">SEX, CHARM & ROCK 'N' ROLL</div>
            </div>
            <div class="magazine-headlines">
              <span class="mag-pill" style="background: #ff5400;">LEYENDA VIVA</span>
              <h3 class="mag-main-headline">Rompiendo Corazones al Ritmo del Deseo</h3>
              <p class="mag-sub-headline">Crónica de una noche en la que Abner sonrió y provocó un sismo de grado 7 en el corazón de todos.</p>
              <div class="mag-footer">
                <span class="mag-barcode">|||||||| |||||| 999</span>
                <span class="mag-price">HOT EDITION</span>
              </div>
            </div>
          </div>
        </article>

        <!-- Magazine 4: TIME -->
        <article class="magazine-card" data-style="gold">
          <div class="magazine-photo-wrapper">
            <img src="${otoImg}" alt="Abner Otoniel Person of the Year" class="magazine-photo">
          </div>
          <div class="magazine-overlay">
            <div class="magazine-masthead">
              <div class="magazine-title" style="color: #ff0044;">TIME</div>
              <div class="magazine-tagline">PERSON OF THE YEAR</div>
            </div>
            <div class="magazine-headlines">
              <span class="mag-pill" style="background: var(--seductive-gold); color: #000;">HISTÓRICO</span>
              <h3 class="mag-main-headline">Abner Otoniel: La Fuerza de Gravedad de la Belleza</h3>
              <p class="mag-sub-headline">Por qué el 2026 fue oficialmente declarado el Año de la Sensualidad de Oto.</p>
              <div class="mag-footer">
                <span class="mag-barcode">|||| ||||||| ||| 001</span>
                <span class="mag-price">VOL. LXIX</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- SECTION 4: LOS 8 ATRIBUTOS MORTALES -->
    <section id="atributos" class="content-section">
      <div class="section-header">
        <span class="section-tag">Anatomía de la Perfección</span>
        <h2 class="section-title">Los 8 Atributos Mortales de Abner Otoniel</h2>
        <p class="section-desc">
          Razones científicas, biológicas y poéticas que explican por qué nadie puede resistirse a su presencia.
        </p>
      </div>

      <div class="attributes-grid">
        <div class="attr-card">
          <div class="attr-icon-box">👁️</div>
          <h3 class="attr-title">La Mirada Hipnótica</h3>
          <p class="attr-desc">
            Posee un alcance efectivo de 50 metros. Un solo cruce de miradas reinicia cualquier sistema emocional 
            y desata fuegos artificiales involuntarios.
          </p>
        </div>

        <div class="attr-card">
          <div class="attr-icon-box">🕺</div>
          <h3 class="attr-title">El Porte de Pasarela</h3>
          <p class="attr-desc">
            No camina: levita con cadencia de héroe de acción. Cualquier pasillo ordinario se convierte en una pasarela 
            de Milán cuando Oto da el primer paso.
          </p>
        </div>

        <div class="attr-card">
          <div class="attr-icon-box">🫦</div>
          <h3 class="attr-title">La Media Sonrisa Picante</h3>
          <p class="attr-desc">
            Esa curvatura perfecta de labios que insinúa saber todos tus secretos y tener la cura para todos tus males.
          </p>
        </div>

        <div class="attr-card">
          <div class="attr-icon-box">🎙️</div>
          <h3 class="attr-title">Voz de Frecuencia Seductora</h3>
          <p class="attr-desc">
            Tan aterciopelada y envolvente que si leyera las instrucciones de un horno microondas, sonaría como la más apasionada 
            balada de amor.
          </p>
        </div>

        <div class="attr-card">
          <div class="attr-icon-box">🕶️</div>
          <h3 class="attr-title">El Factor Misterio Galán</h3>
          <p class="attr-desc">
            Esa vibra impenetrable de protagonista de thriller de espionaje: elegante, sereno, pero con una chispa de fuego 
            lista para encender la noche.
          </p>
        </div>

        <div class="attr-card">
          <div class="attr-icon-box">🌹</div>
          <h3 class="attr-title">Caballerosidad de Época</h3>
          <p class="attr-desc">
            Un galán que sabe abrir puertas, servir vino y tratar a cualquiera como si fuera la estrella principal de una película 
            ganadora del Oscar.
          </p>
        </div>

        <div class="attr-card">
          <div class="attr-icon-box">🔥</div>
          <h3 class="attr-title">Calefacción Humana Natural</h3>
          <p class="attr-desc">
            No necesita suéteres ni bufandas en invierno: su nivel de calor intrínseco irradia un microclima tropical a su alrededor.
          </p>
        </div>

        <div class="attr-card">
          <div class="attr-icon-box">💎</div>
          <h3 class="attr-title">Humildad a Pesar de Todo</h3>
          <p class="attr-desc">
            A pesar de ser consciente de su estatus como monumento viviente, mantiene una sencillez y carisma que lo hacen 
            aún diez veces más atractivo.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 5: GENERADOR DE PIROPOS -->
    <section id="piropos" class="content-section">
      <div class="section-header">
        <span class="section-tag">Dispensador de Pasión</span>
        <h2 class="section-title">Generador de Piropos Prohibidos</h2>
        <p class="section-desc">
          ¿Te quedaste sin palabras ante semejante monumento? Deja que nuestro generador te brinde la frase justa 
          para halagar la majestuosidad de Abner Otoniel.
        </p>
      </div>

      <div class="piropo-container">
        <div class="piropo-box">
          <div class="piropo-quote-mark">“</div>
          <p class="piropo-text" id="piropo-display">
            "${piroposList[0]}"
          </p>
          <div class="piropo-actions">
            <button class="btn-sexy-primary" id="btn-next-piropo">
              🎲 Generar Otro Piropo
            </button>
            <button class="btn-sexy-secondary" id="btn-copy-piropo">
              📋 Copiar al Portapapeles
            </button>
            <button class="btn-sexy-secondary" id="btn-dedicate-piropo">
              💋 Dedicar a Oto con Amor
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: QUIZ INTERACTIVO -->
    <section id="quiz" class="content-section">
      <div class="section-header">
        <span class="section-tag">Evaluación de Resistencia Cardíaca</span>
        <h2 class="section-title">Test: ¿Sobrevivirías a 5 Minutos con Oto?</h2>
        <p class="section-desc">
          Pon a prueba tu fortaleza psicológica y descubre si tienes la capacidad de mantener el pulso normal frente a Abner.
        </p>
      </div>

      <div class="quiz-card" id="quiz-container">
        <!-- Progress bar -->
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" id="quiz-progress-fill"></div>
        </div>

        <!-- Question View -->
        <div id="quiz-question-view">
          <h3 class="quiz-question-title" id="quiz-question-text">Cargando pregunta...</h3>
          <div class="quiz-options" id="quiz-options-container">
            <!-- Options dynamically populated -->
          </div>
        </div>

        <!-- Result View -->
        <div class="quiz-result-view" id="quiz-result-view">
          <div class="certificate-box">
            <div class="cert-seal">📜</div>
            <h3 class="cert-title">CERTIFICADO OFICIAL</h3>
            <p class="cert-desc" id="quiz-result-message">
              Diagnóstico: Eres 100% vulnerable ante el encanto de Abner Otoniel. 
              No intentes resistirte; la ciencia confirma que nadie puede salir inmune de su presencia.
            </p>
            <span class="cert-badge-grade" id="quiz-result-badge">ESTATUS: ENAMORAMIENTO TOTAL Y ABSOLUTO 🔥</span>
          </div>

          <button class="btn-sexy-primary" id="btn-restart-quiz">
            🔄 Repetir Evaluación
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 7: CLUB DE FANS VIP & MURO -->
    <section id="fanclub" class="content-section">
      <div class="section-header">
        <span class="section-tag">Comunidad Oficial de Admiradores</span>
        <h2 class="section-title">Club de Fans Oficial de Abner Otoniel</h2>
        <p class="section-desc">
          Únete a los millones de almas que ya han caído rendidas ante su encanto. Deja tu mensaje en el muro de adoración.
        </p>
      </div>

      <!-- Live sighs counter -->
      <div class="fan-stats-row">
        <div class="sighs-counter-box">
          <div class="sighs-number" id="sighs-display">${sighsCount.toLocaleString()}</div>
          <div class="sighs-label">Suspiros Causados Hasta Hoy</div>
        </div>

        <div class="fan-actions-row">
          <button class="btn-sexy-primary" id="btn-add-sigh">
            ❤️ Enviar un Suspiro (+1)
          </button>
          <button class="btn-sexy-secondary" id="btn-get-vip-card">
            💳 Obtener Carnet Oficial VIP
          </button>
        </div>
      </div>

      <!-- Comments Wall -->
      <h3 style="text-align: center; margin-bottom: 1.5rem; font-family: var(--font-display); font-size: 1.4rem; color: #fff;">
        Muro de Admiración en Vivo
      </h3>
      <div class="comments-wall-grid" id="comments-grid">
        <!-- Rendered by JS -->
      </div>

      <!-- Leave comment form -->
      <div class="leave-comment-box">
        <h4 style="font-family: var(--font-display); font-size: 1.2rem; color: #fff; margin-bottom: 1rem; text-align: center;">
          💌 Deja tu Mensaje de Admiración a Oto
        </h4>
        <form id="comment-form">
          <div class="form-group">
            <label class="form-label" for="fan-name">Tu Nombre o Apodo Cariñoso:</label>
            <input type="text" id="fan-name" class="form-input" placeholder="Ej: Admirador/a Secreto/a 💋" required maxlength="40">
          </div>
          <div class="form-group">
            <label class="form-label" for="fan-comment">Tu Mensaje para Abner:</label>
            <textarea id="fan-comment" class="form-textarea" rows="3" placeholder="Dile a Oto lo sexy que se ve hoy..." required maxlength="250"></textarea>
          </div>
          <button type="submit" class="btn-sexy-primary" style="width: 100%; justify-content: center;">
            🚀 Publicar en el Muro de Honor
          </button>
        </form>
      </div>
    </section>
  </main>

  <!-- VIP Pass Modal -->
  <div class="modal-overlay" id="vip-modal">
    <div class="vip-card-modal">
      <button class="modal-close-btn" id="btn-close-modal" aria-label="Cerrar modal">&times;</button>
      <div class="vip-card-header">
        <span class="logo-text">OTONIEL FAN PASS</span>
        <span class="vip-badge-tag">VIP PLATINUM</span>
      </div>
      <div class="vip-card-content">
        <div class="vip-avatar">
          <img src="${otoImg}" alt="Abner Otoniel VIP">
        </div>
        <div class="vip-details">
          <h4>Abner Otoniel</h4>
          <p>Presidente Vitalicio de la Sensualidad</p>
          <p style="font-size: 0.75rem; color: var(--seductive-gold); margin-top: 4px;">ID: #OTO-HOT-007-SEXY</p>
        </div>
      </div>
      <ul class="vip-perks-list">
        <li>🔥 Acceso ilimitado a sus mejores poses fotográficas.</li>
        <li>💋 Prioridad 1 en caso de que decida mandar besos virtuales masivos.</li>
        <li>🍷 Asiento en primera fila para contemplar su porte imperial.</li>
        <li>⚡ Inmunidad diplomática ante desmayos provocados por su mirada.</li>
      </ul>
      <button class="btn-sexy-primary" id="btn-claim-vip-card" style="width: 100%; justify-content: center;">
        ✨ Descargar Mi Membresía de Honor
      </button>
    </div>
  </div>

  <!-- Floating Quick Bar -->
  <div class="floating-bar">
    <button class="floating-action-btn" id="float-music" title="Música Sexy">
      <span>🎷</span> <span>Música</span>
    </button>
    <button class="floating-action-btn" id="float-kiss" title="Mandar Beso">
      <span>💋</span> <span>Beso</span>
    </button>
    <button class="floating-action-btn" id="float-fire" title="Más Fuego">
      <span>🔥</span> <span>Fuego</span>
    </button>
    <a href="#monumento" class="floating-action-btn" title="Subir">
      <span>⬆️</span> <span>Inicio</span>
    </a>
  </div>

  <!-- Toast Notification -->
  <div class="toast-notice" id="toast-notice">
    <span id="toast-icon">✨</span>
    <span id="toast-message">Notificación</span>
  </div>

  <!-- FOOTER -->
  <footer class="sexy-footer">
    <div class="footer-flame-icon">🔥</div>
    <div class="footer-title">ABNER OTONIEL GONZÁLEZ ÁLVAREZ</div>
    <p class="footer-copy">
      Página creada como monumento digital a la sensualidad y el atractivo irresistible de Oto. 
      Diseñado en tonalidades al rojo vivo, terciopelo carmesí y amor incondicional.
    </p>
    <p style="font-size: 0.8rem; color: var(--text-pink);">
      Hecho con <span class="footer-heart">❤️</span> y exceso de pasión • Todos los derechos de seducción reservados © 2026
    </p>
  </footer>
`;

// Initialize Particle Engine
const canvas = document.querySelector('#particle-canvas');
const particles = new ParticleEngine(canvas);

// Toast notification helper
function showToast(message, icon = '✨') {
  const toast = document.querySelector('#toast-notice');
  const msgEl = document.querySelector('#toast-message');
  const iconEl = document.querySelector('#toast-icon');

  msgEl.textContent = message;
  iconEl.textContent = icon;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

// Portrait Interaction (Click for kisses & hearts)
const portrait = document.querySelector('#main-portrait');
portrait.addEventListener('click', (e) => {
  const rect = portrait.getBoundingClientRect();
  const x = e.clientX || rect.left + rect.width / 2;
  const y = e.clientY || rect.top + rect.height / 2;
  
  particles.burst(x, y, 35, 'heart');
  audioEngine.playKissSound();
  
  sighsCount++;
  updateSighs();
  showToast("¡Le has enviado un beso y un suspiro a Abner!", "💋");
});

// Update Sighs Display
function updateSighs() {
  const sighsEl = document.querySelector('#sighs-display');
  if (sighsEl) {
    sighsEl.textContent = sighsCount.toLocaleString();
  }
}

// Music toggle
const toggleMusicBtn = document.querySelector('#toggle-music-btn');
const musicIcon = document.querySelector('#music-icon');
const musicLabel = document.querySelector('#music-label');
const floatMusic = document.querySelector('#float-music');

function toggleAudio() {
  const playing = audioEngine.toggleMusic();
  if (playing) {
    musicIcon.textContent = '🎶';
    musicLabel.textContent = 'Música: ON 🔥';
    showToast("Música Lounge Seductora Activada 🎷", "🎷");
  } else {
    musicIcon.textContent = '🎷';
    musicLabel.textContent = 'Música Sexy';
    showToast("Música en pausa", "⏸️");
  }
}

toggleMusicBtn.addEventListener('click', toggleAudio);
floatMusic.addEventListener('click', toggleAudio);

// Overdrive / Modo Infierno
const toggleOverdriveBtn = document.querySelector('#toggle-overdrive-btn');
const floatFire = document.querySelector('#float-fire');

function toggleOverdrive() {
  isOverdrive = !isOverdrive;
  document.body.classList.toggle('overdrive-active', isOverdrive);
  toggleOverdriveBtn.classList.toggle('active', isOverdrive);
  particles.setOverdrive(isOverdrive);

  if (isOverdrive) {
    toggleOverdriveBtn.innerHTML = '🚨 MODO INFIERNO: ON';
    audioEngine.playFireWhoosh();
    audioEngine.playAlertSound();
    showToast("¡PELIGRO: MODO INFIERNO ACTIVADO AL MÁXIMO! 🔥", "🚨");
    particles.burst(window.innerWidth / 2, window.innerHeight / 2, 50, 'fire');
  } else {
    toggleOverdriveBtn.innerHTML = '🔥 Modo Infierno';
    showToast("Modo Infierno desactivado. Temperatura estabilizada.", "❄️");
  }
}

toggleOverdriveBtn.addEventListener('click', toggleOverdrive);
floatFire.addEventListener('click', () => {
  particles.burst(window.innerWidth / 2, window.innerHeight / 2, 40, 'fire');
  audioEngine.playFireWhoosh();
  showToast("¡Llamarada de pasión liberada!", "🔥");
});

// Hero Buttons
document.querySelector('#btn-hero-kiss').addEventListener('click', (e) => {
  const rect = e.target.getBoundingClientRect();
  particles.burst(rect.left + rect.width / 2, rect.top, 30, 'heart');
  audioEngine.playKissSound();
  sighsCount += 10;
  updateSighs();
  showToast("¡10 besos apasionados enviados a Abner!", "💋");
});

// Floating Kiss Button
document.querySelector('#float-kiss').addEventListener('click', (e) => {
  const rect = e.target.getBoundingClientRect();
  particles.burst(rect.left + rect.width / 2, rect.top, 25, 'heart');
  audioEngine.playKissSound();
  sighsCount++;
  updateSighs();
  showToast("Beso rápido enviado a Oto 💋", "💋");
});

// Sexometer logic
const gaugeFill = document.querySelector('#gauge-fill');
const gaugePct = document.querySelector('#gauge-pct');
const gaugeStatus = document.querySelector('#gauge-status');
const gaugeWarning = document.querySelector('#gauge-warning');
const sexometerBox = document.querySelector('#sexometer-box');

function updateSexometer(delta, label = '') {
  sexometerValue = Math.max(10, Math.min(150, sexometerValue + delta));
  gaugeFill.style.width = `${Math.min(100, sexometerValue)}%`;
  gaugePct.textContent = `${sexometerValue}%`;

  if (delta > 0) {
    audioEngine.playFireWhoosh();
    particles.burst(window.innerWidth / 2, window.innerHeight * 0.45, 20, 'heart');
  } else {
    audioEngine.playCoolSound();
  }

  if (sexometerValue < 40) {
    gaugeStatus.textContent = "❄️ Estado: TEMPERATURA BAJA (A Oto le da frío)";
    gaugeWarning.textContent = "Por favor aumenta el fuego, Abner no tolera la mediocridad térmica.";
    sexometerBox.classList.remove('overheated');
  } else if (sexometerValue < 75) {
    gaugeStatus.textContent = "🌡️ Estado: TIBIO PERO PICANTE";
    gaugeWarning.textContent = "El ambiente empieza a ponerse interesante...";
    sexometerBox.classList.remove('overheated');
  } else if (sexometerValue < 100) {
    gaugeStatus.textContent = "🔥 Estado: ARDIENDO EN LLAMAS";
    gaugeWarning.textContent = "⚠️ Nivel de testosterona y atractivo dentro de la zona de riesgo máximo.";
    sexometerBox.classList.remove('overheated');
  } else {
    gaugeStatus.textContent = "🚨 ¡COLAPSO CUÁNTICO POR EXCESO DE SEX APPEAL!";
    gaugeWarning.textContent = "💥 ¡PELIGRO TOTAL! Los sensores se han fundido ante tanta belleza de Abner.";
    sexometerBox.classList.add('overheated');
    audioEngine.playAlertSound();
    particles.burst(window.innerWidth / 2, window.innerHeight / 2, 45, 'fire');
  }

  if (label) {
    showToast(`Acción: ${label} (${delta > 0 ? '+' : ''}${delta}%)`, delta > 0 ? '🔥' : '❄️');
  }
}

document.querySelectorAll('.btn-gauge-action').forEach(btn => {
  btn.addEventListener('click', () => {
    const boost = parseInt(btn.getAttribute('data-boost'), 10);
    const label = btn.getAttribute('data-label');
    updateSexometer(boost, label);
  });
});

// Magazine Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const magazineCards = document.querySelectorAll('.magazine-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    magazineCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-style') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Piropos Section Logic
const piropoDisplay = document.querySelector('#piropo-display');
const btnNextPiropo = document.querySelector('#btn-next-piropo');
const btnCopyPiropo = document.querySelector('#btn-copy-piropo');
const btnDedicatePiropo = document.querySelector('#btn-dedicate-piropo');

btnNextPiropo.addEventListener('click', () => {
  piropoDisplay.style.opacity = '0';
  piropoDisplay.style.transform = 'translateY(10px)';

  setTimeout(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * piroposList.length);
    } while (nextIndex === currentPiropoIndex && piroposList.length > 1);

    currentPiropoIndex = nextIndex;
    piropoDisplay.textContent = `"${piroposList[currentPiropoIndex]}"`;
    piropoDisplay.style.opacity = '1';
    piropoDisplay.style.transform = 'translateY(0)';
  }, 200);

  audioEngine.playFireWhoosh();
});

btnCopyPiropo.addEventListener('click', () => {
  const text = piropoDisplay.textContent.replace(/[""]/g, '').trim();
  navigator.clipboard.writeText(text).then(() => {
    showToast("¡Piropo copiado al portapapeles! Listo para enviar a Oto.", "📋");
  }).catch(() => {
    showToast("Piropo seleccionado.", "📋");
  });
});

btnDedicatePiropo.addEventListener('click', (e) => {
  const rect = e.target.getBoundingClientRect();
  particles.burst(rect.left + rect.width / 2, rect.top, 35, 'heart');
  audioEngine.playKissSound();
  sighsCount += 5;
  updateSighs();
  showToast("¡Piropo dedicado a Abner Otoniel con un beso!", "💋");
});

// Quiz Logic
const quizProgressFill = document.querySelector('#quiz-progress-fill');
const quizQuestionText = document.querySelector('#quiz-question-text');
const quizOptionsContainer = document.querySelector('#quiz-options-container');
const quizQuestionView = document.querySelector('#quiz-question-view');
const quizResultView = document.querySelector('#quiz-result-view');
const btnRestartQuiz = document.querySelector('#btn-restart-quiz');

function renderQuizQuestion() {
  if (currentQuizStep >= quizQuestions.length) {
    showQuizResult();
    return;
  }

  const q = quizQuestions[currentQuizStep];
  quizQuestionText.textContent = q.question;
  quizProgressFill.style.width = `${((currentQuizStep + 1) / quizQuestions.length) * 100}%`;
  quizOptionsContainer.innerHTML = '';

  const letters = ['A', 'B', 'C'];
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `
      <span class="quiz-option-letter">${letters[idx]}</span>
      <span>${opt.text}</span>
    `;
    btn.addEventListener('click', () => {
      userQuizScore += opt.points;
      currentQuizStep++;
      audioEngine.playKissSound();
      renderQuizQuestion();
    });
    quizOptionsContainer.appendChild(btn);
  });
}

function showQuizResult() {
  quizQuestionView.style.display = 'none';
  quizResultView.style.display = 'block';

  const badgeEl = document.querySelector('#quiz-result-badge');
  const msgEl = document.querySelector('#quiz-result-message');

  badgeEl.textContent = `PUNTUACIÓN DE VULNERABILIDAD: ${userQuizScore}% (PELIGROSO) 🔥`;
  msgEl.innerHTML = `
    <strong>Diagnóstico Oficial:</strong> Eres 100% indefenso/a ante el encanto de Abner Otoniel González Álvarez. 
    Tu ritmo cardíaco se acelera un 400% con su mirada. Has sido oficialmente clasificado/a como 
    <em>"Admirador/a Perdido/a en la Belleza de Oto"</em>.
  `;

  audioEngine.playFireWhoosh();
  particles.burst(window.innerWidth / 2, window.innerHeight / 2, 45, 'heart');
}

btnRestartQuiz.addEventListener('click', () => {
  currentQuizStep = 0;
  userQuizScore = 0;
  quizQuestionView.style.display = 'block';
  quizResultView.style.display = 'none';
  renderQuizQuestion();
});

renderQuizQuestion();

// Comments Wall Logic
const commentsGrid = document.querySelector('#comments-grid');
const commentForm = document.querySelector('#comment-form');

function renderComments() {
  commentsGrid.innerHTML = '';
  fanComments.forEach(item => {
    const card = document.createElement('div');
    card.className = 'comment-card';
    card.innerHTML = `
      <div class="comment-header">
        <span class="comment-author">${item.author}</span>
        <span class="comment-stars">${item.stars}</span>
      </div>
      <p class="comment-body">"${item.body}"</p>
    `;
    commentsGrid.appendChild(card);
  });
}

renderComments();

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.querySelector('#fan-name');
  const commentInput = document.querySelector('#fan-comment');

  const newComment = {
    author: `${nameInput.value.trim()} 🌹`,
    stars: "★★★★★ (10/5)",
    body: commentInput.value.trim()
  };

  fanComments.unshift(newComment);
  renderComments();

  nameInput.value = '';
  commentInput.value = '';

  audioEngine.playKissSound();
  particles.burst(window.innerWidth / 2, window.innerHeight * 0.7, 30, 'heart');
  showToast("¡Tu mensaje fue publicado en el Muro de Honor de Oto!", "💌");
});

// Sighs button in Fan Club
document.querySelector('#btn-add-sigh').addEventListener('click', (e) => {
  sighsCount++;
  updateSighs();
  const rect = e.target.getBoundingClientRect();
  particles.burst(rect.left + rect.width / 2, rect.top, 20, 'heart');
  audioEngine.playKissSound();
  showToast("Suspiro registrado. Abner te lo agradece. ❤️", "❤️");
});

// VIP Modal Logic
const vipModal = document.querySelector('#vip-modal');
const btnOpenVip = document.querySelector('#btn-open-vip-modal');
const btnGetVip = document.querySelector('#btn-get-vip-card');
const btnCloseModal = document.querySelector('#btn-close-modal');
const btnClaimVip = document.querySelector('#btn-claim-vip-card');

function openVipModal() {
  vipModal.classList.add('open');
  audioEngine.playFireWhoosh();
}

function closeVipModal() {
  vipModal.classList.remove('open');
}

btnOpenVip.addEventListener('click', openVipModal);
btnGetVip.addEventListener('click', openVipModal);
btnCloseModal.addEventListener('click', closeVipModal);

vipModal.addEventListener('click', (e) => {
  if (e.target === vipModal) {
    closeVipModal();
  }
});

btnClaimVip.addEventListener('click', () => {
  particles.burst(window.innerWidth / 2, window.innerHeight / 2, 40, 'heart');
  audioEngine.playKissSound();
  showToast("¡Membresía VIP Platinum otorgada con honores!", "👑");
  setTimeout(closeVipModal, 600);
});
