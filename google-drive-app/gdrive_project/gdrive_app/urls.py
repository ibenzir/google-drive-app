from django.urls import path
from .views import google_auth, list_files, upload_file

urlpatterns = [
    path('auth/', google_auth, name='google_auth'),
    path('files/', list_files, name='list_files'),
    path('upload/', upload_file, name='upload_file'),
]
