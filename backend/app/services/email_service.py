import smtplib
import os
import re
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from app.config import get_settings

settings = get_settings()

RESUME_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "Navin_Manohar_Updated_resume.pdf"
)


def _extract_name(email: str) -> str:
    local = email.split("@")[0]
    parts = re.split(r"[._\-]+", local)
    cleaned = [re.sub(r"\d+", "", p).capitalize() for p in parts if re.sub(r"\d+", "", p)]
    return cleaned[0] if cleaned else "there"


def _build_html(recipient_name: str) -> str:
    name = _extract_name(recipient_name)
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:20px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:32px 32px 24px;line-height:1.7;color:#1a1a2e;font-size:15px;">

              <p style="margin:0 0 16px;">Hi {name},</p>

              <p style="margin:0 0 16px;">Thank you for taking the time to view my profile.</p>

              <p style="margin:0 0 16px;">
                I&rsquo;m <strong style="color:#2563eb;">Navin Manohar</strong>, an AI Engineer &amp; Backend Developer
                with experience building scalable backend systems, AI-powered applications, RAG pipelines,
                workflow automation platforms, and enterprise HRMS solutions.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td style="background-color:#f8fafc;border-radius:8px;padding:20px 24px;">
                    <p style="margin:0 0 12px;font-weight:600;color:#1a1a2e;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">
                      &#x1f517; My Links
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:3px 0;"><strong style="color:#1a1a2e;font-size:14px;">Portfolio:</strong> <a href="{settings.portfolio_url}" style="color:#2563eb;text-decoration:none;font-size:14px;">{settings.portfolio_url}</a></td>
                      </tr>
                      <tr>
                        <td style="padding:3px 0;"><strong style="color:#1a1a2e;font-size:14px;">GitHub:</strong> <a href="https://github.com/Navinmanohar" style="color:#2563eb;text-decoration:none;font-size:14px;">github.com/Navinmanohar</a></td>
                      </tr>
                      <tr>
                        <td style="padding:3px 0;"><strong style="color:#1a1a2e;font-size:14px;">LinkedIn:</strong> <a href="https://linkedin.com/in/navin-manohar-48b1a5226" style="color:#2563eb;text-decoration:none;font-size:14px;">linkedin.com/in/navin-manohar-48b1a5226</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td style="background-color:#f8fafc;border-radius:8px;padding:20px 24px;">
                    <p style="margin:0 0 12px;font-weight:600;color:#1a1a2e;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">
                      &#x2728; Highlights
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr><td style="padding:3px 0;color:#475569;font-size:14px;">&bull; Built 150+ production-grade REST APIs</td></tr>
                      <tr><td style="padding:3px 0;color:#475569;font-size:14px;">&bull; Developed AI-powered hiring and HRMS assistant systems</td></tr>
                      <tr><td style="padding:3px 0;color:#475569;font-size:14px;">&bull; Experience with FastAPI, Node.js, PostgreSQL, Redis, RAG, and LLM integrations</td></tr>
                      <tr><td style="padding:3px 0;color:#475569;font-size:14px;">&bull; Designed scalable multi-tenant workflow and automation systems</td></tr>
                      <tr><td style="padding:3px 0;color:#475569;font-size:14px;">&bull; Worked on enterprise backend architecture, cron automation, and AI integrations</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;">
                I&rsquo;d be happy to discuss how my experience in AI engineering, backend development,
                and intelligent automation can contribute to your team.
              </p>

              <p style="margin:0 0 16px;">
                If you have any questions, feel free to reply to this email.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td style="border-top:1px solid #e2e8f0;padding-top:20px;">
                    <p style="margin:0 0 2px;color:#1a1a2e;font-weight:600;font-size:15px;">Best regards,</p>
                    <p style="margin:0 0 2px;color:#1a1a2e;font-weight:600;font-size:15px;">Navin Manohar</p>
                    <p style="margin:0 0 2px;color:#475569;font-size:13px;">AI Engineer &amp; Backend Developer</p>
                    <p style="margin:0;color:#475569;font-size:13px;">
                      <a href="mailto:navinmanohar78086@gmail.com" style="color:#2563eb;text-decoration:none;">navinmanohar78086@gmail.com</a>
                    </p>
                    <p style="margin:0;color:#475569;font-size:13px;">
                      <a href="https://github.com/Navinmanohar" style="color:#2563eb;text-decoration:none;">github.com/Navinmanohar</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:16px 20px;color:#94a3b8;font-size:11px;">
              Navin Manohar &mdash; AI Engineer &amp; Backend Developer
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>"""


async def send_resume_email(to_email: str, company: str | None = None) -> bool:
    if not settings.smtp_email or not settings.smtp_password:
        print("SMTP credentials not set — email not sent")
        return False
    try:
        msg = MIMEMultipart()
        msg["From"] = f"Navin Manohar <{settings.from_email}>"
        msg["To"] = to_email
        msg["Subject"] = "Resume & Portfolio — Navin Manohar | AI Engineer & Backend Developer"
        msg.attach(MIMEText(_build_html(to_email), "html"))

        if os.path.exists(RESUME_PATH):
            with open(RESUME_PATH, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
                encoders.encode_base64(part)
                part.add_header(
                    "Content-Disposition",
                    f'attachment; filename="Navin_Manohar_Resume.pdf"',
                )
                msg.attach(part)
        else:
            print(f"Resume not found at {RESUME_PATH}")

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(settings.smtp_email, settings.smtp_password)
            server.sendmail(settings.from_email, [to_email], msg.as_string())

        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False
