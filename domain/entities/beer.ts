type ValueUnitType = {
  value: number;
  unit: string;
};
export type Beer = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  method: {
    mash_temp: Array<{
      temp: ValueUnitType;
      duration: number;
    }>;
    fermentation: {
      temp: ValueUnitType;
    };
    twist: number | string | object | null;
  };
  ingredients: {
    malt: Array<{
      name: string;
      amount: ValueUnitType;
    }>;
    hops: Array<{
      name: string;
      amount: ValueUnitType;
      add: string;
      attribute: string;
    }>;
    yeast: string;
  };
  food_pairing: Array<string>;
  brewers_tips: string;
  contributed_by: string;
};
