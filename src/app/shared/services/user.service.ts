import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/interfaces/user';
import * as shortUUID from 'short-uuid';
import { LoginRequest } from 'src/app/interfaces/login-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private secretKey = environment.secretKey;
  private iv = CryptoJS.lib.WordArray.random(16);
  private db = "users";

  constructor() {}

  private encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, this.secretKey, this.iv).toString();
  }

  private decryptPassword(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey, this.iv);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  registerUser(user: Omit<User, 'id' | 'password'> & { password: string }): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.db) || '[]');

    if (users.find(u => u.email === user.email)) return false;

    const newUser: User = {
      id: shortUUID.generate(),
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: this.encryptPassword(user.password),
      country: user.country
    };

    users.push(newUser);
    localStorage.setItem(this.db, JSON.stringify(users));
    return true;
  }

  findAll(): User[] {
    return JSON.parse(localStorage.getItem(this.db) || '[]');
  }

  onLogin(loginRequest: LoginRequest): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.db) || '[]');
    const user = users.find(u => u.email === loginRequest.email);

    if (user && this.decryptPassword(user.password) === loginRequest.password) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      return true;
    }
    return false;
  }
}
