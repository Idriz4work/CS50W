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
        ids = request.session.get('user_id', None)
        titles = request.POST.get("title", "")
        text = request.POST.get("textar", "")

        if ids is not None:
            # Create a new page instance
            new_page = saved_pages(title=titles, text_page=text, user_id=ids)

            # Save the new page to the database
            new_page.save()

            return render(request, "encyclopedia/create.html", {
                "user_id": request.session["user_id"]
            })
        else:
            # Handle the case when user_id is not in the session
            return HttpResponse("User not logged in.")
    else:
        return render(request, "encyclopedia/create.html")



def random(request):
    user_id = session(id)
    title = db.execute("SELECT title from saved_pages WHERE id = ?", user_id)
    textar = db.execute("SELECT page_text from saved_pages WHERE id = ?", user_id)

    if request.method == "POST":
        return render(request,"encyclopedia/random.html",{
        "random_page": util.list_entries()
    })
    else:
        with connection.cursor() as db:
            page = db.execute("")
            
            return render(request,"encyclopedia/random.html")