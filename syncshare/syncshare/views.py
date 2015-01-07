from django.shortcuts import get_object_or_404, HttpResponse, render
from django.http import HttpResponseRedirect, Http404, HttpResponse

from syncshare.models import Album, Picture


def index(request):
	album = Album.objects.all()
	return render(request, 'index.html', {'albums': album})

def albums(request, slug):
	album = Album.objects.all()
	return render(request, 'album.html', {'albums': album})