# Project - Medication Manager

A full-stack web application for managing medications, schedules, and dosage tracking. Built with **React + Redux** frontend and **FastAPI** backend.

**Repository:** https://github.com/SwarnaMM/Medication_management_app.git

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [What's Working Now](#whats-working-now)
5. [What's Yet to Implement](#whats-yet-to-implement)
6. [Backend Architecture](#backend-architecture)
7. [Frontend Architecture](#frontend-architecture)
8. [Prerequisites](#prerequisites)
9. [Installation & Setup](#installation--setup)
10. [Running the Application](#running-the-application)
11. [Testing with Sample Data](#testing-with-sample-data)
12. [API Endpoints](#api-endpoints)
13. [Troubleshooting](#troubleshooting)

---

## Project Overview

The **Medication Manager** is a web application designed to help users:
- **Create and manage medications** with dosage and instructions
- **Schedule medications** with specific times and recurrence patterns
- **Track doses** with timestamps and completion status
- **View upcoming doses** in an organized calendar interface

The application provides a clean, intuitive UI for medication management with real-time synchronization between frontend and backend.

---

## What's Working Now 

### Backend (FastAPI)

**Core Endpoints - Fully Implemented:**
-  `POST /medications` - Create new medication
-  `GET /medications` - Get all active medications
-  `POST /medications/{medication_id}/deactivate` - Deactivate medication
-  `POST /schedules/add` - Create new schedule with validation
-  `GET /schedules/medication/{medication_id}` - Get schedules for a medication
-  `POST /doses/generate/{schedule_id}` - Generate doses (7 days by default)
-  `GET /doses/upcoming` - Get upcoming doses (not yet taken)
-  `POST /doses/{dose_id}/take` - Mark dose as taken

**Recurrence Types Supported:**
-  `daily` - Every day
-  `weekly` - Specific days of week
-  `multiple_times_per_day` - Multiple times in a day

**Authentication & Middleware:**
-  API Key authentication (`x-api-key` header)
-  CORS enabled for frontend communication
-  Rate limiting middleware
-  Error handling and validation

### Frontend (React + Redux)

**Pages - Fully Implemented:**
-  **ListPage** - View all medications with upcoming doses sidebar
-  **AddMedicationPage** - Create new medications with success feedback
-  **DetailPage** - View medication details and manage schedules
-  **DosesPage** - View and track upcoming doses
-  **ViewSchedulesPage** - Manage medication schedules (skeleton)

**Components - Fully Implemented:**
-  **MedicationList** - Display medications in grid/list
-  **MedicationForm** - Input form for medication creation
-  **MedicationDetail** - Detailed medication view with actions
-  **ScheduleForm** - Create schedules with time validation
-  **ScheduleList** - Display schedules for medication
-  **UpcomingDoses** - Show upcoming doses with completion tracking

**State Management (Redux Toolkit):**
-  `medicationsSlice` - Medications state and actions
-  `scheduleSlice` - Schedules and dose generation
-  `dosesSlice` - Doses state management

**Data Flow:**
-  Fetch medications on app load
-  Create new medications
-  Create schedules for medications
-  Generate doses from schedules
-  Mark doses as taken
-  Real-time UI updates via Redux

**Styling:**
-  Tailwind CSS integration
-  Responsive design (mobile-first)
-  Clean, modern UI with proper spacing

---

## What's Yet to Implement 

### Backend
-  **Persistent Database**: MongoDB integration (ready but not activated)
-  **Schedule Management**: Update/Delete endpoints, pause/resume
-  **Advanced Features**: Dose history, statistics, search, notifications
-  **Medication Interactions**: Checker for drug interactions

### Frontend
-  **User System**: Authentication, login, profile, settings
-  **Edit Features**: Edit/delete medications and schedules
-  **Advanced UI**: Charts, calendar view, dose history, search
-  **Enhancements**: Dark mode, i18n, undo/redo
-  **Testing**: Unit, integration, and E2E tests

### Infrastructure
-  **Deployment**: Docker, CI/CD pipeline, AWS ECS/EKS, Kubernetes
-  **Monitoring**: Logging, error tracking (Sentry), performance metrics

---

## Technology Stack

### Backend
- **Framework:** FastAPI (Python)
- **Server:** Uvicorn
- **Database:** In-Memory Storage (default), MongoDB ready (via Motor async driver)
- **Middleware:** CORS, Authentication (x-api-key), Rate Limiting
- **Validation:** Pydantic

### Frontend
- **Library:** React 19.2
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM 
- **Styling:** Tailwind CSS 
- **Build Tool:** Vite
- **Package Manager:** npm

---

## Project Structure

```
Swarna_project/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI application entry point
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── medications.py   # Medication endpoints
│   │   │       ├── schedules.py     # Schedule endpoints
│   │   │       └── doses.py         # Dose endpoints
│   │   ├── services/
│   │   │   ├── medication_service.py
│   │   │   ├── schedule_service.py
│   │   │   └── dose_service.py
│   │   ├── db/
│   │   │   ├── models.py            # Pydantic data models
│   │   │   ├── repository.py        # Database operations
│   │   │   ├── repository_factory.py
│   │   │   ├── documentdb.py        # MongoDB connection
│   │   │   └── local_store.py       # Local file storage
│   │   ├── core/
│   │   │   ├── auth.py              # Authentication middleware
│   │   │   ├── rate_limit.py        # Rate limiting
│   │   │   ├── cache.py             # Caching logic
│   │   │   ├── config.py            # Configuration
│   │   │   └── errors.py            # Custom exceptions
│   │   └── tests/
│   ├── requirements.txt             # Python dependencies
│   └── myvenv/                      # Virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Main component
│   │   ├── components/
│   │   │   ├── MedicationForm.jsx    # Add/edit medication form
│   │   │   ├── MedicationList.jsx    # List medications
│   │   │   ├── MedicationDetail.jsx  # Single medication detail
│   │   │   ├── ScheduleForm.jsx      # Add schedule form
│   │   │   ├── ScheduleList.jsx      # List schedules
│   │   │   └── UpcomingDoses.jsx     # Upcoming doses view
│   │   ├── pages/
│   │   │   ├── ListPage.jsx          # Medications list page
│   │   │   ├── AddMedicationPage.jsx # Add medication page
│   │   │   ├── DetailPage.jsx        # Medication detail page
│   │   │   ├── DosesPage.jsx         # Doses page
│   │   │   └── ViewSchedulesPage.jsx # Schedules view page
│   │   ├── hooks/
│   │   │   ├── useMedications.js     # Medications data fetching
│   │   │   ├── useSchedules.js       # Schedules data fetching
│   │   │   └── useDoses.js           # Doses data fetching
│   │   ├── store/
│   │   │   ├── store.js              # Redux store configuration
│   │   │   ├── medicationsSlice.js   # Medications reducer
│   │   │   ├── scheduleSlice.js      # Schedules reducer
│   │   │   └── dosesSlice.js         # Doses reducer
│   │   ├── services/
│   │   │   └── mockApi.js            # API service layer
│   │   ├── App.css & index.css
│   │   └── tests/
│   ├── package.json
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── infra/
│   ├── docker-compose.yml           # Docker compose for local dev
│   ├── ecs/                         # AWS ECS deployment
│   └── eks/helm/                    # Kubernetes Helm charts
│
├── Dockerfile                       # Docker image for app
├── db.sql                           # Database schema
└── README.md                        # This file
```

---

## Backend Architecture

### Core Components

#### 1. **Main Application (`main.py`)**
- Initializes FastAPI application
- Configures CORS middleware for cross-origin requests
- Applies authentication and rate-limiting middleware
- Registers API route handlers

#### 2. **API Routes**

**Medications Route** (`/medications`)
- `POST /medications` - Create new medication
- `GET /medications` - Get all active medications
- `POST /medications/{medication_id}/deactivate` - Deactivate medication

**Schedules Route** (`/schedules`)
- `POST /schedules/add` - Create new schedule
- `GET /schedules/medication/{medication_id}` - Get schedules for a medication

**Doses Route** (`/doses`)
- `POST /doses/generate/{schedule_id}` - Generate doses from a schedule (7 days by default)
- `GET /doses/upcoming` - Get upcoming doses (not yet taken)
- `POST /doses/{dose_id}/take` - Mark dose as taken

#### 3. **Services**
- **MedicationService**: Create, deactivate, and list active medications
- **ScheduleService**: Create schedules with validation for recurrence patterns (daily, weekly, multiple_times_per_day)
- **DoseService**: Generate doses based on schedules, track dose completion

#### 4. **Database Layer**
- **Repository Pattern**: Abstraction for database operations
- **Current Storage**: In-Memory (InMemoryRepository) - data stored during session only
- **MongoDB Ready**: Code supports MongoDB via Motor driver (not currently activated)
- **Configuration**: Via `config.py` (currently set to local in-memory storage)
- **Models**: Pydantic data models for validation

#### 5. **Middleware**
- **CORS**: Allows all origins (`*`) for cross-origin requests
- **Auth**: API key validation via `x-api-key` header (default: `local-dev-key`)
- **Rate Limiting**: Prevents abuse with request limits

### Data Models

```python
# Medication
{
  "id": "uuid",
  "name": "string",
  "instructions": "string",
  "is_active": true,
  "created_at": "datetime"
}

# Schedule
{
  "id": "uuid",
  "medication_id": "uuid",
  "recurrence": "daily|weekly|multiple_times_per_day",
  "times": ["08:00", "13:00"],
  "days_of_week": [0, 1, 2],  # optional, for weekly recurrence
  "created_at": "datetime"
}

# Dose Event
{
  "id": "uuid",
  "medication_id": "uuid",
  "schedule_id": "uuid",
  "dose_time": "datetime",
  "taken": false,
  "taken_at": null
}
```

---

## Frontend Architecture

### Core Components

#### 1. **Pages**
- **ListPage**: Display all medications in a grid/list view
- **AddMedicationPage**: Form to create new medication
- **DetailPage**: View single medication with options to add schedules
- **DosesPage**: View upcoming and completed doses
- **ViewSchedulesPage**: Manage medication schedules

#### 2. **Components**
- **MedicationForm**: Reusable form for medication input
- **MedicationList**: Display medications with actions
- **MedicationDetail**: Detailed view with related schedules
- **ScheduleForm**: Form to add medication schedules
- **ScheduleList**: Display medication schedules
- **UpcomingDoses**: Calendar-style upcoming doses view

#### 3. **State Management (Redux)**
```
Store Structure:
├── medications
│   ├── items: []
│   ├── loading: false
│   └── error: null
├── schedules
│   ├── items: []
│   ├── loading: false
│   └── error: null
└── doses
    ├── items: []
    ├── loading: false
    └── error: null
```

#### 4. **Custom Hooks**
- `useMedications()`: Fetch and manage medications
- `useSchedules()`: Fetch and manage schedules
- `useDoses()`: Fetch and manage doses

#### 5. **Services**
- **mockApi.js**: API communication layer with backend

#### 6. **Styling**
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode Ready**: Extensible theme system

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git**: For cloning the repository
- **Python 3.8+**: For running the backend
- **Node.js 16+**: For running the frontend (includes npm)
- **MongoDB** (optional): If using MongoDB backend

**Verify installations:**

```powershell
python --version
node --version
npm --version
git --version
```

---

## Installation & Setup

### Step 1: Clone the Repository

```powershell
git clone https://github.com/SwarnaMM/Medication_management_app.git
Set-Location -Path .\Medication_management_app
```

### Step 2: Backend Setup

Navigate to the backend directory and create a Python virtual environment:

```powershell
Set-Location -Path .\backend
```

**Create virtual environment:**

```powershell
python -m venv myvenv
```

**Activate virtual environment:**

```powershell
.\myvenv\Scripts\Activate.ps1
```

> **Note:** If you encounter an execution policy error, run:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

**Install dependencies:**

```powershell
pip install -r requirements.txt
```

### Step 3: Frontend Setup

Open a **new PowerShell terminal** and navigate to the frontend directory:

```powershell
Set-Location -Path .\frontend
```

**Install Node dependencies:**

```powershell
npm install
```

**Create environment file (`.env`):**

```powershell
@"
VITE_API_URL=http://localhost:8000
VITE_API_KEY=local-dev-key
"@ | Out-File -FilePath .\.env -Encoding utf8
```

This creates a `.env` file in the `frontend` directory with the following content:
```
VITE_API_URL=http://localhost:8000
VITE_API_KEY=local-dev-key
```

---

## Running the Application

### Important Note: Data Persistence
Currently, all data is stored **in-memory** during your session. When you restart the backend server, all medications, schedules, and doses will be **cleared**. This is suitable for local development and testing.

### Step 1: Start Backend Service

In the **backend terminal** (where you activated the virtual environment):

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started server process
INFO:     Started reloader process
```

**Open FastAPI Interactive Docs:**
- Navigate to: `http://localhost:8000/docs`
- This opens the Swagger UI where you can test all API endpoints

### Step 2: Start Frontend Service

In the **frontend terminal** (where you installed npm packages):

```powershell
npm run dev
```

**Expected output:**
```
  VITE v7.2.4  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Open Application in Browser:**
- Navigate to: `http://localhost:5173`
- You should see the Medication Manager interface

### Accessing the Application

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://localhost:5173` | Web UI for medication management |
| Backend API | `http://localhost:8000` | REST API endpoints |
| API Documentation | `http://localhost:8000/docs` | Swagger UI for testing endpoints |

---

## Testing with Sample Data

### Method 1: Using the Web UI

1. **Open Application**: Navigate to `http://localhost:5173`

2. **Add a Medication**:
   - Click the "Add" button in the navigation
   - Fill in the form:
     - **Name**: Aspirin
     - **Instructions**: Take with food
   - Click "Create Medication"

3. **Create a Schedule**:
   - On the medication detail page, click "View & Schedule Medicine"
   - Add schedule times: `09:00` and `21:00`
   - Set recurrence to `daily`
   - Click "Save Schedule"

4. **View Doses**:
   - Navigate to the "Doses" page
   - You should see generated doses for the next 7 days

### Method 2: Using PowerShell API Requests

#### Create a Medication

```powershell
$medicationBody = @{
    name = "Aspirin"
    instructions = "Take with food"
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8000/medications" `
    -Headers @{"x-api-key" = "local-dev-key"} `
    -Body $medicationBody `
    -ContentType "application/json"
```

**Response:**
```json
{
  "id": "8b89414e-6a74-46c4-ac13-12abeac2dad6",
  "name": "Aspirin",
  "instructions": "Take with food",
  "is_active": true,
  "created_at": "2025-11-28T10:21:34.123Z"
}
```

#### Create a Schedule

Replace `<med-id>` with the ID from the medication response:

```powershell
$scheduleBody = @{
    medication_id = "<med-id>"
    times = @("09:00", "21:00")
    recurrence = "daily"
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8000/schedules/add" `
    -Headers @{"x-api-key" = "local-dev-key"} `
    -Body $scheduleBody `
    -ContentType "application/json"
```

**Response:**
```json
{
  "id": "schedule-uuid",
  "medication_id": "8b89414e-6a74-46c4-ac13-12abeac2dad6",
  "times": ["09:00", "21:00"],
  "recurrence": "daily",
  "created_at": "2025-11-28T10:30:00.000Z"
}
```

#### Generate Doses

```powershell
Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8000/doses/generate/<schedule-id>" `
    -Headers @{"x-api-key" = "local-dev-key"}
```

#### Get All Medications

```powershell
Invoke-RestMethod -Method Get `
    -Uri "http://localhost:8000/medications" `
    -Headers @{"x-api-key" = "local-dev-key"}
```

#### Get Schedules for a Medication

```powershell
Invoke-RestMethod -Method Get `
    -Uri "http://localhost:8000/schedules/medication/<med-id>" `
    -Headers @{"x-api-key" = "local-dev-key"}
```

#### Get Upcoming Doses

```powershell
Invoke-RestMethod -Method Get `
    -Uri "http://localhost:8000/doses/upcoming" `
    -Headers @{"x-api-key" = "local-dev-key"}
```

#### Mark Dose as Taken

```powershell
Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8000/doses/<dose-id>/take" `
    -Headers @{"x-api-key" = "local-dev-key"}
```

---

## API Endpoints

### Authentication
All API requests require the `x-api-key` header:
```
x-api-key: local-dev-key
```

### Medications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/medications` | Create a new medication |
| GET | `/medications` | Get all active medications |
| POST | `/medications/{medication_id}/deactivate` | Deactivate a medication |

**Request Body (Create Medication):**
```json
{
  "name": "Aspirin",
  "instructions": "Take with food"
}
```

### Schedules

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/schedules/add` | Create a new schedule |
| GET | `/schedules/medication/{medication_id}` | Get schedules for a medication |

**Request Body (Create Schedule):**
```json
{
  "medication_id": "uuid",
  "times": ["08:00", "13:00"],
  "recurrence": "daily",
  "days_of_week": [0, 1, 2]
}
```

**Supported Recurrence Types:**
- `daily` - Every day
- `weekly` - Specific days of week (requires `days_of_week`)
- `multiple_times_per_day` - Multiple times in a day

### Doses

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/doses/generate/{schedule_id}` | Generate doses for next 7 days |
| GET | `/doses/upcoming` | Get upcoming doses (not yet taken, limit 20) |
| POST | `/doses/{dose_id}/take` | Mark dose as taken |

---

## Troubleshooting

### Backend Issues

#### 1. Virtual Environment Not Activating
**Error:** `cannot be loaded because running scripts is disabled on this system`

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 2. Module Not Found
**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```powershell
# Ensure venv is activated
.\myvenv\Scripts\Activate.ps1
# Reinstall requirements
pip install -r requirements.txt
```

#### 3. Port 8000 Already in Use
**Error:** `Address already in use`

**Solution (Option 1):** Kill the process
```powershell
Get-Process | Where-Object {$_.Handles -eq 8000} | Stop-Process -Force
```

**Solution (Option 2):** Use a different port
```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Issues

#### 1. Dependencies Not Installed
**Error:** `npm ERR! code ENOENT`

**Solution:**
```powershell
npm install
```

#### 2. Frontend Can't Connect to Backend
**Error:** CORS error or connection refused

**Solution:**
- Verify backend is running: `http://localhost:8000`
- Check `.env` file has correct `VITE_API_URL`
- Ensure both services are running on configured ports

#### 3. Port 5173 Already in Use
**Error:** `EADDRINUSE: address already in use`

**Solution:**
```powershell
npm run dev -- --port 5174
```

### General Issues

#### 1. Verify Services Are Running
```powershell
# Check backend
Invoke-RestMethod -Method Get -Uri "http://localhost:8000/docs"

# Check frontend
Start-Process "http://localhost:5173"
```

#### 2. Check Environment Variables
**Backend (.env in backend directory) - Optional:**
```
# MongoDB setup (when implemented)
DOCUMENTDB_URI=mongodb://localhost:27017
DATABASE_NAME=swarna_medications
USE_LOCAL_STORE=1
```

Currently, the backend uses **in-memory storage** by default.

**Frontend (.env in frontend directory):**
```
VITE_API_URL=http://localhost:8000
VITE_API_KEY=local-dev-key
```

#### 3. Clear Cache and Reinstall
```powershell
# Frontend
cd frontend
rm -r node_modules
rm package-lock.json
npm install

# Backend
cd ../backend
rm -r myvenv
python -m venv myvenv
.\myvenv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## Development Workflow

### Making Changes

#### Backend Changes
1. Backend runs with `--reload` flag, so changes are auto-detected
2. Save file → Uvicorn automatically restarts
3. Test via `http://localhost:8000/docs`

#### Frontend Changes
1. Vite watches for changes and hot-reloads
2. Save file → Browser automatically updates
3. Check browser console for any errors

### Running Tests

#### Backend Tests
```powershell
cd backend
.\myvenv\Scripts\Activate.ps1
pytest tests/
```

#### Frontend Tests
```powershell
cd frontend
npm test
```

---

## Deployment

### Docker

#### Build and Run Backend
```bash
cd backend
docker build -t medication-manager-api .
docker run -p 8000:8000 medication-manager-api
```

#### Build and Run Frontend
```bash
cd frontend
docker build -t medication-manager-ui .
docker run -p 5173:5173 medication-manager-ui
```

#### Docker Compose (Full Stack)
```bash
docker-compose -f infra/docker-compose.yml up
```

### Cloud Deployment

See `infra/` directory for:
- **ECS**: AWS Elastic Container Service configuration
- **EKS**: Amazon Elastic Kubernetes Service with Helm charts

---

