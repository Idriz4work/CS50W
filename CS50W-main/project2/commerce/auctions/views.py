from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User

import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, "auctions/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


def categories(request):
    if request.method == "GET":
        return render(request, "auctions/categories.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))
        

def designer(request):
    if request.method == "GET":
        # Assuming you have a session variable to track the category click status
        return render(request, "auctions/categories.html")
    
    else:
        return JsonResponse({'message': 'Designer category not clicked'}, status=403)

        

@login_required
def casual(request):
    if request.method == "GET":
        return render(request, "auctions/index.html")


@login_required
def buisness(request):
    if request.method == "GET":
        return render(request, "auctions/index.html")


@login_required
def watchlist(request):
    if request.method == "GET":
        return render(request, 'auctions/index.html')
        
    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))
    
def listing(request):
    if request.method == "GET":
        return render(request,'auctions/listing' )
    
def bid_owner(request):
    if request.method == "GET":
        return render(request, 'auctions/bider')
    
def bid_comment(request):
    if request.method == "GET":
        return render(request, "auctions/bider")
    
