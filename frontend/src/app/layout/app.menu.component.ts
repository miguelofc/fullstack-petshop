import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Início',
                icon: 'pi pi-home',
                routerLink: ['/']
            },
            {
                label: 'Opções',
                items: [
                    { label: 'Pets', icon: 'fa-solid fa-paw', routerLink: ['/main/pet'] },
                    { label: 'Tutores', icon: 'pi pi-fw pi-user', routerLink: ['/main/tutor'] },
                    { label: 'Serviços', icon: 'pi pi-fw pi-tags', routerLink: ['/main/service'] },
                    // Item que veio da Main (Ricardo)
                    { label: 'Produtos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/main/product'] },
                    // Item que veio da Branch (Guilherme)
                    { label: 'Agendamentos', icon: 'pi pi-fw pi-calendar', routerLink: ['/main/agendamento'] }
                ]
            },
            
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    }
                ]
            }
        ];
    }
}