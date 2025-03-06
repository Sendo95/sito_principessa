from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv
import uvicorn

# Carica le variabili d'ambiente dal file .env
load_dotenv()

app = FastAPI(title="DesignStudio API")

# Configurazione SMTP
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
RECIPIENT_EMAIL = "sirnishid@gmail.com"

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str
    project_reference: Optional[str] = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def send_email(contact: ContactRequest):
    """Funzione per inviare l'email tramite SMTP"""
    msg = EmailMessage()
    msg["Subject"] = f"Nuovo contatto da {contact.name}"
    msg["From"] = SMTP_USERNAME
    msg["To"] = RECIPIENT_EMAIL

    body = f"""
    Nuova richiesta di contatto:
    
    Nome: {contact.name}
    Email: {contact.email}
    {f"Riferimento progetto: {contact.project_reference}" if contact.project_reference else ""}
    Messaggio:
    {contact.message}
    """

    msg.set_content(body)

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Errore nell'invio dell'email: {str(e)}")
        return False

@app.post("/api/contact")
async def create_contact(contact: ContactRequest):
    try:
        if not send_email(contact):
            raise HTTPException(
                status_code=500, 
                detail="Errore durante l'invio dell'email"
            )
            
        return {"message": "Email inviata con successo"}
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Errore interno del server: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)