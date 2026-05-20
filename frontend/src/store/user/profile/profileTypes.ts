export interface Profile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  avatar?: string;
}

export interface ProfileState {
  data: Profile | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}
