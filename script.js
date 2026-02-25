// script.js

// --- 1. Scroll Reveal Animation ---
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); 

// --- 2. 3D Card Tilt Effect ---
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});


// --- 3. Parallax Background Shapes ---
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shape1 = document.querySelector('.shape-1');
    const shape2 = document.querySelector('.shape-2');
    if (shape1) shape1.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (shape2) shape2.style.transform = `translateY(${scrolled * -0.2}px)`;
});


// --- 4. Theme Toggle Logic ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    
    updateThemeIcon();
}
  
function updateThemeIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        // Moon Icon (Switch to Dark)
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    } else {
        // Sun Icon (Switch to Light)
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
}
  
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme to HTML attribute
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    updateThemeIcon();
    
    // Initialize Reveal elements
    document.querySelectorAll('.page-section, .card, .section-header').forEach(el => el.classList.add('reveal'));
    revealOnScroll(); 
});


// --- 5. EXPANDED Chatbot Logic (Comprehensive Knowledge Base) ---
const chatKnowledgeBase = [
    // Greetings
    { 
        keywords: ["hi", "hello", "hey", "good morning", "good evening", "namaste"], 
        answer: "Namaste! 🙏 Welcome to CleanTech. I am your E-Waste Assistant. Ask me anything about e-waste, recycling, or hazards." 
    },
    
    // Basic Definition
    { 
        keywords: ["what is e-waste", "ewaste", "e waste", "define", "definition", "meaning", "electronic waste"], 
        answer: "E-waste (Electronic Waste) refers to discarded electrical or electronic devices. This includes computers, mobiles, TVs, and fridges that are broken or obsolete." 
    },

    // Examples / Items
    { 
        keywords: ["examples", "items", "types", "list", "products"], 
        answer: "Common e-waste items include: 📱 Mobile Phones, 💻 Laptops, 🖥️ Monitors, 🔋 Batteries, 🧊 Fridges, 🖨️ Printers, and even ⌚ Smartwatches." 
    },

    // Mobile / Phone
    { 
        keywords: ["mobile", "phone", "smartphone", "iphone", "android", "cellphone"], 
        answer: "Old mobiles contain precious metals like Gold and Silver, but also toxic Lead. Always factory reset your phone and remove the battery before recycling. Never throw them in regular bins! 📱♻️" 
    },

    // Laptop / Computer
    { 
        keywords: ["laptop", "computer", "pc", "desktop", "macbook", "monitor"], 
        answer: "Computers contain heavy metals. If your laptop is old, consider upgrading RAM/SSD to extend its life. If broken, hand it over to a certified e-waste recycler to recover valuable materials. 💻" 
    },

    // Battery
    { 
        keywords: ["battery", "li-ion", "lithium", "cell", "charger"], 
        answer: "⚠️ Batteries are hazardous! Swollen Li-ion batteries can explode if punctured. Never throw batteries in fire or water. Tape the terminals and drop them at dedicated battery collection bins." 
    },

    // Hazards / Toxic / Health
    { 
        keywords: ["harmful", "toxic", "danger", "health", "affect", "risk", "lead", "mercury", "cadmium", "poison", "cancer"], 
        answer: "E-waste is very dangerous! It releases Lead, Mercury, and Cadmium. These toxins cause kidney damage, respiratory issues, and birth defects. Never burn electronics as it releases deadly fumes. ☠️" 
    },

    // Disposal / Recycling / How to
    { 
        keywords: ["recycle", "dispose", "how to", "throw", "bin", "dump", "process", "method", "kaise karein"], 
        answer: "To dispose safely: 1️⃣ Backup data. 2️⃣ Factory reset. 3️⃣ Remove batteries. 4️⃣ Drop at an authorized center. Never mix e-waste with household garbage. ♻️" 
    },

    // Collection Centers / Where
    { 
        keywords: ["center", "centre", "where", "location", "drop", "collection point", "find", "near me"], 
        answer: "You can find authorized recyclers on the CPCB website or our 'Resources' page. Many brands like Apple, Dell, and Samsung also have take-back programs. Use the map on our Resources page to find centers! 📍" 
    },

    // Kabadi / Scrap Dealer / Informal
    { 
        keywords: ["kabadi", "scrap", "dealer", "raddi", "informal", "sell"], 
        answer: "Selling to local Kabadiwalas is risky. They often burn wires or use acid to extract metals, harming the environment. Always choose Authorized Recyclers who follow safety norms. 🛑" 
    },

    // Government / Rules / Law
    { 
        keywords: ["government", "rules", "law", "policy", "cpcb", "mpcb", "ministry", "act", "legal"], 
        answer: "In India, the 'E-Waste (Management) Rules, 2016' mandate proper disposal. Manufacturers are responsible for collection (Extended Producer Responsibility). Violators can face fines. ⚖️" 
    },

    // Data Security / Privacy
    { 
        keywords: ["data", "privacy", "hack", "steal", "wipe", "format", "reset", "security", "password"], 
        answer: "Your data is valuable! 🛡️ Always perform a Factory Reset. For hard drives, use data wiping software or physically destroy the drive to prevent identity theft before recycling." 
    },

    // Fridge / TV / Appliances
    { 
        keywords: ["fridge", "refrigerator", "tv", "television", "ac", "air conditioner", "appliance", "washing machine", "microwave"], 
        answer: "Large appliances contain refrigerants (CFCs) that damage the ozone layer. They must be dismantled by professionals. Do not cut the pipes yourself. Contact a certified recycler for pickup. 🚚" 
    },

    // Burning
    { 
        keywords: ["burn", "burning", "fire", "smoke"], 
        answer: "🚫 NEVER burn e-waste! Burning releases Dioxins and Furans—extremely toxic gases that cause cancer. It is illegal and harms the air quality severely." 
    },

    // Project Specific
    { 
        keywords: ["project", "author", "who made", "survey", "kaveri", "about site", "website"], 
        answer: "This project 'Responsible E-Waste Awareness Program' was created by Yamewar Kaveri Raghunath to study awareness levels and promote safe disposal practices. 📊" 
    },

    // Help
    { 
        keywords: ["help", "menu", "options", "guide"], 
        answer: "I can help you with: \n1. E-waste definitions\n2. How to recycle\n3. Health hazards\n4. Government rules\n5. Data safety\nAsk me anything! 🤖" 
    },
    
    // Default
    { 
        keywords: ["default"], 
        answer: "I am an E-Waste expert bot. You can ask me about: Recycling, Hazards, Government Rules, Data Safety, or where to dispose of your old phone/laptop." 
    }
];

function getBotResponse(text) {
    const lowerText = text.toLowerCase().trim();
    
    // Loop through knowledge base
    for (let item of chatKnowledgeBase) {
        if (item.keywords.includes("default")) continue; // Skip default initially
        
        // Check if any keyword matches
        for (let keyword of item.keywords) {
            if (lowerText.includes(keyword)) {
                return item.answer;
            }
        }
    }
    
    // If no match found, return default
    return chatKnowledgeBase.find(i => i.keywords.includes("default")).answer;
}

function toggleChat() {
    const chatWindow = document.getElementById('globalChatWindow');
    chatWindow.classList.toggle('open');
}

function sendGlobalMessage() {
    const input = document.getElementById('globalChatInput');
    const text = input.value.trim();
    if (!text) return;
    const chatBody = document.getElementById('globalChatBody');
    
    // User Message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-message user-msg';
    userBubble.innerText = text;
    chatBody.appendChild(userBubble);

    // Bot Response
    setTimeout(() => {
        const response = getBotResponse(text);
        const botBubble = document.createElement('div');
        // Added 'bot-msg' class for correct styling
        botBubble.className = 'chat-message bot-msg';
        botBubble.innerText = response;
        chatBody.appendChild(botBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);

    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
}