import { Directive, Input, OnInit, ElementRef, Renderer, OnChanges, EventEmitter, Output } from '@angular/core';

export interface Options {
  isInline: boolean;
  isLoading: boolean;
  hasError: boolean;
  msgError: any;
}

@Directive({
  selector: '[loading]'
})


export class LoadingDirective implements OnInit, OnChanges {

  @Output() loaded = new EventEmitter<any>();
  @Input() loading: boolean;
  @Input() inlineOptions: Options;
  @Input() loadingImg: any;
  loadingContent: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {
  }

  ngOnInit() {
    //
  }

  reRenderer() {
    this.removeLoadingContent();
    if (this.loading) {
      if (!this.inlineOptions) {
        // scroll to top when switch page
        // jQuery(window).scrollTop(0);
      }
      this.renderLoadingIcon(!this.inlineOptions);
      // append new above current element
      this.el.nativeElement.appendChild(this.loadingContent, this.el.nativeElement);
    } else {
      // this.removeLoadingContent();
      if (this.inlineOptions) {
        if (this.inlineOptions.hasError) {
          this.renderErrorElm();
        }
      }
      // trick to reset position of widget-action-bottom
      // jQuery(window).trigger('resize');
    }
    setTimeout(() => {
      this.loaded.emit(true);
    }, 0);
  }

  removeLoadingContent() {
    if (this.loadingContent) {
      this.el.nativeElement.removeChild(this.loadingContent);
      this.loadingContent = null;
    }
  }

  renderErrorElm() {
    this.loadingContent = this.renderer.createElement(this.el.nativeElement, 'div');
    // setting class name is text-na
    this.loadingContent.setAttribute('class', 'text-danger');
    this.loadingContent.innerHTML = this.inlineOptions.msgError ? this.inlineOptions.msgError : 'API server not response.';
  }

  renderLoadingIcon(isLarge: boolean = true) {
    let cls: String = 'loading-icon';
    if (isLarge) {
      cls = `${cls} icon-large`;
    } else {
      cls = `${cls} icon-inline`;
    }
    if (this.loadingImg) {
      cls = `${cls} ${this.loadingImg.split('.')[0]}`;
    }
    this.loadingContent = this.renderer.createElement(this.el.nativeElement, 'img');
    // setting class name is text-na
    this.loadingContent.setAttribute('src', `/assets/img/${this.loadingImg || 'loading.svg'}`);
    this.loadingContent.setAttribute('class', cls);
    this.loadingContent.setAttribute('alt', 'Loading...');
  }

  ngOnChanges() {
    this.reRenderer();
  }

}
