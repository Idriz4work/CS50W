from django.urls import path
from . import views
from .util import list_entries

urlpatterns = [
    path("", views.index, name="index"),
    path("", views.entry, name="entry"),
    path("", views.create_new, name="create"),
    path("", views.random, name="random")
]
