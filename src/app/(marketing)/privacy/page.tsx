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
  { num: "02", id: "hvem", title: "Hvem er Svarly" },
  { num: "03", id: "data", title: "Hvilke data vi indsamler" },
  { num: "04", id: "brug", title: "Hvordan vi bruger dem" },
  { num: "05", id: "google", title: "Google API-data" },
  { num: "06", id: "hvor", title: "Hvor det ligger" },
  { num: "07", id: "roller", title: "Roller" },
  { num: "08", id: "opbevaring", title: "Hvor længe vi gemmer" },
  { num: "09", id: "rettigheder", title: "Dine rettigheder" },
  { num: "10", id: "kontakt", title: "Kontakt" },
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

export default function PrivacyPage() {
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
            Juridisk · Privatlivspolitik
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
            Hvordan vi{" "}
            <em style={{ color: PRIMARY, fontStyle: "italic" }}>passer på</em>{" "}
            dine data.
          </h1>
          <p
            className="max-w-[560px]"
            style={{ color: BARK, fontSize: "16.5px", lineHeight: 1.7 }}
          >
            Vi indsamler kun det, der skal til for at hjælpe dig med dine
            anmeldelser. Her står hvad det er, hvor det ligger, og hvordan du
            kommer af med det.
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
      <nav
        className="px-6 pb-12 md:px-12 md:pb-16"
        aria-label="Indhold"
      >
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
              Svarly henter dine anmeldelser fra Google, foreslår svar i dit
              tonefald, og sender dem afsted når du har godkendt dem. Det vil
              sige, at vi opbevarer din e-mail, dine Google-tokens og indholdet
              af dine anmeldelser.
            </p>
            <p>
              Vi sælger ingenting til tredjepart, vi læser ikke andre konti end
              dem du har givet os adgang til, og du kan altid bede os slette det
              hele.
            </p>
          </Section>

          <Section num="02" italic id="hvem" title="Hvem er Svarly">
            <p>
              Svarly er navnet på denne tjeneste. Den drives som
              enkeltmandsvirksomhed indtil videre. Du kan altid skrive til{" "}
              <a
                href="mailto:support@svarly.io"
                style={{ color: PRIMARY }}
                className="underline-offset-[4px] hover:underline"
              >
                support@svarly.io
              </a>{" "}
              med spørgsmål om dine data, og du får svar af det menneske, der
              står for det.
            </p>
            <p>
              Hvis virksomhedsformen ændres, opdaterer vi det her, og giver dig
              besked på e-mail.
            </p>
          </Section>

          <Section num="03" id="data" title="Hvilke data vi indsamler">
            <ul className="space-y-2 pl-0">
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  Din e-mail og en hash af din adgangskode, opbevaret hos
                  Supabase.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  Et adgangs- og opdateringstoken til din Google Business
                  Profile, når du forbinder din konto.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  Navn, signatur og tonefald for din virksomhed, det du selv
                  skriver i Indstillinger.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>Indholdet af de anmeldelser, vi henter fra Google.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  Et Stripe-kunde-ID, hvis du opretter et betalt abonnement.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  Login-cookies fra Supabase og Stripes betalingsside. Vi
                  bruger ikke analytics eller sporings-cookies.
                </span>
              </li>
            </ul>
          </Section>

          <Section num="04" id="brug" title="Hvordan vi bruger dem">
            <p>
              Vi bruger dataene til præcis det, du har bedt os om: at hente
              anmeldelser, foreslå svar via OpenAI på baggrund af dit tonefald,
              og sende svaret tilbage til Google når du klikker godkend.
            </p>
            <p>
              Vi sender dig transaktionelle e-mails via Resend, fx
              bekræftelser og adgangskodelinks. Stripe håndterer betalingerne.
            </p>
            <p>
              Vi bruger ikke dine data til træning af modeller, og vi sender
              dem ikke videre til andre.
            </p>
          </Section>

          <Section num="05" id="google" title="Google API-data">
            <p>Som Google kræver, skriver vi det her ord for ord:</p>
            <blockquote
              className="my-2 rounded-[10px] px-5 py-4"
              style={{
                background: BEIGE,
                borderLeft: `none`,
                fontStyle: "italic",
              }}
            >
              <p style={{ color: INK }}>
                Svarly&apos;s use and transfer of information received from
                Google APIs to any other app will adhere to{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: PRIMARY }}
                  className="underline-offset-[4px] hover:underline"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
            </blockquote>
            <p>
              På dansk: Det vi får fra Google bruger vi kun til at vise dig
              dine anmeldelser, foreslå svar, og sende dine godkendte svar
              tilbage til Google. Vi sender det aldrig videre. Vi træner ikke
              AI-modeller på det. Vi bruger det ikke til reklame.
            </p>
          </Section>

          <Section num="06" id="hvor" title="Hvor det ligger">
            <p>Dine data ligger fordelt sådan her:</p>
            <ul className="space-y-2 pl-0">
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 80 }}>Supabase</span>
                <span>
                  EU-region. Din konto, din business-profil og dine
                  anmeldelser.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 80 }}>Stripe</span>
                <span>
                  USA, med GDPR-databehandleraftale. Faktureringsdata.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 80 }}>Resend</span>
                <span>
                  USA, med GDPR-databehandleraftale. Transaktionelle e-mails.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 80 }}>OpenAI</span>
                <span>
                  USA, under EU Standard Contractual Clauses. De beskeder vi
                  sender for at få et svar-forslag genereret.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY, minWidth: 80 }}>Google</span>
                <span>
                  USA. Vi sender dine godkendte svar tilbage hertil via deres
                  officielle API.
                </span>
              </li>
            </ul>
          </Section>

          <Section num="07" italic id="roller" title="Roller">
            <p>
              Når det gælder din konto og dine betalinger, er Svarly
              dataansvarlig. Vi bestemmer hvilke data der indsamles, og hvor de
              ligger.
            </p>
            <p>
              Når det gælder indholdet af dine anmeldelser og de svar, vi
              foreslår, er Svarly databehandler, og du er dataansvarlig. Det
              er din virksomhed, der har relationen til kunden.
            </p>
          </Section>

          <Section num="08" id="opbevaring" title="Hvor længe vi gemmer">
            <p>
              Så længe du har en konto, gemmer vi det. Hvis du sletter din
              konto eller beder os om det, sletter vi dine data inden for 30
              dage. Backups roterer ud over 90 dage.
            </p>
            <p>
              Faktureringsdata gemmer vi i fem år, fordi dansk bogføringslov
              kræver det.
            </p>
          </Section>

          <Section num="09" id="rettigheder" title="Dine rettigheder">
            <p>Du har ret til:</p>
            <ul className="space-y-2 pl-0">
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>Adgang til de data vi har om dig.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>Berigtigelse, hvis noget er forkert.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>Sletning af det hele.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  Dataportabilitet. Du kan få dine data udleveret i et
                  almindeligt format.
                </span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>Indsigelse mod en konkret behandling.</span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: PRIMARY }}>·</span>
                <span>
                  Klage til Datatilsynet, hvis du mener vi tager fejl.
                </span>
              </li>
            </ul>
            <p>
              Skriv til{" "}
              <a
                href="mailto:support@svarly.io"
                style={{ color: PRIMARY }}
                className="underline-offset-[4px] hover:underline"
              >
                support@svarly.io
              </a>{" "}
              for at gøre brug af en af dem.
            </p>
          </Section>

          <Section num="10" id="kontakt" title="Kontakt">
            <p>
              Skriv til{" "}
              <a
                href="mailto:support@svarly.io"
                style={{ color: PRIMARY }}
                className="underline-offset-[4px] hover:underline"
              >
                support@svarly.io
              </a>{" "}
              for alle data-spørgsmål. Du får svar inden for en arbejdsdag.
            </p>
            <div
              className="mt-4 rounded-[10px] px-5 py-4"
              style={{ background: BEIGE }}
            >
              <p
                className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: BARK, marginBottom: 6 }}
              >
                Datatilsynet
              </p>
              <p style={{ color: INK, fontSize: 14, lineHeight: 1.65 }}>
                Carl Jacobsens Vej 35
                <br />
                2500 Valby
                <br />
                33 19 32 00
                <br />
                <a
                  href="mailto:dt@datatilsynet.dk"
                  style={{ color: PRIMARY }}
                  className="underline-offset-[4px] hover:underline"
                >
                  dt@datatilsynet.dk
                </a>
              </p>
            </div>
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
              href="/vilkaar"
              style={{ color: PRIMARY }}
              className="underline-offset-[4px] hover:underline"
            >
              vilkår
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
