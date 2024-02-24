from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("categories", views.categories, name="categories"),
    

     # API Routes
    path("designer", views.designer, name="designer"),
    path("casual", views.casual, name="casual"),
    path("categories/buisness", views.buisness, name="buisness"),
    path("categories/watchlist", views.watchlist, name="watchlist")
]
