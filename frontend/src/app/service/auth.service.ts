import { Observable, of } from 'rxjs';

export class AuthenticationService {

    signin(email: string, password: string): Observable<{ name: string; email: string; token: string }> {

        /*
        This will presumably call a http backend and return the response

        return this.http.post<{{ name: string; email: string }}>(url, { email: email, password: password })
          .pipe(
            map(res => res.body)
          )
        */

        return of({
            name: 'Some Name',
            email: 'some@email.com',
            token: 'tok'
        });
    }

    signout(): Observable<null> {
        return of(null);
    }

}
