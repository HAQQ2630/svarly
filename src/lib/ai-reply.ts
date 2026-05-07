import OpenAI from "openai";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export interface ReplyContext {
  reviewerName: string;
  rating: number;
  content: string;
  businessName: string;
  brandVoice: string | null;
  signature: string | null;
}

export async function generateDanishReply(ctx: ReplyContext): Promise<string> {
  const voiceInstruction = ctx.brandVoice
    ? `Brand voice: ${ctx.brandVoice}`
    : "Brand voice: Venlig, professionel og direkte.";

  const signatureNote = ctx.signature
    ? `Afslut altid med signaturen: "${ctx.signature}"`
    : "";

  const systemPrompt = `Du skriver korte, autentiske svar på kundeanmeldelser på vegne af en dansk virksomhed.

Virksomhed: ${ctx.businessName}
${voiceInstruction}
${signatureNote}

Regler:
- Skriv udelukkende på dansk.
- Hold svaret til 2–4 sætninger.
- Adressér det specifikke i anmeldelsen — ikke generiske fraser.
- Tak anmelderen. Inviter dem til at komme igen.
- Skriv aldrig "Kære [navn]" i starten — start direkte med tak eller anerkendelse.
- Returner kun selve svarteksten, ingen ekstra forklaringer.`;

  const userPrompt = `Anmelder: ${ctx.reviewerName}
Stjerner: ${ctx.rating}/5
Anmeldelse: ${ctx.content || "(Ingen tekstanmeldelse — kun stjerner)"}`;

  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 300,
    temperature: 0.7,
  });

  const reply = response.choices[0]?.message?.content?.trim();
  if (!reply) throw new Error("OpenAI returned an empty response");
  return reply;
}
