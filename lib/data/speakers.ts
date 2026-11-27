// SAMPLE DATA: replace with the confirmed lineup before launch.
// Add a photo by placing an image in /public/speakers and setting `photo`, e.g. "/speakers/jane-doe.jpg".
// Cards with no photo show a neutral placeholder.

import type { TrackId } from "@/lib/data/agenda";

export interface Speaker {
  name: string;
  role: string;
  company: string;
  track?: TrackId;
  photo?: string;
  keynote?: boolean;
  linkedin?: string;
  x?: string;
}

// Stock portraits (Unsplash) used as stand-ins. They are NOT the real speakers; replace with real photos.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80&fit=crop&crop=faces`;

export const SPEAKERS: Speaker[] = [
  { name: "Speaker to be announced", role: "Keynote speaker", company: "Research institute", linkedin: "#", x: "#", keynote: true, photo: img("1507003211169-0a1dd7228f2d") },
  { name: "Speaker to be announced", role: "Keynote speaker", company: "Research institute", linkedin: "#", x: "#", keynote: true, photo: img("1494790108377-be9c29b29330") },
  { name: "Speaker to be announced", role: "Research fellow, science policy", company: "National institute", linkedin: "#", x: "#", track: "science-society", photo: img("1500648767791-00dcc994a43e") },
  { name: "Speaker to be announced", role: "Principal investigator", company: "University research lab", linkedin: "#", x: "#", track: "life-sciences", photo: img("1438761681033-6461ffad8d80") },
  { name: "Speaker to be announced", role: "Professor of condensed matter physics", company: "University research lab", linkedin: "#", x: "#", track: "physical-sciences", photo: img("1472099645785-5658abf4ff4e") },
  { name: "Speaker to be announced", role: "Research scientist, hydrology", company: "Field research station", linkedin: "#", x: "#", track: "earth-climate", photo: img("1544005313-94ddf0286df2") },
  { name: "Speaker to be announced", role: "Lead statistician", company: "Independent lab", linkedin: "#", x: "#", track: "data-methods", photo: img("1519085360753-af0119f7cbe7") },
  { name: "Speaker to be announced", role: "Lab director", company: "Independent lab", linkedin: "#", x: "#", track: "life-sciences", photo: img("1580489944761-15a19d654956") },
];
