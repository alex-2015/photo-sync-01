import os

from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify

from filebrowser.fields import FileBrowseField
from filebrowser.sites import site
from filebrowser.base import FileListing

class PictureManager(models.Manager):
    def create_picture(self, path, album):
        if not self.filter(path=path).exists():
            picture = self.create(path=path, album=album)
            return picture

class Picture(models.Model):
    path = models.CharField(max_length=300)
    album = models.ForeignKey('Album', null=True)
    objects = PictureManager()

    def __unicode__(self):
        return self.path

class Album(models.Model):
    directory = FileBrowseField("Folder", directory="share/", max_length=200, null=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(null=True, blank=True)
    dates = models.DateField(null=True, blank=True)

    def __unicode__(self):
    	return self.name

    def images_in_folder(self):
        album_path = os.path.join(settings.MEDIA_URL.strip("/"), str(self.directory))
        path = os.path.join(settings.PROJECT_ROOT, album_path)
        files = os.listdir(path)
        album_list = []
        for x in files:
            album_list.append(os.path.join(album_path,x).replace('\\','/'))
        for y in album_list:
            Picture.objects.create_picture(y, self)
        for z in Picture.objects.filter(album=self):
            if z.path not in album_list:
                z.delete()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
    	super(Album, self).save(*args, **kwargs)
        self.images_in_folder()