import oci
from fastapi import APIRouter, UploadFile, Depends
from .config import settings
from .auth import verify_token

router = APIRouter()

# Initialize OCI Client
def get_oci_client():
    config = {
        "user": settings.OCI_USER_OCID,
        "fingerprint": settings.OCI_FINGERPRINT,
        "key_file": settings.OCI_PRIVATE_KEY_PATH,
        "tenancy": settings.OCI_TENANCY_OCID,
        "region": settings.OCI_REGION,
    }
    return oci.object_storage.ObjectStorageClient(config)

# Upload file to Oracle Object Storage
@router.post("/upload")
async def upload_file(file: UploadFile, user: dict = Depends(verify_token)):
    client = get_oci_client()
    namespace = client.get_namespace().data

    # Upload the file
    content = await file.read()
    client.put_object(
        namespace,
        settings.OCI_BUCKET_NAME,
        file.filename,
        content
    )

    # Generate Pre-Authenticated Request URL
    object_storage = oci.object_storage.ObjectStorageClient(config)
    par_details = oci.object_storage.models.CreatePreauthenticatedRequestDetails(
        name=f"par_{file.filename}",
        access_type="ObjectRead",
        time_expires=(datetime.utcnow() + timedelta(days=365)),  # Expiry in months
        bucket_listing_action="ListObjects",
        object_name=file.filename
    )

    par_response = object_storage.create_preauthenticated_request(
        namespace, settings.OCI_BUCKET_NAME, par_details
    )

    return {"url": par_response.data.access_uri}
