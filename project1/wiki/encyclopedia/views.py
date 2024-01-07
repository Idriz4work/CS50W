from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.shortcuts import render, redirect
from .util import list_entries
from django.db import connection
from django.http import HttpResponse
from . import util
from sqlalchemy import create_engine, MetaData

from .models import saved_pages  # Import the saved_pages model

def index(request):
    if request.method == "POST":
        # Handle POST request, return list of entries
        return render(request, "encyclopedia/index.html", {
            "entries": util.list_entries()
        })
    else:
        # Adjust the query according to your model structure
        title_results = saved_pages.objects.all()

        if title_results:
            # Assuming you want to display the first entry, adjust as needed
            return render(request, "encyclopedia/index.html", {
                "ent": util.get_entry(title_results[0].title)
            })
        else:
            return render(request, "encyclopedia/index.html")


def create_new(request):
    if request.method == "POST":
        titles = request.POST.get("title", "")
        text = request.POST.get("textar", "")

        if text and titles not in request.session:
            request.session[titles] = []  # Use titles as the key

        if text and titles in request.session:
            # Remove or define the save_entry function
            # save_entry(title, text)

            # Create a new page instance
            new_page = saved_pages(title=titles, text_page=text)

            # Save the new page to the database
            new_page.save()

            return render(request, "encyclopedia/create.html", {
                "articles": request.session[titles]
            })
        else:
            request.session["title"] = []  # Use consistent key
            return render(request, "encyclopedia/create.html")
            # Handle the case when user_id is not in the session

    else:
        return render(request, "encyclopedia/create.html")



def random(request):
    if request.method == "POST":
        randomPage = saved_pages(title=title, text_page=text_page)
        return render(request,"encyclopedia/random.html",{
        "random": util.list_entries()
        })
    else:
        get_entry(title)
        return render(request,"encyclopedia/random.html")