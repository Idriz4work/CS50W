from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=64)
    is_authenticated = models.BooleanField(True)
    user_id = models.IntegerField()

class comments(models.Model):
    origin = models.CharField(max_length=64)
    duration = models.IntegerField()

class bids(models.Model):
    origin = models.CharField(max_length=64)
    duration = models.IntegerField()

class auction_listings(models.Model):
    item_name = models.TextField
    item_count = models.IntegerField()
    price = models.IntegerField()