import {InjectionToken} from "@angular/core";

import {LocalStorageInterface} from "../types/localStorage.iinterface";
import {LocalStorageService} from "./localStorage.service";

export const CONTACTS_TOKEN = new InjectionToken<LocalStorageInterface>("Contacts", {
  factory: () => new LocalStorageService()
})
