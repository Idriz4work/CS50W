# enter your python code here
from django.db import models

class saved_pages(models.Model):
    title = models.TextField()
    text_page = models.TextField()

