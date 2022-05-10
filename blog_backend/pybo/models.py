from django.db import models

class Post(models.Model):
    subject = models.CharField(max_length=200)
    content = models.TextField()
    create_date = models.DateTimeField()
    def __str__(self):
        return self.subject

class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    create_date = models.DateTimeField()
    def __str__(self):
        return self.name

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment')
    owner_name = models.CharField(max_length=30, null=True, default='')
    content = models.TextField()
    create_date = models.DateTimeField()

# Create your models here.