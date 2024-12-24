from fastapi import APIRouter
from app.api.endpoints.lawyer.lawyer import lawyer_module

lawyer_router = APIRouter()

lawyer_router.include_router(
    lawyer_module,
    prefix="/lawyer",
    tags=["lawyer"],
    responses={404: {"description": "Not found"}},
)
