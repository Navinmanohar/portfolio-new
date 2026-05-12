import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from app.config import get_settings

settings = get_settings()

RESUME_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "..", "public", "Navin_Manohar_Updated_resume.pdf"
)


def _build_html(company: str | None) -> str:
    company_line = f" at {company}" if company else ""
    return f"""
<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
  <p>Hi there{company_line},</p>
  <p>Thank you for taking the time to view my profile.</p>
  <p>
    I&rsquo;m <strong>Navin Manohar</strong>, an AI Engineer and Backend Developer
    with experience building scalable backend systems, RAG-based AI applications,
    workflow automation platforms, and enterprise HRMS solutions.
  </p>

  <p><strong>My Links:</strong></p>
  <ul>
    <li><strong>Portfolio:</strong> <a href="{settings.portfolio_url}">{settings.portfolio_url}</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/Navinmanohar">github.com/Navinmanohar</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/navin-manohar-48b1a5226">linkedin.com/in/navin-manohar-48b1a5226</a></li>
  </ul>

  <p><strong>Some highlights of my work:</strong></p>
  <ul>
    <li>Built 150+ production REST APIs</li>
    <li>Developed AI-powered hiring and HRMS assistant systems</li>
    <li>Experience with FastAPI, Node.js, PostgreSQL, Redis, RAG, and LLM integrations</li>
    <li>Built scalable multi-tenant workflow and automation systems</li>
  </ul>

  <p>
    I&rsquo;d be happy to discuss how my experience in AI engineering, backend architecture,
    and intelligent automation can contribute to your team.
  </p>

  <p>
    If you have any questions, feel free to reply to this email.
  </p>

  <p>
    Best regards,<br/>
    <strong>Navin Manohar</strong><br/>
    AI Engineer | Backend Developer<br/>
    <a href="mailto:navinmanohar78086@gmail.com">navinmanohar78086@gmail.com</a><br/>
    <a href="https://github.com/Navinmanohar">github.com/Navinmanohar</a>
  </p>
</div>
"""


async def send_resume_email(to_email: str, company: str | None = None) -> bool:
    if not settings.smtp_email or not settings.smtp_password:
        print("SMTP credentials not set — email not sent")
        return False
    try:
        msg = MIMEMultipart()
        msg["From"] = f"Navin Manohar <{settings.from_email}>"
        msg["To"] = to_email
        company_line = f" at {company}" if company else ""
        msg["Subject"] = f"Navin Manohar — Resume & Portfolio{company_line}"
        msg.attach(MIMEText(_build_html(company), "html"))

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

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(settings.smtp_email, settings.smtp_password)
            server.sendmail(settings.from_email, [to_email], msg.as_string())

        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False
