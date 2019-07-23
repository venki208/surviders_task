import csv

from django.core.management.base import BaseCommand, CommandError

from mongoengine import *
from user.models import UserProfile


class Command(BaseCommand):

	help = 'bulk insert the data from csv into userprofile table'

	def add_arguments(self, parser):
		parser.add_argument('filename', nargs='+', type=str)


	def handle(self, *args, **kwargs):
		documents = []
		with open(kwargs['filename'][0], newline='') as csvfile:
			reader = csv.DictReader(csvfile)
			for row in reader:
				documents.append(
					UserProfile(**{k: v.strip() for k, v in row.items()})
				)
		UserProfile.objects.insert(documents, load_bulk=False)
		print ('{} inserted into database'.format(len(documents)))