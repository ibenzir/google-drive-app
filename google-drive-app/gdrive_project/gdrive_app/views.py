import os
import json
from django.shortcuts import redirect
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from django.http import JsonResponse
from django.conf import settings

SCOPES = ["https://www.googleapis.com/auth/drive.file"]

def google_auth(request):
    flow = InstalledAppFlow.from_client_secrets_file(
        "credentials.json", SCOPES)
    creds = flow.run_local_server(port=0)
    request.session['credentials'] = creds.to_json()
    return redirect('/dashboard/')

def list_files(request):
    creds_json = request.session.get('credentials')
    if not creds_json:
        return redirect('/auth/')
    
    creds = Credentials.from_authorized_user_info(json.loads(creds_json), SCOPES)
    service = build('drive', 'v3', credentials=creds)
    
    results = service.files().list(pageSize=10).execute()
    files = results.get('files', [])
    
    return JsonResponse({'files': files})

def upload_file(request):
    if request.method == "POST" and request.FILES.get('file'):
        creds_json = request.session.get('credentials')
        creds = Credentials.from_authorized_user_info(json.loads(creds_json), SCOPES)
        service = build('drive', 'v3', credentials=creds)
        
        file_metadata = {'name': request.FILES['file'].name}
        media = MediaIoBaseUpload(request.FILES['file'], mimetype=request.FILES['file'].content_type)
        
        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        return JsonResponse({'file_id': file.get('id')})
    
    return JsonResponse({'error': 'Invalid request'}, status=400)
