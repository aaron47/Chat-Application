import { SignUpCredentials, SignInCredentials } from './auth.model';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedin$ = authState(this.firebaseAuthService);

  constructor(
    private readonly firebaseAuthService: Auth,
    private readonly http: HttpClient
  ) {}

  getStreamToken() {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/getStreamToken`, {
        user: this.getCurrentUser(),
      })
      .pipe(map((res) => res.token));
  }

  getCurrentUser(): User {
    return this.firebaseAuthService.currentUser!;
  }

  signIn({ email, password }: SignInCredentials): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuthService, email, password)
    );
  }

  signUp({ email, password, displayName }: SignUpCredentials) {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuthService, email, password)
    ).pipe(
      switchMap(({ user }) =>
        forkJoin([
          updateProfile(user, { displayName }),
          this.http.post(`${environment.apiUrl}/createStreamUser`, {
            user: { ...user, displayName },
          }),
        ])
      )
    );
  }

  signOut(): Observable<void> {
    return from(this.firebaseAuthService.signOut());
  }
}
