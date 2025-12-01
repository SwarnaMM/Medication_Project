
from fastapi import FastAPI
from app.core.auth import auth_middleware
from app.core.rate_limit import rate_limit_middleware
from app.api.routes import medications, schedules, doses
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()



origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Allowed domains
    allow_credentials=True,
    allow_methods=["*"],            # Allow all HTTP methods
    allow_headers=["*"],            # Allow all headers
)

app.middleware("http")(auth_middleware)
app.middleware("http")(rate_limit_middleware)

app.include_router(medications.router)
app.include_router(schedules.router)
app.include_router(doses.router)
