import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import {
  DEFAULT_ALERT_TITLE,
  DEFAULT_CANCEL_BUTTON_TEXT,
  DEFAULT_CONFIRM_BUTTON_TEXT,
  DEFAULT_ERROR_TEXT,
  DEFAULT_ERROR_TITLE,
  DEFAULT_SUCCESS_TITLE,
} from '../constants/alert.constant';

export interface AlertOptions {
  title?: string;
  text?: string;
  html?: string;
  icon?: SweetAlertIcon;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  simple({ title, text, icon }: AlertOptions) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: DEFAULT_CONFIRM_BUTTON_TEXT,
    });
  }

  success({ title, text, html }: AlertOptions = {}) {
    title ??= DEFAULT_SUCCESS_TITLE;
    return Swal.fire({
      icon: 'success',
      title,
      text,
      html,
      confirmButtonText: DEFAULT_CONFIRM_BUTTON_TEXT,
    });
  }

  error({ title, text, html }: AlertOptions = {}) {
    title ??= DEFAULT_ERROR_TITLE;
    if (title === DEFAULT_ERROR_TITLE) {
      text = DEFAULT_ERROR_TEXT;
    }

    return Swal.fire({
      icon: 'error',
      title,
      text,
      html,
      confirmButtonText: DEFAULT_CONFIRM_BUTTON_TEXT,
    });
  }

  warning(title: string = DEFAULT_ALERT_TITLE, text?: string) {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: DEFAULT_CONFIRM_BUTTON_TEXT,
      cancelButtonText: DEFAULT_CANCEL_BUTTON_TEXT,
    });
  }
}
