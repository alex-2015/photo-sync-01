from django.conf.urls import patterns, include, url
from syncshare import views
from filebrowser.sites import site

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'syncshare.views.home', name='home'),
    # url(r'^syncshare/', include('syncshare.foo.urls')),
    url(r'^$', views.index, name="index"),
    url(r'^albums/(?P<slug>[\w-]+)/', views.albums, name="albums"),
    # url("^(?P<slug>[\w-]+)/$", views.piecedetail, name="detail"),

    # Django ImageFit
    url(r'^imagefit/', include('imagefit.urls')),

    # Django FileBrowser
    url(r'^admin/filebrowser/', include(site.urls)),

    # Grappelli
    (r'^grappelli/', include('grappelli.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
