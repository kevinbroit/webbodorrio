import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { InviteListComponent } from './app/components/invite-list/invite-list.component';

bootstrapApplication(InviteListComponent, appConfig)
  .catch((err) => console.error(err));
