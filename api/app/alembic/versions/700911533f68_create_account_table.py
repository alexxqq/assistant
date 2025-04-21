"""create account table

Revision ID: 700911533f68
Revises: 33702883dc50
Create Date: 2025-04-15 04:00:13.847554

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '700911533f68'
down_revision: Union[str, None] = '33702883dc50'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
