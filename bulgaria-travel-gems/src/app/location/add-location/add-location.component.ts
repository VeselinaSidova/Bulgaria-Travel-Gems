import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { Region } from 'src/app/types/region.enum';
import { Province } from 'src/app/types/province.enum';
import { regionProvinceMapping } from 'src/app/types/region-province-mapping';
import { enumValidator } from 'src/app/shared/utils/enum-validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
    imageUrl: ['', [Validators.required, urlValidator()]],
    region: ['', [Validators.required, enumValidator(Region)]],
    province: [
      { value: '', disabled: true },
      [Validators.required, enumValidator(Province)],
    ],
    distanceFromCapital: [
      '',
      [Validators.required, Validators.min(1), Validators.max(650)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000),
      ],
    ],
  });

  regions = Object.values(Region);
  provinces: Province[] = [];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  addLocation(): void {
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

    const distanceFromCapitalNum = Number(distanceFromCapital);

    this.subscriptions.add(
      this.locationService
        .addLocation(
          name!,
          imageUrl!,
          region!,
          province!,
          distanceFromCapitalNum,
          description!
        )
        .subscribe(() => {
          this.router.navigate(['/locations']);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
