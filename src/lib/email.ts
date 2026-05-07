import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export interface NewReviewEmailProps {
  to: string;
  businessName: string;
  reviewerName: string;
  rating: number;
  content: string;
  reviewsUrl: string;
}

const STARS = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export async function sendNewReviewEmail(props: NewReviewEmailProps) {
  const { to, businessName, reviewerName, rating, content, reviewsUrl } = props;

  await getResend().emails.send({
    from: "Svarly <noreply@svarly.dk>",
    to,
    subject: `Ny ${rating}-stjernet anmeldelse — ${businessName}`,
    html: `
<!DOCTYPE html>
<html lang="da">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F9F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
    <div style="background:#2F4F3E;padding:28px 32px;">
      <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">Svarly</span>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 6px;font-size:13px;color:#5C6B62;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Ny anmeldelse</p>
      <h1 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#1F2A24;line-height:1.25;">${businessName}</h1>

      <div style="background:#F8F9F7;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="margin-bottom:10px;">
          <span style="font-weight:600;color:#1F2A24;">${reviewerName}</span>
          <span style="color:#E6A817;font-size:15px;margin-left:10px;">${STARS(rating)}</span>
        </div>
        <p style="margin:0;font-size:14px;color:#3D4D44;line-height:1.6;">${content || "(Ingen tekstanmeldelse)"}</p>
      </div>

      <a href="${reviewsUrl}" style="display:inline-block;background:#2F4F3E;color:#fff;text-decoration:none;padding:13px 24px;border-radius:10px;font-size:14px;font-weight:600;">
        Svar med AI nu →
      </a>

      <p style="margin:24px 0 0;font-size:12px;color:#8FA396;">
        Du modtager denne mail fordi du bruger Svarly.
        <a href="${reviewsUrl.replace("/reviews", "/settings")}" style="color:#2F4F3E;">Administrer notifikationer</a>
      </p>
    </div>
  </div>
</body>
</html>`,
  });
}
