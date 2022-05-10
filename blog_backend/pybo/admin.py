from django.contrib import admin
from .models import Post,User, Comment

class PostAdmin(admin.ModelAdmin):
    search_fields = ['subject']

class UserAdmin(admin.ModelAdmin):
    search_fields = ['name']

class CommentAdmin(admin.ModelAdmin):
    search_fields = ['content']

admin.site.register(Post, PostAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)

# Register your models here.
