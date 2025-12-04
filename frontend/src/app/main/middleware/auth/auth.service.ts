import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private apiUrl = environment.baseUrl + '/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToken();
  }

  async login(credentials: LoginCredentials): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      );

      if (response && response.token) {
        await this.setToken(response.token);
        return response.token;
      } else {
        throw new Error('Token inválido do servidor');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async setToken(token: string): Promise<void> {
    if (!token) return;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/auth/login']);
    window.location.reload();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      return decoded.exp && decoded.exp > now;
    } catch {
      this.removeToken();
      return false;
    }
  }

  private checkToken(): void {
    const token = this.getToken();
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const expiry = new Date(decoded.exp * 1000);

      if (expiry < new Date()) {
        this.logout();
      }
    } catch {
      this.logout();
    }
  }
}