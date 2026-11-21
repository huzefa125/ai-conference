// Shared icon lookup for icon names stored as text (local data or Sanity).
// The /ssr entry has no React context, so it works in both server and client components.
import {
  AirplaneLandingIcon, AirplaneTiltIcon, AtomIcon, BedIcon, BirdIcon, BroadcastIcon, BuildingsIcon,
  CalendarBlankIcon, CarIcon, ChalkboardTeacherIcon, CloudIcon, CodeIcon, CoffeeIcon, DnaIcon, FlaskIcon,
  ForkKnifeIcon, GlobeIcon, GlobeHemisphereWestIcon, HandshakeIcon, LightbulbIcon, MapPinIcon,
  MicrophoneStageIcon, MountainsIcon, NewspaperIcon, NotebookIcon, PlanetIcon, RocketIcon, ShieldCheckIcon,
  SparkleIcon, StarIcon, SunHorizonIcon, TargetIcon, TicketIcon, TrainIcon, TrophyIcon, UsersIcon,
  WheelchairIcon, WrenchIcon,
} from "@phosphor-icons/react/ssr";
import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import type { IconName } from "./icon-names";

const ICONS: Record<IconName, ComponentType<IconProps>> = {
  AirplaneLanding: AirplaneLandingIcon, AirplaneTilt: AirplaneTiltIcon, Atom: AtomIcon, Bed: BedIcon,
  Bird: BirdIcon, Broadcast: BroadcastIcon, Buildings: BuildingsIcon, CalendarBlank: CalendarBlankIcon,
  Car: CarIcon, ChalkboardTeacher: ChalkboardTeacherIcon, Cloud: CloudIcon, Code: CodeIcon, Coffee: CoffeeIcon,
  Dna: DnaIcon, Flask: FlaskIcon, ForkKnife: ForkKnifeIcon, Globe: GlobeIcon,
  GlobeHemisphereWest: GlobeHemisphereWestIcon, Handshake: HandshakeIcon, Lightbulb: LightbulbIcon,
  MapPin: MapPinIcon, MicrophoneStage: MicrophoneStageIcon, Mountains: MountainsIcon, Newspaper: NewspaperIcon,
  Notebook: NotebookIcon, Planet: PlanetIcon, Rocket: RocketIcon, ShieldCheck: ShieldCheckIcon,
  Sparkle: SparkleIcon, Star: StarIcon, SunHorizon: SunHorizonIcon, Target: TargetIcon, Ticket: TicketIcon,
  Train: TrainIcon, Trophy: TrophyIcon, Users: UsersIcon, Wheelchair: WheelchairIcon, Wrench: WrenchIcon,
};

/** Icon component for a stored name; unknown or missing names get a neutral sparkle instead of crashing. */
export function iconFor(name: string | undefined): ComponentType<IconProps> {
  return (name && ICONS[name as IconName]) || SparkleIcon;
}
