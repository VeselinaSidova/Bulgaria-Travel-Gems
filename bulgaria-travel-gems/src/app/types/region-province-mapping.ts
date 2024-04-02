import { Province } from './province.enum';
import { Region } from './region.enum';

export const regionProvinceMapping: { [key in Region]: Province[] } = {
  [Region.NorthWestern]: [
    Province.Lovech,
    Province.Montana,
    Province.Vidin,
    Province.Vratsa,
  ],
  [Region.NorthCentral]: [
    Province.Gabrovo,
    Province.Lovech,
    Province.Pleven,
    Province.Razgrad,
    Province.Ruse,
    Province.Silistra,
    Province.VelikoTarnovo,
  ],
  [Region.NorthEastern]: [
    Province.Dobrich,
    Province.Shumen,
    Province.Targovishte,
    Province.Varna,
  ],
  [Region.SouthWestern]: [
    Province.Blagoevgrad,
    Province.Kyustendil,
    Province.Pernik,
    Province.SofiaCity,
    Province.SofiaProvince,
  ],
  [Region.SouthCentral]: [
    Province.Haskovo,
    Province.Kardzhali,
    Province.Pazardzhik,
    Province.Plovdiv,
    Province.Smolyan,
  ],
  [Region.SouthEastern]: [
    Province.Burgas,
    Province.Sliven,
    Province.StaraZagora,
    Province.Yambol,
  ],
};
