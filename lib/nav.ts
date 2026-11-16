import {
  Building2, Target, Users, Handshake, BrainCircuit, Dna, Cog, FlaskConical, Leaf, Pill,
  CalendarDays, History, Video, FileText, Mic, Presentation, ClipboardList, BookOpen,
  Newspaper, ScrollText, PenLine, UserRound, Ticket,
} from "lucide-react";
import type { NavItem } from "@/components/ui/dropdown-navigation";

export const NAV_ITEMS: NavItem[] = [
  { id: 1, label: "Home", link: "/" },
  {
    id: 2,
    label: "About Us",
    subMenus: [
      {
        title: "Organisation",
        items: [
          { label: "Who We Are", description: "Our story and scientific identity", icon: Building2, href: "/about" },
          { label: "Mission & Vision", description: "What guides our programmes", icon: Target, href: "/about#mission" },
        ],
      },
      {
        title: "Community",
        items: [
          { label: "Advisory Board", description: "Scientific oversight", icon: Users, href: "/advisory-board" },
          { label: "Partners", description: "Institutions and societies", icon: Handshake, href: "/partners" },
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
          { label: "Artificial Intelligence", description: "Machine learning and data science", icon: BrainCircuit, href: "/conferences/category/artificial-intelligence" },
          { label: "Medical & Life Sciences", description: "Clinical and biomedical research", icon: Dna, href: "/conferences/category/medical-life-sciences" },
          { label: "Engineering & Technology", description: "Systems, energy and robotics", icon: Cog, href: "/conferences/category/engineering-technology" },
          { label: "Chemistry & Materials", description: "Molecular and applied science", icon: FlaskConical, href: "/conferences/category/chemistry-materials" },
          { label: "Environmental Sciences", description: "Climate and sustainability", icon: Leaf, href: "/conferences/category/environmental-sciences" },
          { label: "Pharmaceutical Research", description: "Drug discovery and delivery", icon: Pill, href: "/conferences/category/pharmaceutical-research" },
        ],
      },
      {
        title: "Browse",
        items: [
          { label: "Upcoming Events", description: "Open for registration", icon: CalendarDays, href: "/conferences" },
          { label: "Past Events", description: "Archive and highlights", icon: History, href: "/past-events" },
          { label: "Virtual Conferences", description: "Join from anywhere", icon: Video, href: "/conferences?mode=Virtual" },
          { label: "Call for Abstracts", description: "Submit your research", icon: FileText, href: "/call-for-abstracts" },
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
          { label: "Speaker Opportunities", description: "Present to a global audience", icon: Mic, href: "/become-a-speaker" },
          { label: "Abstract Submission", description: "Submit your abstract online", icon: ClipboardList, href: "/call-for-abstracts/submit" },
          { label: "Registration", description: "Fees and delegate passes", icon: Ticket, href: "/registration" },
        ],
      },
      {
        title: "For Organisations",
        items: [
          { label: "Sponsorship & Exhibition", description: "Reach the research community", icon: Presentation, href: "/sponsorship" },
          { label: "Event Partnerships", description: "Co-host a scientific event", icon: Handshake, href: "/partners#partner-with-us" },
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
          { label: "Journals", description: "Peer-reviewed publications", icon: BookOpen, href: "/publications/journals" },
          { label: "Conference Proceedings", description: "Collected papers", icon: ScrollText, href: "/publications/proceedings" },
          { label: "Research Articles", description: "Open knowledge sharing", icon: Newspaper, href: "/news" },
          { label: "Author Guidelines", description: "Prepare your manuscript", icon: PenLine, href: "/publications/author-guidelines" },
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
          { label: "Featured Speakers", description: "Keynotes and plenary voices", icon: UserRound, href: "/speakers" },
          { label: "Become a Speaker", description: "Apply to present", icon: Mic, href: "/become-a-speaker" },
        ],
      },
    ],
  },
  { id: 7, label: "Contact", link: "/contact" },
];
