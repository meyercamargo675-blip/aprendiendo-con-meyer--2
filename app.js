// ==========================================
// CONFIGURACIÓN REAL DE FIREBASE (MEYER)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyC1LiDKaOnU7a5me3dRueIdhwratQtUh4U",
  authDomain: "aprendiendo-con-meyer.firebaseapp.com",
  projectId: "aprendiendo-con-meyer",
  storageBucket: "aprendiendo-con-meyer.firebasestorage.app",
  messagingSenderId: "817813150996",
  appId: "1:817813150996:web:ef3f4f642ae0028b073601",
  measurementId: "G-56GH5QBXQD"
};

let db = null;
try {
    if (window.firebase && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    db = window.firebase ? firebase.firestore() : null;
} catch (e) {
    console.log("Error conectando Firebase:", e);
}

// BANCO MASIVO Y COMPLETO DE VOCABULARIO Y LECCIONES
const MASSIVE_VOCABULARY_BANK = [
    // --- BÁSICO ---
    { type: 'card', en: 'Hello, nice to meet you!', es: '¡Hola, encantado de conocerte!', phonetic: 'Jelou, nais tu mit iu', category: 'Básico' },
    { type: 'card', en: 'How are you doing today?', es: '¿Cómo estás hoy?', phonetic: 'Jau ar iu duing tudei', category: 'Básico' },
    { type: 'card', en: 'My name is Meyer', es: 'Mi nombre es Meyer', phonetic: 'Mai neim is Meier', category: 'Básico' },
    { type: 'card', en: 'Where are you from?', es: '¿De dónde eres?', phonetic: 'Uer ar iu from', category: 'Básico' },
    { type: 'card', en: 'Have a nice day!', es: '¡Que tengas un buen día!', phonetic: 'Jav a nais dei', category: 'Básico' },
    { type: 'card', en: 'Thank you very much', es: 'Muchas gracias', phonetic: 'Tenk iu veri mach', category: 'Básico' },
    { type: 'card', en: 'You are welcome', es: 'De nada', phonetic: 'Iu ar uelcom', category: 'Básico' },
    { type: 'card', en: 'See you tomorrow', es: 'Nos vemos mañana', phonetic: 'Si iu tumorou', category: 'Básico' },
    { type: 'quiz', q: '¿Cómo dices "Encantado de conocerte"?', options: ['Nice to meet you', 'Good morning', 'See you later'], correct: 0, category: 'Básico' },
    { type: 'quiz', q: '¿Qué significa "How are you?"', options: ['¿Cómo estás?', '¿De dónde eres?', '¿Cuál es tu nombre?'], correct: 0, category: 'Básico' },

    // --- TRABAJO Y TECNOLOGÍA ---
    { type: 'card', en: 'Web Application Development', es: 'Desarrollo de Aplicaciones Web', phonetic: 'Ueb aplikeishon development', category: 'Trabajo' },
    { type: 'card', en: 'Database Management System', es: 'Sistema de Gestión de Base de Datos', phonetic: 'Deitabeis manadjment sistem', category: 'Trabajo' },
    { type: 'card', en: 'User Interface Design', es: 'Diseño de Interfaz de Usuario', phonetic: 'Iuser interfeis disain', category: 'Trabajo' },
    { type: 'card', en: 'Source Code Execution', es: 'Ejecución del Código Fuente', phonetic: 'Sors cod eksekiushon', category: 'Trabajo' },
    { type: 'card', en: 'Project Manager', es: 'Gerente de Proyectos', phonetic: 'Proiekt manadjer', category: 'Trabajo' },
    { type: 'card', en: 'Bug Fixing and Testing', es: 'Corrección de Errores y Pruebas', phonetic: 'Bag fiksing and testing', category: 'Trabajo' },
    { type: 'card', en: 'Cloud Computing Services', es: 'Servicios de Computación en la Nube', phonetic: 'Claud kompiuting services', category: 'Trabajo' },
    { type: 'quiz', q: 'Traducción de "Software Development":', options: ['Desarrollo de Software', 'Diseño Gráfico', 'Base de Datos'], correct: 0, category: 'Trabajo' },
    { type: 'quiz', q: '¿Qué significa "Project Manager"?', options: ['Gerente de Proyecto', 'Programador Junior', 'Soporte Técnico'], correct: 0, category: 'Trabajo' },

    // --- VIAJES Y RESTAURANTES ---
    { type: 'card', en: 'Where is the nearest airport?', es: '¿Dónde está el aeropuerto más cercano?', phonetic: 'Uer is da nirest erport', category: 'Viajes' },
    { type: 'card', en: 'How much does this item cost?', es: '¿Cuánto cuesta este artículo?', phonetic: 'Jau mach das dis aitem cost', category: 'Viajes' },
    { type: 'card', en: 'Could I have the check, please?', es: '¿Podría traerme la cuenta, por favor?', phonetic: 'Cud ai jav da chek plis', category: 'Viajes' },
    { type: 'card', en: 'I need a hotel room reservation', es: 'Necesito una reserva de habitación de hotel', phonetic: 'Ai nid a hotel rum feserveishon', category: 'Viajes' },
    { type: 'card', en: 'Can I pay with credit card?', es: '¿Puedo pagar con tarjeta de crédito?', phonetic: 'Can ai pei uid kredit card', category: 'Viajes' },
    { type: 'quiz', q: '¿Cómo preguntas el precio de algo?', options: ['How much does this cost?', 'Where is the bathroom?', 'What time is it?'], correct: 0, category: 'Viajes' },

    // --- AVANZADO ---
    { type: 'card', en: 'Continuous Achievement', es: 'Logro Continuo', phonetic: 'Kontinious achivment', category: 'Avanzado' },
    { type: 'card', en: 'Knowledge Expansion', es: 'Expansión del Conocimiento', phonetic: 'Noladj ekspanshon', category: 'Avanzado' },
    { type: 'card', en: 'Strategic Leadership', es: 'Liderazgo Estratégico', phonetic: 'Stratedjik lidership', category: 'Avanzado' },
    { type: 'card', en: 'Problem Solving Skills', es: 'Habilidades de Resolución de Problemas', phonetic: 'Problem solving skils', category: 'Avanzado' }
];

const WAR_WORDS = [
    { en: 'Achievement', es: 'logro' }, { en: 'Opportunity', es: 'oportunidad' },
    { en: 'Knowledge', es: 'conocimiento' }, { en: 'Improvement', es: 'mejora' },
    { en: 'Challenge', es: 'desafío' }, { en: 'Success', es: 'éxito' },
    { en: 'Confidence', es: 'confianza' }, { en: 'Experience', es: 'experiencia' }
];

// ESTADO GLOBAL
let currentUser = null;
let isRegistering = false;
let currentLesson = null;
let currentStepIndex = 0;

// WEBRTC Y GUERRA ONLINE
let peer = null;
let activeCall = null;
let localMediaStream = null;
let warUnsubscribe = null;
let currentRoomCode = '';
let myRole = '';
let currentFacingMode = 'user'; // 'user' frontal, 'environment' trasera

// UTILS & TOASTS
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-emerald-600' : 'bg-indigo-600';
    toast.className = `toast-item ${bgClass} text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-sm font-semibold pointer-events-auto`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-bell'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

// 🎙️ SISTEMA GLOBAL DE RECONOCIMIENTO DE VOZ
function startSpeechRecognition(callback, lang = 'en-US') {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast('Tu navegador no soporta entrada de voz.', 'info');
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    showToast('🎙️ Escuchando... Habla ahora', 'info');

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        callback(text);
    };

    recognition.onerror = () => {
        showToast('No se logró escuchar claramente.', 'info');
    };

    recognition.start();
}

