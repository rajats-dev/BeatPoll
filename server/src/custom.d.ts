interface AuthUser {
  id: string;
  name: string;
  email: string;
  google_id: string;
  profilePic?: string;
  // Add other relevant user properties here
}

declare namespace Express {
  export interface Request {
    user?: AuthUser;
  }
}
