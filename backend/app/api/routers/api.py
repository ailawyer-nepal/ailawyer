from fastapi import APIRouter
from app.api.routers.user import user_router
from app.api.routers.lawyer import lawyer_router
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

router.include_router(user_router)
router.include_router(lawyer_router)
