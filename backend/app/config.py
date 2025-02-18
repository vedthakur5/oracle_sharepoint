import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    OCI_TENANCY_OCID = os.getenv("OCI_TENANCY_OCID")
    OCI_USER_OCID = os.getenv("OCI_USER_OCID")
    OCI_FINGERPRINT = os.getenv("OCI_FINGERPRINT")
    OCI_PRIVATE_KEY_PATH = os.getenv("OCI_PRIVATE_KEY_PATH")
    OCI_REGION = os.getenv("OCI_REGION")
    OCI_BUCKET_NAME = os.getenv("OCI_BUCKET_NAME")

settings = Settings()
