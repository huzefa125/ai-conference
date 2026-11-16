import { MynaHero } from "@/components/ui/myna-hero";
import FUIBentoGridDark from "@/components/ui/bento";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <MynaHero />
      <FUIBentoGridDark id="tracks" />
    </div>
  );
}
