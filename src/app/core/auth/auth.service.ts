import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly CREDENTIALS_KEY = 'habtra_auth_credentials';

  setCredentials(username: string | null | undefined, password: string | null | undefined): void {
    const credentials = btoa(username + ':' + password);
    localStorage.setItem(this.CREDENTIALS_KEY, credentials);
  }

  getCredentials(): string | null {
    return localStorage.getItem(this.CREDENTIALS_KEY);
  }

  clearCredentials(): void {
    localStorage.removeItem(this.CREDENTIALS_KEY);
  }
}
