class LanguagePack {
    private readonly language: string;
    private readonly map;

    protected constructor(language: string, record: Record<string, string>) {
        this.language = language;
        this.map = new Map<string, string>(Object.entries(record));
    }

    toString(): string {
        return this.language;
    }

    get(key: string): string {
        return this.map.get(key) || key;
    }

    static load(): LanguagePack {
        return navigator.language && navigator.language.startsWith('de') ? new German() : new English();
    }
}

class English extends LanguagePack {
    constructor() {
        super("en", {
            description: "Generate ID card numbers for German ID cards.",
            header: "ID Card Number Generator",
            authority_id: "Authority ID",
            assigned_number: "Number",
            birth_date: "Birth Date",
            expiry_date: "Expiry Date",
            issuing_date: "Issuing Date",
            random: "New",
            reset: "Reset",
            id_card_number: "ID Card Number",
            privacy: "Privacy",
            privacy_notice: "PersoGenius runs locally in your browser, meaning the server does not store or process any personal data. User inputs remain on the device and are not transmitted to the server."
        })
    }
}

class German extends LanguagePack {
    constructor() {
        super("de", {
            description: "Generiere Ausweisnummmern für deutsche Personalausweise.",
            header: "Personalausweisnummer Generator",
            authority_id: "Behördenkennzahl",
            assigned_number: "Nummer",
            birth_date: "Geburtsdatum",
            expiry_date: "Ablaufdatum",
            issuing_date: "Ausstellungsdatum",
            random: "Neu",
            reset: "Zurücksetzen",
            id_card_number: "Ausweisnummer",
            privacy: "Datenschutz",
            privacy_notice: "PersoGenius wird lokal in Ihrem Browser ausgeführt, was bedeutet, dass der Server keine personenbezogenen Daten speichert oder verarbeitet. Benutzereingaben bleiben auf dem Gerät und werden nicht an den Server übertragen."
        })
    }
}

function loadLanguage() {
    const language = LanguagePack.load();

    document.documentElement.lang = language.toString();
    document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description', content: language.get('description')}));

    const elements = [
        { id: "fieldset-legend", translation: language.get('header') },
        { id: "input-field-1-label", translation: language.get('authority_id') },
        { id: "input-field-2-label", translation: language.get('assigned_number') },
        { id: "input-field-3-label", translation: language.get('birth_date') },
        { id: "input-field-4-label", translation: language.get('expiry_date') },
        { id: "input-field-5-label", translation: language.get('issuing_date') },
        { id: "button-reset", translation: language.get('reset') },
        { id: "button-random", translation: language.get('random') },
        { id: "output-field-label", translation: `${language.get('id_card_number')}:` },
        { id: "privacy-link", translation: language.get('privacy') },
        { id: "privacy-notice", translation: language.get('privacy_notice') },
    ];

    elements.forEach(({ id, translation }) => {
        const element = document.getElementById(id) as HTMLElement | null;
        if (element) {
            element.innerHTML = translation;
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    loadLanguage();
})
