
from django.shortcuts import render, redirect
from numpy import save
from .util import list_entries, save_entry, get_entry
from . import util
from .models import saved_pages  # Import the model used for saving pages
from .util import list_entries, get_entry, save_entry  # Import necessary utility functions
import random # Import your model

def index(request):
    return render(request, "encyclopedia/index.html", {
        "index": list_entries()
    })
        
def create_new(request):
    if request.method == "POST":
        titles = request.POST.get("title", "")
        text = request.POST.get("textar", "")

        if text and titles not in request.session:
            request.session[titles] = []  # Use titles as the key

        if text and titles in request.session:
            # Create a new page instance
            new_page = saved_pages(title=titles, body=text)

            # Save the new page to the database
            new_page.save()

            # Fetch all articles from the database
            articles = save_entry(titles, text)

            return render(request, "encyclopedia/create.html", {
                "articles": articles
            })
        else:
            return render(request, "encyclopedia/create.html", {
                "articles": []  # Empty list if there is an issue
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
            return render(request, "encyclopedia/newpage.html",{
                "random": random_content
            }) # Redirect to the 'new_page' view
    else:
        return render(request, "encyclopedia/random.html")


def Search(request):
    all_entries = util.list_entries()
    title = all_entries
    content = title
    if request.method == "POST":
        page = saved_pages(title=title, text_page=content)

        return render(request,"encyclopedia/newpage.html",{
            "save": util.get_entry()
            })
    else:
        # Assuming you want to display the first entry, adjust as needed
        page = saved_pages(title=title, text_page=content)

        return render(request,"encyclopedia/newpage.html",{
            "save": util.list_entries() 
        })