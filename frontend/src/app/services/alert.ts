import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertConfig {
  type: 'success' | 'error' | 'warning' | 'confirm';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new Subject<AlertConfig | null>();
  alert$ = this.alertSubject.asObservable();

  success(title: string, message: string) {
    this.alertSubject.next({
      type: 'success',
      title,
      message,
      confirmText: 'OK'
    });
  }

  error(title: string, message: string) {
    this.alertSubject.next({
      type: 'error',
      title,
      message,
      confirmText: 'OK'
    });
  }

  warning(title: string, message: string) {
    this.alertSubject.next({
      type: 'warning',
      title,
      message,
      confirmText: 'OK'
    });
  }

  confirm(title: string, message: string, onConfirm: () => void, onCancel?: () => void) {
    this.alertSubject.next({
      type: 'confirm',
      title,
      message,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm,
      onCancel
    });
  }

  close() {
    this.alertSubject.next(null);
  }
}
