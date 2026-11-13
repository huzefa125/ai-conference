import {
  Building2, Target, Users, Handshake, BrainCircuit, Dna, Cog, FlaskConical, Leaf, Pill,
  CalendarDays, History, Video, FileText, Mic, Presentation, ClipboardList, BookOpen,
  Newspaper, ScrollText, PenLine, UserRound,
} from "lucide-react";
import type { NavItem } from "@/components/ui/dropdown-navigation";

/** Placeholder links ("#") until inner pages are built. */
export const NAV_ITEMS: NavItem[] = [
  { id: 1, label: "Home", link: "#top" },
  {
    id: 2,
    label: "About Us",
    subMenus: [
      {
        title: "Organisation",
        items: [
          { label: "Who We Are", description: "Our story and scientific identity", icon: Building2, href: "#about" },
          { label: "Mission & Vision", description: "What guides our programmes", icon: Target, href: "#about" },
        ],
      },
      {
        title: "Community",
        items: [
          { label: "Advisory Board", description: "Scientific oversight", icon: Users, href: "#" },
          { label: "Partners", description: "Institutions and societies", icon: Handshake, href: "#" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Conferences",
    subMenus: [
      {
        title: "By Discipline",
        items: [
          { label: "Artificial Intelligence", description: "Machine learning and data science", icon: BrainCircuit, href: "#conferences" },
          { label: "Medical & Life Sciences", description: "Clinical and biomedical research", icon: Dna, href: "#conferences" },
          { label: "Engineering & Technology", description: "Systems, energy and robotics", icon: Cog, href: "#conferences" },
          { label: "Chemistry & Materials", description: "Molecular and applied science", icon: FlaskConical, href: "#conferences" },
          { label: "Environmental Sciences", description: "Climate and sustainability", icon: Leaf, href: "#conferences" },
          { label: "Pharmaceutical Research", description: "Drug discovery and delivery", icon: Pill, href: "#conferences" },
        ],
      },
      {
        title: "Browse",
        items: [
          { label: "Upcoming Events", description: "Open for registration", icon: CalendarDays, href: "#conferences" },
          { label: "Past Events", description: "Archive and highlights", icon: History, href: "#" },
          { label: "Virtual Conferences", description: "Join from anywhere", icon: Video, href: "#conferences" },
          { label: "Call for Abstracts", description: "Submit your research", icon: FileText, href: "#" },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Services",
    subMenus: [
      {
        title: "For Researchers",
        items: [
          { label: "Speaker Opportunities", description: "Present to a global audience", icon: Mic, href: "#" },
          { label: "Abstract Submission", description: "Guidelines and deadlines", icon: ClipboardList, href: "#" },
        ],
      },
      {
        title: "For Organisations",
        items: [
          { label: "Sponsorship & Exhibition", description: "Reach the research community", icon: Presentation, href: "#" },
          { label: "Event Partnerships", description: "Co-host a scientific event", icon: Handshake, href: "#" },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Publications",
    subMenus: [
      {
        title: "Scholarly Output",
        items: [
          { label: "Journals", description: "Peer-reviewed publications", icon: BookOpen, href: "#publications" },
          { label: "Conference Proceedings", description: "Collected papers", icon: ScrollText, href: "#publications" },
          { label: "Research Articles", description: "Open knowledge sharing", icon: Newspaper, href: "#publications" },
          { label: "Author Guidelines", description: "Prepare your manuscript", icon: PenLine, href: "#" },
        ],
      },
    ],
  },
  {
    id: 6,
    label: "Speakers",
    subMenus: [
      {
        title: "Speakers",
        items: [
          { label: "Featured Speakers", description: "Keynotes and plenary voices", icon: UserRound, href: "#speakers" },
          { label: "Become a Speaker", description: "Apply to present", icon: Mic, href: "#" },
        ],
      },
    ],
  },
  { id: 7, label: "Contact", link: "#contact" },
];
