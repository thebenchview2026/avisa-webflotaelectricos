"use client";

import NextLink from 'next/link';
import { usePathname, useRouter, useParams as useNextParams, useSearchParams } from 'next/navigation';

export const Link = NextLink;

export function useLocation(): [string, (to: string) => void] {
  const pathname = usePathname();
  const router = useRouter();
  return [pathname, (to: string) => router.push(to)];
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useNextParams() as T;
}

export function useSearch(): string {
  const searchParams = useSearchParams();
  const str = searchParams.toString();
  return str ? `?${str}` : '';
}

export function useRoute(pattern: string): [boolean, Record<string, string>] {
  const pathname = usePathname();
  const params = useNextParams() as Record<string, string>;
  const regex = new RegExp('^' + pattern.replace(/:(\w+)/g, '([^/]+)') + '$');
  const match = regex.test(pathname);
  return [match, match ? params : {}];
}
