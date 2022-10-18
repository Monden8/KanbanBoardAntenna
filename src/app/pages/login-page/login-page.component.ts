import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

interface LoginForm {
  name: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'kanban-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public hasError: string | null;
  public form = new FormGroup<LoginForm>({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true
    })
  });

  constructor(private authService: AuthService, private router: Router) {
    this.hasError = null;
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/board']);
    }
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.authService.logIn(this.form.getRawValue());
    this.authService.errorMessage.subscribe((errorMsg) => {
      this.hasError = errorMsg;
      setInterval(() => {
        this.hasError = null;
      }, 5000);
    });
    this.router.navigate(['/board']);
  }

  ngOnDestroy(): void {
    this.authService.errorMessage.unsubscribe();
  }
}
