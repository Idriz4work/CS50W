from django.db import models

# Create your models here.
class saved_pages(models.Model):
    title = models.CharField(max_length=64)
    text_page = models.TextField()
    user_id = models.IntegerField()