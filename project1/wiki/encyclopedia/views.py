from django.shortcuts import render
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from .util import list_entries

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def view(request, ):

    return HttpResponse("Hello, world!")


def create_new(request):
    return render(request,"encyclopedia/create.html",{
        "new_page": util.list_entries()
    })

def random(request):
    return render(request,"encyclopedia/random.html",{
        "random_page": util.list_entries()
    })