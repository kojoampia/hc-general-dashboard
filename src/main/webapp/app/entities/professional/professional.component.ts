import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IFeature } from '../GeneralService/feature/feature.model';

@Component({
  selector: 'jhi-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit, OnDestroy {
  // Define the professional component
  // This component is used to display professional-related professionals and functionalities

  // It can include user accounts, dashboards, calendars, etc.
  // The component is initialized with default values and can be extended with more professionals later
  professional: IFeature | null = null;
  private readonly destroy$ = new Subject<void>();
  
  constructor(protected activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professional }) => {
      this.professional = professional;
    });
  }
  ngOnDestroy(): void {
    // Clean up subscriptions or resources when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }


}
