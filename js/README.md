# Language Management System

This system allows users to select their preferred language on the main page (index.html) and have that choice persist across all pages of the OSC website.

## How It Works

1. **Language Selection**: Users can only change the language on the main page (index.html) using the flag buttons
2. **Persistence**: The selected language is stored in localStorage and automatically applied to all pages
3. **Automatic Translation**: When users navigate to other pages, the content automatically displays in their chosen language

## Supported Languages

- English (en)
- Spanish (es) 
- Japanese (ja)
- Chinese Traditional (zh)
- Hindi (hi)

## How to Add Language Support to a New Page

### 1. Include the Language Manager Script

Add this line to your HTML file's `<head>` or before the closing `</body>` tag:

```html
<script src="js/language-manager.js"></script>
```

### 2. Add Data Attributes to Your Content

For each piece of text that needs translation, add data attributes for each language:

```html
<h1 data-en="English Title" data-es="Título en Español" data-ja="日本語タイトル" data-zh="中文標題" data-hi="हिंदी शीर्षक">English Title</h1>
<p data-en="English content" data-es="Contenido en español" data-ja="日本語コンテンツ" data-zh="中文內容" data-hi="हिंदी सामग्री">English content</p>
```

### 3. Add Page-Specific Translations

Add a script section to provide page-specific translations (like page titles):

```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const pageTranslations = {
            en: {
                title: "Your Page - Oxford Semiconductor Conference"
            },
            es: {
                title: "Tu Página - Conferencia de Semiconductores de Oxford"
            },
            ja: {
                title: "あなたのページ - オックスフォード半導体会議"
            },
            zh: {
                title: "你的頁面 - 牛津半導體會議"
            },
            hi: {
                title: "आपका पेज - ऑक्सफोर्ड सेमीकंडक्टर सम्मेलन"
            }
        };
        
        // Add translations to the language manager
        if (window.languageManager) {
            window.languageManager.addTranslations(pageTranslations);
        }
    });
</script>
```

## Features

- **Automatic Language Detection**: The system remembers the user's language choice
- **Spanish Font Sizing**: Automatically adjusts font sizes for Spanish text to prevent overflow
- **Page Title Updates**: Automatically updates page titles in the selected language
- **Document Language**: Updates the HTML lang attribute for accessibility
- **Fallback Support**: If a translation is missing, it falls back to English

## Technical Details

- Uses localStorage to persist language choice
- Automatically applies translations on page load
- Supports all modern browsers
- No server-side requirements
- Lightweight and fast

## Example Template

See `page-template.html` for a complete example of how to implement language support on a new page. 