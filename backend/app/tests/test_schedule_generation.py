import pytest
from unittest.mock import AsyncMock, patch
from fastapi import HTTPException

from app.services.schedule_service import create_schedule
from app.services.dose_service import generate_doses



@pytest.mark.asyncio
async def test_create_schedule_success():
    mock_repo = AsyncMock()

    
    mock_repo.get_by_id.return_value = {"id": "med123", "is_active": True}
    mock_repo.create.return_value = {
        "id": "schedule123",
        "recurrence": "daily",
        "times": ["08:00"]
    }

    with patch("app.services.schedule_service.repo", mock_repo):
        payload = {
            "medication_id": "med123",
            "recurrence": "daily",
            "times": ["08:00"]
        }

        result = await create_schedule(payload)
        assert result["id"] == "schedule123"
        mock_repo.create.assert_called_once()


@pytest.mark.asyncio
async def test_create_schedule_missing_medication_id():
    with pytest.raises(HTTPException):
        await create_schedule({
            "recurrence": "daily",
            "times": ["09:00"]
        })


@pytest.mark.asyncio
async def test_create_schedule_invalid_recurrence():
    with pytest.raises(HTTPException):
        await create_schedule({
            "medication_id": "med123",
            "recurrence": "yearly",
            "times": ["09:00"]
        })


@pytest.mark.asyncio
async def test_create_schedule_missing_times():
    with pytest.raises(HTTPException):
        await create_schedule({
            "medication_id": "med123",
            "recurrence": "daily",
            "times": []
        })


@pytest.mark.asyncio
async def test_create_schedule_medication_not_found():
    mock_repo = AsyncMock()
    mock_repo.get_by_id.return_value = None

    with patch("app.services.schedule_service.repo", mock_repo):
        with pytest.raises(HTTPException):
            await create_schedule({
                "medication_id": "med123",
                "recurrence": "daily",
                "times": ["09:00"]
            })



@pytest.mark.asyncio
async def test_generate_doses_success():
    mock_repo = AsyncMock()

    mock_repo.get_by_id.return_value = {
        "id": "schedule1",
        "medication_id": "med123",
        "recurrence": "daily",
        "times": ["09:00"]
    }

    mock_repo.create.return_value = {
        "id": "dose1",
        "schedule_id": "schedule1",
        "taken": False
    }

   
    from datetime import datetime

    class FakeDatetime(datetime):
        @classmethod
        def utcnow(cls):
            return datetime(2024, 1, 1, 7, 0, 0)  

    with patch("app.services.dose_service.repo", mock_repo), \
         patch("app.services.dose_service.datetime", FakeDatetime):

        result = await generate_doses("schedule1", days=1)
        assert len(result) >= 1
        mock_repo.create.assert_called()


@pytest.mark.asyncio
async def test_generate_doses_schedule_not_found():
    mock_repo = AsyncMock()
    mock_repo.get_by_id.return_value = None

    with patch("app.services.dose_service.repo", mock_repo):
        with pytest.raises(HTTPException):
            await generate_doses("bad_schedule", days=3)
