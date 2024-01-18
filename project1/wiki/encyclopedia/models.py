# enter your python code here
from django.db import models

class saved_pages(models.Model):
    title = models.TextField()
    text_page = models.TextField()
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.title

class EncyclopediaSavedPage(models.Model):
    id = models.AutoField(primary_key=True)
    # Other fields in your model
