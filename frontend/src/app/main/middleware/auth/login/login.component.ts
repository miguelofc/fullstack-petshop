import { Component } from '@angular/core';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    email: string = '';
    password: string = '';
    loading: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {}

    async login(): Promise<void> {
        console.log('Tentando logar com:', this.email, this.password);

        if (!this.email || !this.password) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Atenção',
                detail: 'Preencha o email e a senha.'
            });
            return;
        }

        this.loading = true;

        try {
            const token = await this.authService.login({
                email: this.email,
                password: this.password
            });

            if (token) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Login realizado!'
                });

                this.router.navigate(['/']); // redireciona para o dashboard
            }

        } catch (error: any) {
            console.error('Erro no LoginComponent:', error);

            this.messageService.add({
                severity: 'error',
                summary: 'Erro no login',
                detail: error?.error?.message || 'Credenciais inválidas'
            });

        } finally {
            this.loading = false;
        }
    }
}