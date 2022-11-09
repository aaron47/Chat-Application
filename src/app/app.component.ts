import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-app';

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  signOut() {
    this.authService.signOut().subscribe({
      next: () => this.router.navigate(['/signin']),
    });
  }
}
