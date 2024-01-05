from django.db import models

# Create your models here.
class saved_pages(models.Model):
    title = models.CharField(max_length=64)
    text_page = models.TextField()
    user_id = models.IntegerField()

    def __str__(self):
        return f"{self.user_id}: {self.title} to {self.text_page}"