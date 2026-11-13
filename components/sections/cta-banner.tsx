import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="bg-blue text-white">
      <Container className="flex flex-col items-start justify-between gap-8 py-12 sm:py-14 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-2xl leading-tight sm:text-3xl lg:text-4xl">
            Ready to present your research to a global audience?
          </h2>
          <p className="mt-3 text-white/85">Join an upcoming conference as a speaker, poster presenter or delegate.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="#" variant="light" size="lg">
            Become a Speaker
            <ArrowRight aria-hidden />
          </Button>
          <Button href="#" variant="outline-light" size="lg">
            Submit an Abstract
          </Button>
        </div>
      </Container>
    </section>
  );
}
