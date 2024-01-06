# enter your python code here
from django.db import models

class saved_pages(models.Model):
    title = models.CharField(max_length=64)
    text_page = models.TextField()
    user_id = models.IntegerField(primary_key=True)

    def __str__(self):
        return f"{self.user_id}: {self.title} to {self.text_page}"
