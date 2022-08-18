import {Directive, ElementRef, Input, Renderer2} from "@angular/core";

import {ContactsInterface} from "../types/contacts.interface";

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {
  @Input() searchedWords: string[];
  @Input() text: ContactsInterface;
  @Input() objectType: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(): void {
    if (!this.searchedWords || !this.searchedWords.length) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text[this.objectType]);
      return
    }
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.getFormattedText());
  }

  private getFormattedText(): string {
    const regex = new RegExp(`(${ this.searchedWords.join('|') })`, 'gi');
    return this.text[this.objectType].replace(regex, `<span class='highlight'>$1</span>`);
  }
}
