import {
  ArrowRight, BookOpen, Briefcase, Building2, ClipboardList, FlaskConical, Globe, GraduationCap,
  Landmark, Lightbulb, Megaphone, Monitor, Newspaper, Scale, School, Search, Server, ShieldCheck,
  Sprout, User, Users, Cog, Gavel, LineChart, HeartPulse, type LucideIcon,
} from 'lucide-react';

/** Content files name icons by key so they stay free of React imports. */
const icons: Record<string, LucideIcon> = {
  arrow: ArrowRight,
  book: BookOpen,
  briefcase: Briefcase,
  building: Building2,
  clipboard: ClipboardList,
  flask: FlaskConical,
  globe: Globe,
  graduation: GraduationCap,
  landmark: Landmark,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
  monitor: Monitor,
  newspaper: Newspaper,
  scale: Scale,
  school: School,
  search: Search,
  server: Server,
  shield: ShieldCheck,
  sprout: Sprout,
  user: User,
  users: Users,
  engineering: Cog,
  humanities: HeartPulse,
  law: Gavel,
  management: LineChart,
};

export function Icon({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  const Cmp = icons[name] ?? BookOpen;
  return <Cmp aria-hidden="true" className={className} size={size} strokeWidth={1.75} />;
}
