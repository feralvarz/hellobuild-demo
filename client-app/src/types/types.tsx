// shared types
export interface IUserFormData {
  username: string;
  password: string;
}

export type UserForm = {
  username: string | null;
  password: string | null;
};

export interface ICalEvent {
  id: string;
  summary: string;
  htmlLink: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  [key: string]: any;
}
