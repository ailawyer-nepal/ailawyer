from fastapi import Form
from fastapi.security import APIKeyHeader
from app.core.database import SessionLocal

# db connection
def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

# authorization 
oauth2_scheme = APIKeyHeader(name="Authorization")

# authorization form
class OAuth2EmailRequestForm:
    def __init__(
        self,
        email: str = Form(..., description="The user's email address"),
        password: str = Form(..., description="The user's password"),
    ):
        self.email = email
        self.password = password
