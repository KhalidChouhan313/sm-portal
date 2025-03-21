import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { QrPageComponent } from './screens/qr-page/qr-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNavbar: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateNavbarVisibility();
      });
  }

  shouldShowNavbar(): boolean {
    return (
      this.activatedRoute.firstChild?.snapshot.routeConfig?.path !== 'login' &&
      this.activatedRoute.firstChild?.snapshot.routeConfig?.path !== 'signup'
    );
  }

  private updateNavbarVisibility(): void {
    this.showNavbar = this.shouldShowNavbar();
  }
}
