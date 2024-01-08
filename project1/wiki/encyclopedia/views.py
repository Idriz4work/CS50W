from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.shortcuts import render, redirect
from .util import list_entries
from django.db import connection
from django.http import HttpResponse
from . import util
from sqlalchemy import create_engine, MetaData
from django.contrib.auth.decorators import login_required
import random

from .models import saved_pages  # Import the saved_pages model

from django.shortcuts import render
from .models import saved_pages  # Import your model

def index(request):
    if request.method == "GET":
        all_entries = util.list_entries()
        if all_entries:
            random_title = random.choice(all_entries)
            random_content = get_entry(random_title)

            # Assuming you want to display the first entry, adjust as needed
            page = saved_pages(title=random_title, text_page=random_content)

            return render(request, "encyclopedia/index.html", {
                "index": page
            })
    elif request.method == "POST":
        all_entries = util.list_entries()
        if all_entries:
            random_title = random.choice(all_entries)
            random_content = get_entry(random_title)

            # Assuming you want to display the first entry, adjust as needed
            page = SavedPages(title=random_title, text_page=random_content)

            return render(request, "encyclopedia/index.html", {
                "index": page
            })

    return render(request, "encyclopedia/index.html", {
        "index": None  # Handle the case where there are no entries
    })


def create_new(request):
    if request.method == "POST":
        titles = request.POST.get("title", "")
        text = request.POST.get("textar", "")
        user_id = request.session.get("user_id")

        if text and titles not in request.session:
            request.session[titles] = []  # Use titles as the key

        if text and titles in request.session:
            # Remove or define the save_entry function
            # save_entry(title, text)

            # Create a new page instance
            new_page = saved_pages(title=titles, text_page=text, user_id=user_id)

            # Save the new page to the database
            new_page.save()

            return render(request, "encyclopedia/create.html", {
                "articles": request.session[titles]
            })
        else:
            request.session["title"] = []  # Use consistent key
            return render(request, "encyclopedia/create.html",{
                request.session["title"]
            })
            # Handle the case when user_id is not in the session

    else:
        return render(request, "encyclopedia/create.html")


def random(request):
    if request.method == "POST":
        # Assuming util.list_entries() returns a list of entry titles
        all_entries = util.list_entries()
        if all_entries:
            random_title = random.choice(all_entries)
            random_content = get_entry(random_title)

            # Assuming saved_pages has a 'content' field
            randomPage = saved_pages(title=random_title, text_page=random_content)

            return render(request, "encyclopedia/random.html", {
                "random": randomPage
            })

    return render(request, "encyclopedia/random.html", {
        "save": saved_pages.objects.all() 
    })