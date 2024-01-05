
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.shortcuts import render, redirect
from .util import list_entries
from django.db import connection
from . import util
from sqlalchemy import create_engine, MetaData

# Assuming you have already defined your Django app instance in the 'app' variable


def index(request):
    if request.method == "POST":
        return render(request, "encyclopedia/index.html", {
            "entries": util.list_entries()
        })
    else:
        title = connection.cursor()
        title.execute("SELECT title FROM saved_pages")
        title_result = title.fetchone()

        if title_result:
            return render(request, "encyclopedia/index.html", {
                "ent": util.get_entry(title_result[0])
            })
        else:
            return render(request, "encyclopedia/index.html")

def create_new(request):
    if request.method == "POST":
        user_id = request.session.get('user_id', None)
        title = request.POST.get("title", "")
        text = request.POST.get("textar", "")

        if user_id not in request.session:
            request.session["user_id"] = []

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO saved_pages (user_id, title, page_text) VALUES (%s, %s, %s)", (user_id, title, text))

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