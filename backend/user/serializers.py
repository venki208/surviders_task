from .models import UserProfile
from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer



class UserSerializer(DocumentSerializer):
	
	class Meta:
		model = UserProfile
		exclude = ('id',)