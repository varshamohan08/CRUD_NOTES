from django.db import models

# Create your models here.
class Notes(models.Model):
    title = models.CharField(max_length = 50, null=False, blank=False)
    body = models.TextField(max_length = 5000, null=False, blank=False)

    class Meta:
        db_table = 'notes'

{
    "title" : "Note One",
    "body" : "awrxv x cv xb  cv b cn  cn  gf h fh  rt y rt rt  rt  rt  yrt y rt  rt y r ty rt  rt y  y er tw e w t w et ery tr u iyu i i  iu  ui ku ik u ik u k ui k ui k ui k iuk  uik u ik ui k ki ui k"
}