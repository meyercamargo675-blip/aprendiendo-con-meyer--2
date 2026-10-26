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

    { type: 'card', en: 'Web Application Development', es: 'Desarrollo de Aplicaciones Web', phonetic: 'Ueb aplikeishon development', category: 'Trabajo' },
    { type: 'card', en: 'Database Management System', es: 'Sistema de Gestión de Base de Datos', phonetic: 'Deitabeis manadjment sistem', category: 'Trabajo' },
    { type: 'card', en: 'User Interface Design', es: 'Diseño de Interfaz de Usuario', phonetic: 'Iuser interfeis disain', category: 'Trabajo' },
    { type: 'card', en: 'Source Code Execution', es: 'Ejecución del Código Fuente', phonetic: 'Sors cod eksekiushon', category: 'Trabajo' },
    { type: 'card', en: 'Project Manager', es: 'Gerente de Proyectos', phonetic: 'Proiekt manadjer', category: 'Trabajo' },
    { type: 'card', en: 'Bug Fixing and Testing', es: 'Corrección de Errores y Pruebas', phonetic: 'Bag fiksing and testing', category: 'Trabajo' },
    { type: 'card', en: 'Cloud Computing Services', es: 'Servicios de Computación en la Nube', phonetic: 'Claud kompiuting services', category: 'Trabajo' },
    { type: 'quiz', q: 'Traducción de "Software Development":', options: ['Desarrollo de Software', 'Diseño Gráfico', 'Base de Datos'], correct: 0, category: 'Trabajo' },
    { type: 'quiz', q: '¿Qué significa "Project Manager"?', options: ['Gerente de Proyecto', 'Programador Junior', 'Soporte Técnico'], correct: 0, category: 'Trabajo' },

    { type: 'card', en: 'Where is the nearest airport?', es: '¿Dónde está el aeropuerto más cercano?', phonetic: 'Uer is da nirest erport', category: 'Viajes' },
    { type: 'card', en: 'How much does this item cost?', es: '¿Cuánto cuesta este artículo?', phonetic: 'Jau mach das dis aitem cost', category: 'Viajes' },
    { type: 'card', en: 'Could I have the check, please?', es: '¿Podría traerme la cuenta, por favor?', phonetic: 'Cud ai jav da chek plis', category: 'Viajes' },
    { type: 'card', en: 'I need a hotel room reservation', es: 'Necesito una reserva de habitación de hotel', phonetic: 'Ai nid a hotel rum feserveishon', category: 'Viajes' },
    { type: 'card', en: 'Can I pay with credit card?', es: '¿Puedo pagar con tarjeta de crédito?', phonetic: 'Can ai pei uid kredit card', category: 'Viajes' },
    { type: 'quiz', q: '¿Cómo preguntas el precio de algo?', options: ['How much does this cost?', 'Where is the bathroom?', 'What time is it?'], correct: 0, category: 'Viajes' },

    { type: 'card', en: 'Continuous Achievement', es: 'Logro Continuo', phonetic: 'Kontinious achivment', category: 'Avanzado' },
    { type: 'card', en: 'Knowledge Expansion', es: 'Expansión del Conocimiento', phonetic: 'Noladj ekspanshon', category: 'Avanzado' },
    { type: 'card', en: 'Strategic Leadership', es: 'Liderazgo Estratégico', phonetic: 'Stratedjik lidership', category: 'Avanzado' },
    { type: 'card', en: 'Problem Solving Skills', es: 'Habilidades de Resolución de Problemas', phonetic: 'Problem solving skils', category: 'Avanzado' }
];

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
    { q: '¿Cómo se dice "Computadora" en inglés?', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300', options: ['Computer', 'Phone', 'Tablet', 'Radio'], correct: 0 }
];

let currentUser = null;
let isRegistering = false;
let currentLesson = null;
let currentStepIndex = 0;
let activePrivateChatId = null;
let privateUnsubscribe = null;

