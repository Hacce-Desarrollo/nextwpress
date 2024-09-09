import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languages, defaultLanguage, namespaces, defaultNamespace } from './config';

// Load all locales
const locales = Object.assign(
    {},
    ...Object.keys(languages).map((index) => {
      	const language = languages[index];
      	return {
        	[language]: Object.assign(
          		{},
          		...Object.keys(namespaces).map((index) => {
            		const namespace = namespaces[index];
          			return {
            			[namespace]: require(`./locales/${language}/${namespace}.json`),
          			};
        		})
      		),
    	};
  	})
);

const detection = {
  	order: [
    	'path',
    	'htmlTag',
    	'querystring',
    	'cookie',
    	'localStorage',
    	'sessionStorage',
    	'navigator',
    	'subdomain',
  	],
  	lookupCookie: 'lng',
  	lookupLocalStorage: 'lng',
  	lookupFromPathIndex: 0,
  	lookupFromSubdomainIndex: 0,
  	caches: ['localStorage', 'cookie'],
  	excludeCacheFor: ['cimode'],
  	cookieOptions: { path: '/', sameSite: 'strict' },
};

export const initI18next = async (lng) => {
  	//console.log('Inicializando i18next con idioma:', lng);

  	await i18next
    	.use(LanguageDetector)
    	.init({
      		detection: detection,
      		fallbackLng: lng || defaultLanguage,
      		resources: locales,
      		ns: namespaces,
      		defaultNS: defaultNamespace,
      		returnObjects: true,
      		//debug: true, // Habilita la depuración para más información en la consola
      		interpolation: {
        		escapeValue: false, // No necesario para React
      		},
      		react: {
        		useSuspense: true,
      		},
    	}, (err) => {
      		if (err) {
        		//console.error('Error al inicializar i18next:', err);
      		} else {
        		//console.log('i18next inicializado correctamente');
      		}
    	});
};

export { languages, defaultLanguage, namespaces, defaultNamespace };


export function getAllLanguageSlugs() {
    return languages.map((lang) => {
        return { params: { lang: lang } };
    });
}

export function getLanguage(lang) {
    return languages.includes(lang) ? lang : defaultLanguage;
}

export function getCurrentLanguage() {
  //console.log('Idioma actual desde getCurrentLanguage:', i18next.language);
  return i18next.language || defaultLanguage;
}

export function getLanguageList() {
    return languages;
}