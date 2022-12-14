import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {filter, Subject, takeUntil} from "rxjs";

import {ContactsInterface} from "../types/contacts.interface";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-card-contacts',
  templateUrl: './card-contacts.component.html',
  styleUrls: ['./card-contacts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardContactsComponent implements OnDestroy {
  @Input() contacts: ContactsInterface
  @Input() str: string[]

  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>;
  @Output() updateEvent: EventEmitter<{ action: ContactsInterface, _id: number }> = new EventEmitter<{ action: ContactsInterface, _id: number }>;

  public readonly destroy$ = new Subject<boolean>()

  constructor(public dialog: MatDialog) {
  }

  public onDelete($event: Event): void {
    $event.stopPropagation()
    this.deleteEvent.emit(this.contacts?.id)
  }

  public openDialog($event: Event): void {
    $event.stopPropagation()
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '850px',
      height: '500px',
      data: this.contacts
    })

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((value) => !!value)
      ).subscribe(result => {
          this.updateEvent.emit({action: result, _id: this.contacts.id})
        })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
