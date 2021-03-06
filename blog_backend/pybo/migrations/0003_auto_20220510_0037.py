# Generated by Django 3.1.3 on 2022-05-09 15:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pybo', '0002_auto_20220509_0209'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='owner_name',
            field=models.TextField(default='', null=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='pybo.user'),
        ),
    ]
