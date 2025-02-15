import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { finalize } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './core/auth/auth.service';
import {NavigationComponent} from './core/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'habtraWeb';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const credentials = this.authService.getCredentials();

    if (credentials) {
      this.http.get('http://localhost:8080/api/user').subscribe({
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
    this.http.post('http://localhost:8080/logout', {}).pipe(
      finalize(() => {
        this.authService.clearCredentials();
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }
}
