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
let currentFacingMode = 'user';

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

// 🎙️ RECONOCIMIENTO DE VOZ
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

    // Sincronizar también el perfil público en Firestore para la búsqueda de amigos
    if (db) {
        db.collection('users').doc(currentUser.email.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_')).set({
            name: currentUser.name,
            email: currentUser.email.toLowerCase(),
            userId: currentUser.userId,
            xp: currentUser.xp || 0
        }, { merge: true });
    }
}

// 📊 RACHA DIARIA AUTOMÁTICA
function checkAndUpdateStreak() {
    if (!currentUser) return;
    const today = new Date().toDateString();
    const lastLogin = currentUser.lastLoginDate;

    if (!lastLogin) {
        currentUser.streak = 1;
        currentUser.lastLoginDate = today;
    } else if (lastLogin === today) {
        // Ya inició sesión hoy
    } else {
        const lastDate = new Date(lastLogin);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            currentUser.streak = (currentUser.streak || 1) + 1;
            currentUser.lastLoginDate = today;
            showToast(`🔥 ¡Racha aumentada a ${currentUser.streak} días!`, 'success');
        } else if (diffDays > 1) {
            currentUser.streak = 1;
            currentUser.lastLoginDate = today;
        }
    }
    saveCurrentUserData();
}

// INICIALIZACIÓN Y AUTENTICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    initAuth();

    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('input-email').value.trim().toLowerCase();
            const password = document.getElementById('input-password').value;
            const nameInput = document.getElementById('input-name');
            const name = nameInput ? nameInput.value.trim() : 'Meyer';

            const dbUsers = getUsersDB();

            if (isRegistering) {
                if (dbUsers[email]) {
                    showToast('Este correo ya está registrado.', 'info');
                    return;
                }
                const newUserId = 'USER_' + Math.random().toString(36).substr(2, 6).toUpperCase();
                currentUser = {
                    email,
                    password,
                    name: name || 'Meyer',
                    userId: newUserId,
                    xp: 0,
                    streak: 1,
                    lastLoginDate: new Date().toDateString(),
                    seenHistory: [],
                    privateContacts: []
                };
                dbUsers[email] = currentUser;
                saveUsersDB(dbUsers);
                saveCurrentUserData();
                showToast('¡Cuenta creada con éxito!');
                showMainApp();
            } else {
                if (!dbUsers[email] || dbUsers[email].password !== password) {
                    showToast('Correo o contraseña incorrectos.', 'info');
                    return;
                }
                currentUser = dbUsers[email];
                if (!currentUser.userId) {
                    currentUser.userId = 'USER_' + Math.random().toString(36).substr(2, 6).toUpperCase();
                }
                if (!currentUser.seenHistory) currentUser.seenHistory = [];
                if (!currentUser.privateContacts) currentUser.privateContacts = [];
                saveCurrentUserData();
                showToast(`¡Bienvenido de nuevo, ${currentUser.name}!`);
                showMainApp();
            }
        };
    }

    const toggleAuthBtn = document.getElementById('btn-toggle-auth');
    if (toggleAuthBtn) {
        toggleAuthBtn.onclick = () => {
            isRegistering = !isRegistering;
            const nameContainer = document.getElementById('name-field-container');
            const authTitle = document.getElementById('auth-title');
            const submitBtn = document.getElementById('auth-submit-btn');

            if (isRegistering) {
                nameContainer.classList.remove('hidden');
                authTitle.innerText = 'Crea tu cuenta';
                submitBtn.innerText = 'Registrarse';
                toggleAuthBtn.innerText = '¿Ya tienes cuenta? Inicia sesión';
            } else {
                nameContainer.classList.add('hidden');
                authTitle.innerText = '¡Hola! Soy Meyer';
                submitBtn.innerText = 'Entrar a la App';
                toggleAuthBtn.innerText = '¿No tienes cuenta? Regístrate aquí';
            }
        };
    }

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('meyer_app_active_email');
            currentUser = null;
            location.reload();
        };
    }

    // TABS NAVIGATION
    const tabs = ['lessons', 'dictionary', 'chat', 'private-chat', 'live'];
    tabs.forEach(tab => {
        const btn = document.getElementById(`tab-${tab}`);
        if (btn) {
            btn.onclick = () => {
                tabs.forEach(t => {
                    const b = document.getElementById(`tab-${t}`);
                    const s = document.getElementById(`sec-${t}`);
                    if (b) b.classList.remove('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
                    if (b && t !== tab) b.classList.add('text-slate-500');
                    if (s) s.classList.add('hidden');
                });
                btn.classList.add('active', 'border-b-2', 'border-indigo-600', 'text-indigo-600');
                btn.classList.remove('text-slate-500');
                const activeSec = document.getElementById(`sec-${tab}`);
                if (activeSec) activeSec.classList.remove('hidden');
            };
        }
    });
});

