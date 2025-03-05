# DesignStudio - Digital Design Services Platform

A modern web platform for selling digital design products and custom graphic design services, built with React and FastAPI.

## Quick Start

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Create a Python virtual environment (recommended):

`python -m venv venv`
source `venv\Scripts\activate`


2. Install Python dependencies:

`cd backend`
`pip install -r requirements.txt`


3. Start the FastAPI server:

`uvicorn main:app --host 127.0.0.1 --port 8000`


The backend API will be available at `http://localhost:8000`


### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- React Router DOM

### Backend
- FastAPI
- Pydantic
- Uvicorn

## Key Features

- Modern, responsive design
- Digital product showcase
- Custom design service requests
- Portfolio gallery
- Blog integration ready
- Contact form with budget estimation

## API Endpoints

- `GET /products` - List all digital products
- `GET /products/{product_id}` - Get specific product details
- `POST /contact` - Submit contact/quote requests

## Development

### Available Scripts

Frontend:
```
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

Backend:
```
uvicorn main:app --reload 
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:8000
```

## Deployment

### Frontend
The frontend is configured for deployment on Netlify. Simply push to your repository and connect it to Netlify for automatic deployments.

### Backend
The FastAPI backend can be deployed to any Python-compatible hosting service (e.g., Heroku, DigitalOcean, etc.).

## Design System

- Font Family: Poppins (sans-serif), Playfair Display (serif)
- Primary Color: Teal (#14b8a6)
- Secondary Color: Rose (#f43f5e)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.