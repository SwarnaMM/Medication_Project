
from fastapi import APIRouter, Depends
from app.services.medication_service import add_medication, list_active_medications, deactivate_medication

router = APIRouter()


@router.post("/medications")
async def create_medication(payload: dict):
    return await add_medication(payload)


@router.get("/medications")
async def get_medications():
    """Return active medications"""
    return await list_active_medications()


@router.post("/medications/{medication_id}/deactivate")
async def deactivate_med(medication_id: str):
    """Deactivate a medication by id"""
    return await deactivate_medication(medication_id)
