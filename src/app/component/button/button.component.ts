import { ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() type: string;
  @Input() text: string;
  @Input() disabled: boolean;
  @Input() icon: string;
  @Input()
  set font(fontSize: string) {
    this.element.nativeElement.style.setProperty('--button-font_size', fontSize);
  }

  @Output()
  clicked = new EventEmitter<string>();

  constructor(private element: ElementRef) { }

  ngOnInit(): void {

  }

  action(e) {
    console.log("Action button ", e);
    this.clicked.emit('Botón');
  }

}
