from src.config import settings
from src.http_client import CMCHTTPCLIENT

cmc_client = CMCHTTPCLIENT(
    base_url='https://pro-api.coinmarketcap.com',
    api_key=settings.API_KEY
)
