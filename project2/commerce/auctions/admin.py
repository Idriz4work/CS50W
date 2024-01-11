from django.contrib import admin

from .models import User, Comment, AuctionListing, Bid
# Register your models here.
admin.site.register(User)
admin.site.register(Comment)
admin.site.register(AuctionListing)
admin.site.register(Bid)
