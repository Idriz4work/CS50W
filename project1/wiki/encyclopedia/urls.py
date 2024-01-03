from django.urls import path
from . import views
from .util import list_entries

urlpatterns = [
    path("", views.index, name="index"),
    path('create/<str:create_new>/', views.entry, name='create'),
    path("random", views.random, name="random")
]
