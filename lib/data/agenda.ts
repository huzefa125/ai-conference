// SAMPLE DATA: replace with the real program before launch.
// Every session below is a placeholder. Speaker names, rooms and times are not confirmed.

export type TrackId =
  | "life-sciences"
  | "physical-sciences"
  | "earth-climate"
  | "data-methods"
  | "science-society";

export type SessionKind = "keynote" | "talk" | "workshop" | "panel" | "break";

export interface Session {
  time: string; // 24h start time, e.g. "09:30"
  duration: number; // minutes
  title: string;
  kind: SessionKind;
  track?: TrackId; // omit for keynotes and breaks
  speaker?: string;
  role?: string;
  room?: string;
}

export interface AgendaDay {
  id: string;
  label: string; // "Day 1"
  date: string; // "Wed, Nov 18"
  sessions: Session[];
}

export const TRACK_LABELS: Record<TrackId, string> = {
  "life-sciences": "Life Sciences",
  "physical-sciences": "Physical Sciences",
  "earth-climate": "Earth & Climate",
  "data-methods": "Data & Methods",
  "science-society": "Science & Society",
};

export const AGENDA: AgendaDay[] = [
  {
    id: "day-1",
    label: "Day 1",
    date: "Wed, Nov 18",
    sessions: [
      { time: "08:30", duration: 60, title: "Registration and coffee", kind: "break" },
      { time: "09:30", duration: 45, title: "Opening keynote: twenty years of monsoon records and what they changed", kind: "keynote", speaker: "Speaker to be announced", room: "Main Hall" },
      { time: "10:30", duration: 40, title: "Single-cell sequencing on a small lab budget", kind: "talk", track: "life-sciences", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "10:30", duration: 40, title: "Open peer review after five years: what the data shows", kind: "talk", track: "science-society", speaker: "Speaker to be announced", room: "Hall B" },
      { time: "11:30", duration: 40, title: "Building a materials lab from shared instruments", kind: "talk", track: "physical-sciences", speaker: "Speaker to be announced", room: "Hall C" },
      { time: "12:15", duration: 75, title: "Lunch and poster session", kind: "break" },
      { time: "13:30", duration: 90, title: "Workshop: field sampling design for river and coastal studies", kind: "workshop", track: "earth-climate", speaker: "Speaker to be announced", room: "Studio 1" },
      { time: "13:30", duration: 40, title: "Pre-registration in practice: a statistician's notes", kind: "talk", track: "data-methods", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "16:00", duration: 50, title: "Panel: experiments that failed and what we published anyway", kind: "panel", speaker: "Moderator to be announced", room: "Main Hall" },
    ],
  },
  {
    id: "day-2",
    label: "Day 2",
    date: "Thu, Nov 19",
    sessions: [
      { time: "09:00", duration: 45, title: "Keynote: reading the genome of a crop that survives drought", kind: "keynote", speaker: "Speaker to be announced", room: "Main Hall" },
      { time: "10:00", duration: 40, title: "Antibody validation: the checks most papers skip", kind: "talk", track: "life-sciences", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "10:00", duration: 40, title: "Cryogenic measurements without a national facility", kind: "talk", track: "physical-sciences", speaker: "Speaker to be announced", room: "Hall C" },
      { time: "11:00", duration: 40, title: "Case study: ten years of groundwater monitoring in the Deccan", kind: "talk", track: "earth-climate", speaker: "Speaker to be announced", room: "Hall B" },
      { time: "12:00", duration: 75, title: "Lunch and poster session", kind: "break" },
      { time: "13:30", duration: 90, title: "Workshop: writing lab protocols another group can follow", kind: "workshop", track: "life-sciences", speaker: "Speaker to be announced", room: "Studio 1" },
      { time: "13:30", duration: 40, title: "Small samples, honest statistics: power and effect sizes", kind: "talk", track: "data-methods", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "15:45", duration: 50, title: "Panel: open data, credit and who pays for the archive", kind: "panel", track: "science-society", speaker: "Moderator to be announced", room: "Main Hall" },
    ],
  },
  {
    id: "day-3",
    label: "Day 3",
    date: "Fri, Nov 20",
    sessions: [
      { time: "09:30", duration: 40, title: "Low-cost sensors for air quality: calibration in the field", kind: "talk", track: "earth-climate", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "09:30", duration: 40, title: "Spectroscopy data that someone else can reproduce", kind: "talk", track: "physical-sciences", speaker: "Speaker to be announced", room: "Hall C" },
      { time: "10:30", duration: 40, title: "Version control and data management for working labs", kind: "talk", track: "data-methods", speaker: "Speaker to be announced", room: "Hall B" },
      { time: "11:30", duration: 60, title: "Fireside: running an independent lab on grant funding", kind: "panel", speaker: "Moderator to be announced", room: "Main Hall" },
      { time: "12:45", duration: 60, title: "Lunch and poster session", kind: "break" },
      { time: "14:00", duration: 45, title: "Closing keynote and announcements", kind: "keynote", speaker: "Speaker to be announced", room: "Main Hall" },
    ],
  },
];