function getUsersDB() { return JSON.parse(localStorage.getItem('meyer_app_users_db')) || {}; }
function saveUsersDB(data) { localStorage.setItem('meyer_app_users_db', JSON.stringify(data)); }
function saveCurrentUserData() {
    if (!currentUser) return;
    const data = getUsersDB();
    data[currentUser.email] = currentUser;
    saveUsersDB(data);
    localStorage.setItem('meyer_app_active_email', currentUser.email);
}

function initAuth() {
    const activeEmail = localStorage.getItem('meyer_app_active_email');
    const data = getUsersDB();
    if (activeEmail && data[activeEmail]) {
        currentUser = data[activeEmail];
        if (!currentUser.seenHistory) currentUser.seenHistory = [];
        if (!currentUser.privateContacts) currentUser.privateContacts = [];
        showMainApp();
    } else { showAuthModal(); }
}

function showAuthModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('view-dashboard').classList.add('hidden');
}

function showMainApp() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('view-dashboard').classList.remove('hidden');
    document.getElementById('btn-logout').classList.remove('hidden');
    updateUI();
}

function updateUI() {
    if (!currentUser) return;
    document.getElementById('header-user-welcome').innerText = `Hola, ${currentUser.name}`;
    document.getElementById('welcome-title').innerText = `¡Hola ${currentUser.name}! Sistema Completo Listo`;
    document.getElementById('xp-count').innerText = currentUser.xp || 0;
    document.getElementById('streak-count').innerText = currentUser.streak || 1;

    renderLessons();
    renderCustomWords();
    renderGlobalChat();
    renderPrivateChat();
    renderLiveStream();
}

// SISTEMA ANTI-REPETICIÓN INTELIGENTE
function getUnseenItems(categoryFilter) {
    if (!currentUser.seenHistory) currentUser.seenHistory = [];
    let history = currentUser.seenHistory;

    let available = MASSIVE_VOCABULARY_BANK.filter(item => item.category === categoryFilter && !history.includes(item.en || item.q));

    if (available.length < 2) {
        currentUser.seenHistory = currentUser.seenHistory.filter(key => {
            const item = MASSIVE_VOCABULARY_BANK.find(i => (i.en || i.q) === key);
            return item && item.category !== categoryFilter;
        });
        saveCurrentUserData();
        available = MASSIVE_VOCABULARY_BANK.filter(item => item.category === categoryFilter);
    }

    for (let i = available.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [available[i], available[j]] = [available[j], available[i]];
    }

    return available;
}

// 📚 RENDERIZADO DE LECCIONES 3D
function renderLessons() {
    const container = document.getElementById('sec-lessons');
    const categories = [
        { id: 'cat-basic', title: 'Vocabulario Básico Nuevo', category: 'Básico', icon: 'fa-hand-wave' },
        { id: 'cat-work', title: 'Trabajo y Tecnología Nueva', category: 'Trabajo', icon: 'fa-laptop-code' },
        { id: 'cat-travel', title: 'Viajes y Restaurantes Únicos', category: 'Viajes', icon: 'fa-plane-departure' },
        { id: 'cat-adv', title: 'Inglés Avanzado y Desafíos', category: 'Avanzado', icon: 'fa-brain' }
    ];

    let html = `
        <div class="col-span-full bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between">
            <div class="mb-4 sm:mb-0">
                <span class="px-3 py-1 bg-white/25 backdrop-blur-md rounded-full text-xs font-bold uppercase">¡Modo Duelo 1vs1!</span>
                <h3 class="text-2xl font-black mt-2">⚔️ Guerra de Inglés con Micrófono</h3>
                <p class="text-xs text-rose-100 mt-1">Sincronizado en la nube. Habla o escribe para ganar.</p>
            </div>
            <button onclick="openWarSetup()" class="px-6 py-3.5 bg-white text-rose-600 font-black text-sm rounded-2xl shadow-lg transition transform active:scale-95 shrink-0">
                ¡Lanzar Batalla! ⚔️
            </button>
        </div>
    `;

    html += categories.map(cat => `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition shadow-sm flex flex-col justify-between">
            <div>
                <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center text-xl mb-3">
                    <i class="fa-solid ${cat.icon}"></i>
                </div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">${cat.category}</span>
                <h3 class="font-bold text-lg text-slate-800 dark:text-white mt-1">${cat.title}</h3>
                <p class="text-xs text-emerald-500 font-semibold mt-1"><i class="fa-solid fa-shield-check"></i> Modo Sin Repetición</p>
            </div>
            <button data-category="${cat.category}" class="btn-start-dynamic mt-5 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-md">
                Iniciar Práctica Nueva
            </button>
        </div>
    `).join('');

    container.innerHTML = html;

    container.querySelectorAll('.btn-start-dynamic').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = e.currentTarget.getAttribute('data-category');
            currentLesson = { title: `Práctica ${cat}`, items: getUnseenItems(cat).slice(0, 5) };
            currentStepIndex = 0;
            document.getElementById('view-lesson-modal').classList.remove('hidden');
            renderCurrentStep();
        });
    });
}

