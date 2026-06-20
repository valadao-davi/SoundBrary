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
      const cleanReq = req.clone({ headers: req.headers.delete('x-cache-bypass') });
      return next.handle(cleanReq);
    }

    const cacheKey = req.urlWithParams;
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached) {
      if (now - cached.entryTime < cached.ttl) {
        return of(cached.response.clone());
      }
      this.cache.delete(cacheKey);
    }

    // determine ttl from header (seconds) or default
    const ttlHeader = req.headers.get('x-cache-ttl');
    const ttl = ttlHeader ? Number(ttlHeader) * 1000 : this.defaultTTL;

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(cacheKey, { url: cacheKey, response: event.clone(), entryTime: Date.now(), ttl });
          this.trimCache();
        }
      })
    );
  }

  private trimCache() {
    if (this.cache.size <= this.maxEntries) {
      return;
    }
    // remove oldest entries until size <= maxEntries
    const entries = Array.from(this.cache.entries()).sort((a, b) => a[1].entryTime - b[1].entryTime);
    while (this.cache.size > this.maxEntries && entries.length) {
      const oldest = entries.shift();
      if (oldest) {
        this.cache.delete(oldest[0]);
      }
    }
  }

  // optional API for runtime invalidation
  clear() {
    this.cache.clear();
  }
}
