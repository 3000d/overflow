import { getRelativeLocaleUrl, getRelativeLocaleUrlList } from 'astro:i18n';
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}
export function getLangFromPath(path: string) {
  const [, lang] = path.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: string) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return key in ui[lang as keyof typeof ui] ? (ui[lang as keyof typeof ui] as any)[key] : ui[defaultLang][key];
  };
}

export function getLocaleCollectionUrl(locale: string, prefix: string, id: string) {
  return getRelativeLocaleUrl(locale, prefix + '/' + id.replace(`${locale}/`, ''));
}

export async function getLocalizedStaticPaths() {
  const paths = getRelativeLocaleUrlList();
  return paths.map((url) => {
    const locale = url.split('/')[1]; // Extracts 'en', 'es', 'fr', etc.
    return { params: { locale: locale.length > 0 ? locale : 'en' } };
  });
}

export async function switchLanguageUrl(currentUrl: URL, targetLang: string): Promise<string> {
  const pathname = currentUrl.pathname;
  const pathParts = pathname.split('/').filter((p) => p);

  // Remove current language prefix if exists
  const currentLang = getLangFromUrl(currentUrl);
  if (pathParts[0] === currentLang) {
    pathParts.shift();
  }

  // Handle root page
  if (pathParts.length === 0) {
    return targetLang === defaultLang ? '/' : `/${targetLang}/`;
  }

  const newPath = pathParts.join('/');
  return `/${targetLang}/${newPath}/`;
}

type AlternateURLList = Array<{ lang: string; URL: URL }>;

export function getAlternateURLs(currentUrl: URL): AlternateURLList {
  console.log(getRelativeLocaleUrlList());
  const pathname = currentUrl.pathname;
  const pathParts = pathname.split('/').filter((p) => p);

  // Remove current language prefix if exists
  const currentLang = getLangFromUrl(currentUrl);
  if (pathParts[0] === currentLang) {
    pathParts.shift();
  }

  const alternativeURLs: AlternateURLList = [];

  getRelativeLocaleUrlList().map((localeUrl) => {
    const lang = getLangFromPath(localeUrl);
    // if (lang !== currentLang) {
    alternativeURLs.push({
      lang: lang,
      URL: new URL('/' + lang + '/' + pathParts.join('/'), currentUrl.origin),
    });
    // }
  });

  return alternativeURLs;
}
