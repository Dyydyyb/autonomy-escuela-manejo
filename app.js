/**
 * Autonomy Escuela de Manejo - Córdoba, Argentina
 * Interactividad: Palanca de Cambios con Web Audio API, Asistente Inteligente WhatsApp y Navegación
 */

document.addEventListener('DOMContentLoaded', () => {
  initGearShifter();
  initWhatsAppAssistant();
  initMobileNav();
});

/* ==========================================================================
   1. SIMULADOR DE PALANCA DE CAMBIOS MANUAL CON WEB AUDIO API
   ========================================================================== */
function initGearShifter() {
  const knob = document.getElementById('shifterKnob');
  const gearNodes = document.querySelectorAll('.gear-node');
  const gearBadge = document.getElementById('displayGearBadge');
  const gearName = document.getElementById('displayGearName');
  const speedVal = document.getElementById('displaySpeed');
  const rpmVal = document.getElementById('displayRpm');
  const stageBadge = document.getElementById('stageHeaderBadge');
  const stageHeadline = document.getElementById('stageHeadline');
  const stageDesc = document.getElementById('stageDescription');
  const stageSkills = document.getElementById('stageSkillsList');
  const demoBtn = document.getElementById('shifterDemoBtn');
  const audioToggle = document.getElementById('shifterAudioToggle');

  // Coordenadas relativas en la consola
  const gearPositions = {
    '1': { top: '15%', left: '18%' },
    '2': { top: '85%', left: '18%' },
    '3': { top: '15%', left: '50%' },
    '4': { top: '85%', left: '50%' },
    '5': { top: '15%', left: '82%' },
    'R': { top: '85%', left: '82%' },
    'N': { top: '50%', left: '50%' }
  };

  // Contenido pedagógico asociado a cada marcha
  const gearData = {
    '1': {
      name: '1ª Marcha • Punto de Partida',
      speed: '15',
      rpm: '1800',
      badge: 'Fase Inicial • Dominio de Pedales',
      headline: 'Arranque Suave y Control de Embrague con Doble Comando',
      desc: 'El paso fundamental donde perdés el miedo. Aprendés a encontrar el punto exacto de fricción del embrague sin que el auto tironee ni se apague. Para tu tranquilidad total, nuestros autos cuentan con pedalera y volante doble comando: el instructor siempre te respalda.',
      skills: [
        'Coordinación embrague y acelerador',
        'Arranque en plano y pendientes',
        'Salidas sin sobresaltos ni tirones',
        'Respaldo total con doble pedalera'
      ]
    },
    '2': {
      name: '2ª Marcha • Maniobras Barriales',
      speed: '30',
      rpm: '2100',
      badge: 'Fase 2 • Tránsito Calmo',
      headline: 'Giros, Prioridades en Esquinas y Paso por Badenes',
      desc: 'Comenzamos a circular por barrios tranquilos de Córdoba. Practicamos la técnica correcta de cruce de manos en el volante, distancia prudencial con otros autos estacionados y el paso suave por lomos de burro sin dañar el vehículo.',
      skills: [
        'Cruce y control fluido del volante',
        'Frenado progresivo y suave',
        'Prioridad de paso en encrucijadas',
        'Espejos retrovisores y puntos ciegos'
      ]
    },
    '3': {
      name: '3ª Marcha • Circulación en Avenidas',
      speed: '50',
      rpm: '2300',
      badge: 'Fase 3 • Fluidez Urbana',
      headline: 'Avenidas Principales: Rafael Núñez, Colón y Recta Martinoli',
      desc: 'Ganás confianza en el ritmo urbano real. Trabajamos la anticipación visual, el respeto y sincronización de semáforos, colocación oportuna de luces de giro y cambios de carril seguros en las arterias más concurridas de la zona norte y centro.',
      skills: [
        'Cambio de carril con luces de giro',
        'Lectura anticipada del semáforo',
        'Distancia reglamentaria de frenado',
        'Mantenimiento de velocidad constante'
      ]
    },
    '4': {
      name: '4ª Marcha • Autovías y Rutas',
      speed: '80',
      rpm: '2500',
      badge: 'Fase 4 • Manejo Defensivo',
      headline: 'Circunvalación de Córdoba y Rutas Interurbanas',
      desc: 'Experimentás la velocidad crucero con total serenidad. Te enseñamos técnicas de manejo defensivo, incorporación a autovías mediante carriles de aceleración y cómo reaccionar con templanza ante imprevistos en ruta abierta.',
      skills: [
        'Incorporación por carril de aceleración',
        'Conducción defensiva y alerta temprana',
        'Adelantamientos con margen de seguridad',
        'Control aerodinámico y frenadas largas'
      ]
    },
    '5': {
      name: '5ª Marcha • Conductor Autónomo',
      speed: '110',
      rpm: '2800',
      badge: 'Fase 5 • Independencia Total',
      headline: 'Autonomía Completa: Tomá las Riendas de Tu Vida',
      desc: '¡Llegaste a tu meta! Dejás de depender de amigos, familiares o aplicaciones de transporte. Sos un conductor seguro, responsable e independiente que cumple la Regla Fundamental: priorizar la vida y mantener el dominio efectivo del vehículo.',
      skills: [
        'Seguridad y autoconfianza al volante',
        'Manejo nocturno y con lluvia',
        'Cumplimiento de la Regla Fundamental',
        'Independencia total de transporte'
      ]
    },
    'R': {
      name: 'Marcha Atrás • Estacionamiento',
      speed: '5',
      rpm: '1200',
      badge: 'Especial • Maniobras de Precisión',
      headline: 'Estacionamiento Milimétrico sin Estrés',
      desc: 'Desmitificamos el estacionamiento. Te enseñamos referencias visuales exactas para entrar en dos maniobras en paralelo al cordón, a 45° y a 90°. La marcha atrás dejará de ser una pesadilla y pasarás el examen práctico con soltura.',
      skills: [
        'Estacionamiento paralelo en 2 maniobras',
        'Ingreso a 45° y 90° entre vehículos',
        'Uso preciso de espejos laterales',
        'Simulación idéntica al examen CPC'
      ]
    },
    'N': {
      name: 'Punto Muerto (Neutro)',
      speed: '0',
      rpm: '900',
      badge: 'Posición de Reposo',
      headline: 'Vehículo en Ralentí: Preparate para Iniciar',
      desc: 'El motor está encendido, el vehículo está detenido esperando tu orden. Seleccioná 1ª marcha para iniciar el recorrido de aprendizaje o Marcha Atrás (R) para practicar maniobras de estacionamiento.',
      skills: [
        'Puesta en marcha del motor',
        'Uso del freno de mano reglamentario',
        'Revisión previa de espejos y cinturón',
        'Regulación de butaca y postura'
      ]
    }
  };

  let currentGear = 'N';
  let soundEnabled = true;
  let demoInterval = null;

  // Audio sintético nativo con Web Audio API (Click mecánico de engranaje)
  let audioCtx = null;

  function playShifterSound() {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // 1. Golpe mecánico (Click)
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.08);

      oscGain.gain.setValueAtTime(0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(oscGain);
      oscGain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

      // 2. Ruido sutil de acople metálico
      const bufferSize = audioCtx.sampleRate * 0.04;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 3;

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);

      noise.start(now);
    } catch (e) {
      // Audio silencioso de respaldo si el navegador lo bloquea
    }
  }

  function setGear(gearKey) {
    if (!gearPositions[gearKey]) return;
    currentGear = gearKey;

    // Actualizar posición de la bocha
    if (knob) {
      knob.style.top = gearPositions[gearKey].top;
      knob.style.left = gearPositions[gearKey].left;
    }

    // Actualizar nodos activos
    gearNodes.forEach(node => {
      if (node.getAttribute('data-gear') === gearKey) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    // Reproducir feedback táctil
    playShifterSound();

    // Actualizar Panel de Información
    const info = gearData[gearKey] || gearData['N'];

    if (gearBadge) gearBadge.textContent = gearKey;
    if (gearName) gearName.textContent = info.name;
    if (speedVal) speedVal.textContent = info.speed;
    if (rpmVal) rpmVal.textContent = info.rpm;
    if (stageBadge) stageBadge.textContent = info.badge;
    if (stageHeadline) stageHeadline.textContent = info.headline;
    if (stageDesc) stageDesc.textContent = info.desc;

    if (stageSkills) {
      stageSkills.innerHTML = info.skills
        .map(skill => `
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ${skill}
          </li>
        `)
        .join('');
    }
  }

  // Click en cada marcha
  gearNodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      stopDemo();
      const gear = node.getAttribute('data-gear');
      setGear(gear);
    });
  });

  // Toggle de sonido
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      audioToggle.innerHTML = soundEnabled 
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> Sonido: ON`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> Sonido: OFF`;
    });
  }

  // Modo recorrido automático demostrativo
  const demoSequence = ['N', '1', '2', '3', '4', '5', 'R', 'N'];
  let demoIndex = 0;

  function stopDemo() {
    if (demoInterval) {
      clearInterval(demoInterval);
      demoInterval = null;
      if (demoBtn) demoBtn.textContent = '▶ Modo Demostración';
    }
  }

  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      if (demoInterval) {
        stopDemo();
      } else {
        demoBtn.textContent = '⏸ Detener Demostración';
        demoIndex = 0;
        setGear(demoSequence[demoIndex]);

        demoInterval = setInterval(() => {
          demoIndex = (demoIndex + 1) % demoSequence.length;
          setGear(demoSequence[demoIndex]);
        }, 2600);
      }
    });
  }

  // Iniciar en 1ª marcha por defecto para impactar positivamente al usuario
  setGear('1');
}

