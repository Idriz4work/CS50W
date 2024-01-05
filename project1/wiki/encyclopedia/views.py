from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.shortcuts import render, redirect
from .util import list_entries
from django.db import connection
from . import util
from sqlalchemy import create_engine, MetaData
# Import our flight model
from models.saved_pages import saved_pages

def index(request):
    if request.method == "POST":
        return render(request, "encyclopedia/index.html", {
            "entries": util.list_entries()
        })
    else:
        
        if title_result:
            return render(request, "encyclopedia/index.html", {
                "ent": util.get_entry(title_result[0])
            })
        else:
            return render(request, "encyclopedia/index.html")

def create_new(request):
    if request.method == "POST":
        id = request.session.get('user_id', None)
        titles = request.POST.get("title", "")
        text = request.POST.get("textar", "")

        if user_id not in request.session:
            request.session["user_id"] = []

        # Create a new page
        f = saved_pages(title=titles, text_page=text, user_id=id)

        # Instert that page into our database
        f.save()

        return render(request, "encyclopedia/create.html", {
            "user_id": request.session["user_id"]
        })
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