
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
  BarrowDowns = "Barrow Downs",
  StoneCity = "Stone City",
  ThunderfistTunnels = "Thunderfist Tunnels",
  LandOfTheGiants = "Land of the Giants",
  Celeste = "Celeste",
  ThePit = "The Pit"
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
  Walk = "Walk",
  TownPortal = "Town Portal"
}

export interface Route {
  from: Location;
  to: Location;
  type: TransportType;
  days: Day[];
  duration: number; // in days
  cost: number; // in gold
  requiresMap?: boolean;
  requiresTeleporter?: boolean;
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
}

export interface TripResult {
  steps: TravelStep[];
  totalDays: number;
  totalCost: number;
}
