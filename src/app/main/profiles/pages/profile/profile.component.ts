import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfessionalProfilesService } from '../../../account/services/professional-profiles.service';
import { ProfileListComponent } from '../profile-list/profile-list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfessionalProfile;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly profilesService: ProfessionalProfilesService
  ) {}

  get profilesRoute() {
    return `/${ProfileListComponent.PATH}`;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.profilesService.getById(id)))
      .subscribe(({ data }) => (this.profile = data));
  }
}
