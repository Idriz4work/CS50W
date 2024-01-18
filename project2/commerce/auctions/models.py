from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class categories(models.Model):
    categorie = models.CharField(max_length=60)

class auction(models.Model):
    pass

class bids(models.Model):
    pass

class comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
