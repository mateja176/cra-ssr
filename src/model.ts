export interface Launch {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  tbd: boolean;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: any[];
  details: string;
  crew: any[];
  ships: string[];
  capsules: any[];
  payloads: string[];
  launchpad: string;
  auto_update: boolean;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  id: string;
}

export interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean;
  landing_type: string;
  landpad: string;
}

export interface Fairings {
  reused: null;
  recovery_attempt: boolean;
  recovered: boolean;
  ships: string[];
}

export interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: null;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

export interface Flickr {
  small: any[];
  original: string[];
}

export interface Patch {
  small: string;
  large: string;
}

export interface Reddit {
  campaign: string;
  launch: string;
  media: string;
  recovery: string;
}
