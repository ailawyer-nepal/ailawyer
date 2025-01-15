from fastapi import Depends
from jose import jwt
from app.api.endpoints.user.functions import get_user_by_id
from app.core import settings
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, oauth2_scheme

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        jwt_decoded = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        print("="*50)
        print(jwt_decoded)
        print("="*50)

        id = jwt_decoded["id"]

        user = get_user_by_id(db, id)

        return user
    except ValueError:
        pass
