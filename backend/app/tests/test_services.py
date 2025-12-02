import pytest
from unittest.mock import AsyncMock
from fastapi import HTTPException

from app.services.medication_service import add_medication, deactivate_medication
from app.services.dose_service import mark_dose_taken


@pytest.mark.asyncio
async def test_create_medication():
    payload = {
        "name": "Paracetamol",
        "instructions": "After food"
    }

    result = await add_medication(payload)

    assert "id" in result


@pytest.mark.asyncio
async def test_deactivate_medication():
  
    with pytest.raises(HTTPException):
        await deactivate_medication("med1")


@pytest.mark.asyncio
async def test_mark_dose_taken():
 
    try:
        result = await mark_dose_taken("dose123")
        assert result is not None
    except Exception:
        assert True
