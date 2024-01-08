from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.shortcuts import render, redirect
from .util import list_entries, save_entry, get_entry
from django.db import connection
from django.http import HttpResponse
from . import util
from sqlalchemy import create_engine, MetaData
from django.contrib.auth.decorators import login_required
import random
from django.urls import reverse
from .models import saved_pages  # Import your model

def index(request):
    if request.method == "GET":
        all_entries = util.list_entries()
        if all_entries:
            random_title = get_entry(all_entries)
            random_content = get_entry(random_title)

            # Assuming you want to display the first entry, adjust as needed
            page = saved_pages(title=random_title, text_page=random_content)

            return render(request, "encyclopedia/index.html", {
                "index": page
            })
    else:
        all_entries = util.list_entries()
        if all_entries:
            random_title = get_entry(all_entries)
            random_content = get_entry(random_title)

            # Assuming you want to display the first entry, adjust as needed
            page = saved_pages(title=random_title, text_page=random_content)

            return render(request, "encyclopedia/index.html", {
                "index": page
            })
        
def create_new(request):
    if request.method == "POST":
        titles = request.POST.get("title", "")
        text = request.POST.get("textar", "")
        #user_id = request.session.get("user_id")

        if text and titles not in request.session:
            request.session[titles] = []  # Use titles as the key

        if text and titles in request.session:
            # Create a new page instance
            new_page = saved_pages(title=titles, text_page=text)

            # Save the new page to the database
            save_entry(new_page)

            return render(request, "encyclopedia/create.html", {
                "articles": request.session[titles]
            })
        else:
            request.session["title"] = [] 
            return render(request, "encyclopedia/create.html",{
                request.session["title"]
            })

    else:
        return render(request, "encyclopedia/create.html")


def random_page(request):
    if request.method == "POST":
        all_entries = util.list_entries()
        if all_entries:
            random_title = random.choice(all_entries)
            # Assuming get_entry and saved_pages are defined elsewhere
            random_content = get_entry(random_title)
            randomPage = saved_pages(title=random_title, text_page=random_content)
            return redirect('new_page')  # Redirect to the 'new_page' view
    else:
        return render(request, "encyclopedia/random.html")


def new_page(request):
    if request.method == "POST":
        return render(request, "encyclopedia/index.html")
    else:
        #random_title = get_entry(all_entries)
        all_entries = util.list_entries()
        random_title = random.choice(all_entries)
        random_content = get_entry(random_title)

        # Assuming you want to display the first entry, adjust as needed
        page = saved_pages(title=random_title, text_page=random_content)

        return render(request,"encyclopedia/newpage.html",{
            "save": saved_pages.objects.all() 
        })
