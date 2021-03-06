/* eslint-disable unused-imports/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from '../../main/home/home.component';
import { AuthService } from '../services/auth.service';

/**
 * Guardián para rutas que NO requieren autenticación (por ejemplo, el login).
 *
 * Si el usuario está autenticado, será re-direccionado a la página principal.
 */
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.authService.accessToken) {
      this.router.navigateByUrl(`/${HomeComponent.PATH}`);
      return false;
    }
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    if (this.authService.accessToken) {
      this.router.navigateByUrl(`/${HomeComponent.PATH}`);
      return false;
    }
    return true;
  }
}
