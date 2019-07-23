from django.db import models

# Create your models here.
from mongoengine import *


class UserProfile(Document):
	age = IntField(default=0)
	work = StringField()
	fnlwgt = IntField(default=0)
	education = StringField()
	education_num = IntField(default=0)
	marital_status = StringField()
	occupation = StringField()
	relationship = StringField()
	race = StringField()
	sex = StringField()
	capital_gain = IntField(default=0)
	capital_loss = IntField(default=0)
	hours_per_week = IntField(default=0)
	native_country = StringField()
	salary = StringField()

	def __str__(self):
		return str(self.work)
