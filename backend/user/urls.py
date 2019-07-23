from django.urls import path
from .views import UserDataView, list_catogery

urlpatterns = [
	path('user/', UserDataView.as_view(), name='user'),
	path('list_catogery/', list_catogery, name='list_catogery')
]