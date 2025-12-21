
import { Location, Day, TransportType, Route } from './types';

export const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

export const ROUTES: Route[] = [
  // Harmondale
  { from: Location.Harmondale, to: Location.Erathia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 2, cost: 50 },
  { from: Location.Harmondale, to: Location.TulareanForest, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 2, cost: 50 },

  // Erathia Stables
  { from: Location.Erathia, to: Location.Harmondale, type: TransportType.Coach, days: [0,1,2,3,4,5,6], duration: 2, cost: 50 },
  { from: Location.Erathia, to: Location.Tatalia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 3, cost: 100 },
  { from: Location.Erathia, to: Location.Deyja, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 3, cost: 100 },
  { from: Location.Erathia, to: Location.BracadaDesert, type: TransportType.Coach, days: [Day.Sunday], duration: 6, cost: 200 },

  // Erathia Docks
  { from: Location.Erathia, to: Location.Tatalia, type: TransportType.Boat, days: [Day.Tuesday, Day.Thursday], duration: 2, cost: 100 },
  { from: Location.Erathia, to: Location.Avlee, type: TransportType.Boat, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 4, cost: 150 },
  { from: Location.Erathia, to: Location.EvenmornIslands, type: TransportType.Boat, days: [Day.Sunday], duration: 3, cost: 300, requiresMap: true },

  // Tularean Forest Stables
  { from: Location.TulareanForest, to: Location.Harmondale, type: TransportType.Coach, days: [0,1,2,3,4,5,6], duration: 2, cost: 50 },
  { from: Location.TulareanForest, to: Location.Erathia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 3, cost: 100 },
  { from: Location.TulareanForest, to: Location.Deyja, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 3, cost: 100 },
  { from: Location.TulareanForest, to: Location.Avlee, type: TransportType.Coach, days: [Day.Sunday], duration: 4, cost: 150 },

  // Tularean Forest Docks
  { from: Location.TulareanForest, to: Location.Avlee, type: TransportType.Boat, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 2, cost: 100 },
  { from: Location.TulareanForest, to: Location.Erathia, type: TransportType.Boat, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 3, cost: 100 },

  // Avlee Stables
  { from: Location.Avlee, to: Location.TulareanForest, type: TransportType.Coach, days: [0,1,2,3,4,5,6], duration: 2, cost: 50 },

  // Avlee Docks
  { from: Location.Avlee, to: Location.TulareanForest, type: TransportType.Boat, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 2, cost: 100 },
  { from: Location.Avlee, to: Location.Erathia, type: TransportType.Boat, days: [Day.Tuesday, Day.Thursday], duration: 4, cost: 150 },
  { from: Location.Avlee, to: Location.EvenmornIslands, type: TransportType.Boat, days: [Day.Sunday], duration: 3, cost: 300, requiresMap: true },

  // Tatalia Stables
  { from: Location.Tatalia, to: Location.Erathia, type: TransportType.Coach, days: [0,1,2,3,4,5,6], duration: 3, cost: 100 },

  // Tatalia Docks
  { from: Location.Tatalia, to: Location.Erathia, type: TransportType.Boat, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 2, cost: 100 },
  { from: Location.Tatalia, to: Location.BracadaDesert, type: TransportType.Boat, days: [Day.Tuesday, Day.Thursday], duration: 3, cost: 150 },
  { from: Location.Tatalia, to: Location.EvenmornIslands, type: TransportType.Boat, days: [Day.Sunday], duration: 3, cost: 300, requiresMap: true },

  // Deyja Stables
  { from: Location.Deyja, to: Location.Erathia, type: TransportType.Coach, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 3, cost: 100 },
  { from: Location.Deyja, to: Location.TulareanForest, type: TransportType.Coach, days: [Day.Tuesday, Day.Thursday, Day.Saturday], duration: 3, cost: 100 },

  // Bracada Desert Stables
  { from: Location.BracadaDesert, to: Location.Erathia, type: TransportType.Coach, days: [0,1,2,3,4,5,6], duration: 6, cost: 200 },

  // Bracada Desert Docks
  { from: Location.BracadaDesert, to: Location.Tatalia, type: TransportType.Boat, days: [Day.Monday, Day.Wednesday, Day.Friday], duration: 3, cost: 150 },
  { from: Location.BracadaDesert, to: Location.Erathia, type: TransportType.Boat, days: [Day.Tuesday, Day.Thursday], duration: 5, cost: 200 },
  { from: Location.BracadaDesert, to: Location.EvenmornIslands, type: TransportType.Boat, days: [Day.Sunday], duration: 3, cost: 300, requiresMap: true },

  // Evenmorn Islands Docks (Only way out)
  { from: Location.EvenmornIslands, to: Location.Erathia, type: TransportType.Boat, days: [Day.Tuesday], duration: 3, cost: 300 },
  { from: Location.EvenmornIslands, to: Location.Tatalia, type: TransportType.Boat, days: [Day.Thursday], duration: 3, cost: 300 },

  // Mount Nighon Docks
  { from: Location.MountNighon, to: Location.Erathia, type: TransportType.Boat, days: [Day.Monday], duration: 7, cost: 500 },
];
