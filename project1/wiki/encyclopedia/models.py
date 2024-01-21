from django.db import models

class saved_pages(models.Model):
    title = models.TextField()
    body = models.TextField()  # Changed field name from 'text_page' to 'body'
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.title} - {self.body}"

class EncyclopediaSavedPage(models.Model):
    title = models.TextField()
    body = models.TextField()  # Changed field name from 'text_page' to 'body'
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.title} - {self.body}"
    # Other fields in your model

