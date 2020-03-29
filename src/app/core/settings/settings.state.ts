import { AppState } from '../core.state';

export interface SettingsState {
    authenticated: boolean;
}

export interface State extends AppState {
    settings: SettingsState;
}
