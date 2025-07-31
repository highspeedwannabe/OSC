// Language Manager - Handles language persistence across all pages
class LanguageManager {
    constructor() {
        this.supportedLanguages = ['en', 'es', 'ja', 'zh', 'hi'];
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = {
            en: {
                title: "Oxford Semiconductor Conference",
                subtitle: "A 501(c)3 Non-profit Organization",
                aboutButton: "About OSC",
                loginButton: "Delegate Login"
            },
            es: {
                title: "Conferencia de Semiconductores de Oxford",
                subtitle: "Una Organización Sin Fines de Lucro 501(c)3",
                aboutButton: "Acerca de OSC",
                loginButton: "Inicio de Sesión de Delegado"
            },
            ja: {
                title: "オックスフォード半導体会議",
                subtitle: "501(c)3非営利団体",
                aboutButton: "OSCについて",
                loginButton: "代表者ログイン"
            },
            zh: {
                title: "牛津半導體會議",
                subtitle: "501(c)3非營利組織",
                aboutButton: "關於OSC",
                loginButton: "代表登入"
            },
            hi: {
                title: "ऑक्सफोर्ड सेमीकंडक्टर सम्मेलन",
                subtitle: "501(c)3 गैर-लाभकारी संगठन",
                aboutButton: "OSC के बारे में",
                loginButton: "प्रतिनिधि लॉगिन"
            }
        };
        
        this.init();
    }

    // Get stored language from localStorage
    getStoredLanguage() {
        return localStorage.getItem('osc-language');
    }

    // Set language in localStorage
    setStoredLanguage(lang) {
        localStorage.setItem('osc-language', lang);
    }

    // Initialize language manager
    init() {
        // Apply current language on page load
        this.applyLanguage(this.currentLanguage);
        
        // Set up language switcher if it exists (only on index page)
        this.setupLanguageSwitcher();
    }

    // Apply language to current page
    applyLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            lang = 'en'; // Default to English if unsupported
        }

        this.currentLanguage = lang;
        this.setStoredLanguage(lang);

        // Update all elements with data attributes
        document.querySelectorAll('[data-' + lang + ']').forEach(element => {
            element.textContent = element.getAttribute('data-' + lang);
        });

        // Update document language
        document.documentElement.lang = lang;

        // Update page title
        if (this.translations[lang] && this.translations[lang].title) {
            document.title = this.translations[lang].title;
        }

        // Apply Spanish-specific styling
        this.applySpanishStyling(lang);

        // Update active flag if language switcher exists
        this.updateActiveFlag(lang);
    }

    // Apply Spanish-specific font sizing
    applySpanishStyling(lang) {
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            if (lang === 'es') {
                // 40% smaller font sizes for Spanish
                if (window.innerWidth <= 480) {
                    button.style.fontSize = '0.84rem'; // Small mobile
                } else if (window.innerWidth <= 768) {
                    button.style.fontSize = '0.96rem'; // Tablet
                } else {
                    button.style.fontSize = '1.2rem'; // Desktop
                }
            } else {
                button.style.fontSize = ''; // Reset to default
            }
        });
    }

    // Set up language switcher (only on index page)
    setupLanguageSwitcher() {
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher) {
            // Add click event listeners to flag buttons
            document.querySelectorAll('.flag-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    this.applyLanguage(lang);
                });
            });
        }
    }

    // Update active flag in language switcher
    updateActiveFlag(lang) {
        const flagButtons = document.querySelectorAll('.flag-button');
        if (flagButtons.length > 0) {
            flagButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = document.querySelector('[data-lang="' + lang + '"]');
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Get translation for a specific key
    getTranslation(key, lang = null) {
        const language = lang || this.currentLanguage;
        return this.translations[language] && this.translations[language][key] 
            ? this.translations[language][key] 
            : this.translations['en'][key] || key;
    }

    // Add new translations
    addTranslations(newTranslations) {
        Object.keys(newTranslations).forEach(lang => {
            if (!this.translations[lang]) {
                this.translations[lang] = {};
            }
            Object.assign(this.translations[lang], newTranslations[lang]);
        });
    }
}

// Create global instance
window.languageManager = new LanguageManager();

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
} 