import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  private secretKey = environment.secretKey;
  private iv = CryptoJS.lib.WordArray.random(16);

  constructor() {}

  encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, this.secretKey, this.iv).toString();
  }

  decryptPassword(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey, this.iv);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
