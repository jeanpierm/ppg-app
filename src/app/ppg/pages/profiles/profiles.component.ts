import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProfessionalProfilesService } from 'src/app/ppg/services/professional-profiles.service';
import { ProfessionalProfile } from '../../models/profiles/professional-profile';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
})
export class ProfilesComponent implements OnInit {
  @ViewChild('htmlProfiles') htmlProfiles!: ElementRef;
  static readonly PATH = 'perfiles';

  public initDate: Date = this.todayMinus30Days;
  public endDate: Date = this.today;
  public jobTitle: string = '';
  public location: string = '';
  public columns: string[] = ['No.', 'JobTitle', 'Location', 'Ingles'];

  get todayMinus30Days(): Date {
    return new Date(this.today.setDate(this.today.getDate() - 30));
  }

  get today(): Date {
    return new Date();
  }

  get professionalProfiles(): ProfessionalProfile[] {
    return this.ppService.professionalProfiles;
  }

  get loading(): boolean {
    return this.ppService.fetchLoading;
  }

  constructor(private readonly ppService: ProfessionalProfilesService) {}

  ngOnInit(): void {
    this.ppService.loadProfessionalProfiles();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.professionalProfiles, event.previousIndex, event.currentIndex);
  }

  get() {
    console.log('Cargando perfiles...');
    this.ppService.loadProfessionalProfiles(
      this.initDate,
      this.endDate,
      this.jobTitle,
      this.location
    );
  }

  downloadReport() {
    alert('coming soon!');
  }
}