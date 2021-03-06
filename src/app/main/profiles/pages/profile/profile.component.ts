import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { RoutesService } from '../../../../core/services/routes.service';
import { ProfessionalProfile } from '../../../account/interfaces/professional-profile.interface';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfessionalProfile;
  generatingPDF: boolean = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly profilesService: ProfilesService,
    private readonly alertService: AlertService,
    public readonly routesService: RoutesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.profilesService.getById(id)))
      .subscribe(({ data }) => (this.profile = data));
  }

  downloadResume() {
    this.generatingPDF = true;
    this.profilesService.download(this.profile.ppId).subscribe({
      next: (blob) => {
        const file = new Blob([blob], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
        this.generatingPDF = false;
      },
      error: (err) => {
        this.generatingPDF = false;
        console.error(err);
      },
    });
  }

  deleteProfile() {
    this.alertService
      .warning('¿Está seguro de eliminar el perfil profesional?')
      .then((res) => {
        if (res.isConfirmed) {
          this.profilesService.delete(this.profile.ppId).subscribe({
            next: () => {
              this.alertService
                .success({ title: 'Perfil profesional eliminado con éxito' })
                .then(() => {
                  this.router.navigateByUrl(this.routesService.profilesRoute);
                });
            },
            error: () => {
              this.alertService.error({});
            },
          });
        }
      });
  }
}
