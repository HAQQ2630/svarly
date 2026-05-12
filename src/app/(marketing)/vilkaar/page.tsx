import Link from "next/link";

const PRIMARY = "#2F4F3E";
const SAGE = "#7A8F7B";
const INK = "#1F2A24";
const BARK = "#5C6B62";
const BEIGE = "#EFEDE7";
const BORDER = "#E0DDD5";

const SERIF = "var(--font-dm-serif), Georgia, serif";

const SECTIONS = [
  { num: "01", id: "kort-fortalt", title: "Kort fortalt" },
  { num: "02", id: "aftalen", title: "Hvem er aftalen mellem" },
  { num: "03", id: "tjenesten", title: "Hvad Svarly er" },
  { num: "04", id: "konto", title: "Konto og brug" },
  { num: "05", id: "pris", title: "Pris og betaling" },
  { num: "06", id: "opsigelse", title: "Opsigelse" },
  { num: "07", id: "indhold", title: "Indhold du sender" },
  { num: "08", id: "ansvar", title: "Vores ansvar" },
  { num: "09", id: "begraensning", title: "Ansvarsbegrænsning" },
  { num: "10", id: "aendringer", title: "Ændringer" },
  { num: "11", id: "lov", title: "Lovvalg og værneting" },
];

function Section({
  num,
  id,
  title,
  italic,
  children,
}: {
  num: string;
  id: string;
  title: string;
  italic?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid grid-cols-12 gap-y-6 gap-x-6 py-14 md:gap-x-12 md:py-20"
      style={{ borderTop: `1px solid ${BORDER}` }}
    >
      <div className="col-span-12 md:col-span-3">
        <div
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(44px, 5vw, 64px)",
            fontStyle: italic ? "italic" : "normal",
            fontWeight: 400,
            color: PRIMARY,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {num}
        </div>
      </div>
      <div className="col-span-12 md:col-span-9 max-w-[68ch]">
        <h2
          className="mb-5"
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(22px, 2.4vw, 28px)",
            lineHeight: 1.18,
            letterSpacing: "-0.012em",
            color: INK,
          }}
        >
          {title}
        </h2>
        <div
          className="space-y-4"
          style={{ color: INK, fontSize: "16px", lineHeight: 1.7 }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function BotanicalMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100"
      height="160"
      viewBox="0 0 110 170"
      fill="none"
      aria-hidden
      style={{ opacity: 0.32 }}
    >
      <path d="M55 168 V70" stroke={SAGE} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M55 132 C40 120 28 100 32 78" stroke={SAGE} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M55 110 C70 96 82 74 78 52" stroke={SAGE} strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="32" cy="78" rx="9" ry="14" stroke={SAGE} strokeWidth="1.1" />
      <ellipse cx="78" cy="52" rx="10" ry="15" stroke={SAGE} strokeWidth="1.1" />
      <ellipse cx="55" cy="22" rx="11" ry="14" stroke={SAGE} strokeWidth="1.1" />
    </svg>
  );
}

