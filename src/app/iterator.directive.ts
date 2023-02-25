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
    
    // Please activate one of the following methods to understand what I want to achieve.

    // ---------------- SMART UPDATE ---------------- 
    // This smartUpdate() is expected to produce 5 rotating rows
    // and the DOM objects are kept rather than being destroyed and recreated. 
    // Unfortunately, the current implementation failed to do so.
    
    // this.smartUpdate();
    
    
    // ---------------- STUPID UPDATE ---------------- 
    // This update successfully produce 5 rotating rows but
    // it fails to avoid the DOM objects from being destroyed and recreated.
    
    this.update();
  
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
