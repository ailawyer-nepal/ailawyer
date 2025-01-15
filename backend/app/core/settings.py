import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY =  os.environ.get("SECRET_KEY") or ""
REFRESH_SECRET_KEY = os.environ.get("REFRESH_SECRET_KEY") or ""
ALGORITHM = os.environ.get("ALGORITHM") or ""
ACCESS_TOKEN_EXPIRE_MINUTES = 60*24*7
REFRESH_TOKEN_EXPIRE_DAYS = 60*24*7
