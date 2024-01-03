from django.shortcuts import render
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from .util import list_entries

from . import util


def index(request):
    if request.method == "POST":
        return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })
    else:
        return render("encyclopedia/random.html")

def view(request, ):
    if request.method == "POST":

        return render("encyclopedia/templates/create.html",{
            #"new_page": 
            "save": save_entry(title, content)
        })

    else:
        return render("encyclopedia/templates/create.html")


def create_new(request):
    if request.method == "POST":
        return render(request,"encyclopedia/create.html",{
        "new_page": util.list_entries()
    })
    else:
        return render("encyclopedia/random.html")

def random(request):
    if request.method == "POST":
        return render(request,"encyclopedia/random.html",{
        "random_page": util.list_entries()
    })
    else:
        return render("encyclopedia/random.html")