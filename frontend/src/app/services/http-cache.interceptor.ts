import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  entryTime: number;
  ttl: number;
}

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, CacheEntry>();
  private maxEntries = 100;
  private defaultTTL = 60 * 1000; // 60 seconds

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // only cache GET
    if (req.method !== 'GET' || req.headers.get('Authorization')) {
      return next.handle(req);
    }

    // allow bypass with header
    if (req.headers.get('x-cache-bypass') === 'true') {
      const cleanReq = req.clone({
        headers: req.headers.delete('x-cache-bypass')
      });
      return next.handle(cleanReq);
    }

    const cacheKey = req.urlWithParams;
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached) {
      const age = now - cached.entryTime;

      if (age < cached.ttl) {
        console.log(
          `%c[CACHE HIT]%c ${req.method} ${cacheKey} | idade: ${(age / 1000).toFixed(1)}s`,
          'color: #00c853; font-weight: bold;',
          'color: inherit;'
        );

        return of(cached.response.clone());
      }

      console.log(
        `%c[CACHE EXPIRED]%c ${req.method} ${cacheKey}`,
        'color: #ff9800; font-weight: bold;',
        'color: inherit;'
      );

      this.cache.delete(cacheKey);
    }

    const ttlHeader = req.headers.get('x-cache-ttl');
    const ttl = ttlHeader ? Number(ttlHeader) * 1000 : this.defaultTTL;

    console.log(
      `%c[API REQUEST]%c ${req.method} ${cacheKey}`,
      'color: #2196f3; font-weight: bold;',
      'color: inherit;'
    );

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(
            `%c[CACHE STORE]%c ${req.method} ${cacheKey} | TTL: ${ttl / 1000}s`,
            'color: #9c27b0; font-weight: bold;',
            'color: inherit;'
          );

          this.cache.set(cacheKey, {
            url: cacheKey,
            response: event.clone(),
            entryTime: Date.now(),
            ttl
          });

          console.log(
            `%c[CACHE SIZE]%c ${this.cache.size}/${this.maxEntries} entradas`,
            'color: #607d8b; font-weight: bold;',
            'color: inherit;'
          );

          this.trimCache();
        }
      })
    );
  }

  private trimCache() {
    if (this.cache.size <= this.maxEntries) {
      return;
    }

    const entries = Array.from(this.cache.entries()).sort(
      (a, b) => a[1].entryTime - b[1].entryTime
    );

    while (this.cache.size > this.maxEntries && entries.length) {
      const oldest = entries.shift();

      if (oldest) {
        console.log(
          `%c[CACHE REMOVE]%c ${oldest[0]}`,
          'color: #f44336; font-weight: bold;',
          'color: inherit;'
        );

        this.cache.delete(oldest[0]);
      }
    }
  }

  clear() {
    console.log(
      '%c[CACHE CLEAR]%c Cache completamente limpo',
      'color: #f44336; font-weight: bold;',
      'color: inherit;'
    );

    this.cache.clear();
  }
}