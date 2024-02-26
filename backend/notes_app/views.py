from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notes
from .serializers import NotesSeralizer
from rest_framework import status
import random
from django.db.models import Value

# Create your views here.
class NotesAPI(APIView):
    def get(self, request, id=None):
        if id:
            response_data = Notes.objects.filter(id = id).values().first()
        else:
            notes_queryset = Notes.objects.values().order_by('id')
            response_data = [{'row_number': i + 1, **note} for i, note in enumerate(notes_queryset)]
        return Response(response_data, status = status.HTTP_200_OK)
    
    def post(self, request):
        try:
            serializer_data = NotesSeralizer(data = request.data)
            if serializer_data.is_valid():
                res = serializer_data.save()
                return Response([{'status':'1', 'msg' : 'Created successfully'}],status = status.HTTP_200_OK)
            else:
                return Response([{'status':'0', 'msg' : 'Invalid data'}],status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response([{'status':'0', 'msg' : e}],status = status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id=None):
        if id:
            Notes.objects.filter(id = id).delete()
            return Response([{'status':'1', 'msg' : 'Deleted Successfully'}],status = status.HTTP_200_OK)
        else:
            return Response([{'status':'0', 'msg' : 'Invalid Request'}],status = status.HTTP_200_OK)
        
    def put(self, request):
        try:
            validated_data = NotesSeralizer(data = request.data)
            if validated_data.is_valid():
                instance = Notes.objects.get(id = request.data.get('id'))
                serializer_data = NotesSeralizer()
                res = serializer_data.update(instance, validated_data)
                if res == 'Success':
                    return Response([{'status':'1', 'msg' : res}],status = status.HTTP_200_OK)
                else:
                    return Response([{'status':'0', 'msg' : res}],status = status.HTTP_400_BAD_REQUEST)
            else:
                return Response([{'status':'0', 'msg' : 'Invalid data'}],status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response([{'status':'0', 'msg' : e}],status = status.HTTP_400_BAD_REQUEST)
        