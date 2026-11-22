// SAMPLE DATA: replace with the real program before launch.
// Every session below is a placeholder. Speaker names, rooms and times are not confirmed.

export type TrackId =
  | "ai-frontiers"
  | "ai-builders"
  | "ai-stack"
  | "applied-ai"
  | "ai-strategy";

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
  "ai-frontiers": "AI Frontiers",
  "ai-builders": "AI Builders",
  "ai-stack": "The AI Stack",
  "applied-ai": "Applied AI",
  "ai-strategy": "AI Strategy",
};

export const AGENDA: AgendaDay[] = [
  {
    id: "day-1",
    label: "Day 1",
    date: "Wed, Nov 18",
    sessions: [
      { time: "08:30", duration: 60, title: "Registration and coffee", kind: "break" },
      { time: "09:30", duration: 45, title: "Opening keynote: where enterprise AI stands in 2026", kind: "keynote", speaker: "Speaker to be announced", room: "Main Hall" },
      { time: "10:30", duration: 40, title: "Agentic systems that survive production", kind: "talk", track: "ai-builders", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "10:30", duration: 40, title: "Frontier model governance after the first audits", kind: "talk", track: "ai-frontiers", speaker: "Speaker to be announced", room: "Hall B" },
      { time: "11:30", duration: 40, title: "Inference at scale: cost, latency and batching", kind: "talk", track: "ai-stack", speaker: "Speaker to be announced", room: "Hall C" },
      { time: "12:15", duration: 75, title: "Lunch", kind: "break" },
      { time: "13:30", duration: 90, title: "Workshop: evaluating LLM applications properly", kind: "workshop", track: "applied-ai", speaker: "Speaker to be announced", room: "Studio 1" },
      { time: "13:30", duration: 40, title: "Building an AI adoption roadmap the board will fund", kind: "talk", track: "ai-strategy", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "16:00", duration: 50, title: "Panel: what founders got wrong about AI in 2025", kind: "panel", speaker: "Moderator to be announced", room: "Main Hall" },
    ],
  },
  {
    id: "day-2",
    label: "Day 2",
    date: "Thu, Nov 19",
    sessions: [
      { time: "09:00", duration: 45, title: "Keynote: multimodal and world models, what is real", kind: "keynote", speaker: "Speaker to be announced", room: "Main Hall" },
      { time: "10:00", duration: 40, title: "Retrieval beyond the demo: chunking, ranking, freshness", kind: "talk", track: "ai-builders", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "10:00", duration: 40, title: "Training infrastructure for small teams", kind: "talk", track: "ai-stack", speaker: "Speaker to be announced", room: "Hall C" },
      { time: "11:00", duration: 40, title: "Case study: workflow automation in financial operations", kind: "talk", track: "applied-ai", speaker: "Speaker to be announced", room: "Hall B" },
      { time: "12:00", duration: 75, title: "Lunch", kind: "break" },
      { time: "13:30", duration: 90, title: "Workshop: fine-tuning versus prompting, a decision framework", kind: "workshop", track: "ai-builders", speaker: "Speaker to be announced", room: "Studio 1" },
      { time: "13:30", duration: 40, title: "Measuring AI ROI without fooling yourself", kind: "talk", track: "ai-strategy", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "15:45", duration: 50, title: "Panel: policy, safety and the next regulatory cycle", kind: "panel", track: "ai-frontiers", speaker: "Moderator to be announced", room: "Main Hall" },
    ],
  },
  {
    id: "day-3",
    label: "Day 3",
    date: "Fri, Nov 20",
    sessions: [
      { time: "09:30", duration: 40, title: "On-device intelligence: what runs at the edge today", kind: "talk", track: "applied-ai", speaker: "Speaker to be announced", room: "Hall A" },
      { time: "09:30", duration: 40, title: "Data pipelines and evaluation sets that stay honest", kind: "talk", track: "ai-stack", speaker: "Speaker to be announced", room: "Hall C" },
      { time: "10:30", duration: 40, title: "Change management: getting teams to actually use the tools", kind: "talk", track: "ai-strategy", speaker: "Speaker to be announced", room: "Hall B" },
      { time: "11:30", duration: 60, title: "Founder fireside: building an AI company in a crowded market", kind: "panel", speaker: "Moderator to be announced", room: "Main Hall" },
      { time: "12:45", duration: 60, title: "Lunch", kind: "break" },
      { time: "14:00", duration: 45, title: "Closing keynote and announcements", kind: "keynote", speaker: "Speaker to be announced", room: "Main Hall" },
    ],
  },
];
