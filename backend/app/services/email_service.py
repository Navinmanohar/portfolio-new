import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings

settings = get_settings()


def _build_html(company: str | None) -> str:
    company_line = f" at {company}" if company else ""
    return f"""
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi there!</h2>
        <p>Thanks for your interest in my profile{company_line}.</p>
        <p>Here's my resume and portfolio links:</p>
        <ul>
            <li><strong>Portfolio:</strong> <a href="https://navinmanohar.vercel.app">navinmanohar.vercel.app</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/Navinmanohar">github.com/Navinmanohar</a></li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/navin-manohar-48b1a5226/">LinkedIn</a></li>
        </ul>
        <p>I'd love to discuss how my experience in AI engineering and backend development can help your team.</p>
        <p>Best,<br/>Navin Manohar</p>
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

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(settings.smtp_email, settings.smtp_password)
            server.sendmail(settings.from_email, [to_email], msg.as_string())

        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False
