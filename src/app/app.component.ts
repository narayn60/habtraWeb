import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { finalize } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './core/auth/auth.service';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {environment} from '../environments/environment';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'habtraWeb';

  private authService: AuthService = inject(AuthService);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  ngOnInit() {
    const credentials = this.authService.getCredentials();

    if (credentials) {
      this.http.get(environment.apiUrl + '/api/user').subscribe({
        next: () => {
          this.router.navigate(['/habits']);
        },
        error: () => {
          this.authService.clearCredentials();
          this.router.navigate(['/login'])
        }
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

  logout() {
    this.http.post(environment.apiUrl + '/logout', {}).pipe(
      finalize(() => {
        this.authService.clearCredentials();
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }

  isAuthenticated(): boolean {
    return !!this.authService.getCredentials();
  }
}
