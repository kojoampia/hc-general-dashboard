import { Component } from '@angular/core';
import dayjs from 'dayjs/esm';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  year = dayjs().year();
}
