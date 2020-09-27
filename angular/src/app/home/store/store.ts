export interface State {
  createdAt: number;
  version: number;
  welcome: string;
  aboutme: string;
  timeline: string;
  accomplishment: string;
  contact: string;
  loading?: boolean
}

export const initialState: State = {
  createdAt: null,
  version: 0,
  welcome: '',
  aboutme: '',
  timeline: '',
  accomplishment: '',
  contact: ''
}