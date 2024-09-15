import { match } from '@formatjs/intl-localematcher';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'tr'];
const defaultLocale = 'tr';

// Korumalı rotaları tanımla
const protectedRoutes = ['/home'];

function getLocale(request: NextRequest) {
  try {
    const headers = request.headers;
    const acceptLanguage = headers.get('accept-language');
    
    if (!acceptLanguage) {
      console.warn('No Accept-Language header found, falling back to default locale.');
      return defaultLocale;
    }

    const languages: string[] = acceptLanguage.split(',').map((lang: string) => {
      const [locale] = lang.split(';');
      return locale.trim();
    });

    const validLanguages = languages.filter(lang => locales.includes(lang.split('-')[0]));

    if (validLanguages.length === 0) {
      console.warn('No valid languages found in Accept-Language header, falling back to default locale.');
      return defaultLocale;
    }

    const selectedLocale = match(validLanguages, locales, defaultLocale);


    return selectedLocale;
  } catch (error) {
    console.error('Error while determining the locale:', error);
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.has('access_token') || request.cookies.has('refresh_token');
  const locale = getLocale(request);

  // Dil kodunu çıkar
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');

  // Korumalı rota kontrolü
  const isProtectedRoute = protectedRoutes.some(route => pathWithoutLocale.startsWith(route));
  if (isProtectedRoute) {
    if (!isLoggedIn) {
      // Kullanıcı giriş yapmamışsa, signin sayfasına yönlendir
      return NextResponse.redirect(new URL(`/${locale}/signin`, request.url));
    }
  }

  // Giriş yapmış kullanıcılar için signin, signup ve forgotpassword sayfalarına erişimi engelle
  const authPages = ['/signin', '/signup', '/forgot-password'];
  if (isLoggedIn && authPages.some(page => pathWithoutLocale.startsWith(page))) {
    // Giriş yapmış kullanıcıyı ana sayfaya yönlendir
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  // Diğer rotalar için dil yönlendirmesi
  const pathnameHasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};