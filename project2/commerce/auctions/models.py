from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # No need to redefine username, email, and password
    user_id = models.IntegerField()

    def __str__(self):
        return f"{self.user_id}"
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin = models.CharField(max_length=64)
    duration = models.IntegerField()

    def __str__(self):
        return f"{self.user}: {self.title} to {self.text_page}"

class Bid(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin = models.CharField(max_length=64)
    duration = models.IntegerField()

    def __str__(self):
        return f"{self.user}: {self.title} to {self.text_page}"
    

class AuctionListing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)  # Adjust max length as needed
    item_count = models.IntegerField()
    price = models.IntegerField()

    def __str__(self):
        return f"{self.user}: {self.item_name} and {self.item_count } to {self.price}"
    
class auctions_user(models.Model):
    username = models.TextField()
    password = models.TextField()

    def __str__(self):
        return f"{self.username}: and {self.password}"