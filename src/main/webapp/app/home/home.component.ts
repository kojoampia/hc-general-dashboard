import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { Feature } from 'app/entities/GeneralService/feature/feature.model';
import { FeatureItem } from 'app/entities/GeneralService/feature-item/feature-item.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  errorMessage = 'null';
  account: Account | null = null;
  professional: Feature = new Feature();
  patient: Feature = new Feature();
  vendor: Feature = new Feature();
  admin: Feature = new Feature();

  private readonly destroy$ = new Subject<void>();


  constructor(private accountService: AccountService, private router: Router) {
    this.professional.name = 'Professional';
    this.patient.name = 'Patient';
    this.vendor.name = 'Vendor';
    this.admin.name = 'Admin';
  }

  ngOnInit(): void {
    this.initFeatures();
    // Get the current account information
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  initFeatures(): void {
    // Initialize the features and their items
    this.initProfessional();
    this.initPatient();
    this.initVendor();
    this.initAdmin();

  }

  initProfessional(): void {
    // Initialize the professional feature with its items
    this.professional.id = 'professional';
    this.professional.name = 'Professional';
    this.professional.url = '/features/professional';
    this.professional.items = [];
    this.professional.items.push(this.getFeatureItem('professional_user-account', 'UserAccount', this.professional.url));
    this.professional.items.push(this.getFeatureItem('professional_dashboard', 'Dashboard', this.professional.url));
    this.professional.items.push(this.getFeatureItem('professional_calendar', 'Calendar', this.professional.url));
    this.professional.items.push(this.getFeatureItem('professional_patients', 'Patients', this.professional.url));
    this.professional.items.push(this.getFeatureItem('professional_tasks', 'Tasks', this.professional.url));
  }

  initPatient(): void {
    // Initialize the patient feature with its items
    this.patient.id = 'patient';
    this.patient.name = 'Patient';
    this.patient.url = '/features/patient';
    this.patient.items = [];
    this.patient.items.push(this.getFeatureItem('patient_user-accounts', 'UserAccount', this.patient.url));
    this.patient.items.push(this.getFeatureItem('patient_dashboard', 'Dashboard', this.patient.url));
    this.patient.items.push(this.getFeatureItem('patient_calendar', 'Calendar', this.patient.url));
    this.patient.items.push(this.getFeatureItem('patient_providers', 'Providers', this.patient.url));
    this.patient.items.push(this.getFeatureItem('patient_messaging', 'Messaging', this.patient.url));
  }

  initVendor(): void {
    // Initialize the vendor feature with its items
    this.vendor.id = 'vendor';
    this.vendor.name = 'Vendor';
    this.vendor.url = '/features';
    
    this.vendor.items = [];
    this.vendor.items.push(this.getFeatureItem('vendor_user-account', 'UserAccount', this.vendor.url));
    this.vendor.items.push(this.getFeatureItem('vendor_dashboard', 'Dashboard', this.vendor.url));
    this.vendor.items.push(this.getFeatureItem('vendor_services', 'Services', this.vendor.url));
    this.vendor.items.push(this.getFeatureItem('vendor_clients', 'Clients', this.vendor.url));
    this.vendor.items.push(this.getFeatureItem('vendor_messaging', 'Messaging', this.vendor.url));
    
  }

  initAdmin(): void {
    // Initialize the admin feature with its items
    this.admin.id = 'admin';
    this.admin.name = 'Admin';
    this.admin.url = '/features';
    this.admin.items = [];
    this.admin.items.push(this.getFeatureItem('admin_dashboard', 'Dashboard', this.admin.url));
    this.admin.items.push(this.getFeatureItem('admin_roster', 'Roster', this.admin.url));
    this.admin.items.push(this.getFeatureItem('admin_team', 'Team', this.admin.url));
    this.admin.items.push(this.getFeatureItem('admin_messaging', 'Messaging', this.admin.url));

  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFeatureItem(fid: string, fname: string, url: string): FeatureItem {
    return { 
      ...new FeatureItem(), 
      id: fid,
      name: fname,
      url: url ? url : '/content/' + fname.toLowerCase(),
    }
  }


}
