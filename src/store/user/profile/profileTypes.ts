export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface ProfileState {
  data: Profile | null;
  isLoading: boolean;
}
