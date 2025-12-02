import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

HEADERS = {"x-api-key": "local-dev-key"}


def test_add_medication_route():
    payload = {
        "name": "Vitamin D",
        "instructions": "Morning"
    }

    res = client.post("/medications", json=payload, headers=HEADERS)
    assert res.status_code in (200, 201)


def test_list_doses():
    res = client.get("/doses/upcoming", headers=HEADERS)
    assert res.status_code in (200, 404, 204)


def test_mark_dose_taken_route():
    res = client.post("/doses/dose123/take", headers=HEADERS)
    assert res.status_code in (200, 404)
