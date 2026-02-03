import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { Feature } from 'app/entities/GeneralService/feature/feature.model';
import { FeatureItem } from 'app/entities/GeneralService/feature-item/feature-item.model';

interface DashboardStat {
  icon: string;
  value: string;
  label: string;
  color: string;
  trend: number;
}

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
  isDarkMode = false;
  Math = Math;

  dashboardStats: DashboardStat[] = [
    { icon: '👥', value: '2,547', label: 'Active Users', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', trend: 12.5 },
    { icon: '📅', value: '1,234', label: 'Appointments', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', trend: 8.3 },
    { icon: '📊', value: '98.5%', label: 'System Uptime', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', trend: 2.1 },
    { icon: '⚡', value: '156ms', label: 'Avg Response', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', trend: -5.2 }
  ];

  private readonly destroy$ = new Subject<void>();


  constructor(private accountService: AccountService, private router: Router) {
    this.professional.name = 'Professional';
    this.patient.name = 'Patient';
    this.vendor.name = 'Vendor';
    this.admin.name = 'Admin';
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
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
    this.admin.items.push(this.getFeatureItem('admin_user-account', 'UserAccount', this.admin.url));
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

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  getFeatureItem(fid: string, fname: string, url: string): FeatureItem {
    return { 
      ...new FeatureItem(), 
      id: fid,
      name: fname,
      url: url ? url : '/content/' + fname.toLowerCase(),
    }
  }

  openFeature(feature: Feature | FeatureItem): void {
    this.router.navigate([feature.url], { queryParams: { name: feature.id } });
  }


}
