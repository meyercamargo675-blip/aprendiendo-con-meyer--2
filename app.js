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

// ==========================================
// BANCO MASIVO Y COMPLETO DE VOCABULARIO
// ==========================================
const MASSIVE_VOCABULARY_BANK = [
    { type: 'card', en: 'Hello, nice to meet you!', es: '¡Hola, encantado de conocerte!', phonetic: 'Jelou, nais tu mit iu', category: 'Básico' },
    { type: 'card', en: 'How are you doing today?', es: '¿Cómo estás hoy?', phonetic: 'Jau ar iu duing tudei', category: 'Básico' },
    { type: 'card', en: 'My name is Meyer', es: 'Mi nombre es Meyer', phonetic: 'Mai neim is Meier', category: 'Básico' },
    { type: 'card', en: 'Where are you from?', es: '¿De dónde eres?', phonetic: 'Uer ar iu from', category: 'Básico' },
    { type: 'card', en: 'Have a nice day!', es: '¡Que tengas un buen día!', phonetic: 'Jav a nais dei', category: 'Básico' },
    { type: 'card', en: 'Thank you very much', es: 'Muchas gracias', phonetic: 'Tenk iu veri mach', category: 'Básico' },
    { type: 'card', en: 'You are welcome', es: 'De nada', phonetic: 'Iu ar uelcom', category: 'Básico' },
    { type: 'card', en: 'See you tomorrow', es: 'Nos vemos mañana', phonetic: 'Si iu tumorou', category: 'Básico' },
    { type: 'card', en: 'Good morning, my friend', es: 'Buenos días, mi amigo', phonetic: 'Gud morning, mai frend', category: 'Básico' },
    { type: 'card', en: 'Good night, sleep well', es: 'Buenas noches, duerme bien', phonetic: 'Gud nait, slip uel', category: 'Básico' },
    { type: 'card', en: 'What is your favorite color?', es: '¿Cuál es tu color favorito?', phonetic: 'Uat is iur feivorit color', category: 'Básico' },
    { type: 'card', en: 'I love learning English', es: 'Me encanta aprender inglés', phonetic: 'Ai lov lerning inglish', category: 'Básico' },
    { type: 'card', en: 'Could you help me, please?', es: '¿Podrías ayudarme, por favor?', phonetic: 'Cud iu jelp mi, plis', category: 'Básico' },
    { type: 'card', en: 'I understand very well', es: 'Entiendo muy bien', phonetic: 'Ai understand veri uel', category: 'Básico' },
    { type: 'card', en: 'Please speak slowly', es: 'Por favor habla despacio', phonetic: 'Plis spik slouli', category: 'Básico' },
    { type: 'quiz', q: '¿Cómo dices "Encantado de conocerte"?', options: ['Nice to meet you', 'Good morning', 'See you later'], correct: 0, category: 'Básico' },
    { type: 'quiz', q: '¿Qué significa "How are you?"', options: ['¿Cómo estás?', '¿De dónde eres?', '¿Cuál es tu nombre?'], correct: 0, category: 'Básico' },
    { type: 'quiz', q: 'Traducción de "Thank you very much":', options: ['De nada', 'Muchas gracias', 'Por favor'], correct: 1, category: 'Básico' },
    { type: 'quiz', q: '¿Cómo pides ayuda educadamente?', options: ['Help me now', 'Could you help me, please?', 'Where are you?'], correct: 1, category: 'Básico' },
    { type: 'quiz', q: '¿Qué significa "See you tomorrow"?', options: ['Nos vemos mañana', 'Hasta luego', 'Buenos días'], correct: 0, category: 'Básico' },

    { type: 'card', en: 'Web Application Development', es: 'Desarrollo de Aplicaciones Web', phonetic: 'Ueb aplikeishon development', category: 'Trabajo' },
    { type: 'card', en: 'Database Management System', es: 'Sistema de Gestión de Base de Datos', phonetic: 'Deitabeis manadjment sistem', category: 'Trabajo' },
    { type: 'card', en: 'User Interface Design', es: 'Diseño de Interfaz de Usuario', phonetic: 'Iuser interfeis disain', category: 'Trabajo' },
    { type: 'card', en: 'Source Code Execution', es: 'Ejecución del Código Fuente', phonetic: 'Sors cod eksekiushon', category: 'Trabajo' },
    { type: 'card', en: 'Project Manager', es: 'Gerente de Proyectos', phonetic: 'Proiekt manadjer', category: 'Trabajo' },
    { type: 'card', en: 'Bug Fixing and Testing', es: 'Corrección de Errores y Pruebas', phonetic: 'Bag fiksing and testing', category: 'Trabajo' },
    { type: 'card', en: 'Cloud Computing Services', es: 'Servicios de Computación en la Nube', phonetic: 'Claud kompiuting services', category: 'Trabajo' },
    { type: 'card', en: 'Artificial Intelligence System', es: 'Sistema de Inteligencia Artificial', phonetic: 'Artifishal intelidjens sistem', category: 'Trabajo' },
    { type: 'card', en: 'Front-end and Back-end Stack', es: 'Stack de Front-end y Back-end', phonetic: 'Front-end and bak-end stak', category: 'Trabajo' },
    { type: 'card', en: 'Cybersecurity Data Protection', es: 'Protección de Datos en Ciberseguridad', phonetic: 'Saibersekiuriti deita protekshon', category: 'Trabajo' },
    { type: 'card', en: 'Agile Development Framework', es: 'Marco de Desarrollo Ágil', phonetic: 'Adjail development freimuork', category: 'Trabajo' },
    { type: 'quiz', q: 'Traducción de "Software Development":', options: ['Desarrollo de Software', 'Diseño Gráfico', 'Base de Datos'], correct: 0, category: 'Trabajo' },
    { type: 'quiz', q: '¿Qué significa "Project Manager"?', options: ['Gerente de Proyecto', 'Programador Junior', 'Soporte Técnico'], correct: 0, category: 'Trabajo' },
    { type: 'quiz', q: '¿Qué es "Bug Fixing"?', options: ['Crear errores', 'Corregir errores de código', 'Diseñar logos'], correct: 1, category: 'Trabajo' },
    { type: 'quiz', q: 'Traducción de "User Interface":', options: ['Interfaz de Usuario', 'Base de Datos', 'Servidor en la nube'], correct: 0, category: 'Trabajo' },

    { type: 'card', en: 'Where is the nearest airport?', es: '¿Dónde está el aeropuerto más cercano?', phonetic: 'Uer is da nirest erport', category: 'Viajes' },
    { type: 'card', en: 'How much does this item cost?', es: '¿Cuánto cuesta este artículo?', phonetic: 'Jau mach das dis aitem cost', category: 'Viajes' },
    { type: 'card', en: 'Could I have the check, please?', es: '¿Podría traerme la cuenta, por favor?', phonetic: 'Cud ai jav da chek plis', category: 'Viajes' },
    { type: 'card', en: 'I need a hotel room reservation', es: 'Necesito una reserva de habitación de hotel', phonetic: 'Ai nid a hotel rum feserveishon', category: 'Viajes' },
    { type: 'card', en: 'Can I pay with credit card?', es: '¿Puedo pagar con tarjeta de crédito?', phonetic: 'Can ai pei uid kredit card', category: 'Viajes' },
    { type: 'card', en: 'Where is the train station?', es: '¿Dónde está la estación de tren?', phonetic: 'Uer is da trein steishon', category: 'Viajes' },
    { type: 'card', en: 'A table for two people, please', es: 'Una mesa para dos personas, por favor', phonetic: 'Ei teibol for tu pipol, plis', category: 'Viajes' },
    { type: 'card', en: 'Is tip included in the total?', es: '¿La propina está incluida en el total?', phonetic: 'Is tip includid in da totol', category: 'Viajes' },
    { type: 'card', en: 'I would like a glass of water', es: 'Me gustaría un vaso de agua', phonetic: 'Ai uud laik a glas ov uater', category: 'Viajes' },
    { type: 'quiz', q: '¿Cómo preguntas el precio de algo?', options: ['How much does this cost?', 'Where is the bathroom?', 'What time is it?'], correct: 0, category: 'Viajes' },
    { type: 'quiz', q: 'Traducción de "Could I have the check?":', options: ['¿Me trae la cuenta?', '¿Dónde está el menú?', '¿Tienen mesa libre?'], correct: 0, category: 'Viajes' },
    { type: 'quiz', q: '¿Qué pides con "A table for two"?', options: ['Una mesa para dos', 'Dos tazas de café', 'Habitación individual'], correct: 0, category: 'Viajes' },

    { type: 'card', en: 'Continuous Achievement', es: 'Logro Continuo', phonetic: 'Kontinious achivment', category: 'Avanzado' },
    { type: 'card', en: 'Knowledge Expansion', es: 'Expansión del Conocimiento', phonetic: 'Noladj ekspanshon', category: 'Avanzado' },
    { type: 'card', en: 'Strategic Leadership', es: 'Liderazgo Estratégico', phonetic: 'Stratedjik lidership', category: 'Avanzado' },
    { type: 'card', en: 'Problem Solving Skills', es: 'Habilidades de Resolución de Problemas', phonetic: 'Problem solving skils', category: 'Avanzado' },
    { type: 'card', en: 'Effective Professional Communication', es: 'Comunicación Profesional Efectiva', phonetic: 'Efektiv mefedik profesional komiunikeishon', category: 'Avanzado' },
    { type: 'card', en: 'Critical Thinking Capability', es: 'Capacidad de Pensamiento Crítico', phonetic: 'Kritikal thinking keipabiliti', category: 'Avanzado' },
    { type: 'card', en: 'Sustainable Global Growth', es: 'Crecimiento Global Sostenible', phonetic: 'Sustainabol global grouz', category: 'Avanzado' },
    { type: 'quiz', q: '¿Qué significa "Strategic Leadership"?', options: ['Liderazgo Estratégico', 'Pensamiento Rápido', 'Trabajo en Equipo'], correct: 0, category: 'Avanzado' },
    { type: 'quiz', q: 'Traducción de "Problem Solving Skills":', options: ['Habilidades de Resolución de Problemas', 'Gestión de Tiempo', 'Toma de Decisiones'], correct: 0, category: 'Avanzado' }
];

