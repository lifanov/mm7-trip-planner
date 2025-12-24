
export enum Location {
  Harmondale = "Harmondale",
  Erathia = "Erathia",
  TulareanForest = "Tularean Forest",
  Avlee = "Avlee",
  Tatalia = "Tatalia",
  Deyja = "Deyja",
  BracadaDesert = "Bracada Desert",
  EvenmornIslands = "Evenmorn Islands",
  MountNighon = "Mount Nighon",
  Arena = "Arena",
  BarrowDowns = "Barrow Downs"
}

export enum Day {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6
}

export enum TransportType {
  Coach = "Coach",
  Boat = "Boat",
  Walk = "Walk"
}

export interface Route {
  from: Location;
  to: Location;
  type: TransportType;
  days: Day[];
  duration: number; // in days
  cost: number; // in gold
  requiresMap?: boolean;
  details?: string;
}

export interface TravelStep {
  from: Location;
  to: Location;
  type: TransportType;
  departureDay: Day;
  arrivalDay: Day;
  duration: number;
  cost: number;
  waitTime: number;
  innCost?: number;
  details?: string;
}

export interface TripResult {
  steps: TravelStep[];
  totalDays: number;
  totalCost: number;
}
