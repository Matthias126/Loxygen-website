import Link from "next/link";
import { isSustainabilityAwardClosed, SUSTAINABILITY_AWARD_DEADLINE } from "@/lib/sustainabilityAward";
import CountdownTimer from "@/components/CountdownTimer";

export default function SustainabilityAwardCrossLink() {
  const awardClosed = isSustainabilityAwardClosed();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 text-center">
          {awardClosed ? (
            <>
              <p className="font-display text-2xl text-white">
                Submissions for the Loxygen Sustainability Award 2026 are now closed.
              </p>
              <p className="mt-3 text-sm font-medium text-white/60">
                Winners announced at the Vietnam AGM, September 2026.
              </p>
              <Link
                href="/sustainable-forwarding"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                See the Sustainability Award
              </Link>
            </>
          ) : (
            <>
              <p className="font-display text-2xl text-white">
                Does this qualify? Take 2 minutes to find out if what you&apos;re already doing
                qualifies for the Loxygen Sustainability Award 2026.
              </p>
              <p className="mt-3 text-sm font-medium text-white/60">
                Deadline: 31 July 2026 · No submission cost
              </p>

              <div className="mt-8">
                <CountdownTimer targetDate={SUSTAINABILITY_AWARD_DEADLINE} expiredLabel="Submissions closed" />
              </div>

              <Link
                href="https://loxygen-esg-doiqualify.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Take the checklist
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
