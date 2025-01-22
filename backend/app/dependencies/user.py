from fastapi import Depends
from jose import jwt
from app.api.endpoints.user.functions import get_user_by_id
from app.core import settings
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, oauth2_scheme

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        token_to_decode = token.split("Bearer ")[1]

        jwt_decoded = jwt.decode(
            token_to_decode,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        id = jwt_decoded["id"]

        user = get_user_by_id(db, id)

        return user
    except ValueError:
        print("ValueError")
        pass
