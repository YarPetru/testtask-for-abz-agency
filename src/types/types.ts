export interface IUserData {}

export interface IPosition {
  id: number;
  name: string;
}

export interface IPositionsRespond {
  success: boolean;
  positions?: IPosition[];
  message?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface IUsersRespond {
  success: boolean;
  message?: string;
  fails?: { count: string[]; page: string[] };
  page?: number;
  total_pages?: number;
  total_users?: number;
  count?: number;
  links?: { next_url: string | null; prev_url: string | null };
  users?: IUser[];
}

export interface ITokenRespond {
  success: boolean;
  token: string;
}
