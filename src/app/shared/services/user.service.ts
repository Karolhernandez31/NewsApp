import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import * as shortUUID from 'short-uuid';
import { LoginRequest } from 'src/app/interfaces/login-request';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private db = "users";

  constructor(private encryptSrv: EncryptService) {}

  registerUser(user: Omit<User, 'id' | 'password'> & { password: string }): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.db) || '[]');

    if (users.find(u => u.email === user.email)) return false;

    const newUser: User = {
      id: shortUUID.generate(),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: this.encryptSrv.encryptPassword(user.password),
      country: user.country
    };

    users.push(newUser);
    localStorage.setItem(this.db, JSON.stringify(users));
    return true;
  }

  updateUser(updatedUser: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.db) || '[]');
    const index = users.findIndex(u => u.id === updatedUser.id);

    if (index === -1) return false;

    users[index] = { ...users[index], ...updatedUser };
    localStorage.setItem(this.db, JSON.stringify(users));
    localStorage.setItem('loggedUser', JSON.stringify(users[index]));
    return true;
  }

  findAll(): User[] {
    return JSON.parse(localStorage.getItem(this.db) || '[]');
  }

  onLogin(loginRequest: LoginRequest): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.db) || '[]');
    const user = users.find(u => u.email === loginRequest.email);

    if (user && this.encryptSrv.decryptPassword(user.password) === loginRequest.password) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      return true;
    }
    return false;
  }
}
