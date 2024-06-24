from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    API_KEY: str

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()

