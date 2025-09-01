import { Country } from './country';

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  country: Country;
}
