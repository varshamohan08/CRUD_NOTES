from rest_framework import serializers
from .models import Notes

class NotesSeralizer(serializers.Serializer):
    title = serializers.CharField()
    body = serializers.CharField()

    def create(self, data):
        Notes.objects.create(**data)
        return 'Success'

    def update(self, instance, data):
        instance.title = data['title'].value
        instance.body = data['body'].value
        instance.save()
        return 'Success'
    
    class Meta:
        model = Notes
        fields = [ 'title', 'body']