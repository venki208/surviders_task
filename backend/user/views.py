from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from .models import UserProfile
from rest_framework.pagination import PageNumberPagination
from django.http import JsonResponse



class StandardResultsSetPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 10



class UserDataView(ListAPIView):

	serializer_class = UserSerializer
	pagination_class = StandardResultsSetPagination



	def get_queryset(self):
		# import pdb; pdb.set_trace()
		catogery_sex = self.request.GET.get('catogery_sex', None)
		catogery_rel = self.request.GET.get('catogery_rel', None)
		catogery_race = self.request.GET.get('catogery_race', None)
		catogery = {}
		if catogery_sex: catogery['sex__in'] = catogery_sex.split(",")
		if catogery_rel: catogery['relationship__in'] = catogery_rel.split(",")
		if catogery_race: catogery['race__in'] = catogery_race.split(",")

		if not catogery_sex and not catogery_rel and not catogery_race:
			obj = UserProfile.objects.all()
		else:
			print (catogery)
			obj = UserProfile.objects.filter(**catogery)
		return obj



@api_view(['GET'])
def list_catogery(request):
	sex_catogery = list(UserProfile.objects.aggregate(*[{'$group': {'_id':'$sex', 'count':{'$sum':1}}}]))
	relationship_catogery = list(UserProfile.objects.aggregate(*[{'$group': {'_id':'$relationship', 'count':{'$sum':1}}}]))
	race = list(UserProfile.objects.aggregate(*[{'$group': {'_id':'$race', 'count':{'$sum':1}}}]))

	return JsonResponse({'sex_c': sex_catogery, 'relationship_c': relationship_catogery, 'race_c': race}, status=200)