export default function VilkaarPage() {
  return (
    <article
      className="relative overflow-hidden"
      style={{ background: "#F8F9F7" }}
    >
      <BotanicalMark className="pointer-events-none absolute right-[5%] top-[120px] hidden md:block" />

      {/* Hero */}
      <header className="px-6 pt-[140px] pb-12 md:px-12 md:pt-[180px] md:pb-16">
        <div className="mx-auto max-w-[1100px]">
          <p
            className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: BARK }}
          >
            Juridisk · Vilkår og betingelser
          </p>
          <h1
            className="mb-6 max-w-[820px]"
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(36px, 4.8vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            De aftaler{" "}
            <em style={{ color: PRIMARY, fontStyle: "italic" }}>vi laver.</em>
          </h1>
          <p
            className="max-w-[560px]"
            style={{ color: BARK, fontSize: "16.5px", lineHeight: 1.7 }}
          >
            Det her er aftalen mellem dig og Svarly. Læs igennem, og skriv hvis
            noget er uklart.
          </p>
          <p
            className="mt-7 text-[12.5px]"
            style={{ color: BARK }}
          >
            Gælder fra 12. maj 2026
          </p>
        </div>
      </header>

      {/* Table of contents */}
      <nav className="px-6 pb-12 md:px-12 md:pb-16" aria-label="Indhold">
        <div
          className="mx-auto max-w-[1100px] rounded-[14px] px-6 py-6 md:px-8 md:py-7"
          style={{ background: BEIGE, border: `1px solid ${BORDER}` }}
        >
          <p
            className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: BARK }}
          >
            Indhold
          </p>
          <ol className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-3 text-[14px] transition-colors"
                  style={{ color: INK }}
                >
                  <span
                    className="w-[22px] shrink-0 text-[12px] tabular-nums"
                    style={{ color: BARK }}
                  >
                    {s.num}
                  </span>
                  <span className="underline-offset-[5px] group-hover:underline">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Sections */}
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Section num="01" id="kort-fortalt" title="Kort fortalt">
            <p>
              Du opretter en konto, forbinder din Google Business Profile, og
              vi hjælper dig med at svare på anmeldelser. Du betaler enten
              ingenting eller et fast månedligt beløb. Du kan sige op når som
              helst.
            </p>
          </Section>

          <Section num="02" italic id="aftalen" title="Hvem er aftalen mellem">
            <p>
              Aftalen er mellem dig, eller den virksomhed du repræsenterer, og
              Svarly. Når du opretter en konto, accepterer du vilkårene her.
            </p>
          </Section>

          <Section num="03" id="tjenesten" title="Hvad Svarly er">
            <p>
              Svarly henter anmeldelser fra din Google Business Profile,
              foreslår svar i dit tonefald baseret på dine tidligere svar, og
              sender de svar du har godkendt tilbage til Google.
            </p>
            <p>Vi sender ingenting uden dit grønne lys.</p>
          </Section>

          <Section num="04" id="konto" title="Konto og brug">
            <p>For at bruge Svarly skal du:</p>
            <ul className="space-y-2 pl-0">
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>være myndig.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  have lovlig adgang til den Google Business Profile, du
                  forbinder.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  bruge tjenesten til en rigtig virksomhed, ikke til
                  parodi-konti eller spam.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>ikke forsøge at omgå tekniske begrænsninger.</span>
              </li>
            </ul>
          </Section>

          <Section num="05" italic id="pris" title="Pris og betaling">
            <p>Vi tilbyder tre planer:</p>
            <ul className="space-y-2 pl-0">
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 90 }}>Gratis</span>
                <span>5 AI-svar om måneden, ingen kortoplysninger.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 90 }}>Pro</span>
                <span>199 kr. om måneden, faktureres månedligt.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 90 }}>Pro årlig</span>
                <span>1.990 kr. om året, sparer to måneder.</span>
              </li>
            </ul>
            <p>
              Betalinger håndteres af Stripe. Prøveperioden er på 14 dage, og
              du behøver ikke at oplyse kort for at starte.
            </p>
          </Section>

          <Section num="06" id="opsigelse" title="Opsigelse">
            <p>
              Du kan opsige dit abonnement når som helst inde under
              Indstillinger. Opsigelsen træder i kraft ved udgangen af den
              periode, du allerede har betalt for.
            </p>
            <p>
              Vi refunderer ikke delvise perioder, men vi sender ikke nye
              fakturaer.
            </p>
          </Section>

          <Section num="07" id="indhold" title="Indhold du sender">
            <p>
              Du ejer indholdet af dine anmeldelser og dine svar. Vi får en
              begrænset licens til at behandle indholdet for at kunne levere
              tjenesten. Det vil sige hente det fra Google, foreslå svar, og
              sende dine godkendte svar afsted.
            </p>
            <p>Når du sletter din konto, ophører licensen.</p>
          </Section>

          <Section num="08" id="ansvar" title="Vores ansvar">
            <p>Vi gør vores bedste for at:</p>
            <ul className="space-y-2 pl-0">
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>holde tjenesten oppe.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>foreslå svar der passer til dit tonefald.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>sende godkendte svar afsted med det samme.</span>
              </li>
            </ul>
            <p>
              Vi kan ikke garantere at Google modtager hvert eneste svar uden
              problemer, at AI-forslag aldrig fejler, eller at tjenesten er
              tilgængelig hvert minut. Hvis noget går galt, retter vi det så
              hurtigt vi kan.
            </p>
          </Section>

          <Section num="09" italic id="begraensning" title="Ansvarsbegrænsning">
            <p>
              Hvis du har et erstatningskrav mod Svarly, er det maksimalt det
              beløb du har betalt til os de seneste tolv måneder. Vi dækker
              ikke indirekte tab, mistet omsætning eller goodwill.
            </p>
            <p>
              Vi har dog altid det ansvar, dansk forbrugerret pålægger os.
            </p>
          </Section>

          <Section num="10" id="aendringer" title="Ændringer">
            <p>
              Hvis vi ændrer vilkårene, skriver vi det til dig på e-mail
              mindst 30 dage før. Hvis du ikke kan acceptere de nye vilkår,
              kan du opsige inden de træder i kraft, og få det resterende
              abonnement refunderet.
            </p>
          </Section>

          <Section num="11" id="lov" title="Lovvalg og værneting">
            <p>
              Aftalen er underlagt dansk ret. Eventuelle tvister afgøres ved
              Københavns Byret. Hvis du er forbruger, har du de værnetings og
              forbrugerregler som dansk lov giver dig.
            </p>
          </Section>
        </div>
      </div>

      {/* Doc footer */}
      <div
        className="px-6 py-14 md:px-12 md:py-20"
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        <div className="mx-auto max-w-[1100px] text-center">
          <p
            className="text-[14.5px]"
            style={{ color: BARK, lineHeight: 1.7 }}
          >
            Spørgsmål?{" "}
            <a
              href="mailto:support@svarly.io"
              style={{ color: PRIMARY }}
              className="underline-offset-[4px] hover:underline"
            >
              support@svarly.io
            </a>
            . Eller læs vores{" "}
            <Link
              href="/privacy"
              style={{ color: PRIMARY }}
              className="underline-offset-[4px] hover:underline"
            >
              privatlivspolitik
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
