from app.config import get_settings

settings = get_settings()


async def send_resume_email(to_email: str, company: str | None = None):
    try:
        import resend

        resend.api_key = settings.resend_api_key

        company_line = f" at {company}" if company else ""
        subject = f"Navin Manohar — Resume & Portfolio{company_line}"
        html = f"""
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

        params = {
            "from": f"Navin Manohar <{settings.from_email}>",
            "to": [to_email],
            "subject": subject,
            "html": html,
        }

        r = resend.Emails.send(params)
        return r
    except Exception as e:
        print(f"Email error: {e}")
        return None
