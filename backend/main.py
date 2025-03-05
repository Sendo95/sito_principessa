from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="DesignStudio API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    images: List[str]
    details: dict

class ContactForm(BaseModel):
    name: str
    email: str
    message: str
    budget: Optional[float]
    deadline: Optional[str]

# Sample data (replace with database later)
products = [
    {
        "id": 1,
        "name": "Instagram Stories Template Pack",
        "description": "10 template professionali per le tue storie Instagram",
        "price": 49.99,
        "category": "digital_products",
        "images": ["https://images.unsplash.com/photo-1611162617474-5b21e879e113"],
        "details": {
            "format": "PSD, AI",
            "files": 10,
            "license": "Commercial use"
        }
    }
]

@app.get("/")
def read_root():
    return {"message": "Welcome to DesignStudio API"}

@app.get("/products")
def get_products():
    return products

@app.get("/products/{product_id}")
def get_product(product_id: int):
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/contact")
def submit_contact(form: ContactForm):
    # Here you would typically save to database and send email
    return {"message": "Form submitted successfully"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)