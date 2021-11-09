import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { NotificationService } from '../services/notification.service';
import { Logger } from '../logger.service';
const log = new Logger('ErrorHandler');

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);

    let message: string;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      notifier.showError(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }
    // Always log errors
    log.error(message);
    console.error(error);
  }
}
