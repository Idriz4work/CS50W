from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # No need to redefine username, email, and password
    user_id = models.IntegerField()

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin = models.CharField(max_length=64)
    duration = models.IntegerField()

class Bid(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin = models.CharField(max_length=64)
    duration = models.IntegerField()

class AuctionListing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)  # Adjust max length as needed
    item_count = models.IntegerField()
    price = models.IntegerField()
