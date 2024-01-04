from django.urls import path
from . import views
from .util import list_entries

urlpatterns = [
    path("", views.index, name="index"),
    path("create",views.create_new, name="create"),
    path("random", views.random, name="random")
]