function renderCurrentStep() {
    const step = currentLesson.items[currentStepIndex];
    const container = document.getElementById('lesson-content');
    const total = currentLesson.items.length;

    const itemKey = step.en || step.q;
    if (step && currentUser && !currentUser.seenHistory.includes(itemKey)) {
        currentUser.seenHistory.push(itemKey);
        saveCurrentUserData();
    }

    document.getElementById('lesson-counter').innerText = `${currentStepIndex + 1}/${total}`;
    document.getElementById('lesson-progress').style.width = `${((currentStepIndex + 1) / total) * 100}%`;

    if (step.type === 'card') {
        container.innerHTML = `
            <div class="perspective-1000 max-w-sm mx-auto space-y-4 w-full">
                <div id="card-flip" class="transform-style-3d relative w-full h-64 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-3xl p-6 flex flex-col justify-between cursor-pointer shadow-2xl">
                    <div class="flex justify-between items-center text-xs opacity-80"><span>Voltear</span><i class="fa-solid fa-rotate"></i></div>
                    <div class="text-center my-auto">
                        <h2 class="text-2xl font-extrabold mb-1">${step.en}</h2>
                        <p class="text-xs text-indigo-200 italic font-mono">[${step.phonetic}]</p>
                        <div class="flex justify-center space-x-2 mt-4">
                            <button id="btn-speak-card" class="px-3 py-1.5 bg-white/20 rounded-full text-xs font-bold hover:bg-white/30 transition"><i class="fa-solid fa-volume-high mr-1"></i> Audio</button>
                            <button id="btn-mic-card" class="px-3 py-1.5 bg-rose-500 rounded-full text-xs font-bold hover:bg-rose-600 transition"><i class="fa-solid fa-microphone mr-1"></i> Probar Voz</button>
                        </div>
                    </div>
                    <div class="text-xs text-center opacity-80 font-bold">Aprendiendo con Meyer</div>
                    <div class="absolute inset-0 bg-slate-800 text-white rounded-3xl p-6 flex flex-col justify-center items-center rotate-y-180 backface-hidden border border-indigo-500">
                        <span class="text-xs text-slate-400 mb-2">Traducción al Español:</span>
                        <h3 class="text-2xl font-bold text-amber-400 text-center">${step.es}</h3>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('card-flip').addEventListener('click', (e) => {
            if (!e.target.closest('#btn-speak-card') && !e.target.closest('#btn-mic-card')) {
                e.currentTarget.classList.toggle('rotate-y-180');
            }
        });
        document.getElementById('btn-speak-card').onclick = (e) => { e.stopPropagation(); speakText(step.en); };
        
        document.getElementById('btn-mic-card').onclick = (e) => {
            e.stopPropagation();
            startSpeechRecognition((text) => {
                const spoken = text.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
                const target = step.en.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

                if (spoken === target || target.includes(spoken) || spoken.includes(target)) {
                    showToast(`🎉 ¡Pronunciación Excelente! Dijiste: "${text}"`, 'success');
                    currentUser.xp = (currentUser.xp || 0) + 5;
                    saveCurrentUserData();
                    updateUI();
                } else {
                    showToast(`❌ Casi. Dijiste: "${text}". ¡Inténtalo de nuevo!`, 'info');
                }
            }, 'en-US');
        };
        speakText(step.en);
    } else if (step.type === 'quiz') {
        container.innerHTML = `
            <div class="max-w-md mx-auto text-center space-y-6 w-full">
                <h3 class="text-xl font-bold text-white">${step.q}</h3>
                <div class="space-y-3">
                    ${step.options.map((opt, idx) => `
                        <button onclick="checkQuizAnswer(${idx}, ${step.correct})" class="quiz-opt-btn w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition text-left text-sm flex items-center justify-between">
                            <span>${opt}</span>
                            <i class="fa-solid fa-circle-question text-slate-500"></i>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// 🎯 CONTROLADOR INTERACTIVO DE QUIZZES
window.checkQuizAnswer = function(selectedIdx, correctIdx) {
    const buttons = document.querySelectorAll('.quiz-opt-btn');
    buttons.forEach((btn, idx) => {
        btn.onclick = null;
        if (idx === correctIdx) {
            btn.classList.remove('bg-slate-800', 'hover:bg-slate-700');
            btn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-500');
        } else if (idx === selectedIdx) {
            btn.classList.remove('bg-slate-800', 'hover:bg-slate-700');
            btn.classList.add('bg-rose-600', 'text-white', 'border-rose-500');
        }
    });

    if (selectedIdx === correctIdx) {
        showToast('🎉 ¡Respuesta Correcta! +5 XP', 'success');
        currentUser.xp = (currentUser.xp || 0) + 5;
        saveCurrentUserData();
        updateUI();
    } else {
        showToast('❌ Respuesta Incorrecta', 'info');
    }
};

// 💬 CHAT GLOBAL EN TIEMPO REAL
function renderGlobalChat() {
    const secChat = document.getElementById('sec-chat');
    if (!secChat) return;

    secChat.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col h-[500px]">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
                    <h3 class="font-bold text-slate-800 dark:text-white">Sala Global (Firebase Nube)</h3>
                </div>
                <span class="text-xs text-emerald-500 font-bold">🟢 En Vivo</span>
            </div>
            <div id="chat-messages-container" class="flex-1 p-4 overflow-y-auto space-y-3">
                <p class="text-xs text-center text-slate-400">Cargando mensajes...</p>
            </div>
            <form id="chat-send-form" class="p-3 border-t border-slate-200 dark:border-slate-700 flex space-x-2">
                <input type="text" id="chat-input-text" placeholder="Escribe un mensaje..." required class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs text-slate-800 dark:text-white outline-none">
                <button type="button" onclick="startSpeechRecognition(txt => document.getElementById('chat-input-text').value = txt, 'es-ES')" class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-3 py-2.5 rounded-xl text-xs hover:bg-slate-200 transition"><i class="fa-solid fa-microphone"></i></button>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition">Enviar</button>
            </form>
        </div>
    `;

    if (db) {
        db.collection('globalChat').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            let messagesHTML = '';
            snapshot.forEach(doc => {
                const msg = doc.data();
                messagesHTML += `
                    <div class="flex items-start space-x-2">
                        <div class="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">${msg.sender ? msg.sender.charAt(0) : 'U'}</div>
                        <div class="bg-slate-100 dark:bg-slate-900 p-3 rounded-2xl max-w-xs sm:max-w-md">
                            <div class="flex items-center space-x-2 mb-0.5">
                                <span class="text-xs font-extrabold text-indigo-500">${msg.sender}</span>
                                <span class="text-[10px] text-amber-500 font-bold">${msg.xp || 0} XP</span>
                                <span class="text-[10px] text-slate-400">${msg.time}</span>
                            </div>
                            <p class="text-xs text-slate-700 dark:text-slate-200">${msg.text}</p>
                        </div>
                    </div>
                `;
            });
            const container = document.getElementById('chat-messages-container');
            if (container) {
                container.innerHTML = messagesHTML || '<p class="text-xs text-center text-slate-400">Sé el primero en escribir.</p>';
                container.scrollTop = container.scrollHeight;
            }
        });
    }

    document.getElementById('chat-send-form').onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input-text');
        const text = input.value.trim();
        if (!text) return;

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const msgObj = {
            sender: currentUser ? currentUser.name : 'Meyer',
            text, time: timeStr, xp: currentUser ? currentUser.xp : 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (db) {
            db.collection('globalChat').add(msgObj).then(() => { input.value = ''; });
        }
    };
}

// 🔒 CHAT PRIVADO ESTRICTO Y PERSISTENTE
function renderPrivateChat() {
    const secPrivate = document.getElementById('sec-private-chat');
    if (!secPrivate) return;

    secPrivate.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl grid sm:grid-cols-3 h-[500px] overflow-hidden">
            <div class="border-r border-slate-200 dark:border-slate-700 p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 flex flex-col">
                <div>
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">Enviar Solicitud de Amistad</h4>
                    <div class="flex space-x-2">
                        <input type="text" id="private-target-user" placeholder="Nombre de usuario" class="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white outline-none">
                        <button onclick="sendFriendRequest()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition">
                            <i class="fa-solid fa-user-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto space-y-2">
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500 mt-2 mb-1">Mis Conversaciones</h4>
                    <div id="private-chats-list" class="space-y-1"></div>
                </div>
            </div>

            <div class="sm:col-span-2 flex flex-col h-full bg-white dark:bg-slate-800">
                <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-user-lock text-indigo-500"></i>
                        <h3 class="font-bold text-sm text-slate-800 dark:text-white" id="private-chat-header">Selecciona un chat</h3>
                    </div>
                    <span class="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold px-2.5 py-1 rounded-full">Privado 1vs1</span>
                </div>

                <div id="private-messages-container" class="flex-1 p-4 overflow-y-auto space-y-3">
                    <div class="flex flex-col items-center justify-center h-full text-center text-slate-400 text-xs">
                        <i class="fa-solid fa-comments text-3xl mb-2 text-indigo-500/40"></i>
                        <p>Selecciona un contacto a la izquierda para chatear.</p>
                    </div>
                </div>

                <form id="private-send-form" class="p-3 border-t border-slate-200 dark:border-slate-700 flex space-x-2">
                    <input type="text" id="private-input-text" placeholder="Escribe un mensaje privado..." required disabled class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs text-slate-800 dark:text-white outline-none disabled:opacity-50">
                    <button type="button" onclick="startSpeechRecognition(txt => document.getElementById('private-input-text').value = txt, 'es-ES')" class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white px-3 py-2.5 rounded-xl text-xs hover:bg-slate-200 transition"><i class="fa-solid fa-microphone"></i></button>
                    <button type="submit" id="private-send-btn" disabled class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition disabled:opacity-50">Enviar</button>
                </form>
            </div>
        </div>
    `;

    renderSavedPrivateContactsList();
    listenForFriendRequests();
}

let activePrivateChatId = null;
let privateUnsubscribe = null;

// ENVIAR SOLICITUD DE AMISTAD EN TIEMPO REAL
window.sendFriendRequest = function() {
    const targetInput = document.getElementById('private-target-user');
    const target = targetInput ? targetInput.value.trim() : '';
    if (!target) { showToast('Escribe el nombre del usuario.', 'info'); return; }

    const myName = currentUser ? currentUser.name : 'Meyer';
    if (target.toLowerCase() === myName.toLowerCase()) {
        showToast('No puedes enviarte solicitud a ti mismo.', 'info');
        return;
    }

    if (db) {
        db.collection('friendRequests').doc(target.toLowerCase().replace(/\s+/g, '')).set({
            fromUser: myName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            showToast(`📩 Solicitud de amistad enviada a ${target}`);
            addContactToSavedList(target);
            targetInput.value = '';
        });
    }
};

// NOTIFICACIÓN RECIBIDA EN CHAT PRIVADO
function listenForFriendRequests() {
    if (!db || !currentUser) return;
    const myDocId = currentUser.name.toLowerCase().replace(/\s+/g, '');

    db.collection('friendRequests').doc(myDocId).onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            showToast(`🔔 ${data.fromUser} quiere ser tu amigo en Chat Privado.`, 'info');
            addContactToSavedList(data.fromUser);
        }
    });
}

// PERSISTENCIA: MOSTRAR LISTA DE CONTACTOS GUARDADOS
function renderSavedPrivateContactsList() {
    const listContainer = document.getElementById('private-chats-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (!currentUser.privateContacts) currentUser.privateContacts = [];

    if (currentUser.privateContacts.length === 0) {
        listContainer.innerHTML = `<p class="text-[11px] text-slate-400 p-2">Escribe el nombre arriba para añadir un amigo.</p>`;
        return;
    }

    const myName = currentUser ? currentUser.name : 'Meyer';

    currentUser.privateContacts.forEach(target => {
        const chatId = [myName, target].sort().join('_').toLowerCase().replace(/\s+/g, '');
        const item = document.createElement('div');
        item.id = `chat-item-${chatId}`;
        item.className = "p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl cursor-pointer text-xs font-bold text-slate-700 dark:text-white flex items-center justify-between transition mb-1";
        item.innerHTML = `<span><i class="fa-solid fa-user mr-2 text-indigo-500"></i>${target}</span><i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>`;
        item.onclick = () => openPrivateChat(chatId, target);
        listContainer.appendChild(item);
    });
}

function addContactToSavedList(target) {
    if (!currentUser.privateContacts) currentUser.privateContacts = [];
    if (!currentUser.privateContacts.includes(target)) {
        currentUser.privateContacts.push(target);
        saveCurrentUserData();
    }
    renderSavedPrivateContactsList();
}

// ABRIR CHAT PRIVADO ÚNICAMENTE PARA LOS DOS USUARIOS
function openPrivateChat(chatId, targetName) {
    activePrivateChatId = chatId;
    addContactToSavedList(targetName);

    document.getElementById('private-chat-header').innerText = `Chat Privado con ${targetName}`;
    document.getElementById('private-input-text').disabled = false;
    document.getElementById('private-send-btn').disabled = false;

    if (privateUnsubscribe) privateUnsubscribe();

    if (db) {
        // FILTRADO ESTRICTO POR EL ID ÚNICO DEL CHAT
        privateUnsubscribe = db.collection('privateChats').doc(chatId).collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                let html = '';
                const myName = currentUser ? currentUser.name : 'Meyer';

                snapshot.forEach(doc => {
                    const msg = doc.data();
                    const isMe = msg.sender === myName;

                    html += `
                        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
                            <div class="p-3 rounded-2xl max-w-xs text-xs font-medium ${isMe ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100'}">
                                ${msg.text}
                            </div>
                            <span class="text-[9px] text-slate-400 mt-1">${msg.time}</span>
                        </div>
                    `;
                });

                const container = document.getElementById('private-messages-container');
                container.innerHTML = html || '<p class="text-xs text-center text-slate-400 mt-4">Di hola 👋</p>';
                container.scrollTop = container.scrollHeight;
            });
    }

    document.getElementById('private-send-form').onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('private-input-text');
        const text = input.value.trim();
        if (!text || !activePrivateChatId) return;

        const myName = currentUser ? currentUser.name : 'Meyer';
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (db) {
            db.collection('privateChats').doc(activePrivateChatId).collection('messages').add({
                sender: myName, chatId: activePrivateChatId, text, time: timeStr, timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => { input.value = ''; });
        }
    };
}

// ⚔️ GUERRA 1VS1 ONLINE
window.openWarSetup = function() {
    const modalHTML = `
        <div id="war-setup-modal" class="fixed inset-0 bg-slate-900/90 z-50 backdrop-blur-md flex items-center justify-center p-4">
            <div class="bg-slate-800 border border-slate-700 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl space-y-6">
                <div class="text-center">
                    <div class="w-16 h-16 bg-rose-600/20 text-rose-500 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-2 border border-rose-500/30">
                        <i class="fa-solid fa-swords"></i>
                    </div>
                    <h2 class="text-2xl font-black">Guerra 1vs1 Online</h2>
                    <p class="text-xs text-slate-400 mt-1">Ingresa el código de la sala para jugar.</p>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Tu Nombre</label>
                        <input type="text" id="war-pname" value="${currentUser ? currentUser.name : 'Meyer'}" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Código de Sala (Ej: MEYER77)</label>
                        <input type="text" id="war-code-input" placeholder="MEYER77" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold uppercase outline-none focus:border-rose-500">
                    </div>
                </div>

                <div class="flex space-x-3">
                    <button onclick="document.getElementById('war-setup-modal').remove()" class="w-1/3 py-3 bg-slate-700 hover:bg-slate-600 font-bold rounded-xl text-xs transition">Cancelar</button>
                    <button onclick="joinWarRoom('p2')" class="w-1/3 py-3 bg-amber-600 hover:bg-amber-500 font-bold rounded-xl text-xs transition">Unirme</button>
                    <button onclick="joinWarRoom('p1')" class="w-1/3 py-3 bg-rose-600 hover:bg-rose-500 font-bold rounded-xl text-xs transition shadow-lg">Crear Sala</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

window.joinWarRoom = function(role) {
    const name = document.getElementById('war-pname').value.trim() || 'Meyer';
    const code = document.getElementById('war-code-input').value.trim().toUpperCase();

    if (!code) { showToast('Escribe un código de sala.', 'info'); return; }

    currentRoomCode = code;
    myRole = role;
    document.getElementById('war-setup-modal').remove();

    const roomRef = db.collection('warRooms').doc(code);

    if (role === 'p1') {
        const initialWord = WAR_WORDS[Math.floor(Math.random() * WAR_WORDS.length)];
        roomRef.set({
            p1Name: name, p2Name: 'Esperando rival...', p1Score: 0, p2Score: 0,
            currentRound: 1, totalRounds: 5, turn: 'p1', wordEn: initialWord.en, wordEs: initialWord.es, status: 'waiting'
        });
    } else {
        roomRef.update({ p2Name: name, status: 'playing' }).catch(() => { showToast('La sala no existe. Elige "Crear Sala".', 'info'); });
    }

    listenWarRoomOnline(code);
};

function listenWarRoomOnline(code) {
    renderWarArenaModal();
    if (warUnsubscribe) warUnsubscribe();

    warUnsubscribe = db.collection('warRooms').doc(code).onSnapshot(doc => {
        if (!doc.exists) return;
        const data = doc.data();

        document.getElementById('war-p1-name').innerText = data.p1Name;
        document.getElementById('war-p2-name').innerText = data.p2Name;
        document.getElementById('war-p1-pts').innerText = data.p1Score;
        document.getElementById('war-p2-pts').innerText = data.p2Score;
        document.getElementById('war-round-txt').innerText = `Ronda ${data.currentRound}/${data.totalRounds}`;
        document.getElementById('war-word-en').innerText = data.wordEn;

        const isMyTurn = data.turn === myRole;
        document.getElementById('war-turn-indicator').innerText = isMyTurn ? "🎯 ¡ES TU TURNO!" : `⏳ TURNO DE SU RIVAL`;
    });
}

function renderWarArenaModal() {
    const existing = document.getElementById('war-arena-modal');
    if (existing) existing.remove();

    const arenaHTML = `
        <div id="war-arena-modal" class="fixed inset-0 bg-slate-950 z-50 flex flex-col p-4 sm:p-6 text-white overflow-y-auto">
            <div class="max-w-3xl w-full mx-auto flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-lg">P1</div>
                    <div>
                        <div class="font-bold text-sm" id="war-p1-name">Cargando...</div>
                        <div class="text-xs text-amber-400 font-bold"><span id="war-p1-pts">0</span> PTS</div>
                    </div>
                </div>
                <div class="text-center">
                    <span class="px-3 py-1 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-black">SALA: ${currentRoomCode}</span>
                    <div class="text-xs text-slate-400 mt-1 font-mono" id="war-round-txt">Ronda 1/5</div>
                </div>
                <div class="flex items-center space-x-3 text-right">
                    <div>
                        <div class="font-bold text-sm" id="war-p2-name">Cargando...</div>
                        <div class="text-xs text-amber-400 font-bold"><span id="war-p2-pts">0</span> PTS</div>
                    </div>
                    <div class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center font-black text-lg">P2</div>
                </div>
            </div>

            <div class="max-w-xl w-full mx-auto my-auto py-8 text-center space-y-6">
                <div id="war-turn-indicator" class="inline-block px-4 py-1.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider">Conectando...</div>
                <div class="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
                    <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">Traduce la palabra</span>
                    <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-1" id="war-word-en">---</h2>
                    <div class="mt-6 space-y-3">
                        <input type="text" id="war-answer-input" placeholder="Escribe tu respuesta..." class="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-center outline-none focus:border-indigo-500">
                        <div class="flex space-x-2">
                            <button onclick="startSpeechRecognition(txt => document.getElementById('war-answer-input').value = txt, 'es-ES')" class="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1">
                                <i class="fa-solid fa-microphone"></i><span>Hablar</span>
                            </button>
                            <button onclick="submitWarAnswerOnline()" class="w-2/3 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg">
                                Enviar Respuesta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-3xl w-full mx-auto flex justify-between items-center text-xs text-slate-500">
                <button onclick="document.getElementById('war-arena-modal').remove()" class="hover:text-rose-400"><i class="fa-solid fa-arrow-left"></i> Salir</button>
                <span>Aprendiendo con Meyer ⚔️</span>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', arenaHTML);
}

window.submitWarAnswerOnline = function() {
    const input = document.getElementById('war-answer-input').value.trim().toLowerCase();
    const roomRef = db.collection('warRooms').doc(currentRoomCode);

    roomRef.get().then(doc => {
        if (!doc.exists) return;
        const data = doc.data();
        const target = data.wordEs.toLowerCase();

        let isCorrect = input.includes(target) || target.includes(input);
        let updates = {};

        if (isCorrect) {
            showToast('✅ ¡Correcto!');
            if (myRole === 'p1') updates.p1Score = data.p1Score + 1;
            else updates.p2Score = data.p2Score + 1;
        } else {
            showToast(`❌ Era: ${data.wordEs}`, 'info');
        }

        const nextWord = WAR_WORDS[Math.floor(Math.random() * WAR_WORDS.length)];
        updates.wordEn = nextWord.en;
        updates.wordEs = nextWord.es;
        updates.turn = myRole === 'p1' ? 'p2' : 'p1';
        if (myRole === 'p2') updates.currentRound = data.currentRound + 1;

        roomRef.update(updates);
        document.getElementById('war-answer-input').value = '';
    });
};

// ==========================================
// 📹 TRANSMISIONES EN VIVO (DISEÑO DÚO TIKTOK + BOTONES VISIBLES EN CELULAR)
// ==========================================
function renderLiveStream() {
    const secLive = document.getElementById('sec-live');
    if (!secLive) return;

    secLive.innerHTML = `
        <div class="bg-slate-950 rounded-3xl p-3 sm:p-6 text-white border border-slate-800 shadow-2xl space-y-4 max-w-4xl mx-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                <div class="flex items-center space-x-2">
                    <span class="w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
                    <h3 class="text-lg font-black">Transmisiones en Vivo 🔴</h3>
                </div>
                <div class="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button id="btn-random-duo" onclick="startRandomDuoMatch()" class="flex-1 sm:flex-none px-3 py-2 bg-amber-600 hover:bg-amber-500 font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center space-x-1">
                        <i class="fa-solid fa-shuffle"></i><span>Emparejar al Azar 🌐</span>
                    </button>
                    <button id="btn-invite-duo" onclick="inviteFriendToDuo()" class="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs rounded-xl transition hidden shadow-md flex items-center justify-center space-x-1">
                        <i class="fa-solid fa-user-plus"></i><span>Invitar a Dúo</span>
                    </button>
                    <button id="btn-toggle-live" onclick="toggleHostingLive()" class="flex-1 sm:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-500 font-bold text-xs rounded-xl transition shadow-lg text-center">
                        Transmitir Mi Cámara 📹
                    </button>
                </div>
            </div>

            <!-- SELECTOR DE SALAS ACTIVAS -->
            <div class="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Transmisiones Activas en el Mundo:</span>
                <div id="live-rooms-list" class="flex flex-wrap gap-2">
                    <span class="text-xs text-slate-500 italic">No hay transmisiones en vivo en este momento.</span>
                </div>
            </div>

            <!-- CONTENEDOR PRINCIPAL TIPO DÚO TIKTOK (DIVIDIDO EN CELULAR Y PC) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="md:col-span-2 relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col min-h-[420px] sm:min-h-[480px]">
                    <span id="live-status-badge" class="absolute top-3 left-3 bg-slate-950/80 text-slate-400 font-bold text-[11px] px-3 py-1 rounded-full border border-slate-700 z-20">
                        SIN TRANSMISIÓN SELECCIONADA
                    </span>
                    
                    <!-- PANTALLA TIPO DÚO TIKTOK (2 VIDEOS PARALELOS O VERTICALES) -->
                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-1 p-1 bg-slate-950 min-h-[340px]">
                        <div class="relative w-full h-full min-h-[170px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800/60">
                            <video id="live-video-player" autoplay playsinline class="w-full h-full object-cover"></video>
                        </div>
                        <div class="relative w-full h-full min-h-[170px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800/60">
                            <video id="live-guest-player" autoplay playsinline class="w-full h-full object-cover"></video>
                        </div>
                    </div>

                    <!-- BARRA DE CONTROLES FLOTANTE/VISIBILIDAD GARANTIZADA EN CELULAR Y PC -->
                    <div id="duo-controls-bar" class="p-2 bg-slate-950 border-t border-slate-800 grid grid-cols-2 sm:flex sm:justify-center gap-1.5 z-20">
                        <button onclick="toggleCameraFacing()" class="w-full sm:w-auto px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1">
                            <i class="fa-solid fa-camera-rotate"></i><span>Voltear</span>
                        </button>
                        <button onclick="toggleDuoMute()" id="btn-duo-mute" class="w-full sm:w-auto px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1">
                            <i class="fa-solid fa-microphone"></i><span>Silenciar</span>
                        </button>
                        <button onclick="toggleDuoPauseCam()" id="btn-duo-pause" class="w-full sm:w-auto px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1">
                            <i class="fa-solid fa-video"></i><span>Pausar</span>
                        </button>
                        <button onclick="stopDuoLive()" class="w-full sm:w-auto px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1">
                            <i class="fa-solid fa-phone-slash"></i><span>Apagar</span>
                        </button>
                    </div>
                </div>

                <div class="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col h-[300px] md:h-auto overflow-hidden">
                    <div class="p-3 border-b border-slate-800 text-xs font-bold text-slate-400" id="live-chat-header">
                        💬 Chat de la Sala
                    </div>
                    <div id="live-chat-messages" class="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                        <p class="text-slate-500 text-center text-[11px]">Selecciona una transmisión arriba para ver los comentarios.</p>
                    </div>
                    <form id="live-chat-form" class="p-2 border-t border-slate-800 flex space-x-1">
                        <input type="text" id="live-chat-input" placeholder="Comentar..." required disabled class="flex-1 px-3 py-2 rounded-xl bg-slate-950 text-xs text-white outline-none border border-slate-800 disabled:opacity-50">
                        <button type="submit" id="live-chat-btn" disabled class="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-2 rounded-xl text-xs transition disabled:opacity-50"><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
    `;

    listenToActiveLiveRooms();
    listenForDuoInvitations();
}

let activeLiveRoomId = null;
let liveChatUnsubscribe = null;

// TRANSMITIR TU CÁMARA
window.toggleHostingLive = async function() {
    const btn = document.getElementById('btn-toggle-live');
    const btnDuo = document.getElementById('btn-invite-duo');
    const myName = currentUser ? currentUser.name : 'Meyer';
    const myRoomId = `live_${myName.toLowerCase().replace(/\s+/g, '')}`;

    if (localMediaStream) {
        stopDuoLive();
    } else {
        try {
            localMediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: currentFacingMode }, 
                audio: true 
            });

            const guestPlayer = document.getElementById('live-guest-player');
            if (guestPlayer) {
                guestPlayer.srcObject = localMediaStream;
                guestPlayer.muted = true;
                guestPlayer.play().catch(e => console.log(e));
            }

            if (window.Peer) {
                peer = new Peer();
                peer.on('open', (peerId) => {
                    if (db) {
                        db.collection('liveRooms').doc(myRoomId).set({
                            roomId: myRoomId,
                            peerId: peerId,
                            hostName: myName,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }

                    activeLiveRoomId = myRoomId;
                    btn.innerText = "⏹️ Apagar Live";
                    btn.className = "flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-xl transition shadow-lg border border-slate-700 text-center";
                    btnDuo.classList.remove('hidden');

                    document.getElementById('live-status-badge').innerText = `🔴 EN VIVO (${myName})`;
                    document.getElementById('live-status-badge').className = "absolute top-3 left-3 bg-rose-600 text-white font-black text-[11px] px-3 py-1 rounded-full animate-pulse z-20";

                    connectToLiveChat(myRoomId, myName);
                    showToast(`🚀 Tu sala "Live de ${myName}" está activa.`);
                });

                peer.on('call', (call) => {
                    activeCall = call;
                    call.answer(localMediaStream);
                    call.on('stream', (guestStream) => {
                        const mainPlayer = document.getElementById('live-video-player');
                        if (mainPlayer) {
                            mainPlayer.srcObject = guestStream;
                            mainPlayer.muted = false;
                            mainPlayer.play().catch(e => console.log(e));
                            showToast('👥 ¡Un usuario se unió a tu transmisión!');
                        }
                    });
                });
            }
        } catch (e) {
            showToast('Error de acceso a cámara o micrófono.', 'info');
        }
    }
};

// BOTÓN PARA VOLTEAR CÁMARA (FRONTAL / TRASERA EN CELULAR)
window.toggleCameraFacing = async function() {
    currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    if (localMediaStream) {
        localMediaStream.getTracks().forEach(track => track.stop());
        try {
            localMediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: currentFacingMode }, 
                audio: true 
            });
            const guestPlayer = document.getElementById('live-guest-player');
            if (guestPlayer) {
                guestPlayer.srcObject = localMediaStream;
                guestPlayer.muted = true;
                guestPlayer.play().catch(e => console.log(e));
            }
            if (activeCall && activeCall.peerConnection) {
                const videoTrack = localMediaStream.getVideoTracks()[0];
                const sender = activeCall.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
                if (sender) sender.replaceTrack(videoTrack);
            }
            showToast(currentFacingMode === 'user' ? '🔄 Cámara frontal' : '🔄 Cámara trasera', 'info');
        } catch (e) {
            showToast('No se pudo voltear la cámara.', 'info');
        }
    } else {
        showToast('Debes estar transmitiendo para voltear la cámara.', 'info');
    }
};

// EMPAREJAMIENTO AL AZAR
window.startRandomDuoMatch = async function() {
    if (!localMediaStream) {
        showToast('⚠️ Debes encender "Transmitir Mi Cámara" primero para poder emparejar.', 'info');
        return;
    }

    const myName = currentUser ? currentUser.name : 'Meyer';
    showToast('🔄 Conectando... Buscando cámara activa en live...', 'info');

    if (!db || !peer) return;

    db.collection('randomQueue').get().then(snapshot => {
        let foundMatch = false;

        snapshot.forEach(doc => {
            if (!foundMatch && doc.id !== myName.toLowerCase().trim()) {
                const target = doc.data();
                foundMatch = true;

                activeCall = peer.call(target.peerId, localMediaStream);
                activeCall.on('stream', (remoteStream) => {
                    const mainPlayer = document.getElementById('live-video-player');
                    if (mainPlayer) {
                        mainPlayer.srcObject = remoteStream;
                        mainPlayer.muted = false;
                        mainPlayer.play().catch(e => console.log(e));
                    }
                    showToast(`🎲 ¡Emparejado al azar con ${target.userName}!`);
                });

                db.collection('randomQueue').doc(doc.id).delete();
            }
        });

        if (!foundMatch) {
            db.collection('randomQueue').doc(myName.toLowerCase().trim()).set({
                userName: myName,
                peerId: peer.id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            showToast('⏳ Conectando... Esperando a que otra cámara se conecte...', 'info');
        }
    });
};

// BOTONES DE CONTROL DE VIDEO Y AUDIO
window.toggleDuoMute = function() {
    if (localMediaStream) {
        const audioTrack = localMediaStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            const btn = document.getElementById('btn-duo-mute');
            if (audioTrack.enabled) {
                btn.innerHTML = `<i class="fa-solid fa-microphone"></i><span>Silenciar</span>`;
                btn.className = "w-full sm:w-auto px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1";
                showToast('🎙️ Micrófono activado');
            } else {
                btn.innerHTML = `<i class="fa-solid fa-microphone-slash text-rose-400"></i><span>Activar Mic</span>`;
                btn.className = "w-full sm:w-auto px-3 py-2 bg-rose-600/20 text-rose-300 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1 border border-rose-500/40";
                showToast('🔇 Micrófono silenciado');
            }
        }
    }
};

window.toggleDuoPauseCam = function() {
    if (localMediaStream) {
        const videoTrack = localMediaStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            const btn = document.getElementById('btn-duo-pause');
            if (videoTrack.enabled) {
                btn.innerHTML = `<i class="fa-solid fa-video"></i><span>Pausar</span>`;
                btn.className = "w-full sm:w-auto px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1";
                showToast('📹 Cámara reanudada');
            } else {
                btn.innerHTML = `<i class="fa-solid fa-video-slash text-rose-400"></i><span>Reanudar</span>`;
                btn.className = "w-full sm:w-auto px-3 py-2 bg-rose-600/20 text-rose-300 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1 border border-rose-500/40";
                showToast('⏸️ Cámara pausada');
            }
        }
    }
};

// APAGAR Y CERRAR TODO COMPLETAMENTE
window.stopDuoLive = function() {
    const myName = currentUser ? currentUser.name : 'Meyer';
    const myRoomId = `live_${myName.toLowerCase().replace(/\s+/g, '')}`;

    if (activeCall) {
        activeCall.close();
        activeCall = null;
    }

    if (localMediaStream) {
        localMediaStream.getTracks().forEach(track => track.stop());
        localMediaStream = null;
    }

    const mainPlayer = document.getElementById('live-video-player');
    if (mainPlayer) mainPlayer.srcObject = null;

    const guestPlayer = document.getElementById('live-guest-player');
    if (guestPlayer) {
        guestPlayer.srcObject = null;
    }

    if (peer) { peer.destroy(); peer = null; }

    if (db) {
        db.collection('liveRooms').doc(myRoomId).delete().catch(err => console.warn(err));
        db.collection('randomQueue').doc(myName.toLowerCase().trim()).delete().catch(err => console.warn(err));
    }

    const btn = document.getElementById('btn-toggle-live');
    if (btn) {
        btn.innerText = "Transmitir Mi Cámara 📹";
        btn.className = "flex-1 sm:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-500 font-bold text-xs rounded-xl transition shadow-lg text-center";
    }

    const btnDuo = document.getElementById('btn-invite-duo');
    if (btnDuo) btnDuo.classList.add('hidden');

    const badge = document.getElementById('live-status-badge');
    if (badge) {
        badge.innerText = "SIN TRANSMISIÓN SELECCIONADA";
        badge.className = "absolute top-3 left-3 bg-slate-950/80 text-slate-400 font-bold text-[11px] px-3 py-1 rounded-full border border-slate-700 z-20";
    }

    showToast('🛑 Transmisión cerrada por completo.', 'info');
};

// INVITAR A DÚO
window.inviteFriendToDuo = function() {
    const existingModal = document.getElementById('duo-input-modal');
    if (existingModal) existingModal.remove();

    const modalHTML = `
        <div id="duo-input-modal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-white shadow-2xl space-y-4">
                <div class="text-center space-y-1">
                    <div class="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto text-xl border border-indigo-500/30 mb-2">
                        <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <h3 class="font-black text-lg">Invitar a Dúo</h3>
                    <p class="text-xs text-slate-400">Escribe el nombre exacto de tu amigo para transmitir juntos.</p>
                </div>

                <input type="text" id="duo-friend-name-input" placeholder="Nombre de usuario..." class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-indigo-500 font-bold">

                <div class="flex space-x-2 pt-2">
                    <button onclick="document.getElementById('duo-input-modal').remove()" class="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-xl transition text-slate-300">
                        Cancelar
                    </button>
                    <button onclick="sendDuoInvitationAction()" class="w-1/2 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 text-white">
                        Enviar 🚀
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('duo-friend-name-input').focus();
};

window.sendDuoInvitationAction = function() {
    const inputField = document.getElementById('duo-friend-name-input');
    const friendName = inputField ? inputField.value.trim() : '';
    if (!friendName) { showToast('Escribe un nombre válido.', 'info'); return; }

    const myName = currentUser ? currentUser.name : 'Meyer';
    if (db && peer) {
        db.collection('duoInvitations').doc(friendName.toLowerCase().trim()).set({
            hostName: myName,
            hostPeerId: peer.id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            showToast(`📩 Invitación a Dúo enviada a ${friendName}`);
            document.getElementById('duo-input-modal').remove();
        });
    }
};

function listenForDuoInvitations() {
    if (!db || !currentUser) return;

    db.collection('duoInvitations').doc(currentUser.name.toLowerCase().trim()).onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            const oldCard = document.getElementById('duo-invite-card');
            if (oldCard) oldCard.remove();

            const cardHTML = `
                <div id="duo-invite-card" class="fixed bottom-6 right-6 bg-slate-900/95 backdrop-blur-xl border border-rose-500/40 rounded-3xl p-5 shadow-2xl z-50 text-white max-w-sm space-y-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-xl font-black shrink-0 shadow-lg shadow-rose-600/30">
                            <i class="fa-solid fa-video text-white animate-pulse"></i>
                        </div>
                        <div>
                            <span class="text-[10px] uppercase font-black text-rose-400 tracking-wider">Invitación en Directo</span>
                            <h4 class="font-black text-sm text-white">${data.hostName} te invita a Dúo 🎙️</h4>
                            <p class="text-xs text-slate-400 mt-0.5">¿Deseas unirte a su transmisión en pantalla dividida?</p>
                        </div>
                    </div>
                    <div class="flex space-x-2 pt-1">
                        <button onclick="document.getElementById('duo-invite-card').remove(); db.collection('duoInvitations').doc('${currentUser.name.toLowerCase().trim()}').delete();" class="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-xl transition text-slate-300">
                            Rechazar
                        </button>
                        <button onclick="acceptDuoInvite('${data.hostPeerId}', '${data.hostName}')" class="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-500 font-bold text-xs rounded-xl transition shadow-lg shadow-rose-600/40 text-white">
                            Aceptar 🚀
                        </button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', cardHTML);
        }
    });
}

window.acceptDuoInvite = function(hostPeerId, hostName) {
    const card = document.getElementById('duo-invite-card');
    if (card) card.remove();
    db.collection('duoInvitations').doc(currentUser.name.toLowerCase().trim()).delete();
    connectToHostDuo(hostPeerId, hostName);
};

async function connectToHostDuo(hostPeerId, hostName) {
    try {
        localMediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: currentFacingMode }, 
            audio: true 
        });
        if (window.Peer) {
            const duoPeer = new Peer();
            duoPeer.on('open', () => {
                activeCall = duoPeer.call(hostPeerId, localMediaStream);
                activeCall.on('stream', (hostStream) => {
                    const mainPlayer = document.getElementById('live-video-player');
                    if (mainPlayer) {
                        mainPlayer.srcObject = hostStream;
                        mainPlayer.muted = false;
                        mainPlayer.play().catch(e => console.log(e));
                    }
                    const guestPlayer = document.getElementById('live-guest-player');
                    if (guestPlayer) {
                        guestPlayer.srcObject = localMediaStream;
                        guestPlayer.muted = true;
                        guestPlayer.play().catch(e => console.log(e));
                    }
                    showToast(`🔴 Transmitiendo en Dúo con ${hostName}`);
                });
            });
        }
    } catch (e) {
        showToast('Error de cámara para el Dúo.', 'info');
    }
}

// SALAS ACTIVAS Y CONEXIÓN AL CLIC
function listenToActiveLiveRooms() {
    if (!db) return;

    db.collection('liveRooms').onSnapshot(snapshot => {
        const container = document.getElementById('live-rooms-list');
        if (!container) return;

        if (snapshot.empty) {
            container.innerHTML = `<span class="text-xs text-slate-500 italic">No hay transmisiones en vivo en este momento.</span>`;
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
            if (doc.exists) {
                const room = doc.data();
                html += `
                    <button onclick="watchLiveRoom('${room.peerId}', '${room.hostName}', '${room.roomId}')" class="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition">
                        <span class="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                        <span>Live de ${room.hostName}</span>
                    </button>
                `;
            }
        });

        container.innerHTML = html || `<span class="text-xs text-slate-500 italic">No hay transmisiones en vivo en este momento.</span>`;
    });
}

// VER LIVE DE OTRO USUARIO CON AUDIO
window.watchLiveRoom = function(peerId, hostName, roomId) {
    if (localMediaStream) {
        showToast('Debes apagar tu transmisión antes de ver a otro usuario.', 'info');
        return;
    }

    showToast(`🔄 Conectando con el Live de ${hostName}...`, 'info');

    if (window.Peer) {
        const viewerPeer = new Peer();
        viewerPeer.on('open', () => {
            const canvas = document.createElement('canvas');
            canvas.width = 10;
            canvas.height = 10;
            const dummyStream = canvas.captureStream ? canvas.captureStream(1) : null;

            activeCall = dummyStream ? viewerPeer.call(peerId, dummyStream) : viewerPeer.call(peerId);

            if (activeCall) {
                activeCall.on('stream', (remoteStream) => {
                    const player = document.getElementById('live-video-player');
                    if (player) {
                        player.srcObject = remoteStream;
                        player.muted = false;
                        player.play().then(() => {
                            const badge = document.getElementById('live-status-badge');
                            if (badge) {
                                badge.innerText = `🔴 EN VIVO (${hostName})`;
                                badge.className = "absolute top-3 left-3 bg-rose-600 text-white font-black text-[11px] px-3 py-1 rounded-full animate-pulse z-20";
                            }
                            showToast(`📺 ¡En vivo con ${hostName}!`);
                        }).catch(err => {
                            console.log("Error reproduciendo video:", err);
                        });
                    }
                });
            }
        });
    }

    activeLiveRoomId = roomId;
    connectToLiveChat(roomId, hostName);
};

function connectToLiveChat(roomId, hostName) {
    document.getElementById('live-chat-header').innerText = `💬 Chat: Live de ${hostName}`;
    document.getElementById('live-chat-input').disabled = false;
    document.getElementById('live-chat-btn').disabled = false;

    if (liveChatUnsubscribe) liveChatUnsubscribe();

    if (db) {
        liveChatUnsubscribe = db.collection('liveRooms').doc(roomId).collection('comments')
            .orderBy('timestamp', 'asc').limitToLast(30)
            .onSnapshot(snapshot => {
                let html = '';
                snapshot.forEach(doc => {
                    const msg = doc.data();
                    html += `
                        <div class="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                            <span class="font-extrabold text-indigo-400 text-[11px]">${msg.sender}:</span>
                            <span class="text-slate-200 text-xs">${msg.text}</span>
                        </div>
                    `;
                });
                const container = document.getElementById('live-chat-messages');
                if (container) {
                    container.innerHTML = html || '<p class="text-slate-500 text-center text-[11px]">Di algo en la transmisión...</p>';
                    container.scrollTop = container.scrollHeight;
                }
            });
    }

    document.getElementById('live-chat-form').onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('live-chat-input');
        const text = input.value.trim();
        if (!text || !activeLiveRoomId) return;

        db.collection('liveRooms').doc(activeLiveRoomId).collection('comments').add({
            sender: currentUser ? currentUser.name : 'Usuario',
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            input.value = '';
        });
    };
}

// DICCIONARIO PERSONALIZADO CON MICRÓFONO
function renderCustomWords() {
    const container = document.getElementById('custom-words-list');
    if (!currentUser || !currentUser.customWords || !currentUser.customWords.length) {
        container.innerHTML = `<p class="text-sm text-slate-400 col-span-2 text-center py-4">No hay palabras guardadas.</p>`;
        return;
    }
    container.innerHTML = currentUser.customWords.map(w => `
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border dark:border-slate-700 flex justify-between items-center shadow-sm">
            <div>
                <b class="text-slate-800 dark:text-white">${w.en}</b>
                <div class="text-xs text-slate-500">${w.es}</div>
            </div>
            <div class="flex space-x-1">
                <button onclick="speakText('${w.en}')" class="text-indigo-500 text-xs p-2"><i class="fa-solid fa-volume-high"></i></button>
                <button onclick="deleteCustomWord(${w.id})" class="text-rose-500 text-xs p-2"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

window.deleteCustomWord = function(id) {
    currentUser.customWords = currentUser.customWords.filter(w => w.id !== id);
    saveCurrentUserData();
    renderCustomWords();
    showToast('Frase eliminada.', 'info');
};

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

// LIMPIEZA AUTOMÁTICA AL CERRAR PÁGINA
window.addEventListener('beforeunload', () => {
    if (localMediaStream && currentUser) {
        const myName = currentUser.name || 'Meyer';
        const myRoomId = `live_${myName.toLowerCase().replace(/\s+/g, '')}`;
        if (db) {
            db.collection('liveRooms').doc(myRoomId).delete();
            db.collection('randomQueue').doc(myName.toLowerCase().trim()).delete();
        }
    }
});

// INICIALIZACIÓN DE LA APLICACIÓN Y VALIDACIÓN DE AUTENTICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    initAuth();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.onclick = () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            showToast(isDark ? '🌙 Modo Oscuro Activado' : '☀️ Modo Claro Activado', 'info');
        };
    }

    document.getElementById('btn-toggle-auth').onclick = () => {
        isRegistering = !isRegistering;
        document.getElementById('auth-title').innerText = isRegistering ? 'Crear Cuenta' : '¡Hola! Soy Meyer';
        document.getElementById('name-field-container').classList.toggle('hidden', !isRegistering);
    };

    // VALIDACIÓN ESTRICTA DE INICIO DE SESIÓN
    document.getElementById('auth-form').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('input-email').value.trim().toLowerCase();
        const password = document.getElementById('input-password').value;
        const name = document.getElementById('input-name').value.trim();
        const data = getUsersDB();

        if (isRegistering) {
            if (!email || !password || !name) {
                showToast('Por favor completa todos los campos.', 'info');
                return;
            }
            currentUser = { email, password, name, xp: 50, streak: 1, customWords: [], privateContacts: [], seenHistory: [] };
            saveCurrentUserData();
            showMainApp();
            showToast('🎉 Cuenta creada exitosamente.');
        } else {
            // MODO INICIAR SESIÓN: SOLO PERMITE SI EXISTE PREVIAMENTE
            if (!data[email]) {
                showToast('❌ Esta cuenta no existe. Haz clic en "Crear Cuenta" para registrarte.', 'info');
                return;
            }
            if (data[email].password !== password) {
                showToast('❌ Contraseña incorrecta.', 'info');
                return;
            }
            currentUser = data[email];
            if (!currentUser.seenHistory) currentUser.seenHistory = [];
            if (!currentUser.privateContacts) currentUser.privateContacts = [];
            saveCurrentUserData();
            showMainApp();
            showToast(`¡Bienvenido de nuevo, ${currentUser.name}!`);
        }
    };

    document.getElementById('btn-logout').onclick = () => { localStorage.removeItem('meyer_app_active_email'); showAuthModal(); };
    document.getElementById('tab-lessons').onclick = () => switchTab('lessons');
    document.getElementById('tab-dictionary').onclick = () => switchTab('dictionary');
    document.getElementById('tab-chat').onclick = () => switchTab('chat');
    document.getElementById('tab-private-chat').onclick = () => switchTab('private-chat');
    document.getElementById('tab-live').onclick = () => switchTab('live');

    document.getElementById('add-word-form').onsubmit = (e) => {
        e.preventDefault();
        const en = document.getElementById('word-en').value.trim();
        const es = document.getElementById('word-es').value.trim();
        if (!en || !es) return;
        if (!currentUser.customWords) currentUser.customWords = [];
        currentUser.customWords.push({ id: Date.now(), en, es });
        saveCurrentUserData();
        renderCustomWords();
        document.getElementById('word-en').value = '';
        document.getElementById('word-es').value = '';
        showToast('¡Frase guardada!');
    };

    document.getElementById('btn-close-lesson').onclick = () => document.getElementById('view-lesson-modal').classList.add('hidden');
    document.getElementById('btn-next-step').onclick = () => {
        if (currentStepIndex < currentLesson.items.length - 1) {
            currentStepIndex++;
            renderCurrentStep();
        } else {
            currentUser.xp = (currentUser.xp || 0) + 25;
            saveCurrentUserData();
            updateUI();
            showToast('🎉 ¡Lección completada! +25 XP');
            document.getElementById('view-lesson-modal').classList.add('hidden');
        }
    };
});

function switchTab(tab) {
    ['lessons', 'dictionary', 'chat', 'private-chat', 'live'].forEach(t => {
        document.getElementById(`sec-${t}`).classList.toggle('hidden', t !== tab);
        document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
    });
}