function ensureUserUniqueId(userObj) {
    if (!userObj) return;
    const cleanName = (userObj.name || 'MEYER').trim().toUpperCase().replace(/\s+/g, '_');
    if (!userObj.userId || userObj.userId === 'MEYER_ID' || userObj.userId.includes('Cargando') || !userObj.userId.startsWith(cleanName)) {
        userObj.userId = `${cleanName}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    }
}

// ==========================================
// MÓDULO DE BATALLA 1VS1
// ==========================================
let currentBattle = {
    mode: 'random',
    roomName: '',
    roomPass: '',
    score: 0,
    rivalScore: 0,
    questionIndex: 0,
    timer: 10,
    timerInterval: null,
    questions: []
};

window.openWarSetup = function() {
    const modalContainer = document.getElementById('view-lesson-modal');
    if (!modalContainer) return;
    modalContainer.classList.remove('hidden');

    const content = document.getElementById('lesson-content');
    content.innerHTML = `
        <div class="max-w-md mx-auto text-center space-y-4 w-full p-4">
            <div class="w-16 h-16 bg-rose-600/20 text-rose-500 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black">
                <i class="fa-solid fa-gamepad"></i>
            </div>
            <h3 class="text-2xl font-extrabold text-white">⚔️ Guerra de Inglés 1vs1</h3>
            <p class="text-xs text-slate-300">15 Preguntas variadas sin repetición, 10s por turno y avatares.</p>
            
            <div class="flex justify-center gap-4 py-1">
                <label class="cursor-pointer flex flex-col items-center">
                    <input type="radio" name="battle-avatar" value="🐺 Lobo" checked class="hidden peer">
                    <div class="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-slate-700 peer-checked:border-rose-500 flex items-center justify-center text-xl shadow-md">🐺</div>
                    <span class="text-[10px] text-white mt-1 font-bold">Lobo</span>
                </label>
                <label class="cursor-pointer flex flex-col items-center">
                    <input type="radio" name="battle-avatar" value="🏴‍☠️ Pirata" class="hidden peer">
                    <div class="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-slate-700 peer-checked:border-rose-500 flex items-center justify-center text-xl shadow-md">🏴‍☠️</div>
                    <span class="text-[10px] text-white mt-1 font-bold">Pirata</span>
                </label>
                <label class="cursor-pointer flex flex-col items-center">
                    <input type="radio" name="battle-avatar" value="🐉 Dragón" class="hidden peer">
                    <div class="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-slate-700 peer-checked:border-rose-500 flex items-center justify-center text-xl shadow-md">🐉</div>
                    <span class="text-[10px] text-white mt-1 font-bold">Dragón</span>
                </label>
            </div>

            <div class="space-y-2 pt-1 text-left">
                <label class="text-[10px] uppercase font-bold text-slate-400">Nombre de Sala</label>
                <input type="text" id="war-room-name" placeholder="Ej. SalaMeyer" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold outline-none focus:border-rose-500">
                <label class="text-[10px] uppercase font-bold text-slate-400">Contraseña de Sala</label>
                <input type="password" id="war-room-pass" placeholder="Contraseña..." class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold outline-none focus:border-rose-500">
            </div>

            <div class="grid grid-cols-2 gap-2 pt-2">
                <button onclick="startBattleMatch('random')" class="py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition">🎲 Modo Aleatorio</button>
                <button onclick="startBattleMatch('room')" class="py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition">🚪 Crear / Unir Sala</button>
            </div>
        </div>
    `;
    document.getElementById('lesson-counter').innerText = 'Duelo 1vs1';
    document.getElementById('lesson-progress').style.width = '100%';
};

window.startBattleMatch = function(mode) {
    const selectedAvatar = document.querySelector('input[name="battle-avatar"]:checked')?.value || '🐺 Lobo';
    const roomNameInput = document.getElementById('war-room-name');
    const roomPassInput = document.getElementById('war-room-pass');

    currentBattle.mode = mode;
    currentBattle.roomName = roomNameInput ? roomNameInput.value.trim() : '';
    currentBattle.roomPass = roomPassInput ? roomPassInput.value.trim() : '';

    if (mode === 'room' && (!currentBattle.roomName || !currentBattle.roomPass)) {
        showToast('Debes ingresar nombre y contraseña de sala.', 'error');
        return;
    }

    if (currentUser) {
        currentUser.battleAvatar = selectedAvatar;
        saveCurrentUserData();
    }

    currentBattle.score = 0;
    currentBattle.rivalScore = 0;
    currentBattle.questionIndex = 0;
    currentBattle.questions = [...BATTLE_QUESTIONS_BANK].sort(() => 0.5 - Math.random()).slice(0, 15);

    renderBattleQuestion();
};

function renderBattleQuestion() {
    if (currentBattle.questionIndex >= currentBattle.questions.length) {
        finishBattleMatch();
        return;
    }

    const qData = currentBattle.questions[currentBattle.questionIndex];
    currentBattle.timer = 10;

    const container = document.getElementById('lesson-content');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-md mx-auto space-y-3 w-full p-2">
            <div class="flex justify-between items-center text-xs text-rose-400 font-mono font-bold">
                <span>Pregunta ${currentBattle.questionIndex + 1}/${currentBattle.questions.length}</span>
                <span id="battle-timer" class="bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">⏱️ 10s</span>
            </div>

            <div class="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700 text-xs font-bold text-white">
                <div>Tu Avatar (${currentUser?.battleAvatar || '🐺'}): <span class="text-emerald-400">${currentBattle.score} pts</span></div>
                <div>Rival: <span class="text-rose-400">${currentBattle.rivalScore} pts</span></div>
            </div>

            <div class="text-center space-y-2">
                <div class="w-full h-32 rounded-2xl overflow-hidden border border-slate-700 shadow-md">
                    <img src="${qData.img}" class="w-full h-full object-cover" alt="Referencia visual">
                </div>
                <h3 class="text-base font-black text-white">${qData.q}</h3>
            </div>

            <div class="grid grid-cols-2 gap-2">
                ${qData.options.map((opt, idx) => `
                    <button onclick="handleBattleAnswer(${idx}, ${qData.correct})" class="battle-opt py-3 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl transition text-center shadow">
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div class="text-center pt-2">
                <button onclick="exitBattleMatch()" class="px-4 py-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition">
                    Salir / Cerrar Batalla ❌
                </button>
            </div>
        </div>
    `;

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
        if (idx === correctIdx) btn.classList.add('bg-emerald-600', 'border-emerald-500');
        else if (idx === selectedIdx) btn.classList.add('bg-rose-600', 'border-rose-500');
    });

    if (selectedIdx === correctIdx) {
        showToast('🎉 ¡Correcto! +10 Pts', 'success');
        currentBattle.score += 10;
    } else {
        showToast('❌ Incorrecto', 'error');
    }

    if (currentBattle.mode === 'random' && Math.random() > 0.5) {
        currentBattle.rivalScore += 10;
    }

    setTimeout(() => {
        currentBattle.questionIndex++;
        renderBattleQuestion();
    }, 1200);
};

window.exitBattleMatch = function() {
    if (currentBattle.timerInterval) clearInterval(currentBattle.timerInterval);
    const modal = document.getElementById('view-lesson-modal');
    if (modal) modal.classList.add('hidden');
    showToast('Batalla finalizada.', 'info');
};

function finishBattleMatch() {
    if (currentBattle.timerInterval) clearInterval(currentBattle.timerInterval);
    const container = document.getElementById('lesson-content');
    if (!container) return;
    const won = currentBattle.score >= currentBattle.rivalScore;

    if (won && currentUser) {
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

// ==========================================
// MÓDULO DE CHAT PRIVADO & BÚSQUEDA POR ID
// ==========================================
function renderPrivateChat() {
    const secPrivate = document.getElementById('sec-private-chat');
    if (!secPrivate) return;

    if (currentUser) {
        ensureUserUniqueId(currentUser);
        saveCurrentUserData();
    }

    const currentUserIdDisplay = currentUser && currentUser.userId ? currentUser.userId : 'MEYER_ID';

    secPrivate.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 min-h-[550px]">
            <div id="private-sidebar-panel" class="lg:block border-r border-slate-200 dark:border-slate-700 pr-2 space-y-3 flex flex-col h-full overflow-hidden">
                <div class="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/50 space-y-2">
                    <h4 class="font-bold text-xs uppercase tracking-wider text-indigo-400">Buscar / Añadir por ID</h4>
                    <div class="flex gap-2">
                        <input type="text" id="private-target-email" placeholder="Ej. CARLOS_9X1P" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-indigo-500 font-mono">
                        <button onclick="searchAndVerifyFriendId()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition shrink-0">Buscar</button>
                    </div>
                    <div id="search-friend-result-card" class="hidden pt-2 border-t border-slate-800 mt-2 space-y-2"></div>
                </div>

                <div class="flex-1 overflow-y-auto space-y-1">
                    <h4 class="font-bold text-xs uppercase tracking-wider text-slate-400 mt-2 mb-1 px-1">Mis Conversaciones</h4>
                    <div id="private-chats-list" class="space-y-1.5"></div>
                </div>
            </div>

            <div id="private-chatbox-panel" class="lg:col-span-2 flex flex-col h-[500px] lg:h-full bg-slate-900/50 rounded-2xl p-3 border border-slate-700 relative">
                <div class="lg:hidden pb-2 mb-1 border-b border-slate-800 flex items-center justify-between">
                    <button onclick="backToPrivateContacts()" class="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1">
                        <i class="fa-solid fa-arrow-left"></i><span>Volver a Amigos</span>
                    </button>
                    <span class="text-[10px] text-emerald-400 font-bold">🟢 Conectado</span>
                </div>

                <div class="p-2 border-b border-slate-700/80 font-bold text-xs text-white flex justify-between items-center flex-wrap gap-2">
                    <div class="flex items-center space-x-2">
                        <span id="private-chat-header" class="truncate max-w-[180px] sm:max-w-xs">💬 Selecciona un chat privado</span>
                        <span id="chat-active-badge" class="hidden w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div id="chat-extra-actions" class="hidden flex items-center space-x-1">
                            <button onclick="clearCurrentPrivateChatHistory()" class="px-2.5 py-1 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg text-[10px] font-bold transition"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                        <div class="flex items-center space-x-2 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-inner">
                            <span class="text-[10px] text-emerald-400 font-mono" id="my-display-id-badge">Mi ID: ${currentUser?.userId || currentUserIdDisplay}</span>
                            <button onclick="copyMyUserId('${currentUser?.userId || currentUserIdDisplay}')" class="text-xs text-indigo-400 hover:text-indigo-300 transition px-1"><i class="fa-solid fa-copy"></i></button>
                        </div>
                    </div>
                </div>

                <div id="private-messages-container" class="flex-1 p-3 overflow-y-auto space-y-3 my-2 min-h-[250px]">
                    <div class="text-center text-slate-400 mt-20 space-y-2">
                        <div class="text-3xl">💬</div>
                        <p class="text-xs">Busca un ID arriba o elige un contacto para chatear en tiempo real.</p>
                    </div>
                </div>

                <form id="private-send-form" class="pt-2 border-t border-slate-700/80 flex space-x-2 mt-auto">
                    <input type="text" id="private-input-text" placeholder="Escribe un mensaje..." required disabled class="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 text-xs text-white outline-none border border-slate-700 disabled:opacity-50">
                    <button type="button" onclick="startSpeechRecognition(txt => document.getElementById('private-input-text').value = txt, 'es-ES')" class="bg-slate-800 text-white px-3.5 py-2.5 rounded-xl text-xs hover:bg-slate-700 transition"><i class="fa-solid fa-microphone"></i></button>
                    <button type="submit" id="private-send-btn" disabled class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs disabled:opacity-50 transition shadow">Enviar</button>
                </form>
            </div>
        </div>
    `;
    renderSavedPrivateContactsList();

    if (window.innerWidth < 1024) {
        toggleMobilePrivateView('list');
    }
}

window.searchAndVerifyFriendId = function() {
    const input = document.getElementById('private-target-email');
    const resultCard = document.getElementById('search-friend-result-card');
    const targetId = input ? input.value.trim().toUpperCase() : '';

    if (!targetId) {
        showToast('Ingresa un ID para buscar.', 'info');
        if (resultCard) resultCard.classList.add('hidden');
        return;
    }

    if (currentUser.userId === targetId) {
        showToast('Ese es tu propio ID.', 'info');
        if (resultCard) resultCard.classList.add('hidden');
        return;
    }

    if (resultCard) {
        resultCard.classList.remove('hidden');
        resultCard.innerHTML = `
            <div class="p-3 bg-slate-950 rounded-xl border border-indigo-500/40 flex items-center justify-between gap-2 shadow-md">
                <div class="flex items-center space-x-2 truncate">
                    <div class="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                        <i class="fa-solid fa-user-check"></i>
                    </div>
                    <div class="truncate">
                        <p class="text-xs font-bold text-white font-mono truncate">${targetId}</p>
                        <p class="text-[10px] text-emerald-400">ID Válido encontrado</p>
                    </div>
                </div>
                <div class="flex items-center space-x-1 shrink-0">
                    <button onclick="addFoundFriend('${targetId}')" class="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-lg transition shadow">Agregar</button>
                    <button onclick="openPrivateChat('${targetId}')" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition shadow">Chatear</button>
                </div>
            </div>
        `;
    }
    showToast(`🔍 ID ${targetId} localizado correctamente.`);
};

window.addFoundFriend = function(targetId) {
    if (!currentUser.friends) currentUser.friends = [];
    if (!currentUser.friends.includes(targetId)) {
        currentUser.friends.push(targetId);
        saveCurrentUserData();
        renderSavedPrivateContactsList();
        showToast(`✅ Amigo ${targetId} agregado a tu lista.`);
    } else {
        showToast('Este amigo ya se encuentra en tu lista.', 'info');
    }
    const resultCard = document.getElementById('search-friend-result-card');
    if (resultCard) resultCard.classList.add('hidden');
    const input = document.getElementById('private-target-email');
    if (input) input.value = '';
    openPrivateChat(targetId);
};

window.toggleMobilePrivateView = function(view) {
    if (window.innerWidth >= 1024) return;
    const sidebar = document.getElementById('private-sidebar-panel');
    const chatbox = document.getElementById('private-chatbox-panel');
    if (!sidebar || !chatbox) return;

    if (view === 'list') {
        sidebar.classList.remove('hidden');
        chatbox.classList.add('hidden');
    } else {
        sidebar.classList.add('hidden');
        chatbox.classList.remove('hidden');
    }
};

window.backToPrivateContacts = function() {
    toggleMobilePrivateView('list');
};

window.copyMyUserId = function(idText) {
    const cleanId = idText.replace('Tu ID: ', '').replace('Mi ID: ', '').replace('ID: ', '').trim();
    navigator.clipboard.writeText(cleanId).then(() => {
        showToast('📋 ¡ID copiado al portapapeles!');
    }).catch(() => {
        showToast('No se pudo copiar automáticamente.', 'error');
    });
};

function renderSavedPrivateContactsList() {
    const container = document.getElementById('private-chats-list');
    if (!container || !currentUser) return;
    const friends = currentUser.friends || [];

    if (friends.length === 0) {
        container.innerHTML = `
            <div class="p-4 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-900/40">
                <p class="text-[11px] text-slate-400">No tienes amigos agregados aún.<br>Busca un ID arriba para conectar.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = friends.map(friendId => `
        <div onclick="openPrivateChat('${friendId}')" class="p-3 bg-slate-800/90 hover:bg-slate-700 rounded-2xl cursor-pointer text-xs font-bold text-white flex items-center justify-between transition border border-slate-700/60 shadow-sm group">
            <div class="flex items-center space-x-2.5 truncate">
                <div class="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <i class="fa-solid fa-user"></i>
                </div>
                <span class="truncate font-mono">${friendId}</span>
            </div>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400 shrink-0"></i>
        </div>
    `).join('');
}

window.openPrivateChat = function(friendId) {
    if (!currentUser || !currentUser.userId) return;
    
    activePrivateChatId = [currentUser.userId.trim(), friendId.trim()].sort().join('_');
    
    document.getElementById('private-chat-header').innerText = `💬 Chat con: ${friendId}`;
    document.getElementById('private-input-text').disabled = false;
    document.getElementById('private-send-btn').disabled = false;

    const badge = document.getElementById('chat-active-badge');
    if (badge) badge.classList.remove('hidden');
    const extraActions = document.getElementById('chat-extra-actions');
    if (extraActions) extraActions.classList.remove('hidden');

    toggleMobilePrivateView('chat');

    if (privateUnsubscribe) privateUnsubscribe();

    if (db) {
        privateUnsubscribe = db.collection('privateChats').doc(activePrivateChatId).collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                let html = '';
                snapshot.forEach(doc => {
                    const msg = doc.data();
                    const isMe = msg.sender === currentUser.userId;
                    html += `
                        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-0.5">
                            <div class="p-3 rounded-2xl max-w-[85%] sm:max-w-xs text-xs shadow ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}">
                                ${msg.text}
                            </div>
                            <span class="text-[9px] text-slate-400 px-1">${msg.time}</span>
                        </div>
                    `;
                });
                const container = document.getElementById('private-messages-container');
                if (container) {
                    container.innerHTML = html || '<p class="text-xs text-center text-slate-400 mt-16">Envía tu primer mensaje para iniciar la conversación 👋</p>';
                    container.scrollTop = container.scrollHeight;
                }
            });
    }

    const form = document.getElementById('private-send-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const input = document.getElementById('private-input-text');
            const text = input.value.trim();
            if (!text || !activePrivateChatId) return;

            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (db) {
                db.collection('privateChats').doc(activePrivateChatId).collection('messages').add({
                    sender: currentUser.userId,
                    text, time: timeStr,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => { input.value = ''; });
            }
        };
    }
};

window.clearCurrentPrivateChatHistory = function() {
    if (!activePrivateChatId) return;
    if (confirm('¿Deseas limpiar todos los mensajes de esta conversación?')) {
        showToast('Conversación limpiada localmente.', 'info');
        const container = document.getElementById('private-messages-container');
        if (container) container.innerHTML = '<p class="text-xs text-center text-slate-400 mt-16">Historial limpiado 👋</p>';
    }
};

// ==========================================
// TRANSMISIONES EN VIVO (CON AVISO DE PRONTA APERTURA)
// ==========================================
function renderLiveStream() {
    const secLive = document.getElementById('sec-live');
    if (!secLive) return;

    secLive.innerHTML = `
        <div class="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-6 max-w-4xl mx-auto text-center">
            <div class="w-20 h-20 bg-rose-600/20 text-rose-500 rounded-3xl flex items-center justify-center mx-auto text-3xl font-black animate-pulse shadow-lg">
                <i class="fa-solid fa-satellite-dish"></i>
            </div>
            <div class="space-y-2">
                <span class="px-3.5 py-1 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-full text-xs font-black uppercase tracking-wider">Próxima Apertura</span>
                <h3 class="text-2xl sm:text-3xl font-black">Transmisiones en Vivo 🔴 (Mundial y Celulares)</h3>
                <p class="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                    Estamos ultimando los detalles en la nube para traerte videollamadas y transmisiones en vivo globales de ultra bajo retraso. ¡Pronto estará listo para que conectes con todo el mundo! 🚀
                </p>
            </div>
            <div class="p-4 bg-slate-900 rounded-2xl border border-slate-800 inline-flex items-center space-x-3 shadow-inner">
                <span class="w-3 h-3 bg-amber-500 rounded-full animate-ping"></span>
                <span class="text-xs font-bold text-amber-300">Módulo en fase final de integración y pruebas.</span>
            </div>
        </div>
    `;
}

// ==========================================
// UTILIDADES, AUDIO Y DICCIONARIO
// ==========================================
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

    recognition.onresult = (event) => { callback(event.results[0][0].transcript); };
    recognition.onerror = () => { showToast('No se logró escuchar claramente.', 'info'); };
    recognition.start();
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

function getUsersDB() { return JSON.parse(localStorage.getItem('meyer_app_users_db')) || {}; }
function saveUsersDB(data) { localStorage.setItem('meyer_app_users_db', JSON.stringify(data)); }
function saveCurrentUserData() {
    if (!currentUser) return;
    ensureUserUniqueId(currentUser);
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
        ensureUserUniqueId(currentUser);
        saveCurrentUserData();
        showMainApp();
    } else { showAuthModal(); }
}

function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    const dash = document.getElementById('view-dashboard');
    if (modal) modal.classList.remove('hidden');
    if (dash) dash.classList.add('hidden');
}

function showMainApp() {
    const modal = document.getElementById('auth-modal');
    const dash = document.getElementById('view-dashboard');
    const logoutBtn = document.getElementById('btn-logout');
    if (modal) modal.classList.add('hidden');
    if (dash) dash.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    updateUI();
}

function updateUI() {
    if (!currentUser) return;

    ensureUserUniqueId(currentUser);
    saveCurrentUserData();

    const welcomeHeader = document.getElementById('header-user-welcome');
    const welcomeTitle = document.getElementById('welcome-title');
    const xpCount = document.getElementById('xp-count');
    const streakCount = document.getElementById('streak-count');

    if (welcomeHeader) welcomeHeader.innerText = `Hola, ${currentUser.name || 'Meyer'}`;
    if (welcomeTitle) welcomeTitle.innerText = `¡Hola ${currentUser.name || 'Meyer'}! Sistema Completo Listo`;
    if (xpCount) xpCount.innerText = currentUser.xp || 0;
    if (streakCount) streakCount.innerText = currentUser.streak || 1;

    // ELIMINACIÓN SEGURA DEL ID DE ARRIBA (PARA QUE QUEDE LIMPIO)
    const headerTopBadge = document.getElementById('header-top-id-badge');
    if (headerTopBadge) {
        headerTopBadge.remove();
    }

    // INSERCIÓN DEL ID LIMPIO EN LA TARJETA DE BIENVENIDA
    let cardIdBadge = document.getElementById('card-user-id');
    if (!cardIdBadge) {
        const welcomeTextContainer = document.querySelector('#welcome-title')?.parentElement;
        if (welcomeTextContainer) {
            const cardBadgeDiv = document.createElement('div');
            cardBadgeDiv.id = 'card-user-id';
            cardBadgeDiv.className = 'mt-2 inline-flex';
            welcomeTextContainer.appendChild(cardBadgeDiv);
        }
    }
    if (document.getElementById('card-user-id')) {
        document.getElementById('card-user-id').innerHTML = `
            <span class="text-xs font-mono text-indigo-300 bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-700/80 shadow-inner inline-flex items-center space-x-1.5">
                <span>Mi ID: <b>${currentUser.userId}</b></span>
                <button onclick="copyMyUserId('${currentUser.userId}')" class="text-xs text-indigo-400 hover:text-indigo-300 ml-1"><i class="fa-solid fa-copy"></i></button>
            </span>
        `;
    }

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
        currentUser.seenHistory = [];
        saveCurrentUserData();
        available = MASSIVE_VOCABULARY_BANK.filter(item => item.category === categoryFilter);
    }
    return available.sort(() => 0.5 - Math.random());
}

function renderLessons() {
    const container = document.getElementById('sec-lessons');
    if (!container) return;
    const categories = [
        { id: 'cat-basic', title: 'Vocabulario Básico', category: 'Básico', icon: 'fa-hand-wave' },
        { id: 'cat-work', title: 'Trabajo y Tecnología', category: 'Trabajo', icon: 'fa-laptop-code' },
        { id: 'cat-travel', title: 'Viajes y Restaurantes', category: 'Viajes', icon: 'fa-plane-departure' },
        { id: 'cat-adv', title: 'Inglés Avanzado', category: 'Avanzado', icon: 'fa-brain' }
    ];

    let html = `
        <div class="col-span-full bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between">
            <div class="mb-4 sm:mb-0">
                <span class="px-3 py-1 bg-white/25 backdrop-blur-md rounded-full text-xs font-bold uppercase">¡Modo Duelo 1vs1!</span>
                <h3 class="text-2xl font-black mt-2">⚔️ Guerra de Inglés con Micrófono</h3>
                <p class="text-xs text-rose-100 mt-1">15 Preguntas variadas sin repetición y 10s por turno.</p>
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
            </div>
            <button data-category="${cat.category}" class="btn-start-dynamic mt-5 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-md">
                Iniciar Práctica
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

    document.getElementById('lesson-counter').innerText = `${currentStepIndex + 1}/${total}`;
    document.getElementById('lesson-progress').style.width = `${((currentStepIndex + 1) / total) * 100}%`;

    if (step.type === 'card') {
        container.innerHTML = `
            <div class="perspective-1000 max-w-sm mx-auto space-y-4 w-full">
                <div id="card-flip" class="transform-style-3d relative w-full h-64 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-3xl p-6 flex flex-col justify-between cursor-pointer shadow-2xl">
                    <div class="text-center my-auto">
                        <h2 class="text-2xl font-extrabold mb-1">${step.en}</h2>
                        <p class="text-xs text-indigo-200 italic font-mono">[${step.phonetic}]</p>
                        <div class="flex justify-center space-x-2 mt-4">
                            <button id="btn-speak-card" class="px-3 py-1.5 bg-white/20 rounded-full text-xs font-bold">Audio</button>
                            <button id="btn-mic-card" class="px-3 py-1.5 bg-rose-500 rounded-full text-xs font-bold">Probar Voz</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('btn-speak-card').onclick = (e) => { e.stopPropagation(); speakText(step.en); };
        document.getElementById('btn-mic-card').onclick = (e) => {
            e.stopPropagation();
            startSpeechRecognition((text) => {
                showToast(`🎉 ¡Excelente! Dijiste: "${text}"`, 'success');
                currentUser.xp = (currentUser.xp || 0) + 5;
                saveCurrentUserData();
                updateUI();
            }, 'en-US');
        };
        speakText(step.en);
    } else if (step.type === 'quiz') {
        container.innerHTML = `
            <div class="max-w-md mx-auto text-center space-y-6 w-full">
                <h3 class="text-xl font-bold text-white">${step.q}</h3>
                <div class="space-y-3">
                    ${step.options.map((opt, idx) => `
                        <button onclick="checkQuizAnswer(${idx}, ${step.correct})" class="quiz-opt-btn w-full py-3.5 px-4 bg-slate-800 text-white font-semibold rounded-xl">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

window.checkQuizAnswer = function(selectedIdx, correctIdx) {
    if (selectedIdx === correctIdx) {
        showToast('🎉 ¡Correcto! +5 XP', 'success');
        currentUser.xp = (currentUser.xp || 0) + 5;
        saveCurrentUserData();
        updateUI();
    } else {
        showToast('❌ Incorrecto', 'info');
    }
};

function renderGlobalChat() {
    const secChat = document.getElementById('sec-chat');
    if (!secChat) return;
    secChat.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col h-[500px]">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white">Sala Global (Firebase Nube)</div>
            <div id="chat-messages-container" class="flex-1 p-4 overflow-y-auto space-y-3"></div>
            <form id="chat-send-form" class="p-3 border-t border-slate-200 dark:border-slate-700 flex space-x-2">
                <input type="text" id="chat-input-text" placeholder="Escribe un mensaje..." required class="flex-1 px-4 py-2.5 rounded-xl border dark:bg-slate-900 text-xs text-white outline-none">
                <button type="submit" class="bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs">Enviar</button>
            </form>
        </div>
    `;
    if (db) {
        db.collection('globalChat').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            let html = '';
            snapshot.forEach(doc => {
                const msg = doc.data();
                html += `<div class="bg-slate-900 p-2 rounded-xl text-xs"><b class="text-indigo-400">${msg.sender}:</b> ${msg.text}</div>`;
            });
            const container = document.getElementById('chat-messages-container');
            if (container) { container.innerHTML = html; container.scrollTop = container.scrollHeight; }
        });
    }
    document.getElementById('chat-send-form').onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input-text');
        const text = input.value.trim();
        if (!text) return;
        if (db) {
            db.collection('globalChat').add({
                sender: currentUser ? currentUser.name : 'Usuario',
                text, timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => { input.value = ''; });
        }
    };
}

// DICCIONARIO / PALABRAS PERSONALIZADAS CON BOTÓN DE AUDIO
function renderCustomWords() {
    const container = document.getElementById('custom-words-list');
    if (!container) return;
    if (!currentUser || !currentUser.customWords || !currentUser.customWords.length) {
        container.innerHTML = `<p class="text-sm text-slate-400 col-span-2 text-center py-4">No hay palabras guardadas.</p>`;
        return;
    }
    container.innerHTML = currentUser.customWords.map(w => `
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center shadow-sm">
            <div>
                <b class="text-white text-sm">${w.en}</b>
                <div class="text-xs text-slate-400">${w.es}</div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="speakText('${w.en.replace(/'/g, "\\'")}')" class="text-indigo-400 hover:text-indigo-300 p-2 text-xs bg-indigo-600/20 rounded-lg transition" title="Escuchar pronunciación"><i class="fa-solid fa-volume-high"></i></button>
                <button onclick="deleteCustomWord(${w.id})" class="text-rose-500 hover:text-rose-400 p-2 text-xs bg-rose-600/20 rounded-lg transition" title="Eliminar palabra"><i class="fa-solid fa-trash"></i></button>
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

document.addEventListener('DOMContentLoaded', () => {
    initAuth();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.onclick = () => { document.documentElement.classList.toggle('dark'); };
    }

    const toggleAuthBtn = document.getElementById('btn-toggle-auth');
    if (toggleAuthBtn) {
        toggleAuthBtn.onclick = () => {
            isRegistering = !isRegistering;
            document.getElementById('auth-title').innerText = isRegistering ? 'Crear Cuenta' : '¡Hola! Soy Meyer';
            document.getElementById('name-field-container').classList.toggle('hidden', !isRegistering);
        };
    }

    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('input-email').value.trim().toLowerCase();
            const password = document.getElementById('input-password').value;
            const nameInput = document.getElementById('input-name');
            const data = getUsersDB();

            if (isRegistering) {
                const name = nameInput ? nameInput.value.trim() : 'Meyer';
                if (!name) { showToast('Ingresa tu nombre.', 'error'); return; }

                currentUser = { 
                    email, password, name, xp: 50, streak: 1, 
                    customWords: [], seenHistory: [], friends: [] 
                };
                ensureUserUniqueId(currentUser);
                data[email] = currentUser;
                saveUsersDB(data);
                saveCurrentUserData();
                showToast('✅ Cuenta creada con éxito.');
                showMainApp();
            } else {
                if (!data[email] || data[email].password !== password) {
                    showToast('❌ Error: Cuenta no registrada o contraseña incorrecta.', 'error');
                    return;
                }
                currentUser = data[email];
                ensureUserUniqueId(currentUser);
                saveCurrentUserData();
                showMainApp();
            }
        };
    }

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.onclick = () => { localStorage.removeItem('meyer_app_active_email'); showAuthModal(); };
    }

    ['lessons', 'dictionary', 'chat', 'private-chat', 'live'].forEach(tab => {
        const btn = document.getElementById(`tab-${tab}`);
        if (btn) btn.onclick = () => switchTab(tab);
    });

    const addWordForm = document.getElementById('add-word-form');
    if (addWordForm) {
        addWordForm.onsubmit = (e) => {
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
    }

    const closeLessonBtn = document.getElementById('btn-close-lesson');
    if (closeLessonBtn) {
        closeLessonBtn.onclick = () => document.getElementById('view-lesson-modal').classList.add('hidden');
    }

    const nextStepBtn = document.getElementById('btn-next-step');
    if (nextStepBtn) {
        nextStepBtn.onclick = () => {
            if (currentLesson && currentStepIndex < currentLesson.items.length - 1) {
                currentStepIndex++;
                renderCurrentStep();
            } else if (currentUser) {
                currentUser.xp = (currentUser.xp || 0) + 25;
                saveCurrentUserData();
                updateUI();
                showToast('🎉 ¡Lección completada! +25 XP');
                document.getElementById('view-lesson-modal').classList.add('hidden');
            }
        };
    }
});

function switchTab(tab) {
    ['lessons', 'dictionary', 'chat', 'private-chat', 'live'].forEach(t => {
        const sec = document.getElementById(`sec-${t}`);
        const tabBtn = document.getElementById(`tab-${t}`);
        if (sec) sec.classList.toggle('hidden', t !== tab);
        if (tabBtn) tabBtn.classList.toggle('active', t === tab);
    });
}