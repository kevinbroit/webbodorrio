import { Component, OnInit } from '@angular/core';
import { Invite, InviteService } from '../../../services/invite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'invite-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-list.component.html'
})
export class InviteListComponent implements OnInit {
  invites: Invite[] = [];
  newInviteTitle = '';
  selectedInvite: Invite | null = null;

  constructor(private itemService: InviteService) {}

  ngOnInit(): void {
    console.log('loading invites');
    this.loadInvites();
  }

  selectInvite(invite: Invite): void {
    this.selectedInvite = this.selectedInvite === invite ? null : invite;
  }

  loadInvites(): void {
    this.itemService.getInvites().subscribe(data => this.invites = data);
  }

  addInvite(): void {
    if (!this.newInviteTitle.trim()) return;
    const item = { RowKey: this.newInviteTitle, PartitionKey: this.getNextId() };
    this.itemService.addInvite(item).subscribe(added => {
      this.invites.push(added);
      this.newInviteTitle = '';
    });
  }

  deleteInvite(invite: Invite): void {
    this.invites = this.invites.filter(i => i !== invite);
    if (this.selectedInvite === invite) {
      this.selectedInvite = null;
    }
  }

  getNextId(): string {
    if (!this.invites || this.invites.length === 0) return '1';
  
    const maxRowKey = this.invites
      .map(invite => parseInt(invite.PartitionKey, 10))
      .filter(n => !isNaN(n))
      .reduce((max, current) => Math.max(max, current), 0);
  
    return (maxRowKey + 1).toString();
  }
}