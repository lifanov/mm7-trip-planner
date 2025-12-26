
import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Calendar, 
  Map as MapIcon, 
  Clock, 
  Coins, 
  ArrowRight, 
  Bus, 
  Ship, 
  Search,
  ChevronRight,
  Info,
  Bed,
  Footprints,
  Zap
} from 'lucide-react';
import { Location, Day, TripResult, TransportType } from './types';
import { DAYS_OF_WEEK } from './constants';
import { findShortestPath } from './utils/pathfinder';

const App: React.FC = () => {
  const [startLoc, setStartLoc] = useState<Location>(Location.Harmondale);
  const [targetLoc, setTargetLoc] = useState<Location>(Location.EvenmornIslands);
  const [currentDay, setCurrentDay] = useState<Day>(Day.Monday);
  const [hasMap, setHasMap] = useState<boolean>(false);
  const [stayAtInn, setStayAtInn] = useState<boolean>(false);
  const [walkIfFaster, setWalkIfFaster] = useState<boolean>(false);
  const [teleporterActivated, setTeleporterActivated] = useState<boolean>(false);
  const [townPortalAvailable, setTownPortalAvailable] = useState<boolean>(false);

  const locations = Object.values(Location);

  const result: TripResult | null = useMemo(() => {
    return findShortestPath(startLoc, targetLoc, currentDay, hasMap, stayAtInn, walkIfFaster, teleporterActivated, townPortalAvailable);
  }, [startLoc, targetLoc, currentDay, hasMap, stayAtInn, walkIfFaster, teleporterActivated, townPortalAvailable]);

  const getTransportIcon = (type: TransportType) => {
    switch(type) {
      case TransportType.Coach: return <Bus className="w-3 h-3 text-amber-500" />;
      case TransportType.Boat: return <Ship className="w-3 h-3 text-amber-500" />;
      case TransportType.Walk: return <Footprints className="w-3 h-3 text-amber-500" />;
      case TransportType.TownPortal: return <Zap className="w-3 h-3 text-blue-400" />;
      default: return <Bus className="w-3 h-3 text-amber-500" />;
    }
  };

  const getTransportLabel = (type: TransportType) => {
    switch(type) {
      case TransportType.Coach: return 'Stable';
      case TransportType.Boat: return 'Docks';
      case TransportType.Walk: return 'Walk';
      case TransportType.TownPortal: return 'Town Portal';
      default: return 'Station';
    }
  };

  return (
    <div className="min-h-screen parchment flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 drop-shadow-md">
          Blood & Honor Travel Planner
        </h1>
        <p className="text-slate-400 italic">Finding the fastest path through Enroth's transit systems</p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Controls */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/80 border border-amber-900/50 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
            <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" /> Trip Settings
            </h2>
            
            <div className="space-y-4">
              {/* Start Location */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" /> Start Point
                </label>
                <select 
                  value={startLoc}
                  onChange={(e) => setStartLoc(e.target.value as Location)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Destination Location */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-400" /> Destination
                </label>
                <select 
                  value={targetLoc}
                  onChange={(e) => setTargetLoc(e.target.value as Location)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Current Day */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" /> Current Day
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <button
                      key={day}
                      onClick={() => setCurrentDay(idx as Day)}
                      className={`text-xs py-1 rounded border ${
                        currentDay === idx 
                          ? 'bg-amber-600 border-amber-400 text-white' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                 {/* Stay at Inn Checkbox */}
                 <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={stayAtInn}
                        onChange={(e) => setStayAtInn(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${stayAtInn ? 'bg-amber-600' : 'bg-slate-700'}`} />
                      <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${stayAtInn ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-amber-400 flex items-center gap-2">
                      <Bed className="w-4 h-4" /> Stay at the Inn
                    </span>
                  </label>
                </div>

                {/* Walk if Faster Checkbox */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={walkIfFaster}
                        onChange={(e) => setWalkIfFaster(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${walkIfFaster ? 'bg-amber-600' : 'bg-slate-700'}`} />
                      <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${walkIfFaster ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-amber-400 flex items-center gap-2">
                      <Footprints className="w-4 h-4" /> Walk if faster
                    </span>
                  </label>
                </div>

                {/* Evenmorn Map Checkbox */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={hasMap}
                        onChange={(e) => setHasMap(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${hasMap ? 'bg-amber-600' : 'bg-slate-700'}`} />
                      <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${hasMap ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-amber-400 flex items-center gap-2">
                      <MapIcon className="w-4 h-4" /> Has Evenmorn Map
                    </span>
                  </label>
                </div>

                 {/* Teleporter Activated Checkbox */}
                 <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={teleporterActivated}
                        onChange={(e) => setTeleporterActivated(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${teleporterActivated ? 'bg-amber-600' : 'bg-slate-700'}`} />
                      <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${teleporterActivated ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-amber-400 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Teleporter Activated
                    </span>
                  </label>
                </div>

                {/* Town Portal Available Checkbox */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={townPortalAvailable}
                        onChange={(e) => setTownPortalAvailable(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-5 rounded-full transition-colors ${townPortalAvailable ? 'bg-amber-600' : 'bg-slate-700'}`} />
                      <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${townPortalAvailable ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 group-hover:text-amber-400 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" /> Town Portal Available
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded-xl text-xs text-amber-200/60 leading-relaxed">
            <p className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Note: Evenmorn Islands can only be reached by boat on Sundays from Erathia, Avlee, Tatalia, or Bracada Desert, and requires the unique map found in the Tatalia pirate caves.
            </p>
          </div>
        </section>

        {/* Results Content */}
        <section className="lg:col-span-8 space-y-6">
          {result ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-blue-900/50 p-6 rounded-xl shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Total Travel Time</p>
                    <p className="text-3xl font-fantasy text-slate-100">{result.totalDays} Days</p>
                  </div>
                  <Clock className="w-10 h-10 text-blue-500/50" />
                </div>
                <div className="bg-slate-900/80 border border-amber-900/50 p-6 rounded-xl shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Total Cost</p>
                    <p className="text-3xl font-fantasy text-slate-100">{result.totalCost} Gold</p>
                  </div>
                  <Coins className="w-10 h-10 text-amber-500/50" />
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl shadow-2xl">
                <h3 className="text-xl font-bold text-amber-500 mb-6 flex items-center gap-2 font-fantasy">
                  Recommended Itinerary
                </h3>
                
                <div className="space-y-0">
                  {result.steps.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 italic">
                      You are already at your destination.
                    </div>
                  ) : (
                    result.steps.map((step, index) => (
                      <div key={index} className="relative pl-8 pb-8 last:pb-0">
                        {/* Timeline Line */}
                        {index < result.steps.length - 1 && (
                          <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 to-transparent" />
                        )}
                        
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-800 border-2 border-amber-500 flex items-center justify-center z-10">
                          {getTransportIcon(step.type)}
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg hover:border-amber-500/30 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-100">{step.from}</span>
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                                <span className="font-bold text-amber-400">{step.to}</span>
                              </div>
                              <p className="text-sm text-slate-400 flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  {getTransportLabel(step.type)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Coins className="w-3 h-3" /> {step.cost} Gold
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {step.duration} days travel
                                </span>
                              </p>
                            </div>

                            <div className="text-right">
                              {step.waitTime > 0 && (
                                <div className="flex flex-col items-end">
                                  <div className="bg-red-950/30 text-red-400 text-[10px] px-2 py-0.5 rounded border border-red-900/30 mb-1 inline-block uppercase font-bold">
                                    Wait {step.waitTime} {step.waitTime === 1 ? 'Day' : 'Days'}
                                    {step.innCost && step.innCost > 0 ? ` (+${step.innCost} Gold)` : ''}
                                  </div>
                                </div>
                              )}
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                                Departs {DAYS_OF_WEEK[step.departureDay]}
                              </p>
                              <p className="text-xs font-bold text-amber-500/80 uppercase tracking-tighter">
                                Arrives {DAYS_OF_WEEK[step.arrivalDay]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/50 flex items-center justify-between">
                  <p className="text-sm text-slate-500 italic">
                    Note: Travel times based on standard Erathian schedules.
                  </p>
                  <div className="text-amber-500 font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Final Destination: {targetLoc}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-900/80 border border-red-900/50 p-12 rounded-xl text-center shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
                <Search className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-400 mb-2 font-fantasy">No Route Possible</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                No standard transportation route exists to {targetLoc} from {startLoc} given your current map status.
                Check if you need the <span className="text-amber-400 font-bold">Evenmorn Island Map</span> or if the destination is only reachable via specialized means.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 text-slate-500 text-sm pb-8">
        &copy; 1999 New World Computing. Fan tool for Might and Magic VII: For Blood and Honor.
      </footer>
    </div>
  );
};

export default App;
