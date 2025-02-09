import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatCard, MatCardActions, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

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
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  hide = signal(true);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    console.log("called");
    console.log(this.loginForm.value);
  }
}
