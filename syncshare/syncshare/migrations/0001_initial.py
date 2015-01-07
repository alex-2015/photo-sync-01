# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Picture'
        db.create_table(u'syncshare_picture', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('path', self.gf('django.db.models.fields.CharField')(max_length=300)),
            ('album', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['syncshare.Album'], null=True)),
        ))
        db.send_create_signal(u'syncshare', ['Picture'])

        # Adding model 'Album'
        db.create_table(u'syncshare_album', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('directory', self.gf('filebrowser.fields.FileBrowseField')(max_length=200, null=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=50, null=True, blank=True)),
            ('dates', self.gf('django.db.models.fields.DateField')(null=True, blank=True)),
        ))
        db.send_create_signal(u'syncshare', ['Album'])


    def backwards(self, orm):
        # Deleting model 'Picture'
        db.delete_table(u'syncshare_picture')

        # Deleting model 'Album'
        db.delete_table(u'syncshare_album')


    models = {
        u'syncshare.album': {
            'Meta': {'object_name': 'Album'},
            'dates': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'directory': ('filebrowser.fields.FileBrowseField', [], {'max_length': '200', 'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50', 'null': 'True', 'blank': 'True'})
        },
        u'syncshare.picture': {
            'Meta': {'object_name': 'Picture'},
            'album': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['syncshare.Album']", 'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'path': ('django.db.models.fields.CharField', [], {'max_length': '300'})
        }
    }

    complete_apps = ['syncshare']