/* ==========================================================================
   2. ASISTENTE INTELIGENTE PARA MENSAJE DE WHATSAPP (3516544950)
   ========================================================================== */
function initWhatsAppAssistant() {
  const WHATSAPP_PHONE = '5493516544950'; // Número oficial Córdoba provisto: 3516544950
  
  // Elementos de la interfaz
  const courseOptions = document.querySelectorAll('.option-course');
  const serviceOptions = document.querySelectorAll('.option-service');
  const scheduleOptions = document.querySelectorAll('.option-schedule');
  const customZoneInput = document.getElementById('assistantCustomZone');
  const userNameInput = document.getElementById('assistantUserName');
  const previewBox = document.getElementById('whatsappLivePreview');
  const sendBtn = document.getElementById('btnSendWhatsapp');

  // Estado reactivo de la consulta
  const state = {
    course: 'Curso Inicial (Desde Cero)',
    serviceType: 'Servicio Puerta a Puerta en Domicilio',
    zone: 'Cerro de las Rosas / Zona Norte',
    schedule: 'Lunes a Viernes de 9:00 a 20:00 (A convenir)',
    userName: ''
  };

  function updatePreview() {
    const greeting = state.userName.trim() 
      ? `Hola Escuela de Manejo Autonomy! Mi nombre es ${state.userName.trim()}.`
      : `Hola Escuela de Manejo Autonomy!`;

    const message = 
`${greeting}
Les escribo desde la web para consultar por clases de manejo:

- Curso de interés: ${state.course}
- Modalidad: ${state.serviceType}
- Barrio/Zona en Córdoba: ${state.zone}
- Disponibilidad horaria: ${state.schedule}

¿Podrían brindarme información sobre aranceles, promociones vigentes y próximos turnos disponibles? ¡Muchas gracias!`;

    if (previewBox) {
      previewBox.textContent = message;
    }

    if (sendBtn) {
      const encoded = encodeURIComponent(message);
      sendBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    }
  }

  // Opciones de Curso
  courseOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      courseOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.course = btn.getAttribute('data-value');
      updatePreview();
    });
  });

  // Opciones de Modalidad / Servicio
  serviceOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.serviceType = btn.getAttribute('data-value');
      updatePreview();
    });
  });

  // Opciones de Horarios
  scheduleOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      scheduleOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.schedule = btn.getAttribute('data-value');
      updatePreview();
    });
  });

  // Campo de texto: Zona o Barrio personalizado
  if (customZoneInput) {
    customZoneInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      state.zone = val ? val : 'Córdoba Capital';
      updatePreview();
    });
  }

  // Campo de texto: Nombre
  if (userNameInput) {
    userNameInput.addEventListener('input', (e) => {
      state.userName = e.target.value;
      updatePreview();
    });
  }

  // Render inicial
  updatePreview();
}

/* ==========================================================================
   3. NAVEGACIÓN MÓVIL Y SCROLL FLUIDO
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('mainNavMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Cerrar al clickear cualquier link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}
