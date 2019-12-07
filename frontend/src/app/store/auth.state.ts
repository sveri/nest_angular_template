import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AuthenticationService } from '../service/auth.service';
import { tap } from 'rxjs/operators';

export class AuthStateModel {
    // if you have an extra token like authorization, you can add it here plus any other user information you might want to store
    token?: string; // refreshToken?: string;
    email?: string;
    name?: string;
}


export class Signin {
    static readonly type = '[Auth] Signin';
    // these are parameters to pass to the action when dispatching it also known as metadata
    // they work just like normal parameters in normal parameters
    constructor(public email: string, public password: string) { }
}

export class Signout {
    static readonly type = '[Auth] Signout';
}


@State<AuthStateModel>({
    name: 'auth' // the name of our state
})
export class AuthState {

    constructor(private authService: AuthenticationService) { }

    @Selector()
    static token(state: AuthStateModel) {
        return state.token;
    }

    @Selector()
    static userDetails(state: AuthStateModel) {
        return {
            name: state.name,
            email: state.email
        };
    }

    //     @Selector()
    //   static refreshToken(state: AuthStateModel) {
    //     return state.refreshToken;
    //   }

    @Action(Signin)
    login(
        { patchState }: StateContext<AuthStateModel>,
        { email, password }: Signin
    ) {
        return this.authService.signin(email, password).pipe(
            tap(result => {
                patchState({
                    token: result.token,
                    name: result.name,
                    email: result.email
                });
            })
        );
    }

    @Action(Signout)
    logout({ setState, getState }: StateContext<AuthStateModel>) {
        const { token } = getState();
        return this.authService.signout().pipe(
            tap(_ => {
                setState({});
            })
        );
    }
}
