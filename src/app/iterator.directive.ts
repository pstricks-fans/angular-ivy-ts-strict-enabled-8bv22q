import {
  Directive,
  DoCheck,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnInit,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[paForOf]',
})
export class PaIteratorDirective implements OnInit, OnChanges, DoCheck {
  private differ!: IterableDiffer<any>;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>,
    private differs: IterableDiffers
  ) {}

  @Input()
  paForOf: any;

  @Input()
  paForTrackBy?: TrackByFunction<any>;

  ngOnInit(): void {
    console.log('ngOnInit');
    this.differ = <IterableDiffer<any>>(
      this.differs.find(this.paForOf).create(this.paForTrackBy)
    );
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
    this.update();
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
    // this.smartUpdate();
    this.update();// this update() does destroy and recreate DOM objects that I want to void.
  }

  private update() {
    this.container.clear();

    for (let i = 0; i < this.paForOf.length; ++i) {
      this.container.createEmbeddedView(this.template, this.getContext(i));
    }
  }

  private smartUpdate() {
    const changes: IterableChanges<any> | null = this.differ.diff(this.paForOf);
    if (changes === null) return;

    changes.forEachAddedItem((record) => {
      if (record.currentIndex === null) return;

      this.container.createEmbeddedView(
        this.template,
        this.getContext(record.currentIndex)
      );
    });
  }

  private getContext(idx: number): Object | undefined {
    return {
      $implicit: this.paForOf[idx],
      odd: idx % 2 === 1,
      even: idx % 2 === 0,
      first: idx === 0,
      last: idx === this.paForOf.length - 1,
      index: idx,
    };
  }
}
