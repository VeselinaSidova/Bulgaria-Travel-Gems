import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';
import { Location } from 'src/app/types/location';
import { User } from 'src/app/types/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { Region } from 'src/app/types/region.enum';
import { Province } from 'src/app/types/province.enum';
import { regionProvinceMapping } from 'src/app/types/region-province-mapping';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  location: Location | null = null;
  locationId: string | null = null;
  currentUser: Omit<User, 'password'> | null = null;
  form: FormGroup;
  showEditMode: boolean = false;
  regions = Object.values(Region);
  provinces: Province[] = [];

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private locationService: LocationService,
    private router: Router,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      imageUrl: ['', [Validators.required, urlValidator()]],
      region: ['', [Validators.required]],
      province: ['', [Validators.required]],
      distanceFromCapital: ['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(5000),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.activeRoute.params.subscribe((params) => {
        this.locationId = params['_id'];

        this.fetchLocation(this.locationId!);
      })
    );

    this.userService.authState$.subscribe((state) => {
      this.currentUser = state.user;
    });

    this.subscriptions.add(
      this.form
        .get('region')!
        .valueChanges.subscribe((selectedRegion: string | null) => {
          if (selectedRegion) {
            const region = selectedRegion as Region;
            this.provinces = regionProvinceMapping[region];
            this.form.get('province')!.enable();
          } else {
            this.provinces = [];
            this.form.get('province')!.disable();
          }
          this.form.get('province')!.setValue('');
        })
    );
  }

  fetchLocation(locationId: string): void {
    this.subscriptions.add(
      this.locationService.getLocationById(locationId).subscribe({
        next: (location) => {
          this.location = location;
          this.form.patchValue(location);
        },
        error: () => this.router.navigate(['/not-found']),
      })
    );
  }

  isOwner(): boolean {
    return this.location?._ownerId === this.currentUser?.id;
  }

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }

  saveChanges(): void {
    if (this.form.invalid) {
      return;
    }
    const {
      name,
      imageUrl,
      region,
      province,
      distanceFromCapital,
      description,
    } = this.form.value;
    this.subscriptions.add(
      this.locationService
        .updateLocation(
          this.location!._id!,
          name!,
          imageUrl!,
          region!,
          province!,
          distanceFromCapital!,
          description!
        )
        .subscribe({
          next: () => {
            this.fetchLocation(this.locationId!);
            this.toggleEditMode();
            this.changeDetector.detectChanges();
          },
        })
    );
  }

  deleteLocation(id: string): void {
    if (confirm('Are you sure you want to delete this location?')) {
      this.subscriptions.add(
        this.locationService.deleteLocation(id).subscribe({
          next: () => {
            this.router.navigate(['/locations']);
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
