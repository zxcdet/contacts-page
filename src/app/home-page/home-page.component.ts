import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {filter, map, Subject, takeUntil} from "rxjs";

import {DialogComponent} from "../dialog/dialog.component";
import {LOCAL_STORAGE_TOKEN} from "../services/localStorageToken";
import {LocalStorageInterface} from "../types/localStorage.interface";
import {ContactsInterface} from "../types/contacts.interface";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePageComponent implements OnInit, OnDestroy {
  public contactsList: ContactsInterface[] = []
  public length: number
  public searchStr: string[]
  public readonly searchInput = new FormControl()
  public readonly destroy$ = new Subject<boolean>()

  constructor(
    public dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE_TOKEN) private readonly localStorageService: LocalStorageInterface
  ) {
  }

  ngOnInit(): void {
    this.setDefaultContacts()
    this.contactsList = JSON.parse(this.localStorageService.getContacts('contacts')!)
    this.length = this.contactsList.length
    this.initializeValue()
  }

  public emitContacts($event): void {
    let selectedContaacts = this.contactsList.find(value => value?.id === $event?._id)
    const index = this.contactsList.indexOf(selectedContaacts)
    this.contactsList[index] = $event.action
    this.localStorageService.setContacts('contacts', JSON.stringify(this.contactsList))
  }

  public deleteContacts($event: number): void {
    const selectedContaacts = this.contactsList.find(value => value?.id === $event)
    const index = this.contactsList.indexOf(selectedContaacts)
    this.contactsList.splice(index, 1)
    this.localStorageService.setContacts('contacts', JSON.stringify(this.contactsList))
  }

  public opeenDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '850px',
      height: '500px',
      data: {
        id: Date.now()
      }
    })

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((value) => !!value)
      ).subscribe((result: ContactsInterface) => {
        this.changeDetectorRef.markForCheck();
        this.contactsList.push(result)
        this.localStorageService.setContacts('contacts', JSON.stringify(this.contactsList))
      })
  }

  private setDefaultContacts(): void {
    const currentState = this.localStorageService.getContacts('contacts')
    if (currentState) {
      return
    } else {
      this.localStorageService.setContacts('contacts', JSON.stringify([
        {
          firstName: 'User1',
          lastName: 'SomeUsser',
          phone: +380987627228,
          email: 'some@gmail.com',
          description: 'create user',
          date: new Date(2022, 1),
          country: 'Ukraine',
          city: 'Lviv',
          skils: 'create app',
          id: 1
        },
        {
          firstName: 'User2',
          lastName: 'New',
          phone: +380996727228,
          email: 'so123me@gmail.com',
          description: 'some',
          date: new Date(2022, 1),
          country: 'Ukraine',
          city: 'Kiev',
          skils: 'create app',
          id: 2,
        },
        {
          firstName: 'User3',
          lastName: 'SomeUser',
          phone: +38096317228,
          email: 'so123me@gmail.com',
          description: 'news',
          date: new Date(2022, 1),
          country: 'Ukraine',
          city: 'Kiev',
          skils: 'create app',
          id: 3,
        }
      ]))
    }
  }

  private initializeValue(): void {
    this.searchInput.valueChanges.pipe(
      map((search: string) => search.trim().split(' ')),
      takeUntil(this.destroy$)
    ).subscribe((value: string[]) => {
      this.searchStr = value
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
