import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Invite {
  RowKey: string;
  PartitionKey: string;
}

@Injectable({ providedIn: 'root' })
export class InviteService {

  private apiUrl = `${environment.apiBaseUrl}/invites`; 

  constructor(private http: HttpClient) {}

  getInvites(): Observable<Invite[]> {
    return this.http.get<Invite[]>(this.apiUrl);
  }

  addInvite(item: Invite): Observable<Invite> {
    return this.http.post<Invite>(this.apiUrl, item);
  }
}