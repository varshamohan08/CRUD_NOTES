from django.urls import path
from . import views

urlpatterns = [
    path('notes/', view=views.NotesAPI.as_view(), name='notes_api'),
    path('notes/<int:id>/', view=views.NotesAPI.as_view(), name='notes_api_with_id'),
]
