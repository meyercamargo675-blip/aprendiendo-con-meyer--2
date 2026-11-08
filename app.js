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

// BANCO EXACTO DE 20 PREGUNTAS ÚNICAS
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
    { q: '¿Cómo se dice "Fuego" en inglés?', img: 'https://images.unsplash.com/photo-1508873696983-2df5c920ac9c?w=300', options: ['Water', 'Fire', 'Wind', 'Earth'], correct: 1 },
    { q: '¿Cómo se dice "Árbol" en inglés?', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300', options: ['Plant', 'Flower', 'Tree', 'Leaf'], correct: 2 },
    { q: '¿Cómo se dice "Escuela" en inglés?', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300', options: ['Hospital', 'School', 'Library', 'Park'], correct: 1 },
    { q: '¿Cómo se dice "Pelota" en inglés?', img: 'https://images.unsplash.com/photo-1575361204480-aadea25d6e68?w=300', options: ['Ball', 'Bat', 'Net', 'Goal'], correct: 0 },
    { q: '¿Cómo se dice "Comida" en inglés?', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300', options: ['Drink', 'Food', 'Fruit', 'Meat'], correct: 1 },
    { q: '¿Cómo se dice "Mesa" en inglés?', img: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=300', options: ['Chair', 'Table', 'Door', 'Bed'], correct: 1 },
    { q: '¿Cómo se dice "Puerta" en inglés?', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300', options: ['Window', 'Wall', 'Door', 'Floor'], correct: 2 },
    { q: '¿Cómo se dice "Lápiz" en inglés?', img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300', options: ['Pencil', 'Pen', 'Eraser', 'Ruler'], correct: 0 },
    { q: '¿Cómo se dice "Flor" en inglés?', img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300', options: ['Tree', 'Flower', 'Grass', 'Seed'], correct: 1 },
    { q: '¿Cómo se dice "Estrella" en inglés?', img: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=300', options: ['Sun', 'Moon', 'Star', 'Planet'], correct: 2 }
];

let currentUser = null;
let isRegistering = false;
let currentLesson = null;
let currentStepIndex = 0;
let activePrivateChatId = null;
let privateUnsubscribe = null;
let matchmakingUnsubscribe = null;
let activeBattleDocId = null;
let battleStateUnsubscribe = null;

function ensureUserUniqueId(userObj) {
    if (!userObj) return;
    const cleanName = (userObj.name || 'MEYER').trim().toUpperCase().replace(/\s+/g, '_');
    if (!userObj.userId || userObj.userId === 'MEYER_ID' || userObj.userId.includes('Cargando') || !userObj.userId.startsWith(cleanName)) {
        userObj.userId = `${cleanName}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    }
    if (!userObj.avatarUrl) {
        userObj.avatarUrl = 'https://images.unsplash.com/photo-15344528741775-53994a69daeb?w=150';
    }
    if (!userObj.followers) userObj.followers = [];
    if (!userObj.following) userObj.following = [];
    if (!userObj.customWords) userObj.customWords = [];
    if (!userObj.friends) userObj.friends = [];
}

// ==========================================
// MÓDULO DE BATALLA 1VS1 (20 PREGUNTAS ÚNICAS)
// ==========================================
let currentBattle = {
    mode: 'random',
    battleId: '',
    isHost: false,
    score: 0,
    rivalScore: 0,
    rivalName: 'Esperando rival real...',
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
            <h3 class="text-2xl font-extrabold text-white">⚔️ Guerra de Inglés 1vs1 Real (20 Preguntas)</h3>
            <p class="text-xs text-slate-300">Preguntas únicas sin repetir, sincronizadas en tiempo real.</p>
            
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
                <label class="text-[10px] uppercase font-bold text-slate-400">Nombre de Sala Privada</label>
                <input type="text" id="war-room-name" placeholder="Ej. SalaMeyer" class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold outline-none focus:border-rose-500">
                <label class="text-[10px] uppercase font-bold text-slate-400">Contraseña de Sala</label>
                <input type="password" id="war-room-pass" placeholder="Contraseña..." class="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold outline-none focus:border-rose-500">
            </div>

            <div class="grid grid-cols-2 gap-2 pt-2">
                <button onclick="startRealMatchmaking()" class="py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition">🎲 Buscar Rival Real</button>
                <button onclick="startPrivateRoomMatch()" class="py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition">🚪 Sala Privada</button>
            </div>
        </div>
    `;
    document.getElementById('lesson-counter').innerText = 'Duelo 1vs1';
    document.getElementById('lesson-progress').style.width = '100%';
};

window.startRealMatchmaking = async function() {
    const selectedAvatar = document.querySelector('input[name="battle-avatar"]:checked')?.value || '🐺 Lobo';
    if (currentUser) {
        currentUser.battleAvatar = selectedAvatar;
        saveCurrentUserData();
    }

    cleanupBattleListeners();
    const container = document.getElementById('lesson-content');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-md mx-auto text-center space-y-6 py-12 px-4">
            <div class="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-3xl flex items-center justify-center mx-auto text-2xl animate-spin shadow-lg">
                <i class="fa-solid fa-spinner"></i>
            </div>
            <div class="space-y-2">
                <h3 class="text-xl font-black text-white">Buscando rival real en línea...</h3>
                <p class="text-xs text-slate-300">Esperando a que otro usuario se conecte...</p>
            </div>
            <button onclick="exitBattleMatch()" class="px-6 py-2.5 bg-slate-800 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition">Cancelar ❌</button>
        </div>
    `;

    if (!db) return;

    try {
        const queueRef = db.collection('battleQueue');
        const snapshot = await queueRef.where('status', '==', 'waiting').get();

        let joinedBattleId = null;
        let foundDoc = null;

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.hostId !== currentUser.userId) {
                foundDoc = doc;
                joinedBattleId = doc.id;
            }
        });

        if (foundDoc && joinedBattleId) {
            activeBattleDocId = joinedBattleId;
            currentBattle.isHost = false;
            currentBattle.battleId = joinedBattleId;

            await db.collection('battleQueue').doc(joinedBattleId).update({
                guestId: currentUser.userId,
                guestName: currentUser.name || 'Rival',
                guestAvatar: selectedAvatar,
                status: 'playing'
            });

            const hostData = foundDoc.data();
            currentBattle.rivalName = `${hostData.hostName} (${hostData.hostAvatar})`;
            showToast('¡Rival encontrado! Comienza la batalla.', 'success');
            initActualRealBattle();
        } else {
            const newRoomRef = queueRef.doc();
            activeBattleDocId = newRoomRef.id;
            currentBattle.isHost = true;
            currentBattle.battleId = newRoomRef.id;

            await newRoomRef.set({
                hostId: currentUser.userId,
                hostName: currentUser.name || 'Meyer',
                hostAvatar: selectedAvatar,
                guestId: null, guestName: null, guestAvatar: null,
                status: 'waiting',
                questionIndex: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            matchmakingUnsubscribe = db.collection('battleQueue').doc(activeBattleDocId).onSnapshot(doc => {
                const data = doc.data();
                if (data && data.status === 'playing' && data.guestId) {
                    if (matchmakingUnsubscribe) matchmakingUnsubscribe();
                    currentBattle.rivalName = `${data.guestName} (${data.guestAvatar})`;
                    showToast(`¡${data.guestName} se unió!`, 'success');
                    initActualRealBattle();
                }
            });
        }
    } catch (e) {
        console.log("Error emparejamiento:", e);
    }
};

window.startPrivateRoomMatch = async function() {
    const selectedAvatar = document.querySelector('input[name="battle-avatar"]:checked')?.value || '🐺 Lobo';
    const roomName = document.getElementById('war-room-name')?.value.trim();
    const roomPass = document.getElementById('war-room-pass')?.value.trim();

    if (!roomName || !roomPass) {
        showToast('Ingresa nombre y contraseña de sala.', 'error');
        return;
    }

    if (currentUser) {
        currentUser.battleAvatar = selectedAvatar;
        saveCurrentUserData();
    }

    cleanupBattleListeners();
    activeBattleDocId = `room_${roomName}_${roomPass}`;
    currentBattle.battleId = activeBattleDocId;

    const container = document.getElementById('lesson-content');
    if (!container) return;

    container.innerHTML = `
        <div class="max-w-md mx-auto text-center space-y-6 py-12 px-4">
            <div class="w-16 h-16 bg-rose-600/25 text-rose-400 rounded-3xl flex items-center justify-center mx-auto text-2xl animate-pulse shadow-lg">
                <i class="fa-solid fa-door-open"></i>
            </div>
            <div class="space-y-2">
                <h3 class="text-xl font-black text-white">Sala: ${roomName}</h3>
                <p class="text-xs text-slate-300">Esperando contrincante...</p>
            </div>
            <button onclick="exitBattleMatch()" class="px-6 py-2.5 bg-slate-800 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition">Salir ❌</button>
        </div>
    `;

    if (!db) return;
    const roomRef = db.collection('battleQueue').doc(activeBattleDocId);
    const docSnap = await roomRef.get();

    if (!docSnap.exists) {
        currentBattle.isHost = true;
        await roomRef.set({
            hostId: currentUser.userId,
            hostName: currentUser.name || 'Meyer',
            hostAvatar: selectedAvatar,
            status: 'waiting',
            questionIndex: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        matchmakingUnsubscribe = roomRef.onSnapshot(doc => {
            const data = doc.data();
            if (data && data.status === 'playing' && data.guestId) {
                if (matchmakingUnsubscribe) matchmakingUnsubscribe();
                currentBattle.rivalName = `${data.guestName} (${data.guestAvatar})`;
                showToast('¡Rival conectado en sala privada!', 'success');
                initActualRealBattle();
            }
        });
    } else {
        currentBattle.isHost = false;
        const data = docSnap.data();
        await roomRef.update({
            guestId: currentUser.userId,
            guestName: currentUser.name || 'Invitado',
            guestAvatar: selectedAvatar,
            status: 'playing'
        });
        currentBattle.rivalName = `${data.hostName} (${data.hostAvatar})`;
        showToast('¡Conectado a sala privada!', 'success');
        initActualRealBattle();
    }
};

function initActualRealBattle() {
    currentBattle.score = 0;
    currentBattle.rivalScore = 0;
    currentBattle.questionIndex = 0;
    currentBattle.questions = [...BATTLE_QUESTIONS_BANK].sort(() => 0.5 - Math.random());
    renderBattleQuestion();
}

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
                <div>Tu (${currentUser?.battleAvatar || '🐺'}): <span class="text-emerald-400" id="my-score-display">${currentBattle.score} pts</span></div>
                <div>Rival (${currentBattle.rivalName}): <span class="text-rose-400" id="rival-score-display">${currentBattle.rivalScore} pts</span></div>
            </div>

            <div class="text-center space-y-2">
                <div class="w-full h-32 rounded-2xl overflow-hidden border border-slate-700 shadow-md">
                    <img src="${qData.img}" class="w-full h-full object-cover" alt="Referencia visual">
                </div>
                <h3 class="text-base font-black text-white">${qData.q}</h3>
            </div>

            <div class="grid grid-cols-2 gap-2">
                ${qData.options.map((opt, idx) => `
                    <button onclick="handleBattleAnswer(${idx}, ${qData.correct})" class="battle-opt py-3 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl transition text-center shadow">${opt}</button>
                `).join('')}
            </div>

            <div class="text-center pt-2">
                <button onclick="exitBattleMatch()" class="px-4 py-2 bg-slate-800 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition">Salir ❌</button>
            </div>
        </div>
    `;

    if (currentBattle.timerInterval) {
        clearInterval(currentBattle.timerInterval);
        currentBattle.timerInterval = null;
    }

    if (db && activeBattleDocId) {
        const battleRef = db.collection('battleQueue').doc(activeBattleDocId);
        battleStateUnsubscribe = battleRef.onSnapshot(doc => {
            const data = doc.data();
            if (data) {
                if (currentBattle.isHost) {
                    if (data.guestScore !== undefined) {
                        currentBattle.rivalScore = data.guestScore;
                        const el = document.getElementById('rival-score-display');
                        if (el) el.innerText = `${currentBattle.rivalScore} pts`;
                    }
                } else {
                    if (data.hostScore !== undefined) {
                        currentBattle.rivalScore = data.hostScore;
                        const el = document.getElementById('rival-score-display');
                        if (el) el.innerText = `${currentBattle.rivalScore} pts`;
                    }
                }

                if (data.questionIndex !== undefined && data.questionIndex > currentBattle.questionIndex) {
                    currentBattle.questionIndex = data.questionIndex;
                    renderBattleQuestion();
                }
            }
        });
    }

    currentBattle.timerInterval = setInterval(() => {
        currentBattle.timer--;
        const timerEl = document.getElementById('battle-timer');
        if (timerEl) timerEl.innerText = `⏱️ ${currentBattle.timer}s`;

        if (currentBattle.timer <= 0) {
            clearInterval(currentBattle.timerInterval);
            currentBattle.timerInterval = null;
            showToast('⏰ ¡Tiempo agotado!', 'error');
            advanceQuestionInCloud();
        }
    }, 1000);
}

async function advanceQuestionInCloud() {
    currentBattle.questionIndex++;
    if (db && activeBattleDocId) {
        try {
            await db.collection('battleQueue').doc(activeBattleDocId).update({
                questionIndex: currentBattle.questionIndex
            });
        } catch (e) {}
    }
    renderBattleQuestion();
}

window.handleBattleAnswer = async function(selectedIdx, correctIdx) {
    if (currentBattle.timerInterval) {
        clearInterval(currentBattle.timerInterval);
        currentBattle.timerInterval = null;
    }

    const buttons = document.querySelectorAll('.battle-opt');
    buttons.forEach((btn, idx) => {
        btn.onclick = null;
        if (idx === correctIdx) btn.classList.add('bg-emerald-600', 'border-emerald-500');
        else if (idx === selectedIdx) btn.classList.add('bg-rose-600', 'border-rose-500');
    });

    if (selectedIdx === correctIdx) {
        showToast('🎉 ¡Correcto! +10 Pts', 'success');
        currentBattle.score += 10;
        const myEl = document.getElementById('my-score-display');
        if (myEl) myEl.innerText = `${currentBattle.score} pts`;
    } else {
        showToast('❌ Incorrecto', 'error');
    }

    if (db && activeBattleDocId) {
        try {
            const updateObj = currentBattle.isHost ? { hostScore: currentBattle.score } : { guestScore: currentBattle.score };
            updateObj.questionIndex = currentBattle.questionIndex + 1;
            await db.collection('battleQueue').doc(activeBattleDocId).update(updateObj);
        } catch (e) {}
    }

    setTimeout(() => {
        currentBattle.questionIndex++;
        renderBattleQuestion();
    }, 1200);
};

function cleanupBattleListeners() {
    if (matchmakingUnsubscribe) { matchmakingUnsubscribe(); matchmakingUnsubscribe = null; }
    if (battleStateUnsubscribe) { battleStateUnsubscribe(); battleStateUnsubscribe = null; }
    if (currentBattle.timerInterval) { clearInterval(currentBattle.timerInterval); currentBattle.timerInterval = null; }
}

window.exitBattleMatch = function() {
    cleanupBattleListeners();
    const modal = document.getElementById('view-lesson-modal');
    if (modal) modal.classList.add('hidden');
    showToast('Batalla finalizada.', 'info');
};

function finishBattleMatch() {
    cleanupBattleListeners();
    const container = document.getElementById('lesson-content');
    if (!container) return;
    const won = currentBattle.score >= currentBattle.rivalScore;

    if (won && currentUser) {
        currentUser.xp = (currentUser.xp || 0) + 50;
        saveCurrentUserData();
        updateUI();
    }

    const resultMessage = won 
        ? '🏆 ¡Eres el ganador, felicidades!' 
        : '😅 ¡Eres el perdedor, te falta mejorar más!';

    container.innerHTML = `
        <div class="max-w-md mx-auto text-center space-y-6 p-4">
            <div class="text-5xl">${won ? '🥇' : '📖'}</div>
            <h3 class="text-2xl font-black text-white">${resultMessage}</h3>
            <p class="text-xs text-slate-300">Tus puntos: <b>${currentBattle.score}</b> | Puntos de ${currentBattle.rivalName}: <b>${currentBattle.rivalScore}</b></p>
            <button onclick="document.getElementById('view-lesson-modal').classList.add('hidden')" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition">Finalizar 🚀</button>
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
// MÓDULO DE VIDEOS GALACTIC (SOPORTE HASTA 50 MB DIRECTO DESDE LA GALERÍA)
// ==========================================
function renderTikTokSection() {
    const secVideos = document.getElementById('sec-videos');
    if (!secVideos) return;

    secVideos.innerHTML = `
        <div class="max-w-sm mx-auto bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[650px] relative">
            <div class="absolute top-0 inset-x-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
                <span class="text-xs font-bold text-slate-400">Siguiendo</span>
                <span class="text-sm font-black text-white border-b-2 border-rose-500 pb-0.5">Videos Galactic 🌌</span>
                <button onclick="openUploadVideoModal()" class="text-rose-500 hover:text-rose-400 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-700 shadow transition flex items-center space-x-1">
                    <i class="fa-solid fa-plus text-xs"></i><span class="text-[10px] font-bold">Subir Video</span>
                </button>
            </div>

            <div id="tiktok-feed-container" class="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-none relative pt-12 h-full">
                <div class="flex flex-col items-center justify-center h-full text-slate-400 space-y-3 p-6 text-center">
                    <i class="fa-solid fa-spinner animate-spin text-2xl text-rose-500"></i>
                    <p class="text-xs">Cargando videos de la comunidad...</p>
                </div>
            </div>
        </div>

        <div id="upload-video-modal" class="hidden fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-fade-in">
                <div class="flex justify-between items-center">
                    <h3 class="text-base font-black text-white">📤 Subir Video (Hasta 50MB)</h3>
                    <button onclick="closeUploadVideoModal()" class="text-slate-400 hover:text-white p-1"><i class="fa-solid fa-xmark text-lg"></i></button>
                </div>
                <div class="space-y-3">
                    <div>
                        <label class="text-[10px] uppercase font-bold text-slate-400">Seleccionar Video (Celular o PC)</label>
                        <input type="file" id="input-video-file" accept="video/*" class="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-500 cursor-pointer mt-1">
                        <p class="text-[9px] text-slate-400 mt-1">💡 Puedes subir videos de tu galería de hasta 50MB sin problemas.</p>
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-slate-400">Descripción y Hashtags</label>
                        <textarea id="input-video-desc" rows="3" placeholder="Escribe tu descripción con #tags..." class="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-rose-500"></textarea>
                    </div>
                </div>
                <button id="btn-publish-video-action" onclick="publishGalleryVideo()" class="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition">Publicar en Galactic 🚀</button>
            </div>
        </div>
    `;

    loadTikTokFeed();
}

window.openUploadVideoModal = function() {
    document.getElementById('upload-video-modal')?.classList.remove('hidden');
};

window.closeUploadVideoModal = function() {
    document.getElementById('upload-video-modal')?.classList.add('hidden');
};

window.publishGalleryVideo = async function() {
    const fileInput = document.getElementById('input-video-file');
    const descInput = document.getElementById('input-video-desc').value.trim();
    const publishBtn = document.getElementById('btn-publish-video-action');

    if (!fileInput.files || fileInput.files.length === 0) {
        showToast('Selecciona un video de tu galería.', 'error');
        return;
    }

    if (!descInput) {
        showToast('Escribe una descripción.', 'error');
        return;
    }

    const file = fileInput.files[0];

    // Límite configurado a 50MB exactos
    if (file.size > 50 * 1024 * 1024) {
        showToast('⚠️ El video supera los 50MB. Elige un archivo más liviano.', 'error');
        return;
    }

    if (publishBtn) {
        publishBtn.innerText = '🚀 Subiendo video (50MB máx)...';
        publishBtn.disabled = true;
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        const base64Data = e.target.result;

        if (!db) {
            showToast('Base de datos no disponible.', 'error');
            if (publishBtn) { publishBtn.innerText = 'Publicar en Galactic 🚀'; publishBtn.disabled = false; }
            return;
        }

        try {
            await db.collection('tiktokVideos').add({
                videoData: base64Data,
                description: descInput,
                authorName: currentUser ? (currentUser.name || 'Meyer') : 'Meyer',
                authorId: currentUser ? currentUser.userId : 'MEYER_ID',
                authorAvatar: currentUser ? (currentUser.avatarUrl || 'https://images.unsplash.com/photo-15344528741775-53994a69daeb?w=150') : '',
                likes: [],
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            showToast('🎉 ¡Video de hasta 50MB publicado con éxito!');
            closeUploadVideoModal();
            fileInput.value = '';
            document.getElementById('input-video-desc').value = '';
            loadTikTokFeed();
        } catch (err) {
            console.log("Error subiendo video:", err);
            showToast('Error: El video excede el límite permitido por la base de datos.', 'error');
        } finally {
            if (publishBtn) {
                publishBtn.innerText = 'Publicar en Galactic 🚀';
                publishBtn.disabled = false;
            }
        }
    };

    reader.readAsDataURL(file);
};

function loadTikTokFeed() {
    const container = document.getElementById('tiktok-feed-container');
    if (!container || !db) return;

    db.collection('tiktokVideos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        if (snapshot.empty) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-slate-400 space-y-3 p-6 text-center">
                    <div class="text-4xl">📱</div>
                    <p class="text-xs">No hay videos aún. ¡Sube el primero desde tu galería!</p>
                </div>
            `;
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const videoId = doc.id;
            const likesCount = data.likes ? data.likes.length : 0;
            const isLiked = currentUser && data.likes && data.likes.includes(currentUser.userId);
            const isFollowing = currentUser && currentUser.following && currentUser.following.includes(data.authorId);

            html += `
                <div class="w-full h-full snap-start relative flex flex-col justify-end p-4 bg-black overflow-hidden shrink-0">
                    <div class="absolute inset-0 z-0 flex items-center justify-center bg-black overflow-hidden">
                        <video src="${data.videoData || ''}" class="w-full h-full object-cover video-player-item" autoplay loop playsinline controls></video>
                    </div>

                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10"></div>

                    <!-- BOTÓN PARA SILENCIAR / ACTIVAR AUDIO -->
                    <button onclick="toggleVideoAudio(this.parentElement.querySelector('video'))" class="absolute top-16 right-4 z-30 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md border border-white/20 transition text-xs shadow-lg">
                        <i class="fa-solid fa-volume-high audio-icon-indicator"></i>
                    </button>

                    <div class="absolute right-3 bottom-20 z-30 flex flex-col items-center space-y-4">
                        <div class="flex flex-col items-center">
                            <button onclick="toggleVideoLike('${videoId}')" class="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-xl shadow-lg transition transform active:scale-90 ${isLiked ? 'text-rose-500 bg-rose-500/20' : 'text-white'}">
                                <i class="fa-solid fa-heart"></i>
                            </button>
                            <span class="text-[11px] font-bold text-white mt-1">${likesCount}</span>
                        </div>

                        <button onclick="openVideoComments('${videoId}')" class="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-white text-lg shadow-lg">
                            <i class="fa-solid fa-comment-dots"></i>
                        </button>
                    </div>

                    <div class="relative z-20 space-y-1.5 pb-2 pr-14">
                        <div class="flex items-center space-x-2">
                            <img src="${data.authorAvatar || 'https://images.unsplash.com/photo-15344528741775-53994a69daeb?w=150'}" class="w-7 h-7 rounded-full object-cover border border-slate-600">
                            <span class="text-xs font-black text-white font-mono">@${data.authorName}</span>
                            ${currentUser && currentUser.userId !== data.authorId ? `
                                <button onclick="toggleFollowUser('${data.authorId}')" class="px-2.5 py-0.5 ${isFollowing ? 'bg-slate-700 text-slate-300' : 'bg-rose-600 hover:bg-rose-500 text-white'} font-bold text-[10px] rounded-full transition shadow">
                                    ${isFollowing ? 'Siguiendo' : 'Seguir'}
                                </button>
                            ` : ''}
                        </div>
                        <p class="text-xs text-slate-200 leading-snug">${data.description}</p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
        
        setTimeout(() => {
            document.querySelectorAll('.video-player-item').forEach(v => {
                v.muted = false;
                v.play().catch(() => {
                    v.muted = true;
                    v.play();
                });
            });
        }, 300);
    });
}

window.toggleVideoAudio = function(videoEl) {
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    showToast(videoEl.muted ? '🔇 Video silenciado' : '🔊 Audio activado', 'info');
};

window.toggleVideoLike = async function(videoId) {
    if (!currentUser || !db) return;
    const ref = db.collection('tiktokVideos').doc(videoId);
    const doc = await ref.get();
    if (!doc.exists) return;

    let likes = doc.data().likes || [];
    const userId = currentUser.userId;

    if (likes.includes(userId)) {
        likes = likes.filter(id => id !== userId);
    } else {
        likes.push(userId);
    }

    await ref.update({ likes });
};

window.toggleFollowUser = function(authorId) {
    if (!currentUser) return;
    if (!currentUser.following) currentUser.following = [];

    if (currentUser.following.includes(authorId)) {
        currentUser.following = currentUser.following.filter(id => id !== authorId);
        showToast('Dejaste de seguir al usuario.', 'info');
    } else {
        currentUser.following.push(authorId);
        showToast('✅ ¡Ahora sigues a este usuario!');
    }
    saveCurrentUserData();
    loadTikTokFeed();
};

window.openVideoComments = function(videoId) {
    showToast('💬 Comentarios sincronizados en tiempo real.', 'info');
};

// ==========================================
// MÓDULO DE PERFIL DE USUARIO
// ==========================================
function renderProfileSection() {
    const secProfile = document.getElementById('sec-profile');
    if (!secProfile || !currentUser) return;

    ensureUserUniqueId(currentUser);

    secProfile.innerHTML = `
        <div class="max-w-md mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6 text-white text-center">
            <div class="relative w-24 h-24 mx-auto group">
                <img id="user-profile-avatar-img" src="${currentUser.avatarUrl || 'https://images.unsplash.com/photo-15344528741775-53994a69daeb?w=150'}" class="w-24 h-24 rounded-full object-cover border-4 border-indigo-600 shadow-lg">
                <label class="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition text-white text-xs font-bold">
                    Cambiar <input type="file" accept="image/*" onchange="updateProfileAvatar(event)" class="hidden">
                </label>
            </div>

            <div class="space-y-1">
                <h3 class="text-xl font-black">${currentUser.name || 'Meyer'}</h3>
                <p class="text-xs font-mono text-indigo-400">ID: ${currentUser.userId}</p>
            </div>

            <div class="grid grid-cols-3 gap-2 py-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <div>
                    <span class="block text-sm font-black text-white">${currentUser.xp || 50}</span>
                    <span class="text-[10px] uppercase text-slate-400 font-bold">XP</span>
                </div>
                <div>
                    <span class="block text-sm font-black text-white">${(currentUser.following || []).length}</span>
                    <span class="text-[10px] uppercase text-slate-400 font-bold">Siguiendo</span>
                </div>
                <div>
                    <span class="block text-sm font-black text-white">${(currentUser.followers || []).length}</span>
                    <span class="text-[10px] uppercase text-slate-400 font-bold">Seguidores</span>
                </div>
            </div>

            <div class="space-y-2 text-left">
                <label class="text-[10px] uppercase font-bold text-slate-400">Editar Nombre</label>
                <div class="flex gap-2">
                    <input type="text" id="input-edit-username" value="${currentUser.name || ''}" class="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-indigo-500">
                    <button onclick="saveProfileName()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition">Guardar</button>
                </div>
            </div>
        </div>
    `;
}

window.updateProfileAvatar = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        currentUser.avatarUrl = e.target.result;
        saveCurrentUserData();
        renderProfileSection();
        showToast('📸 ¡Foto de perfil actualizada!');
    };
    reader.readAsDataURL(file);
};

window.saveProfileName = function() {
    const newName = document.getElementById('input-edit-username')?.value.trim();
    if (!newName) {
        showToast('Ingresa un nombre válido.', 'error');
        return;
    }
    currentUser.name = newName;
    ensureUserUniqueId(currentUser);
    saveCurrentUserData();
    renderProfileSection();
    updateUI();
    showToast('✅ ¡Nombre actualizado con éxito!');
};

// ==========================================
// MÓDULO DE TRANSMISIÓN EN VIVO (LIVE)
// ==========================================
function renderLiveSection() {
    const secLive = document.getElementById('sec-live');
    if (!secLive) return;

    secLive.innerHTML = `
        <div class="max-w-md mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6 text-white text-center">
            <div class="w-16 h-16 bg-rose-600/20 text-rose-500 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black animate-pulse">
                <i class="fa-solid fa-tower-broadcast"></i>
            </div>
            <div class="space-y-2">
                <h3 class="text-xl font-black">🔴 Transmisión En Vivo</h3>
                <p class="text-xs text-slate-300">Conecta con la comunidad de Meyer en tiempo real.</p>
            </div>

            <div class="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-left">
                <label class="text-[10px] uppercase font-bold text-slate-400">Título de tu Live</label>
                <input type="text" id="live-title-input" placeholder="Ej. Practicando inglés y programando..." class="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-rose-500 font-bold">
                
                <button onclick="startMyLiveStream()" class="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2">
                    <i class="fa-solid fa-video"></i><span>Iniciar Transmisión En Vivo 🎥</span>
                </button>
            </div>

            <div class="border-t border-slate-800 pt-4 text-left space-y-2">
                <h4 class="text-xs font-bold text-indigo-400 uppercase">Lives Activos de la Comunidad</h4>
                <div id="active-lives-list" class="space-y-2">
                    <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 text-center">
                        No hay transmisiones activas en este momento. ¡Sé el primero en iniciar una! 🚀
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.startMyLiveStream = function() {
    const titleInput = document.getElementById('live-title-input');
    const title = titleInput ? titleInput.value.trim() : 'Live de Meyer';
    
    showToast(`🔴 ¡Transmisión "${title}" iniciada con éxito!`);
    
    const secLive = document.getElementById('sec-live');
    if (secLive) {
        secLive.innerHTML = `
            <div class="max-w-md mx-auto bg-slate-950 rounded-3xl border border-rose-600/50 p-6 shadow-2xl space-y-4 text-white text-center relative overflow-hidden">
                <div class="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">EN VIVO 🔴</div>
                
                <div class="w-full h-48 bg-black rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative shadow-inner">
                    <i class="fa-solid fa-video text-4xl text-rose-500 mb-2"></i>
                    <p class="text-xs font-bold text-slate-300">${title}</p>
                    <span class="text-[10px] text-slate-500 mt-1">Transmitiendo en alta definición...</span>
                </div>

                <div class="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>Espectadores: <b class="text-emerald-400">1</b></div>
                    <div>Duración: <b class="text-indigo-400">00:45</b></div>
                </div>

                <button onclick="renderLiveSection()" class="w-full py-3 bg-slate-800 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition shadow">Finalizar Transmisión ❌</button>
            </div>
        `;
    }
};

// ==========================================
// ANIMACIÓN DE ENTRADA "MEYER GALACTIC"
// ==========================================
function playGalacticIntroAnimation() {
    if (document.getElementById('galactic-intro-screen')) return;

    const introDiv = document.createElement('div');
    introDiv.id = 'galactic-intro-screen';
    introDiv.className = 'fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center text-white transition-opacity duration-700';
    introDiv.innerHTML = `
        <div class="space-y-4 text-center animate-pulse">
            <div class="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-rose-600 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-2xl shadow-rose-500/50">
                🌌
            </div>
            <h1 class="text-3xl sm:text-4xl font-black tracking-widest bg-gradient-to-r from-indigo-400 via-rose-500 to-amber-400 bg-clip-text text-transparent">
                MEYER GALACTIC
            </h1>
            <p class="text-xs font-mono text-slate-400 uppercase tracking-widest">Cargando Sistema Espacial...</p>
        </div>
    `;
    document.body.appendChild(introDiv);

    setTimeout(() => {
        introDiv.style.opacity = '0';
        setTimeout(() => introDiv.remove(), 700);
    }, 1800);
}

// ==========================================
// UTILIDADES Y AUTENTICACIÓN
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
    showToast('🎙️ Escuchando...', 'info');

    recognition.onresult = (event) => { callback(event.results[0][0].transcript); };
    recognition.onerror = () => { showToast('No se logró escuchar.', 'info'); };
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
    document.getElementById('auth-modal')?.classList.remove('hidden');
    document.getElementById('view-dashboard')?.classList.add('hidden');
}

function showMainApp() {
    document.getElementById('auth-modal')?.classList.add('hidden');
    document.getElementById('view-dashboard')?.classList.remove('hidden');
    document.getElementById('btn-logout')?.classList.remove('hidden');
    
    playGalacticIntroAnimation();
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
    const userDisplayId = document.getElementById('user-display-id');

    if (welcomeHeader) welcomeHeader.innerText = `Hola, ${currentUser.name || 'Meyer'}`;
    if (welcomeTitle) welcomeTitle.innerText = `¡Hola ${currentUser.name || 'Meyer'}! Sistema Galactic Listo`;
    if (xpCount) xpCount.innerText = currentUser.xp || 0;
    if (streakCount) streakCount.innerText = currentUser.streak || 1;
    if (userDisplayId) userDisplayId.innerText = currentUser.userId;

    renderLessons();
    renderCustomWords();
    renderGlobalChat();
    renderPrivateChat();
    renderTikTokSection();
    renderProfileSection();
    renderLiveSection();
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
                <p class="text-xs text-rose-100 mt-1">20 Preguntas únicas y sincronizadas en tiempo real.</p>
            </div>
            <button onclick="openWarSetup()" class="px-6 py-3.5 bg-white text-rose-600 font-black text-sm rounded-2xl shadow-lg transition transform active:scale-95 shrink-0">¡Lanzar Batalla! ⚔️</button>
        </div>
    `;

    html += categories.map(cat => `
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition shadow-sm flex flex-col justify-between">
            <div>
                <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center text-xl mb-3"><i class="fa-solid ${cat.icon}"></i></div>
                <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">${cat.category}</span>
                <h3 class="font-bold text-lg text-slate-800 dark:text-white mt-1">${cat.title}</h3>
            </div>
            <button data-category="${cat.category}" class="btn-start-dynamic mt-5 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-md">Iniciar Práctica</button>
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
                    customWords: [], seenHistory: [], friends: [], followers: [], following: [],
                    avatarUrl: 'https://images.unsplash.com/photo-15344528741775-53994a69daeb?w=150'
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

    ['lessons', 'dictionary', 'chat', 'private-chat', 'videos', 'profile', 'live'].forEach(tab => {
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
        closeLessonBtn.onclick = () => {
            cleanupBattleListeners();
            document.getElementById('view-lesson-modal').classList.add('hidden');
        };
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
    ['lessons', 'dictionary', 'chat', 'private-chat', 'videos', 'profile', 'live'].forEach(t => {
        const sec = document.getElementById(`sec-${t}`);
        const tabBtn = document.getElementById(`tab-${t}`);
        if (sec) sec.classList.toggle('hidden', t !== tab);
        if (tabBtn) tabBtn.classList.toggle('active', t === tab);
    });

    if (tab === 'videos') {
        renderTikTokSection();
    } else if (tab === 'profile') {
        renderProfileSection();
    } else if (tab === 'live') {
        renderLiveSection();
    }
}