import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../../auth/pages/login/login.component';
import { RegisterComponent } from '../../../auth/pages/register/register.component';
import { AuthService } from '../../../auth/services/auth.service';
import { DiscoverComponent } from '../../../discover/discover.component';
import { HomeComponent } from '../../../home/home.component';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly title: string = 'descubre perfiles profesionales';
  menuItems: MenuItem[] = [];

  constructor(public readonly authService: AuthService) {}

  ngOnInit(): void {
    console.log('hey');
    if (this.authService.accessToken) {
      this.menuItems = [
        {
          title: 'Descubrir Perfil Profesional',
          icon: 'rocket_launch',
          path: this.discoverRoute,
        },
      ];
      return;
    }
    this.menuItems = [
      {
        title: 'Descubrir Perfil Profesional',
        icon: 'rocket_launch',
        path: this.discoverRoute,
      },
      {
        title: 'Registrarme',
        icon: 'supervisor_account',
        path: this.registerRoute,
      },
      {
        title: 'Iniciar sesión',
        icon: 'login',
        path: this.loginRoute,
      },
    ];
  }
  get homeRoute() {
    return `/${HomeComponent.PATH}`;
  }

  get registerRoute() {
    return `/${RegisterComponent.PATH}`;
  }

  get loginRoute() {
    return `/${LoginComponent.PATH}`;
  }

  get discoverRoute() {
    return `/${DiscoverComponent.PATH}`;
  }
}