// ==========================================
// ESTADO GLOBAL Y CONFIGURACIÓN DE BATALLA
// ==========================================
let currentUser = null;
let isRegistering = false;
let currentLesson = null;
let currentStepIndex = 0;
let privateUnsubscribe = null;
let activePrivateChatId = null;

let currentBattle = {
    roomCode: '',
    score: 0,
    rivalScore: 0,
    questionIndex: 0,
    timer: 10,
    timerInterval: null,
    questions: []
};

const BATTLE_QUESTIONS_BANK = [
    { q: '¿Cómo se dice "Vaca" en inglés?', img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=300', options: ['Cow', 'Horse', 'Pig', 'Sheep'], correct: 0 },
    { q: '¿Cómo se dice "Perro" en inglés?', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300', options: ['Cat', 'Dog', 'Rabbit', 'Fox'], correct: 1 },
    { q: '¿Cómo se dice "Gato" en inglés?', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300', options: ['Dog', 'Cat', 'Tiger', 'Lion'], correct: 1 },
    { q: '¿Cómo se dice "Manzana" en inglés?', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300', options: ['Apple', 'Banana', 'Orange', 'Grape'], correct: 0 },
    { q: '¿Cómo se dice "Auto / Carro" en inglés?', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300', options: ['Plane', 'Car', 'Train', 'Bike'], correct: 1 },
    { q: '¿Cómo se dice "Casa" en inglés?', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300', options: ['House', 'Building', 'School', 'Park'], correct: 0 },
    { q: '¿Cómo se dice "Libro" en inglés?', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300', options: ['Pen', 'Book', 'Notebook', 'Paper'], correct: 1 },
    { q: '¿Cómo se dice "Agua" en inglés?', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300', options: ['Water', 'Milk', 'Juice', 'Soda'], correct: 0 },
    { q: '¿Cómo se dice "Sol" en inglés?', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300', options: ['Moon', 'Sun', 'Star', 'Sky'], correct: 1 },
    { q: '¿Cómo se dice "Computadora" en inglés?', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300', options: ['Computer', 'Phone', 'Tablet', 'Radio'], correct: 0 },
    { q: '¿Cómo se dice "Árbol" en inglés?', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300', options: ['Flower', 'Tree', 'Grass', 'Leaf'], correct: 1 },
    { q: '¿Cómo se dice "Fuego" en inglés?', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300', options: ['Fire', 'Water', 'Wind', 'Ice'], correct: 0 },
    { q: '¿Cómo se dice "Avión" en inglés?', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300', options: ['Car', 'Plane', 'Ship', 'Train'], correct: 1 },
    { q: '¿Cómo se dice "Música" en inglés?', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300', options: ['Music', 'Song', 'Dance', 'Sound'], correct: 0 },
    { q: '¿Cómo se dice "Estrella" en inglés?', img: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300', options: ['Sun', 'Star', 'Moon', 'Planet'], correct: 1 }
];

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-emerald-600' : (type === 'error' ? 'bg-rose-600' : 'bg-indigo-600');
    toast.className = `toast-item ${bgClass} text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-sm font-semibold pointer-events-auto`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-bell'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

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
    recognition.onerror = () => { showToast('No se logró escuchar claramente.', 'info'); };
    recognition.start();
}

function getUsersDB() { return JSON.parse(localStorage.getItem('meyer_app_users_db')) || {}; }
function saveUsersDB(data) { localStorage.setItem('meyer_app_users_db', JSON.stringify(data)); }

function generateUniqueUserId() {
    return 'USER_' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function saveCurrentUserData() {
    if (!currentUser) return;
    if (!currentUser.userId) currentUser.userId = generateUniqueUserId();
    const data = getUsersDB();
    data[currentUser.email] = currentUser;
    saveUsersDB(data);
    localStorage.setItem('meyer_app_active_email', currentUser.email);

    if (db) {
        db.collection('users').doc(currentUser.email.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_')).set({
            name: currentUser.name,
            email: currentUser.email.toLowerCase(),
            userId: currentUser.userId,
            xp: currentUser.xp || 0,
            streak: currentUser.streak || 1
        }, { merge: true });
    }
}

function checkAndUpdateStreak() {
    if (!currentUser) return;
    const today = new Date().toDateString();
    if (!currentUser.streak) currentUser.streak = 1;

    if (!currentUser.lastLoginDate) {
        currentUser.lastLoginDate = today;
    } else if (currentUser.lastLoginDate !== today) {
        const lastDate = new Date(currentUser.lastLoginDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 2) {
            currentUser.streak += 1;
        } else {
            currentUser.streak = 1;
        }
        currentUser.lastLoginDate = today;
    }
    saveCurrentUserData();
}

// INICIALIZACIÓN
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
                currentUser = {
                    email, password, name: name || 'Meyer', userId: generateUniqueUserId(),
                    xp: 0, streak: 1, lastLoginDate: new Date().toDateString(),
                    seenHistory: [], privateContacts: [], customWords: []
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
                if (!currentUser.userId) currentUser.userId = generateUniqueUserId();
                if (!currentUser.seenHistory) currentUser.seenHistory = [];
                if (!currentUser.privateContacts) currentUser.privateContacts = [];
                if (!currentUser.customWords) currentUser.customWords = [];
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
        if (!currentUser.userId) currentUser.userId = generateUniqueUserId();
        if (!currentUser.seenHistory) currentUser.seenHistory = [];
        if (!currentUser.privateContacts) currentUser.privateContacts = [];
        if (!currentUser.customWords) currentUser.customWords = [];
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
    return available;
}

// LECCIONES Y MODO BATALLA 1VS1
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
                <p class="text-xs text-rose-100 mt-1">15 Preguntas con imágenes 3D y 10s por turno. ¡Compite libremente!</p>
            </div>
            <button onclick="openWarSetup()" class="px-6 py-3.5 bg-white text-rose-600 font-black text-sm rounded-2xl shadow-lg transition">¡Lanzar Batalla! ⚔️</button>
        </div>
    `;

    html += categories.map(cat => `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
                <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-3"><i class="fa-solid ${cat.icon}"></i></div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">${cat.category}</span>
                <h3 class="font-bold text-lg text-slate-800 dark:text-white mt-1">${cat.title}</h3>
            </div>
            <button data-category="${cat.category}" class="btn-start-dynamic mt-5 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition">Iniciar Práctica</button>
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

window.openWarSetup = function() {
    const modalContainer = document.getElementById('view-lesson-modal');
    if (!modalContainer) return;
    modalContainer.classList.remove('hidden');

    const content = document.getElementById('lesson-content');
    content.innerHTML = `
        <div class="max-w-md mx-auto text-center space-y-6 w-full p-4">
            <div class="w-16 h-16 bg-rose-600/20 text-rose-500 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black">
                <i class="fa-solid fa-gamepad"></i>
            </div>
            <h3 class="text-2xl font-extrabold text-white">⚔️ Sala de Batalla 1vs1</h3>
            <p class="text-xs text-slate-300">Elige tu avatar y compite en tiempo real (15 Preguntas / 10s por turno).</p>
            
            <div class="flex justify-center gap-4 py-2">
                <label class="cursor-pointer flex flex-col items-center">
                    <input type="radio" name="battle-avatar" value="🐺 Lobo" checked class="hidden peer">
                    <div class="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-700 peer-checked:border-rose-500 flex items-center justify-center text-2xl shadow-md">🐺</div>
                    <span class="text-[10px] text-white mt-1 font-bold">Lobo</span>
                </label>
                <label class="cursor-pointer flex flex-col items-center">
                    <input type="radio" name="battle-avatar" value="🏴‍☠️ Pirata" class="hidden peer">
                    <div class="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-700 peer-checked:border-rose-500 flex items-center justify-center text-2xl shadow-md">🏴‍☠️</div>
                    <span class="text-[10px] text-white mt-1 font-bold">Pirata</span>
                </label>
                <label class="cursor-pointer flex flex-col items-center">
                    <input type="radio" name="battle-avatar" value="🐉 Dragón" class="hidden peer">
                    <div class="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-700 peer-checked:border-rose-500 flex items-center justify-center text-2xl shadow-md">🐉</div>
                    <span class="text-[10px] text-white mt-1 font-bold">Dragón</span>
                </label>
            </div>

            <button onclick="startBattleMatch()" class="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-sm rounded-xl shadow-lg transition">
                ¡Empezar Batalla 1vs1! 🚀
            </button>
        </div>
    `;
    document.getElementById('lesson-counter').innerText = 'Duelo 1vs1';
    document.getElementById('lesson-progress').style.width = '100%';
};

window.startBattleMatch = function() {
    const selectedAvatar = document.querySelector('input[name="battle-avatar"]:checked')?.value || '🐺 Lobo';
    currentUser.battleAvatar = selectedAvatar;
    saveCurrentUserData();

    currentBattle.score = 0;
    currentBattle.rivalScore = 0;
    currentBattle.questionIndex = 0;
    currentBattle.questions = [...BATTLE_QUESTIONS_BANK].sort(() => 0.5 - Math.random());

    renderBattleQuestion();
};

function renderBattleQuestion() {
    if (currentBattle.questionIndex >= 15) {
        finishBattleMatch();
        return;
    }

    const qData = currentBattle.questions[currentBattle.questionIndex];
    currentBattle.timer = 10;

    const container = document.getElementById('lesson-content');
    container.innerHTML = `
        <div class="max-w-md mx-auto space-y-4 w-full p-2">
            <div class="flex justify-between items-center text-xs text-rose-400 font-mono font-bold">
                <span>Pregunta ${currentBattle.questionIndex + 1}/15</span>
                <span id="battle-timer" class="bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">⏱️ 10s</span>
            </div>

            <div class="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-xs font-bold text-white">
                <div>Tu Avatar (${currentUser.battleAvatar || '🐺'}): <span class="text-emerald-400">${currentBattle.score} pts</span></div>
                <div>Rival: <span class="text-rose-400">${currentBattle.rivalScore} pts</span></div>
            </div>

            <div class="text-center space-y-3">
                <div class="w-full h-36 rounded-2xl overflow-hidden border border-slate-700 shadow-md">
                    <img src="${qData.img}" class="w-full h-full object-cover" alt="Referencia visual 3D">
                </div>
                <h3 class="text-lg font-black text-white">${qData.q}</h3>
            </div>

            <div class="grid grid-cols-2 gap-2">
                ${qData.options.map((opt, idx) => `
                    <button onclick="handleBattleAnswer(${idx}, ${qData.correct})" class="battle-opt py-3 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl transition text-center shadow">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('lesson-counter').innerText = `Batalla (${currentBattle.questionIndex + 1}/15)`;

    if (currentBattle.timerInterval) clearInterval(currentBattle.timerInterval);
    currentBattle.timerInterval = setInterval(() => {
        currentBattle.timer--;
        const timerEl = document.getElementById('battle-timer');
        if (timerEl) timerEl.innerText = `⏱️ ${currentBattle.timer}s`;

        if (currentBattle.timer <= 0) {
            clearInterval(currentBattle.timerInterval);
            showToast('⏰ ¡Tiempo agotado!', 'error');
            currentBattle.questionIndex++;
            renderBattleQuestion();
        }
    }, 1000);
}

window.handleBattleAnswer = function(selectedIdx, correctIdx) {
    clearInterval(currentBattle.timerInterval);
    const buttons = document.querySelectorAll('.battle-opt');

    buttons.forEach((btn, idx) => {
        btn.onclick = null;
        if (idx === correctIdx) {
            btn.classList.add('bg-emerald-600', 'border-emerald-500');
        } else if (idx === selectedIdx) {
            btn.classList.add('bg-rose-600', 'border-rose-500');
        }
    });

    if (selectedIdx === correctIdx) {
        showToast('🎉 ¡Correcto! +10 Pts', 'success');
        currentBattle.score += 10;
    } else {
        showToast('❌ Incorrecto', 'error');
    }

    if (Math.random() > 0.4) {
        currentBattle.rivalScore += 10;
    }

    setTimeout(() => {
        currentBattle.questionIndex++;
        renderBattleQuestion();
    }, 1200);
};

function finishBattleMatch() {
    if (currentBattle.timerInterval) clearInterval(currentBattle.timerInterval);
    const container = document.getElementById('lesson-content');
    const won = currentBattle.score >= currentBattle.rivalScore;

    if (won) {
        currentUser.xp = (currentUser.xp || 0) + 50;
        saveCurrentUserData();
        updateUI();
    }

    container.innerHTML = `
        <div class="max-w-md mx-auto text-center space-y-6 p-4">
            <div class="text-5xl">${won ? '🏆' : '🤝'}</div>
            <h3 class="text-2xl font-black text-white">${won ? '¡Victoria Épica!' : '¡Buen Combate!'}</h3>
            <p class="text-xs text-slate-300">Tus puntos: <b>${currentBattle.score}</b> | Puntos del Rival: <b>${currentBattle.rivalScore}</b></p>
            <button onclick="document.getElementById('view-lesson-modal').classList.add('hidden')" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition">
                Finalizar y Reclamar XP 🚀
            </button>
        </div>
    `;
}

function renderCurrentStep() {
    const step = currentLesson.items[currentStepIndex];
    const container = document.getElementById('lesson-content');
    const total = currentLesson.items.length;
    document.getElementById('lesson-counter').innerText = `${currentStepIndex + 1}/${total}`;
    document.getElementById('lesson-progress').style.width = `${((currentStepIndex + 1) / total) * 100}%`;

    if (step.type === 'card') {
        container.innerHTML = `
            <div class="perspective-1000 max-w-sm mx-auto space-y-4 w-full text-center">
                <div class="bg-indigo-600 text-white rounded-3xl p-6 shadow-2xl">
                    <h2 class="text-2xl font-extrabold mb-1">${step.en}</h2>
                    <p class="text-xs text-indigo-200 italic font-mono">[${step.phonetic}]</p>
                    <p class="text-sm font-bold text-amber-300 mt-4">${step.es}</p>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnNext = document.getElementById('btn-next-step');
    if (btnNext) {
        btnNext.onclick = () => {
            currentStepIndex++;
            if (currentStepIndex < currentLesson.items.length) {
                renderCurrentStep();
            } else {
                document.getElementById('view-lesson-modal').classList.add('hidden');
                showToast('🏆 ¡Lección completada! +20 XP', 'success');
                currentUser.xp = (currentUser.xp || 0) + 20;
                saveCurrentUserData();
                updateUI();
            }
        };
    }
});

// DICCIONARIO Y CHATS
function renderCustomWords() {
    const container = document.getElementById('custom-words-list');
    if (!container) return;
    if (!currentUser.customWords) currentUser.customWords = [];
    container.innerHTML = currentUser.customWords.length === 0 ? `<p class="text-xs text-slate-400 text-center py-4">No hay palabras guardadas.</p>` : currentUser.customWords.map((w, idx) => `<div>${w.en}</div>`).join('');
}

function renderGlobalChat() {
    const secChat = document.getElementById('sec-chat');
    if (!secChat) return;
    secChat.innerHTML = `<div class="p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-xl h-[400px] flex flex-col"><div id="chat-messages-container" class="flex-1 overflow-y-auto chat-scroll-area"></div></div>`;
}

function renderPrivateChat() {
    const secPrivate = document.getElementById('sec-private-chat');
    if (!secPrivate) return;
    secPrivate.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl grid lg:grid-cols-3 gap-4 p-4">
            <div class="border-r border-slate-200 dark:border-slate-700 pr-2 space-y-3 flex flex-col">
                <div>
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">Añadir Amigo por ID o Correo</h4>
                    <div class="space-y-2">
                        <input type="text" id="private-target-email" placeholder="ID o correo (ej. USER_123)" class="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-700 text-xs text-white outline-none">
                        <input type="text" id="private-target-name" placeholder="Nombre visible" class="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-700 text-xs text-white outline-none">
                        <button onclick="sendFriendRequest()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition">Agregar Amigo</button>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500 mt-2 mb-1">Mis Conversaciones</h4>
                    <div id="private-chats-list" class="space-y-1 friends-scroll-area"></div>
                </div>
            </div>

            <div class="lg:col-span-2 flex flex-col h-[400px] bg-white dark:bg-slate-800">
                <div id="private-messages-container" class="flex-1 p-3 overflow-y-auto space-y-2 chat-scroll-area bg-slate-900/40 rounded-xl my-2">
                    <p class="text-xs text-center text-slate-400">Selecciona un contacto para chatear.</p>
                </div>
                <form id="private-send-form" class="p-2 border-t border-slate-700 flex space-x-2 mt-auto">
                    <input type="text" id="private-input-text" placeholder="Escribe un mensaje..." required disabled class="flex-1 px-3 py-2 rounded-xl bg-slate-900 text-xs text-white outline-none disabled:opacity-50">
                    <button type="submit" id="private-send-btn" disabled class="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs disabled:opacity-50">Enviar</button>
                </form>
            </div>
        </div>
    `;
    renderSavedPrivateContactsList();
}

window.sendFriendRequest = async function() {
    const targetInput = document.getElementById('private-target-email');
    const queryText = targetInput ? targetInput.value.trim().toLowerCase() : '';
    if (!queryText) { showToast('Escribe el ID o correo.', 'info'); return; }

    if (db) {
        let userFound = false;
        let foundEmail = '';
        let foundName = 'Amigo';
        try {
            const usersRef = db.collection('users');
            let snapshot = await usersRef.where('email', '==', queryText).get();
            if (!snapshot.empty) {
                snapshot.forEach(doc => { userFound = true; foundEmail = doc.data().email; foundName = doc.data().name; });
            } else {
                snapshot = await usersRef.where('userId', '==', queryText.toUpperCase()).get();
                if (!snapshot.empty) {
                    snapshot.forEach(doc => { userFound = true; foundEmail = doc.data().email; foundName = doc.data().name; });
                }
            }
        } catch (e) { console.log(e); }

        if (!userFound) {
            showToast('❌ El código o usuario no existe.', 'error');
            return;
        }

        currentUser.privateContacts.push({ email: foundEmail, name: foundName });
        saveCurrentUserData();
        showToast(`📩 Amigo agregado: ${foundName}`);
        targetInput.value = '';
    }
};

function renderSavedPrivateContactsList() {
    const listContainer = document.getElementById('private-chats-list');
    if (!listContainer) return;
    listContainer.innerHTML = currentUser.privateContacts.length === 0 ? `<p class="text-[11px] text-slate-400 p-2">Sin amigos aún.</p>` : currentUser.privateContacts.map(c => `<div class="p-2 bg-slate-800 rounded-xl text-xs text-white">${c.name}</div>`).join('');
}

function renderLiveStream() {}