import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showFiller = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
    ) { }

  logout() {
    this.router.navigate(['/login']);
    this.  toast.show('Até logo!', {
      icon: '🫡',
    });
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
