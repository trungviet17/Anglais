# Generated by Django 4.1.13 on 2024-05-17 01:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flashcard', '0015_alter_folders_publish'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folders',
            name='publish',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 17, 1, 17, 19, 693958, tzinfo=datetime.timezone.utc)),
        ),
    ]
