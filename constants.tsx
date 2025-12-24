
import { Location, Day, TransportType, Route } from './types';

export const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Price per day
export const INN_COSTS: Record<Location, number> = {
  [Location.Harmondale]: 2,
  [Location.Erathia]: 14,
  [Location.TulareanForest]: 14,
  [Location.Avlee]: 40,
  [Location.Tatalia]: 40,
  [Location.Deyja]: 19,
  [Location.BracadaDesert]: 19,
  [Location.EvenmornIslands]: 3,
  [Location.MountNighon]: 360,
  [Location.Arena]: 0,
  [Location.BarrowDowns]: 32
};

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6] as Day[];

export const ROUTES: Route[] = [
  // Harmondale - JVC Corral - 50GP
  { from: Location.Harmondale, to: Location.Erathia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 2, cost: 50 },
  { from: Location.Harmondale, to: Location.TulareanForest, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 2, cost: 50 },
  { from: Location.Harmondale, to: Location.Arena, type: TransportType.Coach, days: [Day.Sunday], duration: 4, cost: 50 },

  // Tularean Forest - Hu's Stallions - 75GP
  { from: Location.TulareanForest, to: Location.Avlee, type: TransportType.Coach, days: [Day.Monday, Day.Friday], duration: 3, cost: 75 },
  { from: Location.TulareanForest, to: Location.Deyja, type: TransportType.Coach, days: [Day.Tuesday, Day.Friday], duration: 2, cost: 75 },
  { from: Location.TulareanForest, to: Location.Harmondale, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday], duration: 2, cost: 75 },

  // Tularean Forest - Ship Sea Sprite - 100GP
  { from: Location.TulareanForest, to: Location.BracadaDesert, type: TransportType.Boat, days: [Day.Monday], duration: 6, cost: 100 },
  { from: Location.TulareanForest, to: Location.Avlee, type: TransportType.Boat, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 3, cost: 100 },

  // Bracada Desert - Crystal Caravans - 106GP
  { from: Location.BracadaDesert, to: Location.Erathia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday, Day.Sunday], duration: 3, cost: 106 },
  { from: Location.BracadaDesert, to: Location.Harmondale, type: TransportType.Coach, days: [Day.Tuesday, Day.Saturday], duration: 5, cost: 106 },

  // Bracada Desert - Ship Enchantress - 212GP
  { from: Location.BracadaDesert, to: Location.Tatalia, type: TransportType.Boat, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 4, cost: 212 },
  { from: Location.BracadaDesert, to: Location.TulareanForest, type: TransportType.Boat, days: [Day.Saturday], duration: 6, cost: 212 },
  { from: Location.BracadaDesert, to: Location.Erathia, type: TransportType.Boat, days: [Day.Sunday], duration: 6, cost: 212 },

  // Tatalia - Dry Saddles - 225GP
  { from: Location.Tatalia, to: Location.Erathia, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 2, cost: 225 },

  // Tatalia - Ship Narwhale - 225GP
  { from: Location.Tatalia, to: Location.BracadaDesert, type: TransportType.Boat, days: [Day.Monday], duration: 4, cost: 225 },
  { from: Location.Tatalia, to: Location.Avlee, type: TransportType.Boat, days: [Day.Friday], duration: 5, cost: 225 },
  { from: Location.Tatalia, to: Location.EvenmornIslands, type: TransportType.Boat, days: [Day.Sunday], duration: 5, cost: 225, requiresMap: true },

  // Erathia - Royal Steeds - 75GP
  { from: Location.Erathia, to: Location.Tatalia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 2, cost: 75 },
  { from: Location.Erathia, to: Location.Deyja, type: TransportType.Coach, days: [Day.Monday, Day.Thursday], duration: 3, cost: 75 },
  { from: Location.Erathia, to: Location.Harmondale, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 2, cost: 75 },
  { from: Location.Erathia, to: Location.BracadaDesert, type: TransportType.Coach, days: [Day.Wednesday, Day.Saturday], duration: 3, cost: 75 },

  // Erathia - Ship Lady Catherine - 100GP
  { from: Location.Erathia, to: Location.Avlee, type: TransportType.Boat, days: [Day.Monday, Day.Friday], duration: 4, cost: 100 },
  { from: Location.Erathia, to: Location.Tatalia, type: TransportType.Boat, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 2, cost: 100 },
  { from: Location.Erathia, to: Location.BracadaDesert, type: TransportType.Boat, days: [Day.Wednesday], duration: 6, cost: 100 },

  // Deyja - Faithful Steeds - 118GP
  { from: Location.Deyja, to: Location.Erathia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 3, cost: 118 },
  { from: Location.Deyja, to: Location.TulareanForest, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 2, cost: 118 },

  // Avlee - Plush Coaches - 237GP
  { from: Location.Avlee, to: Location.TulareanForest, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 3, cost: 237 },
  { from: Location.Avlee, to: Location.Deyja, type: TransportType.Coach, days: [Day.Wednesday, Day.Sunday], duration: 5, cost: 237 },

  // Avlee - Ship Wind Runner - 237GP
  { from: Location.Avlee, to: Location.Erathia, type: TransportType.Boat, days: [Day.Tuesday], duration: 4, cost: 237 },
  { from: Location.Avlee, to: Location.Erathia, type: TransportType.Boat, days: [Day.Sunday], duration: 3, cost: 237 },
  { from: Location.Avlee, to: Location.TulareanForest, type: TransportType.Boat, days: [Day.Wednesday, Day.Friday], duration: 3, cost: 237 },
  { from: Location.Avlee, to: Location.Tatalia, type: TransportType.Boat, days: [Day.Thursday], duration: 5, cost: 237 },

  // Evenmorn Islands - Ship Sacred Sails - 500GP
  { from: Location.EvenmornIslands, to: Location.Tatalia, type: TransportType.Boat, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 4, cost: 500 },
  { from: Location.EvenmornIslands, to: Location.TulareanForest, type: TransportType.Boat, days: [Day.Saturday], duration: 6, cost: 500 },

  // Walking Routes
  // Harmondale
  { from: Location.Harmondale, to: Location.Erathia, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.Harmondale, to: Location.TulareanForest, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.Harmondale, to: Location.BarrowDowns, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },

  // Erathia
  { from: Location.Erathia, to: Location.Harmondale, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.Erathia, to: Location.Tatalia, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.Erathia, to: Location.Deyja, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.Erathia, to: Location.BracadaDesert, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },

  // Tularean Forest
  { from: Location.TulareanForest, to: Location.Harmondale, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.TulareanForest, to: Location.Avlee, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.TulareanForest, to: Location.Deyja, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },

  // Barrow Downs
  { from: Location.BarrowDowns, to: Location.Harmondale, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.BarrowDowns, to: Location.BracadaDesert, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.BarrowDowns, to: Location.MountNighon, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0, details: "via Stone City" },

  // Tatalia
  { from: Location.Tatalia, to: Location.Erathia, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },

  // Avlee
  { from: Location.Avlee, to: Location.TulareanForest, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },

  // Deyja
  { from: Location.Deyja, to: Location.Erathia, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.Deyja, to: Location.TulareanForest, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },

  // Bracada Desert
  { from: Location.BracadaDesert, to: Location.Erathia, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },
  { from: Location.BracadaDesert, to: Location.BarrowDowns, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0 },

  // Mount Nighon
  { from: Location.MountNighon, to: Location.BarrowDowns, type: TransportType.Walk, days: ALL_DAYS, duration: 5, cost: 0, details: "via Stone City" },
];
