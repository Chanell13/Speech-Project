import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appMicro]'
})
export class MicroDirective {

  // tslint:disable-next-line: deprecation
  constructor(private el: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, 'backgroundImage', './assets/descarga.png');

  }


}
