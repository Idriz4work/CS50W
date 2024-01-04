from django.shortcuts import render
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from .util import list_entries
from django.db import connection

from . import util


def index(request):
    if request.method == "POST":
        return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })
    else:
        return render(request,"encyclopedia/index.html")


def create_new(request):
    if request.method == "POST":
        # Assuming you want to get the user_id from the session, adjust as needed
        user_id = request.session.get('user_id', None)
        
        # Get data from the POST request
        title = request.POST.get("title", "")
        text = request.POST.get("textar", "")

        with connection.cursor() as cursor:
            # Replace your current cursor.execute line with this
            cursor.execute("INSERT INTO saved_pages (user_id, title, page_text) VALUES (?, ?, ?)", (user_id, title, text))
        # Save the new page to the database
        return redirect(request, "encyclopedia/index.html")  # Redirect to a specific page after saving
    else:
        return render(request,"encyclopedia/create.html")

def random(request):
    if request.method == "POST":
        return render(request,"encyclopedia/random.html",{
        "random_page": util.list_entries()
    })
    else:
        return render(request,"encyclopedia/random.html")