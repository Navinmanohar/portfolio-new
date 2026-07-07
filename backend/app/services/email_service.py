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
    """
    Tries to extract a readable first name from an email address.
    Falls back to 'there' for generic/short/unreadable local parts.
    Examples:
        john.doe@company.com   -> "John"
        hr@company.com         -> "there"   (too short, generic)
        sarah_jones@gmail.com  -> "Sarah"
        navinmanohar78@x.com   -> "there"   (after stripping digits < 3 chars)
    """
    local = email.split("@")[0]
    parts = re.split(r"[._\-]+", local)
    cleaned = [
        re.sub(r"\d+", "", p).capitalize()
        for p in parts
        if len(re.sub(r"\d+", "", p)) >= 3   # skip "hr", "it", digits-only, etc.
    ]
    return cleaned[0] if cleaned else "there"


def _build_resume_html(to_email: str, company: str | None = None) -> str:
    name = _extract_name(to_email)
    company_line = (
        f"<p style='margin:0 0 16px;color:#374151;font-size:15px;'>"
        f"I came across <strong>{company}</strong> and believe my background in "
        f"AI engineering and backend development could be a strong fit for your team."
        f"</p>"
        if company
        else ""
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background-color:#f3f4f6;padding:40px 20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="100%"
               style="max-width:720px;background-color:#ffffff;border-radius:12px;
                      overflow:hidden;border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td style="padding:36px 44px;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#111827;
                         letter-spacing:-0.3px;">Navin Manohar</p>
              <p style="margin:6px 0 0;font-size:14px;color:#6b7280;">
                AI Engineer &nbsp;&middot;&nbsp; Backend Developer &nbsp;&middot;&nbsp; Full Stack
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 44px;color:#374151;font-size:15px;line-height:1.8;">

              <p style="margin:0 0 20px;">Hi {name},</p>

              <p style="margin:0 0 20px;">
                I noticed you visited my portfolio — I'm sharing my resume below along
                with a quick overview of my work. Please find my resume attached to this email.
              </p>

              {company_line}

              <p style="margin:0 0 20px;">
                I have 2+ years of experience building production-grade APIs, AI applications,
                multi-tenant systems, and workflow automation. My recent work spans RAG pipelines,
                agentic chatbots, LLM integrations, and enterprise backend architecture.
              </p>

              <!-- Highlights -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin:28px 0;border:1px solid #e5e7eb;border-radius:8px;
                            overflow:hidden;">
                <tr>
                  <td style="padding:18px 24px;background-color:#f9fafb;
                              border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;font-weight:600;color:#374151;
                               text-transform:uppercase;letter-spacing:0.6px;">
                      Key Highlights
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px 16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:6px 0;font-size:15px;color:#374151;">
                          <span style="color:#111827;font-weight:600;">200+</span>
                          &nbsp; production REST APIs designed and deployed
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:15px;color:#374151;">
                          <span style="color:#111827;font-weight:600;">AI systems</span>
                          &nbsp; — RAG pipelines, agentic chatbots, LLM integrations
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:15px;color:#374151;">
                          <span style="color:#111827;font-weight:600;">45%</span>
                          &nbsp; workflow efficiency improvement in enterprise HRMS
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:15px;color:#374151;">
                          <span style="color:#111827;font-weight:600;">500+</span>
                          &nbsp; DSA problems solved on LeetCode &amp; HackerRank
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:15px;color:#374151;">
                          <span style="color:#111827;font-weight:600;">Stack</span>
                          &nbsp; — FastAPI, Node.js, PostgreSQL, Redis, LangChain, Next.js
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Links -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin:0 0 28px;border:1px solid #e5e7eb;border-radius:8px;
                            overflow:hidden;">
                <tr>
                  <td style="padding:18px 24px;background-color:#f9fafb;
                              border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:12px;font-weight:600;color:#374151;
                               text-transform:uppercase;letter-spacing:0.6px;">
                      Links
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 24px 14px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:5px 0;font-size:15px;color:#374151;
                                    white-space:nowrap;width:90px;">
                          Portfolio
                        </td>
                        <td style="padding:5px 0;font-size:15px;">
                          <a href="{settings.portfolio_url}"
                             style="color:#1d4ed8;text-decoration:none;">
                            {settings.portfolio_url}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:15px;color:#374151;">GitHub</td>
                        <td style="padding:5px 0;font-size:15px;">
                          <a href="https://github.com/Navinmanohar"
                             style="color:#1d4ed8;text-decoration:none;">
                            github.com/Navinmanohar
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;font-size:15px;color:#374151;">LinkedIn</td>
                        <td style="padding:5px 0;font-size:15px;">
                          <a href="https://linkedin.com/in/navin-manohar-48b1a5226"
                             style="color:#1d4ed8;text-decoration:none;">
                            linkedin.com/in/navin-manohar-48b1a5226
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0"
                     style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:8px;background-color:#111827;">
                    <a href="{settings.portfolio_url}"
                       style="display:inline-block;padding:13px 28px;
                              font-size:15px;font-weight:600;color:#ffffff;
                              text-decoration:none;border-radius:8px;
                              letter-spacing:0.1px;">
                      View Full Portfolio &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;color:#374151;font-size:15px;">
                I would be happy to discuss how my experience can contribute to your
                team. Feel free to reply to this email or reach out directly.
              </p>

              <!-- Signature -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin-top:32px;padding-top:24px;
                            border-top:1px solid #e5e7eb;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:16px;font-weight:700;
                               color:#111827;">Navin Manohar</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">
                      AI Engineer &nbsp;&middot;&nbsp; Backend Developer &nbsp;&middot;&nbsp; Full Stack
                    </p>
                    <p style="margin:0;font-size:14px;color:#6b7280;">
                      <a href="mailto:navinmanohar78086@gmail.com"
                         style="color:#1d4ed8;text-decoration:none;">
                        navinmanohar78086@gmail.com
                      </a>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="https://github.com/Navinmanohar"
                         style="color:#1d4ed8;text-decoration:none;">
                        GitHub
                      </a>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="{settings.portfolio_url}"
                         style="color:#1d4ed8;text-decoration:none;">
                        Portfolio
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

        <!-- Footer note -->
        <table role="presentation" width="100%" style="max-width:720px;">
          <tr>
            <td align="center" style="padding:20px 24px;font-size:12px;color:#9ca3af;">
              You received this because someone visited your portfolio.
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
        msg["From"]    = f"Navin Manohar <{settings.from_email}>"
        msg["To"]      = to_email
        msg["Subject"] = "Navin Manohar — Resume & Portfolio (AI Engineer | Backend Developer)"

        msg.attach(MIMEText(_build_resume_html(to_email, company), "html"))

        if os.path.exists(RESUME_PATH):
            with open(RESUME_PATH, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
                encoders.encode_base64(part)
                part.add_header(
                    "Content-Disposition",
                    'attachment; filename="Navin_Manohar_Resume.pdf"',
                )
                msg.attach(part)
        else:
            print(f"Warning: Resume not found at {RESUME_PATH}")

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(settings.smtp_email, settings.smtp_password)
            server.sendmail(settings.from_email, [to_email], msg.as_string())

        print(f"Resume email sent to {to_email}")
        return True

    except Exception as e:
        print(f"Email error: {e}")
        return False


async def send_contact_notification(
    name: str,
    email: str,
    message: str,
    company: str | None = None,
    role: str | None = None,
) -> bool:
    if not settings.smtp_email or not settings.smtp_password:
        print("SMTP credentials not set — email not sent")
        return False
    try:
        msg = MIMEMultipart()
        msg["From"]    = f"Navin Manohar <{settings.from_email}>"
        msg["To"]      = settings.from_email
        msg["Subject"] = f"Portfolio Contact — {name} ({email})"

        optional_rows = ""
        if company:
            optional_rows += f"""
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#6b7280;width:80px;
                          vertical-align:top;">Company</td>
              <td style="padding:6px 0;font-size:14px;color:#111827;">{company}</td>
            </tr>"""
        if role:
            optional_rows += f"""
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#6b7280;
                          vertical-align:top;">Role</td>
              <td style="padding:6px 0;font-size:14px;color:#111827;">{role}</td>
            </tr>"""

        body = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;
             font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%"
               style="max-width:560px;background:#fff;border-radius:10px;
                      border:1px solid #e5e7eb;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:20px 28px;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0;font-size:16px;font-weight:700;color:#111827;">
                New Portfolio Contact
              </p>
              <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">
                Received via portfolio contact form
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:20px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#6b7280;
                              width:80px;vertical-align:top;">Name</td>
                  <td style="padding:6px 0;font-size:14px;color:#111827;
                              font-weight:600;">{name}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#6b7280;
                              vertical-align:top;">Email</td>
                  <td style="padding:6px 0;font-size:14px;">
                    <a href="mailto:{email}" style="color:#1d4ed8;
                       text-decoration:none;">{email}</a>
                  </td>
                </tr>
                {optional_rows}
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin-top:20px;">
                <tr>
                  <td style="padding:16px 20px;background:#f9fafb;
                              border-radius:8px;border:1px solid #e5e7eb;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:600;
                               color:#374151;text-transform:uppercase;
                               letter-spacing:0.6px;">Message</p>
                    <p style="margin:0;font-size:14px;color:#374151;
                               line-height:1.7;white-space:pre-wrap;">{message}</p>
                  </td>
                </tr>
              </table>

              <!-- Quick Reply CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0"
                     style="margin-top:24px;">
                <tr>
                  <td style="border-radius:6px;background-color:#111827;">
                    <a href="mailto:{email}"
                       style="display:inline-block;padding:10px 22px;
                              font-size:13px;font-weight:600;color:#ffffff;
                              text-decoration:none;border-radius:6px;">
                      Reply to {name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""

        msg.attach(MIMEText(body, "html"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(settings.smtp_email, settings.smtp_password)
            server.sendmail(settings.from_email, [settings.from_email], msg.as_string())

        print(f"Contact notification sent for {name} ({email})")
        return True

    except Exception as e:
        print(f"Contact notification error: {e}")
        return False