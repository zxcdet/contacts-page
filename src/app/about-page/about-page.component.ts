import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CdkTableDataSourceInput} from "@angular/cdk/table";

import {LOCAL_STORAGE_TOKEN} from "../services/localStorageToken";
import {LocalStorageInterface} from "../types/localStorage.interface";
import {ContactsInterface} from "../types/contacts.interface";


@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AboutPageComponent implements OnInit {
  public allList: ContactsInterface[] = []
  public contactList: ContactsInterface
  public displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'description', 'date', 'country', 'city', 'skils']
  public dataSource: CdkTableDataSourceInput<ContactsInterface>

  constructor(
    @Inject(LOCAL_STORAGE_TOKEN) private readonly localStorageService: LocalStorageInterface,
    private readonly activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetch()
  }

  private fetch(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id')
    this.allList = JSON.parse(this.localStorageService.getContacts('contacts'))
    const select = this.allList.find(value => value?.id === Number(id))
    this.contactList = select
    this.dataSource = [this.contactList]
  }
}
