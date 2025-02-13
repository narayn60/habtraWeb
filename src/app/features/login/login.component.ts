import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatCard, MatCardActions, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup,
} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInput,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatCardActions,
    MatButton,
    ReactiveFormsModule,
    MatCardFooter
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  hide = signal(true);
  errorMessage = '';
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    protected router: Router,
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    this.authService.setCredentials(this.loginForm.value.username, this.loginForm.value.password);

    this.http.get('http://localhost:8080/api/user').subscribe({
      next: (response) => {
        console.log('Login successfull', response);
        this.router.navigate(['/habits']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
        this.authService.clearCredentials(); // Clear credentials on failure
      }
    });
  }
}
