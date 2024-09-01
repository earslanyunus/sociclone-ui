import { match } from '@formatjs/intl-localematcher';
import { NextResponse } from 'next/server';

const locales = ['en', 'tr'];
const defaultLocale = 'tr';

function getLocale(request: any) {
  try {
    const headers = request.headers;
    const acceptLanguage = headers.get('accept-language');
    
    if (!acceptLanguage) {
      console.warn('No Accept-Language header found, falling back to default locale.');
      return defaultLocale;
    }

    // Accept-Language başlığını parse et
    const languages: string[] = acceptLanguage.split(',').map((lang: string) => {
      const [locale] = lang.split(';');
      return locale.trim();
    });

    // Geçerli dilleri filtrele
    const validLanguages = languages.filter(lang => locales.includes(lang.split('-')[0]));

    if (validLanguages.length === 0) {
      console.warn('No valid languages found in Accept-Language header, falling back to default locale.');
      return defaultLocale;
    }

    // Geçerli dillerden uygun olanı seç
    const selectedLocale = match(validLanguages, locales, defaultLocale);

    console.log('Parsed languages from Accept-Language:', validLanguages);
    console.log('Selected locale:', selectedLocale);

    return selectedLocale;
  } catch (error) {
    console.error('Error while determining the locale:', error);
    return defaultLocale;
  }
}

export function middleware(request: any) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already includes a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale in the pathname
  const locale = getLocale(request);

  // Update the pathname to include the selected locale
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next).*)',  // Skip internal paths like _next
  ],
};