import {
  Directive,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[paForOf]',
})
export class PaIteratorDirective implements OnInit, OnChanges, DoCheck {
  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>
  ) {}

  @Input()
  paForOf: any;

  ngOnInit(): void {
    this.update();
  }

  private update() {
    this.container.clear();

    for (let i = 0; i < this.paForOf.length; ++i) {
      this.container.createEmbeddedView(this.template, {
        $implicit: this.paForOf[i],
        odd: i % 2 === 1,
        even: i % 2 === 0,
        first: i === 0,
        last: i === this.paForOf.length - 1,
        index: i,
      });
    }
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
    // this.update();
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
    this.update();
  }
}
