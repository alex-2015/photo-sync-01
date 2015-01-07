from django.contrib import admin
from syncshare.models import Album, Picture


class AlbumAdmin(admin.ModelAdmin):
	list_display = ['directory', 'name', 'dates']
	

admin.site.register(Album, AlbumAdmin)
admin.site.register(Picture)