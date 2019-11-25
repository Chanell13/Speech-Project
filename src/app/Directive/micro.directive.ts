import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appMicro]'
})
export class MicroDirective {

  constructor(private el: ElementRef,
              // tslint:disable-next-line: deprecation
              private renderer: Renderer) { renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow'); }

}
