import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appMicro]'
})
export class MicroDirective {

  // tslint:disable-next-line: deprecation
  constructor(private el: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    // tslint:disable-next-line: prefer-const
    let myImage = new Image(100, 200);
    myImage.src = '/assets/imagen.png';
    console.log(myImage);
    console.log(renderer);
  }


}
