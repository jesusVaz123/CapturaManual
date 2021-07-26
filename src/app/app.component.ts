import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'linsce-baZ';

  @HostBinding('class') ComponentCssClass: any;

  constructor(
    private router: Router,
    public overlayContainer: OverlayContainer
    ) { }

  public onSetTheme(e: string){
    this.overlayContainer.getContainerElement().classList.add(e);
    this.ComponentCssClass = e;
  }

  selectAcquirer(){
    this.onSetTheme('amex-theme');
    this.router.navigate(['/select_acquirer']);
  }

}
