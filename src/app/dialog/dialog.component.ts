import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ContactsInterface} from "../types/contacts.interface";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogComponent implements OnInit {
  public form: FormGroup;
  public disabled: boolean

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ContactsInterface
  ) {}

  ngOnInit(): void {
    this.initialiForm()
  }

  public onClick(): void {
      this.dialogRef.close({
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        phone: this.form.get('phone')?.value,
        email: this.form.get('email')?.value,
        description: this.form.get('description')?.value,
        date: this.form.get('date')?.value,
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
        skils: this.form.get('skils')?.value,
        id: this.data.id,
      })
  }

  public onClickCancel(): void {
    this.dialogRef.close()
  }

  private initialiForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.data.firstName ?? '', [Validators.required]],
      lastName: [this.data.lastName ?? '', [Validators.required]],
      phone: [this.data.phone ?? '', [Validators.required]],
      email: [this.data.email ?? '', [Validators.required, Validators.email]],
      description: [this.data.description ?? '', [Validators.required]],
      date: [this.data.date ?? '', [Validators.required]],
      country: [this.data.country ?? '', [Validators.required]],
      city: [this.data.city ?? '', [Validators.required]],
      skils: [this.data.skils ?? '', [Validators.required]]
    })
  }

}
