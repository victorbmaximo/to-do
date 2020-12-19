import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: false }) modal: ElementRef;

  @ViewChild('modalContent', { static: false }) modalContent: ElementRef;

  isFirstOpen = true;

  @Input() id: string;

  private element: any;

  @Input() title = '';

  @Input() subtitle = '';

  @Input() close = true;

  @Input() foot = false;

  @Input() closedBar = false;

  @Input() rootClass = '';

  @Input() childClass = '';

  @Input() options = {};

  @Input() activeModal = false;

  @Input() disableScroll = false;

  @Input() scrollEvent = false;

  @Input() dynamicContent = false;

  @Output() eventClosedModal: EventEmitter<boolean> = new EventEmitter();

  @Output() scrollModal: EventEmitter<number> = new EventEmitter();

  constructor(private el: ElementRef, private modalService: ModalService) {
    if (el) {
      this.element = el.nativeElement;
    }
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('Modal must have an id');
    }


    document.body.appendChild(this.element);

    this.modalService.add(this);
  }


  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
    document.querySelector('html').classList.remove('no-scroll');
  }


  openModal(): void {

    this.activeModal = true;

    if (this.disableScroll) {
      document.querySelector('html').classList.add('no-scroll');
    }


  }

  closeModal(): void {

    this.activeModal = false;
    if (this.disableScroll) {
      document.querySelector('html').classList.remove('no-scroll');
    }
  }

}