from django.urls import path
from . import views
from .util import list_entries

urlpatterns = [
    path('', views.index, name='index'),
    path("create/",views.create_new, name="create"),
    path('random/', views.random, name='random'),
    path('page/',views.page, name="page") # das erste ist dass was oben beim Link im browser steht, also es ist nicht von gro
                                                # großartiger bedeutung jedoch zur orientierung ganz gut
]
