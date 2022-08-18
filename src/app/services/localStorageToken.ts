import {InjectionToken} from "@angular/core";

import {LocalStorageInterface} from "../types/localStorage.interface";
import {LocalStorageService} from "./localStorage.service";

export const LOCAL_STORAGE_TOKEN = new InjectionToken<LocalStorageInterface>("Contacts", {
  factory: () => new LocalStorageService()
})