function initAuth() {
    const activeEmail = localStorage.getItem('meyer_app_active_email');
    const data = getUsersDB();
    if (activeEmail && data[activeEmail]) {
        currentUser = data[activeEmail];
        if (!currentUser.userId) currentUser.userId = 'USER_' + Math.random().toString(36).substr(2, 6).toUpperCase();
        if (!currentUser.seenHistory) currentUser.seenHistory = [];
        if (!currentUser.privateContacts) currentUser.privateContacts = [];
        showMainApp();
    } else {
        showAuthModal();
    }
}

function showAuthModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('view-dashboard').classList.add('hidden');
}

function showMainApp() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('view-dashboard').classList.remove('hidden');
    document.getElementById('btn-logout').classList.remove('hidden');

    checkAndUpdateStreak();
    updateUI();
}

function updateUI() {
    if (!currentUser) return;
    document.getElementById('header-user-welcome').innerText = `Hola, ${currentUser.name}`;
    document.getElementById('welcome-title').innerText = `¡Hola ${currentUser.name}! Sistema Completo Listo`;
    document.getElementById('xp-count').innerText = currentUser.xp || 0;
    document.getElementById('streak-count').innerText = currentUser.streak || 1;
    
    const displayIdEl = document.getElementById('user-display-id');
    if (displayIdEl) displayIdEl.innerText = currentUser.userId || currentUser.email;

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
    if (!container) return;
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

// BOTÓN SIGUIENTE EN MODAL DE LECCIÓN
document.addEventListener('DOMContentLoaded', () => {
    const btnNext = document.getElementById('btn-next-step');
    if (btnNext) {
        btnNext.onclick = () => {
            currentStepIndex++;
            if (currentStepIndex < currentLesson.items.length) {
                renderCurrentStep();
            } else {
                document.getElementById('view-lesson-modal').classList.add('hidden');
                showToast('🏆 ¡Lección completada con éxito! +20 XP', 'success');
                currentUser.xp = (currentUser.xp || 0) + 20;
                saveCurrentUserData();
                updateUI();
            }
        };
    }

    const btnCloseLesson = document.getElementById('btn-close-lesson');
    if (btnCloseLesson) {
        btnCloseLesson.onclick = () => {
            document.getElementById('view-lesson-modal').classList.add('hidden');
        };
    }
});

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

// 📖 DICCIONARIO PERSONAL
function renderCustomWords() {
    const container = document.getElementById('custom-words-list');
    if (!container) return;
    if (!currentUser.customWords) currentUser.customWords = [];

    container.innerHTML = currentUser.customWords.length === 0 
        ? `<p class="text-xs text-slate-400 col-span-full text-center py-4">No hay palabras guardadas.</p>`
        : currentUser.customWords.map((w, idx) => `
            <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
                <div>
                    <h4 class="font-bold text-sm text-slate-800 dark:text-white">${w.en}</h4>
                    <p class="text-xs text-indigo-500 font-semibold">${w.es}</p>
                </div>
                <button onclick="deleteCustomWord(${idx})" class="text-rose-500 hover:text-rose-700 text-xs p-2"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');

    const form = document.getElementById('add-word-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const en = document.getElementById('word-en').value.trim();
            const es = document.getElementById('word-es').value.trim();
            if (!en || !es) return;

            currentUser.customWords.push({ en, es });
            saveCurrentUserData();
            renderCustomWords();
            document.getElementById('word-en').value = '';
            document.getElementById('word-es').value = '';
            showToast('¡Frase guardada en tu diccionario!');
        };
    }
}

window.deleteCustomWord = function(idx) {
    currentUser.customWords.splice(idx, 1);
    saveCurrentUserData();
    renderCustomWords();
};

// 💬 CHAT GLOBAL
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
            <div id="chat-messages-container" class="flex-1 p-4 overflow-y-auto space-y-3 chat-scroll-area">
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

// 🔒 CHAT PRIVADO CON BÚSQUEDA Y VALIDACIÓN EXACTA DE ID/CORREO
function renderPrivateChat() {
    const secPrivate = document.getElementById('sec-private-chat');
    if (!secPrivate) return;

    secPrivate.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl grid lg:grid-cols-3 gap-6 p-6">
            <div class="border-r border-slate-200 dark:border-slate-700 pr-4 space-y-4 flex flex-col">
                <div>
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">Añadir Amigo por ID o Correo</h4>
                    <div class="space-y-2">
                        <input type="text" id="private-target-email" placeholder="Ingresa ID o Correo (ej. USER_123 o correo@gmail.com)" class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white outline-none">
                        <input type="text" id="private-target-name" placeholder="Nombre visible de tu amigo" class="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white outline-none">
                        <button onclick="sendFriendRequest()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2.5 rounded-xl text-xs transition flex items-center justify-center space-x-1">
                            <i class="fa-solid fa-user-plus"></i><span>Agregar Amigo</span>
                        </button>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto space-y-2 friends-scroll-area">
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500 mt-2 mb-1">Mis Conversaciones</h4>
                    <div id="private-chats-list" class="space-y-1"></div>
                </div>
            </div>

            <div class="lg:col-span-2 flex flex-col h-[450px] bg-white dark:bg-slate-800">
                <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-user-lock text-indigo-500"></i>
                        <h3 class="font-bold text-sm text-slate-800 dark:text-white" id="private-chat-header">Selecciona un chat</h3>
                    </div>
                    <span class="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold px-2.5 py-1 rounded-full">Protegido en la Nube</span>
                </div>

                <div id="private-messages-container" class="flex-1 p-4 overflow-y-auto space-y-3 chat-scroll-area">
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

// 🔍 BUSCAR Y VALIDAR SI EXISTE EL USUARIO POR ID O CORREO
window.sendFriendRequest = async function() {
    const targetInput = document.getElementById('private-target-email');
    const targetNameInput = document.getElementById('private-target-name');
    const queryText = targetInput ? targetInput.value.trim().toLowerCase() : '';
    const targetName = targetNameInput ? targetNameInput.value.trim() : 'Amigo';

    if (!queryText) {
        showToast('Escribe el ID o correo del usuario.', 'info');
        return;
    }

    const myEmail = currentUser ? currentUser.email.toLowerCase() : '';

    if (queryText === myEmail || queryText === (currentUser.userId || '').toLowerCase()) {
        showToast('No puedes agregarte a ti mismo.', 'info');
        return;
    }

    if (db) {
        // Buscar por email o por userId en Firestore
        let userFound = false;
        let foundEmail = '';
        let foundName = targetName;

        try {
            const usersRef = db.collection('users');
            
            // Intento 1: Buscar por correo
            let snapshot = await usersRef.where('email', '==', queryText).get();
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    userFound = true;
                    foundEmail = doc.data().email;
                    if (!targetName || targetName === 'Amigo') foundName = doc.data().name;
                });
            } else {
                // Intento 2: Buscar por ID único
                snapshot = await usersRef.where('userId', '==', queryText.toUpperCase()).get();
                if (!snapshot.empty) {
                    snapshot.forEach(doc => {
                        userFound = true;
                        foundEmail = doc.data().email;
                        if (!targetName || targetName === 'Amigo') foundName = doc.data().name;
                    });
                }
            }
        } catch (e) {
            console.log("Error consultando usuario:", e);
        }

        // ❌ VALIDACIÓN ESTRICTA SOLICITADA: SI NO EXISTE EL CÓDIGO O USUARIO
        if (!userFound) {
            showToast('❌ El código o usuario no existe.', 'info');
            return;
        }

        const docId = foundEmail.replace(/[^a-zA-Z0-9]/g, '_');
        db.collection('friendRequests').doc(docId).set({
            fromEmail: myEmail,
            fromName: currentUser.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            showToast(`📩 Solicitud enviada a ${foundName}`);
            addContactToSavedList(foundEmail, foundName);
            targetInput.value = '';
            targetNameInput.value = '';
        });
    }
};

function listenForFriendRequests() {
    if (!db || !currentUser) return;
    const myDocId = currentUser.email.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');

    db.collection('friendRequests').doc(myDocId).onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            showToast(`🔔 ${data.fromName} te añadió en Chat Privado.`, 'info');
            addContactToSavedList(data.fromEmail, data.fromName);
        }
    });
}

function renderSavedPrivateContactsList() {
    const listContainer = document.getElementById('private-chats-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (!currentUser.privateContacts) currentUser.privateContacts = [];

    if (currentUser.privateContacts.length === 0) {
        listContainer.innerHTML = `<p class="text-[11px] text-slate-400 p-2">Añade amigos usando su ID o correo.</p>`;
        return;
    }

    const myEmail = currentUser ? currentUser.email.toLowerCase() : '';

    currentUser.privateContacts.forEach(contact => {
        const contactEmail = typeof contact === 'string' ? contact.toLowerCase() : contact.email.toLowerCase();
        const contactName = typeof contact === 'string' ? contact : (contact.name || contact.email);

        const chatId = [myEmail, contactEmail].sort().join('_').replace(/[^a-zA-Z0-9]/g, '_');

        const item = document.createElement('div');
        item.id = `chat-item-${chatId}`;
        item.className = "p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl cursor-pointer text-xs font-bold text-slate-700 dark:text-white flex items-center justify-between transition mb-1";
        item.innerHTML = `<span><i class="fa-solid fa-user-shield mr-2 text-indigo-500"></i>${contactName}</span><i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>`;
        item.onclick = () => openPrivateChat(chatId, contactName);
        listContainer.appendChild(item);
    });
}

function addContactToSavedList(email, name) {
    if (!currentUser.privateContacts) currentUser.privateContacts = [];
    const exists = currentUser.privateContacts.some(c => (typeof c === 'string' ? c === email : c.email === email));
    
    if (!exists) {
        currentUser.privateContacts.push({ email, name });
        saveCurrentUserData();
    }
    renderSavedPrivateContactsList();
}

function openPrivateChat(chatId, targetName) {
    activePrivateChatId = chatId;
    document.getElementById('private-chat-header').innerText = `Chat con ${targetName}`;
    
    const inputMsg = document.getElementById('private-input-text');
    const sendBtn = document.getElementById('private-send-btn');
    if (inputMsg) inputMsg.disabled = false;
    if (sendBtn) sendBtn.disabled = false;

    if (privateUnsubscribe) privateUnsubscribe();

    if (db) {
        privateUnsubscribe = db.collection('privateChats').doc(chatId).collection('messages')
            .orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                let html = '';
                snapshot.forEach(doc => {
                    const msg = doc.data();
                    const isMe = msg.senderEmail === currentUser.email.toLowerCase();
                    html += `
                        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
                            <div class="bg-${isMe ? 'indigo-600 text-white' : 'slate-100 dark:bg-slate-900 text-slate-800 dark:text-white'} p-3 rounded-2xl max-w-xs text-xs">
                                <p>${msg.text}</p>
                                <span class="text-[9px] opacity-75 block text-right mt-1">${msg.time}</span>
                            </div>
                        </div>
                    `;
                });
                const container = document.getElementById('private-messages-container');
                if (container) {
                    container.innerHTML = html || '<p class="text-xs text-center text-slate-400">No hay mensajes aún. ¡Di hola!</p>';
                    container.scrollTop = container.scrollHeight;
                }
            });
    }

    const sendForm = document.getElementById('private-send-form');
    if (sendForm) {
        sendForm.onsubmit = (e) => {
            e.preventDefault();
            const text = inputMsg.value.trim();
            if (!text || !activePrivateChatId) return;

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            db.collection('privateChats').doc(activePrivateChatId).collection('messages').add({
                senderEmail: currentUser.email.toLowerCase(),
                text, time: timeStr,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                inputMsg.value = '';
            });
        };
    }
}

// 🎧 TRANSMISIONES EN VIVO (WEBRTC)
function renderLiveStream() {
    const secLive = document.getElementById('sec-live');
    if (!secLive) return;

    secLive.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-6 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="font-bold text-lg text-slate-800 dark:text-white">Transmisiones en Vivo</h3>
                    <p class="text-xs text-slate-400">Conéctate por cámara y voz en tiempo real con estudiantes.</p>
                </div>
                <div class="space-x-2">
                    <button onclick="startLiveBroadcasting()" class="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg transition">
                        <i class="fa-solid fa-video mr-1.5"></i> Transmitir Mi Cámara
                    </button>
                </div>
            </div>
            
            <div class="grid sm:grid-cols-2 gap-4">
                <div class="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-700">
                    <video id="local-video-preview" autoplay playsinline muted class="w-full h-full object-cover"></video>
                    <span class="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">Tu Cámara</span>
                </div>
                <div class="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-700">
                    <video id="remote-video-display" autoplay playsinline class="w-full h-full object-cover"></video>
                    <span class="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">Transmisión Externa</span>
                </div>
            </div>
        </div>
    `;
}

window.startLiveBroadcasting = async function() {
    try {
        localMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = document.getElementById('local-video-preview');
        if (localVideo) {
            localVideo.srcObject = localMediaStream;
        }
        showToast('🟢 Transmisión iniciada correctamente.', 'success');
    } catch (err) {
        showToast('No se pudo acceder a la cámara o micrófono.', 'info');
    }
};

// ⚔️ GUERRA 1VS1 EN LA NUBE
window.openWarSetup = function() {
    showToast('⚔️ Configurando Duelo 1vs1...', 'success');
};